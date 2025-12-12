import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-9xl mb-6">🎭</div>
        <h1 className="font-display text-5xl font-bold text-foreground mb-4">Página não encontrada</h1>
        <p className="text-lg text-muted-foreground mb-8">Parece que esta página se perdeu. Explore nossa coleção!</p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/"><Home className="w-5 h-5 mr-2" />Ir para o Início</Link>
        </Button>
      </div>
    </Layout>
  );
}