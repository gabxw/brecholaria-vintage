import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  orderId: string;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  amount: number;
  customerName: string;
  customerEmail: string;
  // Para cartão de crédito
  cardToken?: string;
  installments?: number;
  paymentMethodId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Verificar autenticação (opcional, dependendo da sua lógica)
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    const paymentRequest: PaymentRequest = await req.json()
    const { orderId, paymentMethod, amount, customerName, customerEmail } = paymentRequest

    // Validar dados
    if (!orderId || !paymentMethod || !amount || !customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Dados inválidos' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Buscar o pedido no banco
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: 'Pedido não encontrado' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Obter Access Token do Mercado Pago
    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN')
    
    if (!mercadoPagoAccessToken) {
      console.error('MERCADOPAGO_ACCESS_TOKEN não configurado')
      return new Response(
        JSON.stringify({ 
          error: 'Configuração de pagamento não disponível',
          message: 'Por favor, configure as credenciais do Mercado Pago'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Separar nome em primeiro e último nome
    const nameParts = customerName.split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || firstName

    let paymentData: any = {
      transaction_amount: amount,
      description: `Pedido #${orderId.slice(0, 8).toUpperCase()} - Brecholaria Vintage`,
      payer: {
        email: customerEmail,
        first_name: firstName,
        last_name: lastName,
      },
      external_reference: orderId,
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
    }

    // Configurar método de pagamento específico
    if (paymentMethod === 'pix') {
      paymentData.payment_method_id = 'pix'
    } else if (paymentMethod === 'credit_card') {
      if (!paymentRequest.cardToken || !paymentRequest.paymentMethodId) {
        return new Response(
          JSON.stringify({ error: 'Token do cartão não fornecido' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }
      paymentData.payment_method_id = paymentRequest.paymentMethodId
      paymentData.token = paymentRequest.cardToken
      paymentData.installments = paymentRequest.installments || 1
    } else if (paymentMethod === 'boleto') {
      paymentData.payment_method_id = 'bolbradesco'
    }

    // Criar pagamento no Mercado Pago
    const mpResponse = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mercadoPagoAccessToken}`,
      },
      body: JSON.stringify(paymentData),
    })

    const mpData = await mpResponse.json()

    if (!mpResponse.ok) {
      console.error('Erro do Mercado Pago:', mpData)
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao processar pagamento',
          details: mpData.message || mpData.cause?.[0]?.description || 'Erro desconhecido'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Atualizar pedido com payment_id
    await supabaseClient
      .from('orders')
      .update({ 
        payment_id: mpData.id.toString(),
        status: mpData.status === 'approved' ? 'pago' : 'novo'
      })
      .eq('id', orderId)

    // Preparar resposta baseada no método de pagamento
    let responseData: any = {
      paymentId: mpData.id,
      status: mpData.status,
    }

    if (paymentMethod === 'pix') {
      responseData.qrCode = mpData.point_of_interaction?.transaction_data?.qr_code
      responseData.qrCodeBase64 = mpData.point_of_interaction?.transaction_data?.qr_code_base64
      responseData.ticketUrl = mpData.point_of_interaction?.transaction_data?.ticket_url
    } else if (paymentMethod === 'boleto') {
      responseData.boletoUrl = mpData.transaction_details?.external_resource_url
    }

    return new Response(
      JSON.stringify(responseData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Erro:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
