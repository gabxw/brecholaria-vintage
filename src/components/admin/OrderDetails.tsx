import { Order, useUpdateOrderStatus } from '@/hooks/useOrders';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, Mail, Phone, MapPin, Package, Calendar,
  CreditCard, CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

interface OrderDetailsProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export function OrderDetails({ order, open, onClose }: OrderDetailsProps) {
  const updateOrderStatus = useUpdateOrderStatus();
  const [newStatus, setNewStatus] = useState<Order['status'] | ''>('');

  if (!order) return null;

  const statusColors = {
    novo: 'bg-blue-500',
    pago: 'bg-green-500',
    enviado: 'bg-purple-500',
    concluido: 'bg-gray-500',
    cancelado: 'bg-red-500',
  };

  const statusLabels = {
    novo: 'Aguardando Pagamento',
    pago: 'Pago',
    enviado: 'Enviado',
    concluido: 'Concluído',
    cancelado: 'Cancelado',
  };

  const paymentMethodLabels: Record<string, string> = {
    pix: 'PIX',
    credit_card: 'Cartão de Crédito',
    boleto: 'Boleto Bancário',
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) return;

    try {
      await updateOrderStatus.mutateAsync({
        id: order.id,
        status: newStatus,
      });
      setNewStatus('');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Pedido</span>
            <Badge className={statusColors[order.status]}>
              {statusLabels[order.status]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">ID do Pedido</p>
              <p className="font-mono font-semibold">
                #{order.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Data do Pedido
              </p>
              <p className="font-medium">
                {format(new Date(order.created_at), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>

          <Separator />

          {/* Dados do Cliente */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Dados do Cliente
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Nome</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="font-medium">{order.customer_email}</p>
                </div>
                {order.customer_phone && (
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Telefone
                    </p>
                    <p className="font-medium">{order.customer_phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          {order.customer_address && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Endereço de Entrega
                </h3>
                <div className="text-sm space-y-1">
                  <p>
                    {order.customer_address.street}, {order.customer_address.number}
                    {order.customer_address.complement &&
                      ` - ${order.customer_address.complement}`}
                  </p>
                  <p>
                    {order.customer_address.neighborhood} -{' '}
                    {order.customer_address.city}/{order.customer_address.state}
                  </p>
                  <p>CEP: {order.customer_address.zipCode}</p>
                </div>
              </div>
            </>
          )}

          {/* Itens do Pedido */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Itens do Pedido ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-background shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    {item.size && (
                      <p className="text-xs text-muted-foreground">
                        Tamanho: {item.size}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        Qtd: {item.quantity} × R${' '}
                        {item.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo Financeiro */}
          <Separator />
          <div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-base">Total</span>
                <span className="font-bold text-xl text-primary">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          {order.payment_method && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Informações de Pagamento
                </h3>
                <div className="text-sm space-y-2">
                  <div>
                    <p className="text-muted-foreground">Método de Pagamento</p>
                    <p className="font-medium">
                      {paymentMethodLabels[order.payment_method] || order.payment_method}
                    </p>
                  </div>
                  {order.payment_id && (
                    <div>
                      <p className="text-muted-foreground">ID da Transação</p>
                      <p className="font-mono text-xs">{order.payment_id}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Atualizar Status */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Atualizar Status
            </h3>
            <div className="flex gap-3">
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value as Order['status'])}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione um novo status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novo">Aguardando Pagamento</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleUpdateStatus}
                disabled={!newStatus || newStatus === order.status || updateOrderStatus.isPending}
              >
                {updateOrderStatus.isPending ? 'Atualizando...' : 'Atualizar'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
