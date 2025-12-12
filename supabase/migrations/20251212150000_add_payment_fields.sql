-- Add payment_id field to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_id TEXT;

-- Add index for faster payment_id lookups
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);

-- Add comment
COMMENT ON COLUMN public.orders.payment_id IS 'ID da transação do gateway de pagamento (Mercado Pago, Stripe, etc)';
