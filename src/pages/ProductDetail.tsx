import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, ArrowLeft, Truck, Shield, Ruler } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-8xl mb-6">🎭</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Produto Não Encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
            Infelizmente este produto não está mais disponível ou o link está incorreto.
          </p>
          <Button asChild>
            <Link to="/produtos">Ver outros produtos</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('Produto indisponível');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.size
    });

    toast.success('Adicionado ao carrinho!', {
      description: product.name,
      action: {
        label: 'Ver carrinho',
        onClick: () => navigate('/carrinho')
      }
    });
  };

  const conditionLabels = {
    novo: 'Novo com etiqueta',
    excelente: 'Excelente estado',
    bom: 'Bom estado',
    usado: 'Usado'
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fade-in">
          <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="animate-fade-up">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">
                {product.category}
              </span>
              <span className="px-3 py-1 text-sm bg-secondary/20 text-secondary rounded-full">
                {conditionLabels[product.condition]}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-primary">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="px-2 py-1 text-sm bg-primary text-primary-foreground rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size & Measurements */}
            <div className="mb-8 p-6 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Tamanho: {product.size}</h3>
              </div>
              
              {product.measurements && (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {product.measurements.bust && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Busto:</span>
                      <span className="font-medium">{product.measurements.bust}</span>
                    </div>
                  )}
                  {product.measurements.waist && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cintura:</span>
                      <span className="font-medium">{product.measurements.waist}</span>
                    </div>
                  )}
                  {product.measurements.length && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Comprimento:</span>
                      <span className="font-medium">{product.measurements.length}</span>
                    </div>
                  )}
                  {product.measurements.shoulders && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ombros:</span>
                      <span className="font-medium">{product.measurements.shoulders}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border"
                onClick={() => toast.info('Em breve: Lista de desejos!')}
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Envio para todo Brasil</h4>
                  <p className="text-sm text-muted-foreground">Frete calculado no checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Compra garantida</h4>
                  <p className="text-sm text-muted-foreground">Peça conferida e embalada com cuidado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}