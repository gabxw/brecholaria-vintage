import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.in_stock) {
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
      description: product.name
    });
  };

  const conditionColors = {
    novo: 'bg-secondary text-secondary-foreground',
    excelente: 'bg-olive-light/20 text-olive',
    bom: 'bg-accent/20 text-accent',
    usado: 'bg-muted text-muted-foreground'
  };

  const conditionLabels = {
    novo: 'Novo',
    excelente: 'Excelente',
    bom: 'Bom estado',
    usado: 'Usado'
  };

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <article className="bg-card rounded-xl overflow-hidden border border-border shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.originalPrice && (
              <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${conditionColors[product.condition]}`}>
              {conditionLabels[product.condition]}
            </span>
          </div>

          {/* Wishlist Button */}
          <button 
            className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110"
            onClick={(e) => {
              e.preventDefault();
              toast.info('Em breve: Lista de desejos!');
            }}
            aria-label="Adicionar aos favoritos"
          >
            <Heart className="w-4 h-4 text-primary" />
          </button>

          {/* Quick Add */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {product.in_stock ? 'Adicionar' : 'Indisponível'}
            </Button>
          </div>

          {/* Out of Stock Overlay */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
              <span className="px-4 py-2 bg-foreground text-background font-medium rounded-lg">
                Indisponível
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded shrink-0">
              {product.size}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}