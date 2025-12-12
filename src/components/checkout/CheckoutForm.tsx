import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const checkoutSchema = z.object({
  customer_name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  customer_email: z.string().email('Email inválido'),
  customer_phone: z.string().min(10, 'Telefone inválido').optional(),
  street: z.string().min(3, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 letras (ex: SP)'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido (ex: 12345-678)'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading?: boolean;
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue('street', data.logradouro || '');
        setValue('neighborhood', data.bairro || '');
        setValue('city', data.localidade || '');
        setValue('state', data.uf || '');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setIsLoadingCep(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dados Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Dados Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customer_name">Nome Completo *</Label>
            <Input
              id="customer_name"
              {...register('customer_name')}
              placeholder="João Silva"
              className={errors.customer_name ? 'border-destructive' : ''}
            />
            {errors.customer_name && (
              <p className="text-sm text-destructive mt-1">{errors.customer_name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="customer_email"
                  type="email"
                  {...register('customer_email')}
                  placeholder="joao@email.com"
                  className={`pl-10 ${errors.customer_email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.customer_email && (
                <p className="text-sm text-destructive mt-1">{errors.customer_email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="customer_phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="customer_phone"
                  type="tel"
                  {...register('customer_phone')}
                  placeholder="(11) 98765-4321"
                  className={`pl-10 ${errors.customer_phone ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.customer_phone && (
                <p className="text-sm text-destructive mt-1">{errors.customer_phone.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endereço de Entrega */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Endereço de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="zipCode">CEP *</Label>
            <Input
              id="zipCode"
              {...register('zipCode')}
              placeholder="12345-678"
              onBlur={(e) => handleCepBlur(e.target.value)}
              className={errors.zipCode ? 'border-destructive' : ''}
              disabled={isLoadingCep}
            />
            {errors.zipCode && (
              <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
            )}
            {isLoadingCep && (
              <p className="text-sm text-muted-foreground mt-1">Buscando endereço...</p>
            )}
          </div>

          <div>
            <Label htmlFor="street">Rua/Avenida *</Label>
            <Input
              id="street"
              {...register('street')}
              placeholder="Rua das Flores"
              className={errors.street ? 'border-destructive' : ''}
            />
            {errors.street && (
              <p className="text-sm text-destructive mt-1">{errors.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="number">Número *</Label>
              <Input
                id="number"
                {...register('number')}
                placeholder="123"
                className={errors.number ? 'border-destructive' : ''}
              />
              {errors.number && (
                <p className="text-sm text-destructive mt-1">{errors.number.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                {...register('complement')}
                placeholder="Apto 45"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="neighborhood">Bairro *</Label>
            <Input
              id="neighborhood"
              {...register('neighborhood')}
              placeholder="Centro"
              className={errors.neighborhood ? 'border-destructive' : ''}
            />
            {errors.neighborhood && (
              <p className="text-sm text-destructive mt-1">{errors.neighborhood.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="São Paulo"
                className={errors.city ? 'border-destructive' : ''}
              />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">Estado (UF) *</Label>
              <Input
                id="state"
                {...register('state')}
                placeholder="SP"
                maxLength={2}
                className={`uppercase ${errors.state ? 'border-destructive' : ''}`}
              />
              {errors.state && (
                <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Processando...' : 'Continuar para Pagamento'}
      </Button>
    </form>
  );
}
