import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, ShoppingCart, Settings, Upload, Star, Eye } from 'lucide-react';

interface AdminTutorialProps {
  open: boolean;
  onClose: () => void;
}

export function AdminTutorial({ open, onClose }: AdminTutorialProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            🎭 Como usar o Painel da Brecholaria
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] pr-4">
          <div className="space-y-8 py-4">
            {/* Adding Products */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Adicionando Produtos</h3>
              </div>
              <div className="pl-13 space-y-2 text-muted-foreground">
                <p>1. Clique no botão <strong>"Novo Produto"</strong> no canto superior direito</p>
                <p>2. Preencha as informações básicas: nome, descrição e preço</p>
                <p>3. Escolha categoria, tamanho e condição do produto</p>
                <p>4. Vá na aba <strong>"Imagens"</strong> e faça upload das fotos</p>
                <p>5. Na aba <strong>"Detalhes"</strong>, adicione medidas se necessário</p>
                <p>6. Clique em <strong>"Criar produto"</strong> para salvar</p>
              </div>
            </section>

            {/* Images */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Sobre as Fotos</h3>
              </div>
              <div className="pl-13 space-y-2 text-muted-foreground">
                <p>• A <strong>primeira foto</strong> será a imagem principal do produto</p>
                <p>• Você pode adicionar várias fotos de diferentes ângulos</p>
                <p>• Para remover uma foto, clique no <strong>X</strong> vermelho sobre ela</p>
                <p>• Tire fotos com boa iluminação e fundo neutro</p>
              </div>
            </section>

            {/* Featured */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-display text-lg font-semibold">Produtos em Destaque</h3>
              </div>
              <div className="pl-13 space-y-2 text-muted-foreground">
                <p>• Ative <strong>"Produto em destaque"</strong> nos detalhes do produto</p>
                <p>• Esses produtos aparecerão na página inicial da loja</p>
                <p>• Escolha os melhores produtos para destacar!</p>
              </div>
            </section>

            {/* Stock */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-display text-lg font-semibold">Controle de Estoque</h3>
              </div>
              <div className="pl-13 space-y-2 text-muted-foreground">
                <p>• Desative <strong>"Disponível para venda"</strong> para ocultar um produto</p>
                <p>• Produtos indisponíveis aparecem com aviso de "Indisponível"</p>
                <p>• Quando vender uma peça, você pode remover o produto</p>
              </div>
            </section>

            {/* Editing */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Editando e Removendo</h3>
              </div>
              <div className="pl-13 space-y-2 text-muted-foreground">
                <p>• Clique no ícone de <strong>lápis</strong> para editar um produto</p>
                <p>• Clique no ícone de <strong>lixeira</strong> para remover</p>
                <p>• Use a busca para encontrar produtos rapidamente</p>
              </div>
            </section>

            {/* Orders */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Pedidos</h3>
              </div>
              <div className="pl-13 space-y-2 text-muted-foreground">
                <p>• Quando clientes comprarem, os pedidos aparecerão aqui</p>
                <p>• Você poderá ver detalhes e atualizar o status</p>
                <p>• Status: Novo → Pago → Enviado → Concluído</p>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-display font-semibold mb-2">💡 Dicas</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Sempre coloque preços justos e competitivos</li>
                <li>• Descreva detalhes como marcas, defeitos pequenos, tecido</li>
                <li>• Adicione medidas para ajudar clientes a escolher o tamanho</li>
                <li>• Tire fotos de frente, costas e detalhes importantes</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
