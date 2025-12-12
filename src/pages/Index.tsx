import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products, categories } from '@/data/products';
import heroBanner from '@/assets/hero-banner.jpg';

const featuredProducts = products.filter(p => p.featured).slice(0, 4);

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Peças vintage" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Peças únicas com história
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Vista-se de <span className="text-primary">histórias</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Descubra peças vintage selecionadas com carinho. Cada item conta uma história única.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/produtos">Explorar Coleção <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg"><Link to="/sobre">Nossa História</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Truck className="w-6 h-6 text-primary" /></div><div><h3 className="font-display font-semibold">Envio para Todo Brasil</h3><p className="text-sm text-muted-foreground">Entrega rápida e segura</p></div></div>
            <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center"><Shield className="w-6 h-6 text-secondary" /></div><div><h3 className="font-display font-semibold">Compra Garantida</h3><p className="text-sm text-muted-foreground">Peças conferidas</p></div></div>
            <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center"><Heart className="w-6 h-6 text-accent" /></div><div><h3 className="font-display font-semibold">Moda Sustentável</h3><p className="text-sm text-muted-foreground">Renove sem desperdício</p></div></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Explore por Categoria</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">Encontre a peça perfeita para o seu estilo.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.filter(c => c !== 'Todos').map(cat => (
              <Link key={cat} to={`/produtos?categoria=${cat}`} className="px-6 py-3 bg-card border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-medium">{cat}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end gap-4 mb-12">
            <div><h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Destaques da Semana</h2><p className="text-muted-foreground">Peças especiais selecionadas com carinho.</p></div>
            <Button asChild variant="outline"><Link to="/produtos">Ver todos <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
}