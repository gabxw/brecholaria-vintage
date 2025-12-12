import { useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useOrder } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, Package, MapPin, Mail, Phone, 
  CreditCard, Home, Clock, QrCode 
} from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id || '');

  const isNewOrder = location.state?.isNewOrder;
  const paymentMethod = location.state?.paymentMethod;

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Pedido não encontrado</h1>
          <Button asChild>
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const statusColors = {
    novo: 'bg-blue-500',
    pago: 'bg-green-500',
    enviado: 'bg-purple-500',
    concluido: 'bg-gray-500',
    cancelado: 'bg-red-500',
  };

  const statusLabels = {
    novo: 'Aguardando Pagamento',
    pago: 'Pagamento Confirmado',
    enviado: 'Pedido Enviado',
    concluido: 'Pedido Concluído',
    cancelado: 'Pedido Cancelado',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        {isNewOrder && (
          <div className="max-w-2xl mx-auto mb-8 text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Pedido Realizado com Sucesso!
            </h1>
            <p className="text-lg text-muted-foreground">
              Número do pedido: <span className="font-mono font-semibold">#{order.id.slice(0, 8).toUpperCase()}</span>
            </p>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status do Pedido */}
          <Card className="animate-fade-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Status do Pedido
                </CardTitle>
                <Badge className={statusColors[order.status]}>
                  {statusLabels[order.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {order.status === 'novo' && paymentMethod === 'pix' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <QrCode className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1">
                        Aguardando Pagamento via PIX
                      </h3>
                      <p className="text-sm text-amber-800">
                        Escaneie o QR Code ou copie o código PIX para finalizar o pagamento.
                        O pedido será confirmado automaticamente após a compensação.
                      </p>
                      <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200">
                        <div className="w-48 h-48 mx-auto bg-muted flex items-center justify-center">
                          <QrCode className="w-24 h-24 text-muted-foreground" />
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            QR Code será gerado aqui
                          </p>
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                          Copiar Código PIX
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {order.status === 'novo' && paymentMethod === 'boleto' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        Boleto Bancário Gerado
                      </h3>
                      <p className="text-sm text-blue-800 mb-4">
                        O boleto foi enviado para o seu email. Vencimento em 3 dias úteis.
                      </p>
                      <Button variant="outline">
                        Baixar Boleto
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {order.status === 'pago' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">
                        Pagamento Confirmado!
                      </h3>
                      <p className="text-sm text-green-800">
                        Seu pedido está sendo preparado para envio. Você receberá um email com o código de rastreamento em breve.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dados do Cliente */}
          <Card className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Dados de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nome</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="font-medium text-sm">{order.customer_email}</p>
                </div>

                {order.customer_phone && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Telefone
                    </p>
                    <p className="font-medium text-sm">{order.customer_phone}</p>
                  </div>
                )}
              </div>

              {order.customer_address && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Home className="w-3 h-3" /> Endereço
                  </p>
                  <p className="font-medium text-sm">
                    {order.customer_address.street}, {order.customer_address.number}
                    {order.customer_address.complement && ` - ${order.customer_address.complement}`}
                  </p>
                  <p className="font-medium text-sm">
                    {order.customer_address.neighborhood} - {order.customer_address.city}/{order.customer_address.state}
                  </p>
                  <p className="font-medium text-sm">
                    CEP: {order.customer_address.zipCode}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Itens do Pedido */}
          <Card className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Itens do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      {item.size && (
                        <p className="text-sm text-muted-foreground">Tamanho: {item.size}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">
                          Quantidade: {item.quantity}
                        </span>
                        <span className="font-semibold text-primary">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-display text-lg font-semibold">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/produtos">Continuar Comprando</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/">Voltar ao Início</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
