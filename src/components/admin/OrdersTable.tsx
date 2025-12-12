import { useState } from 'react';
import { Order } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Search, Package, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

export function OrdersTable({ orders, onViewOrder }: OrdersTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">
            Nenhum pedido encontrado
          </h3>
          <p className="text-muted-foreground">
            Os pedidos aparecerão aqui quando os clientes finalizarem compras.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="novo">Aguardando Pagamento</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de pedidos */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Nenhum pedido encontrado com os filtros aplicados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Info Principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold truncate">
                        {order.customer_name}
                      </h3>
                      <Badge className={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div className="truncate">
                        <span className="font-medium">ID:</span>{' '}
                        #{order.id.slice(0, 8).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <span className="font-medium">Email:</span> {order.customer_email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(order.created_at), "dd/MM/yyyy 'às' HH:mm", {
                          locale: ptBR,
                        })}
                      </div>
                      <div>
                        <span className="font-medium">Itens:</span> {order.items.length}
                      </div>
                    </div>
                  </div>

                  {/* Valor e Ação */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total</p>
                      <p className="font-bold text-lg text-primary">
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onViewOrder(order)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Resumo */}
      {filteredOrders.length > 0 && (
        <div className="text-sm text-muted-foreground text-center pt-2">
          Mostrando {filteredOrders.length} de {orders.length} pedidos
        </div>
      )}
    </div>
  );
}
