import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Instagram, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Mensagem enviada!', {
      description: 'Responderemos em breve.'
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Fale Conosco
            </h1>
            <p className="text-lg text-muted-foreground">
              Tem alguma dúvida, sugestão ou quer saber mais sobre uma peça? 
              Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="animate-fade-up">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Como Nos Encontrar
              </h2>

              <div className="space-y-6">
                <a 
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      WhatsApp
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      (11) 99999-9999
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Resposta rápida durante horário comercial
                    </p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/brecholaria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                    <Instagram className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      Instagram
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      @brecholaria
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Novidades, bastidores e peças exclusivas
                    </p>
                  </div>
                </a>

                <a 
                  href="mailto:contato@brecholaria.com.br"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      E-mail
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      contato@brecholaria.com.br
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Para parcerias e assuntos formais
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      Horário de Atendimento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Segunda a Sexta: 9h às 18h
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sábado: 10h às 14h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Envie uma Mensagem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nome *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Seu nome"
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      className="bg-card border-border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    WhatsApp
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className="bg-card border-border"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Assunto *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="Sobre o que gostaria de falar?"
                    className="bg-card border-border"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Escreva sua mensagem aqui..."
                    rows={5}
                    className="bg-card border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}