import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  discount?: number;
}

export function OrderSummary({ items, subtotal, shipping = 0, discount = 0 }: OrderSummaryProps) {
  const total = subtotal + shipping - discount;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Resumo do Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lista de itens */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                {item.size && (
                  <p className="text-xs text-muted-foreground">Tamanho: {item.size}</p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Qtd: {item.quantity}</span>
                  <span className="text-sm font-semibold text-primary">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Cálculos */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
            <span className="font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>

          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frete</span>
              <span className="font-medium">R$ {shipping.toFixed(2).replace('.', ',')}</span>
            </div>
          )}

          {shipping === 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frete</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Desconto</span>
              <span className="text-green-600 font-medium">
                - R$ {discount.toFixed(2).replace('.', ',')}
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="font-display text-lg font-semibold">Total</span>
          <span className="font-display text-2xl font-bold text-primary">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>

        {/* Informações adicionais */}
        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
          <p>✓ Frete grátis para compras acima de R$ 200,00</p>
          <p>✓ Primeira troca grátis</p>
          <p>✓ Devolução em até 7 dias</p>
        </div>
      </CardContent>
    </Card>
  );
}
