import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, FileText } from 'lucide-react';

export type PaymentMethod = 'pix' | 'credit_card' | 'boleto';

interface PaymentMethodsProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

export function PaymentMethods({ selectedMethod, onMethodChange }: PaymentMethodsProps) {
  const paymentOptions = [
    {
      id: 'pix' as PaymentMethod,
      name: 'PIX',
      description: 'Pagamento instantâneo via QR Code',
      icon: Smartphone,
      badge: 'Recomendado',
      badgeColor: 'bg-green-500',
    },
    {
      id: 'credit_card' as PaymentMethod,
      name: 'Cartão de Crédito',
      description: 'Parcelamento em até 3x sem juros',
      icon: CreditCard,
    },
    {
      id: 'boleto' as PaymentMethod,
      name: 'Boleto Bancário',
      description: 'Vencimento em 3 dias úteis',
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold">Forma de Pagamento</h3>
      
      <RadioGroup value={selectedMethod} onValueChange={(value) => onMethodChange(value as PaymentMethod)}>
        <div className="space-y-3">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedMethod === option.id;
            
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all ${
                  isSelected ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'
                }`}
                onClick={() => onMethodChange(option.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon className="w-5 h-5 text-primary" />
                        <Label
                          htmlFor={option.id}
                          className="font-semibold cursor-pointer flex items-center gap-2"
                        >
                          {option.name}
                          {option.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${option.badgeColor}`}>
                              {option.badge}
                            </span>
                          )}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>

                  {/* Informações adicionais baseadas no método selecionado */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-border">
                      {option.id === 'pix' && (
                        <div className="text-sm space-y-2">
                          <p className="text-muted-foreground">
                            ✓ Aprovação instantânea
                          </p>
                          <p className="text-muted-foreground">
                            ✓ Disponível 24/7
                          </p>
                          <p className="text-muted-foreground">
                            ✓ Sem taxas adicionais
                          </p>
                        </div>
                      )}
                      
                      {option.id === 'credit_card' && (
                        <div className="text-sm space-y-2">
                          <p className="text-muted-foreground">
                            ✓ Parcelamento em até 3x sem juros
                          </p>
                          <p className="text-muted-foreground">
                            ✓ Aprovação imediata
                          </p>
                          <p className="text-muted-foreground">
                            ✓ Aceitamos todas as bandeiras
                          </p>
                        </div>
                      )}
                      
                      {option.id === 'boleto' && (
                        <div className="text-sm space-y-2">
                          <p className="text-muted-foreground">
                            ✓ Vencimento em 3 dias úteis
                          </p>
                          <p className="text-muted-foreground">
                            ✓ Pagável em qualquer banco
                          </p>
                          <p className="text-destructive">
                            ⚠ Pedido confirmado após compensação (1-3 dias)
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </RadioGroup>

      <div className="bg-muted/50 rounded-lg p-4 text-sm">
        <p className="text-muted-foreground">
          🔒 <strong>Pagamento 100% seguro</strong> - Seus dados são protegidos com criptografia de ponta a ponta
        </p>
      </div>
    </div>
  );
}
