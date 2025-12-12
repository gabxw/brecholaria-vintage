import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, Heart } from 'lucide-react';
import jesterLogo from '@/assets/jester-logo.png';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src={jesterLogo} 
                alt="Brecholaria" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-display text-xl font-bold text-primary">
                Brecholaria
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O brechó mais estiloso e descontraído. Peças únicas com história e personalidade.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos?categoria=Vestidos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vestidos
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Casacos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Casacos
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Bolsas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bolsas
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Acessórios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Fale Conosco</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/brecholaria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @brecholaria
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contato@brecholaria.com.br"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contato@brecholaria.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Brecholaria. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> para peças com história
          </p>
        </div>
      </div>
    </footer>
  );
}