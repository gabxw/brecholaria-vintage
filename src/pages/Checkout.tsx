import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { CheckoutForm, CheckoutFormData } from '@/components/checkout/CheckoutForm';
import { PaymentMethods, PaymentMethod } from '@/components/checkout/PaymentMethods';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCreateOrder } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const createOrder = useCreateOrder();
  
  const [step, setStep] = useState<'form' | 'payment'>(items.length > 0 ? 'form' : 'form');
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirecionar se carrinho vazio
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto animate-fade-up">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground/30 mb-6" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-8">
              Adicione produtos ao carrinho antes de finalizar a compra.
            </p>
            <Button asChild size="lg">
              <Link to="/produtos">
                Explorar Produtos
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleFormSubmit = (data: CheckoutFormData) => {
    setFormData(data);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToForm = () => {
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishOrder = async () => {
    if (!formData) {
      toast.error('Preencha os dados do formulário');
      setStep('form');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        customer_address: {
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          size: item.size,
        })),
        total: totalPrice,
        payment_method: paymentMethod,
      };

      const order = await createOrder.mutateAsync(orderData);

      // Limpar carrinho
      clearCart();

      // Redirecionar para página de confirmação
      navigate(`/pedido/${order.id}`, { 
        state: { 
          order, 
          paymentMethod,
          isNewOrder: true 
        } 
      });

    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast.error('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const shipping = totalPrice >= 200 ? 0 : 15;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <Button
            variant="ghost"
            onClick={() => navigate('/carrinho')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Carrinho
          </Button>
          
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Finalizar Compra
          </h1>
          
          {/* Steps indicator */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 'form' ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'
              }`}>
                {step === 'payment' ? '✓' : '1'}
              </div>
              <span className={step === 'form' ? 'font-semibold' : 'text-muted-foreground'}>
                Dados de Entrega
              </span>
            </div>
            
            <div className="h-px flex-1 bg-border" />
            
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <span className={step === 'payment' ? 'font-semibold' : 'text-muted-foreground'}>
                Pagamento
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 'form' && (
              <div className="animate-fade-up">
                <CheckoutForm 
                  onSubmit={handleFormSubmit}
                  isLoading={isProcessing}
                />
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6 animate-fade-up">
                <PaymentMethods
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                />

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={handleBackToForm}
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  
                  <Button
                    onClick={handleFinishOrder}
                    className="flex-1"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={totalPrice}
              shipping={shipping}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
