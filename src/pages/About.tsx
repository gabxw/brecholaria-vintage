import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Sparkles, Recycle } from 'lucide-react';
import jesterLogo from '@/assets/jester-logo.png';

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <img 
              src={jesterLogo} 
              alt="Bobo da Corte - Mascote Brecholaria" 
              className="w-24 h-24 mx-auto mb-8 animate-float"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Nossa História
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Bem-vindo à Brecholaria, onde cada peça conta uma história e encontra um novo lar.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="animate-fade-up">
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  O Bobo da Corte
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O bobo da corte, nosso querido mascote, representa a essência da Brecholaria: 
                  a celebração da diversidade, da criatividade e da alegria de ser diferente.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  vestir-se de forma única e colorida, 
                  acreditamos que a moda é uma forma de expressão pessoal e autêntica.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cada peça do nosso brechó carrega histórias, memórias e personalidade — 
                  esperando para fazer parte da sua jornada.
                </p>
              </div>
              <div className="flex justify-center animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                  <img 
                    src={jesterLogo} 
                    alt="Bobo da Corte" 
                    className="relative w-64 h-64 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-card rounded-2xl border border-border animate-fade-up" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">Curadoria</h3>
                <p className="text-sm text-muted-foreground">
                  Selecionamos cada peça com carinho, garantindo qualidade e estilo únicos.
                </p>
              </div>

              <div className="text-center p-8 bg-card rounded-2xl border border-border animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Recycle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">Sustentabilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Moda circular: damos nova vida a roupas e reduzimos o desperdício.
                </p>
              </div>

              <div className="text-center p-8 bg-card rounded-2xl border border-border animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">Comunidade</h3>
                <p className="text-sm text-muted-foreground">
                  Conectamos pessoas que compartilham o amor por peças com história.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="text-center py-12 px-8 bg-primary/5 rounded-3xl mb-16 animate-fade-up">
              <blockquote className="font-display text-2xl md:text-3xl italic text-foreground mb-4">
                "A verdadeira elegância está em vestir histórias, não apenas roupas."
              </blockquote>
              <cite className="text-muted-foreground">— Filosofia Brecholaria</cite>
            </div>

            {/* CTA */}
            <div className="text-center animate-fade-up">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Pronto para encontrar sua próxima peça favorita?
              </h2>
              <p className="text-muted-foreground mb-8">
                Explore nossa coleção e descubra tesouros únicos.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/produtos">
                  Ver Coleção
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}