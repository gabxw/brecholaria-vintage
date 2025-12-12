import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CreatePaymentRequest {
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

export interface PaymentResponse {
  paymentId: string;
  status: string;
  qrCode?: string;
  qrCodeBase64?: string;
  ticketUrl?: string;
  boletoUrl?: string;
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: async (paymentData: CreatePaymentRequest): Promise<PaymentResponse> => {
      // Obter token de autenticação (se necessário)
      const { data: { session } } = await supabase.auth.getSession();
      
      // Chamar Edge Function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: paymentData,
      });

      if (error) {
        console.error('Erro ao criar pagamento:', error);
        throw new Error(error.message || 'Erro ao processar pagamento');
      }

      if (data.error) {
        throw new Error(data.details || data.error);
      }

      return data as PaymentResponse;
    },
    onError: (error: Error) => {
      toast.error(`Erro ao processar pagamento: ${error.message}`);
    }
  });
}

export function useCheckPaymentStatus() {
  return useMutation({
    mutationFn: async (paymentId: string) => {
      // Esta função pode ser usada para verificar o status de um pagamento
      // Você pode implementar uma Edge Function separada para isso
      const { data, error } = await supabase.functions.invoke('check-payment-status', {
        body: { paymentId },
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
