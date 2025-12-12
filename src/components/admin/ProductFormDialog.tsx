import { useState, useEffect } from 'react';
import { useCreateProduct, useUpdateProduct, uploadProductImage, Product, ProductFormData } from '@/hooks/useProducts';
import { categories, sizes, conditions } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

const defaultFormData: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  original_price: null,
  images: [],
  category: '',
  size: '',
  condition: 'bom',
  measurements: null,
  in_stock: true,
  stock_quantity: 1,
  featured: false,
};

export function ProductFormDialog({ open, onClose, product }: ProductFormDialogProps) {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [uploading, setUploading] = useState(false);
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    length: '',
    shoulders: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.original_price,
        images: product.images,
        category: product.category,
        size: product.size,
        condition: product.condition,
        measurements: product.measurements,
        in_stock: product.in_stock,
        stock_quantity: product.stock_quantity,
        featured: product.featured,
      });
      if (product.measurements) {
        setMeasurements({
          bust: product.measurements.bust || '',
          waist: product.measurements.waist || '',
          length: product.measurements.length || '',
          shoulders: product.measurements.shoulders || ''
        });
      }
    } else {
      setFormData(defaultFormData);
      setMeasurements({ bust: '', waist: '', length: '', shoulders: '' });
    }
  }, [product, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = await uploadProductImage(file);
      if (url) {
        newImages.push(url);
      }
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.size) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const hasMeasurements = Object.values(measurements).some(v => v.trim() !== '');
    const dataToSave = {
      ...formData,
      measurements: hasMeasurements ? measurements : null,
    };

    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, data: dataToSave });
      } else {
        await createProduct.mutateAsync(dataToSave);
      }
      onClose();
    } catch (error) {
      // Error handled in mutation
    }
  };

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  const productCategories = categories.filter(c => c !== 'Todos');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
            </TabsList>

            {/* Info Tab */}
            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do produto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Vestido Floral Anos 70"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o produto em detalhes..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">Preço original (opcional)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.original_price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, original_price: parseFloat(e.target.value) || null }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Tamanho *</Label>
                  <Select 
                    value={formData.size} 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, size: v }))}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condição *</Label>
                <Select 
                  value={formData.condition} 
                  onValueChange={(v: 'novo' | 'excelente' | 'bom' | 'usado') => setFormData(prev => ({ ...prev, condition: v }))}
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Imagens do produto</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploading ? 'Enviando...' : 'Clique para fazer upload de imagens'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG até 5MB cada
                    </p>
                  </label>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {formData.images.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma imagem adicionada</p>
                </div>
              )}
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock_quantity">Quantidade em estoque</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Medidas (opcional)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bust">Busto</Label>
                    <Input
                      id="bust"
                      value={measurements.bust}
                      onChange={(e) => setMeasurements(prev => ({ ...prev, bust: e.target.value }))}
                      placeholder="Ex: 96cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waist">Cintura</Label>
                    <Input
                      id="waist"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements(prev => ({ ...prev, waist: e.target.value }))}
                      placeholder="Ex: 76cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length">Comprimento</Label>
                    <Input
                      id="length"
                      value={measurements.length}
                      onChange={(e) => setMeasurements(prev => ({ ...prev, length: e.target.value }))}
                      placeholder="Ex: 110cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shoulders">Ombros</Label>
                    <Input
                      id="shoulders"
                      value={measurements.shoulders}
                      onChange={(e) => setMeasurements(prev => ({ ...prev, shoulders: e.target.value }))}
                      placeholder="Ex: 42cm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="in_stock">Disponível para venda</Label>
                    <p className="text-sm text-muted-foreground">
                      Produto aparecerá na loja
                    </p>
                  </div>
                  <Switch
                    id="in_stock"
                    checked={formData.in_stock}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, in_stock: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Produto em destaque</Label>
                    <p className="text-sm text-muted-foreground">
                      Aparecerá na página inicial
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : (product ? 'Atualizar' : 'Criar produto')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
