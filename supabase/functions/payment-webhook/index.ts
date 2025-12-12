import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Webhook do Mercado Pago
 * 
 * Este endpoint recebe notificações do Mercado Pago quando o status de um pagamento muda.
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 */

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Usar service role para bypass RLS
    )

    // Receber notificação do Mercado Pago
    const notification = await req.json()
    
    console.log('Webhook recebido:', notification)

    // Mercado Pago envia diferentes tipos de notificações
    // Estamos interessados em 'payment' notifications
    if (notification.type !== 'payment') {
      return new Response(
        JSON.stringify({ message: 'Notification type not handled' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const paymentId = notification.data?.id

    if (!paymentId) {
      return new Response(
        JSON.stringify({ error: 'Payment ID not found' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Buscar informações do pagamento no Mercado Pago
    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN')
    
    if (!mercadoPagoAccessToken) {
      console.error('MERCADOPAGO_ACCESS_TOKEN não configurado')
      return new Response(
        JSON.stringify({ error: 'Configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${mercadoPagoAccessToken}`,
      },
    })

    if (!mpResponse.ok) {
      console.error('Erro ao buscar pagamento no MP')
      return new Response(
        JSON.stringify({ error: 'Failed to fetch payment from Mercado Pago' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const paymentData = await mpResponse.json()
    const orderId = paymentData.external_reference
    const paymentStatus = paymentData.status

    console.log(`Payment ${paymentId} status: ${paymentStatus}`)

    if (!orderId) {
      console.error('Order ID not found in payment data')
      return new Response(
        JSON.stringify({ error: 'Order ID not found' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Mapear status do Mercado Pago para status do pedido
    let orderStatus = 'novo'
    
    switch (paymentStatus) {
      case 'approved':
        orderStatus = 'pago'
        break
      case 'pending':
      case 'in_process':
        orderStatus = 'novo'
        break
      case 'rejected':
      case 'cancelled':
        orderStatus = 'cancelado'
        break
      case 'refunded':
      case 'charged_back':
        orderStatus = 'cancelado'
        break
    }

    // Atualizar status do pedido no banco de dados
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({ 
        status: orderStatus,
        payment_id: paymentId.toString()
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Erro ao atualizar pedido:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update order' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log(`Order ${orderId} updated to status: ${orderStatus}`)

    // TODO: Enviar email de confirmação para o cliente
    // TODO: Notificar admin sobre novo pedido pago

    return new Response(
      JSON.stringify({ 
        message: 'Webhook processed successfully',
        orderId,
        status: orderStatus
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Erro no webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
