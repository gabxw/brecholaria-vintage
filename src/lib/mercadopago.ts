/**
 * Mercado Pago Integration
 * 
 * Este arquivo contém as funções para integração com o Mercado Pago.
 * Para usar em produção, você precisa:
 * 
 * 1. Criar uma conta no Mercado Pago: https://www.mercadopago.com.br
 * 2. Obter suas credenciais (Access Token) em: https://www.mercadopago.com.br/developers/panel/app
 * 3. Configurar as variáveis de ambiente no Supabase:
 *    - MERCADOPAGO_ACCESS_TOKEN (Production)
 *    - MERCADOPAGO_PUBLIC_KEY (Frontend)
 * 
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs
 */

export interface MercadoPagoConfig {
  publicKey: string;
  accessToken?: string; // Apenas no backend
}

export interface PaymentData {
  amount: number;
  description: string;
  payer: {
    email: string;
    firstName: string;
    lastName: string;
  };
  orderId: string;
}

export interface PixPaymentResponse {
  id: string;
  status: string;
  qr_code: string;
  qr_code_base64: string;
  ticket_url: string;
}

export interface CreditCardPaymentData extends PaymentData {
  token: string;
  installments: number;
  paymentMethodId: string;
}

/**
 * Inicializa o SDK do Mercado Pago no frontend
 */
export async function initMercadoPago(publicKey: string) {
  // Carregar o SDK do Mercado Pago
  if (typeof window !== 'undefined' && !(window as any).MercadoPago) {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    document.body.appendChild(script);
    
    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }

  // Inicializar com a chave pública
  const mp = new (window as any).MercadoPago(publicKey);
  return mp;
}

/**
 * Cria um pagamento PIX
 * Esta função deve ser chamada no backend (Supabase Edge Function)
 */
export async function createPixPayment(
  accessToken: string,
  paymentData: PaymentData
): Promise<PixPaymentResponse> {
  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      transaction_amount: paymentData.amount,
      description: paymentData.description,
      payment_method_id: 'pix',
      payer: {
        email: paymentData.payer.email,
        first_name: paymentData.payer.firstName,
        last_name: paymentData.payer.lastName,
      },
      external_reference: paymentData.orderId,
      notification_url: `${process.env.SUPABASE_URL}/functions/v1/payment-webhook`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erro ao criar pagamento PIX: ${error.message || response.statusText}`);
  }

  const data = await response.json();
  
  return {
    id: data.id,
    status: data.status,
    qr_code: data.point_of_interaction.transaction_data.qr_code,
    qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
    ticket_url: data.point_of_interaction.transaction_data.ticket_url,
  };
}

/**
 * Cria um pagamento com cartão de crédito
 * Esta função deve ser chamada no backend (Supabase Edge Function)
 */
export async function createCreditCardPayment(
  accessToken: string,
  paymentData: CreditCardPaymentData
): Promise<any> {
  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      transaction_amount: paymentData.amount,
      description: paymentData.description,
      payment_method_id: paymentData.paymentMethodId,
      token: paymentData.token,
      installments: paymentData.installments,
      payer: {
        email: paymentData.payer.email,
        first_name: paymentData.payer.firstName,
        last_name: paymentData.payer.lastName,
      },
      external_reference: paymentData.orderId,
      notification_url: `${process.env.SUPABASE_URL}/functions/v1/payment-webhook`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erro ao processar pagamento: ${error.message || response.statusText}`);
  }

  return await response.json();
}

/**
 * Cria um boleto bancário
 * Esta função deve ser chamada no backend (Supabase Edge Function)
 */
export async function createBoletoPayment(
  accessToken: string,
  paymentData: PaymentData
): Promise<any> {
  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      transaction_amount: paymentData.amount,
      description: paymentData.description,
      payment_method_id: 'bolbradesco', // ou outro banco
      payer: {
        email: paymentData.payer.email,
        first_name: paymentData.payer.firstName,
        last_name: paymentData.payer.lastName,
      },
      external_reference: paymentData.orderId,
      notification_url: `${process.env.SUPABASE_URL}/functions/v1/payment-webhook`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erro ao criar boleto: ${error.message || response.statusText}`);
  }

  return await response.json();
}

/**
 * Consulta o status de um pagamento
 */
export async function getPaymentStatus(
  accessToken: string,
  paymentId: string
): Promise<any> {
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao consultar status do pagamento');
  }

  return await response.json();
}
