import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

const categories = ['Todos', 'Vestidos', 'Blusas', 'Calças', 'Jaquetas', 'Acessórios', 'Sapatos'];
const sizes = ['PP', 'P', 'M', 'G', 'GG', 'Único'];
const conditions = ['novo', 'excelente', 'bom', 'usado'];
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Products() {
  const { data: products, isLoading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');

  const selectedCategory = searchParams.get('categoria') || 'Todos';
  const selectedSize = searchParams.get('tamanho') || '';
  const selectedCondition = searchParams.get('condicao') || '';
  const sortBy = searchParams.get('ordenar') || 'relevancia';

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'Todos') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearch('');
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }

    // Category
    if (selectedCategory && selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Size
    if (selectedSize) {
      result = result.filter(p => p.size === selectedSize);
    }

    // Condition
    if (selectedCondition) {
      result = result.filter(p => p.condition === selectedCondition);
    }

    // Sort
    switch (sortBy) {
      case 'preco-menor':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'preco-maior':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nome':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, selectedCategory, selectedSize, selectedCondition, sortBy]);

  const hasActiveFilters = selectedCategory !== 'Todos' || selectedSize || selectedCondition || search;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/30 py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up">
            Nossos Produtos
          </h1>
          <p className="text-muted-foreground max-w-2xl animate-fade-up" style={{ animationDelay: '100ms' }}>
            Explore nossa coleção de peças vintage selecionadas. Cada item foi cuidadosamente escolhido 
            para trazer estilo e história ao seu guarda-roupa.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-card border-border"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <Select value={selectedCategory} onValueChange={(v) => updateFilter('categoria', v)}>
                <SelectTrigger className="w-[180px] bg-card">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSize || "all"} onValueChange={(v) => updateFilter('tamanho', v === "all" ? "" : v)}>
                <SelectTrigger className="w-[140px] bg-card">
                  <SelectValue placeholder="Tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition || "all"} onValueChange={(v) => updateFilter('condicao', v === "all" ? "" : v)}>
                <SelectTrigger className="w-[160px] bg-card">
                  <SelectValue placeholder="Condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {conditions.map(c => (
                    <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => updateFilter('ordenar', v)}>
                <SelectTrigger className="w-[180px] bg-card">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevância</SelectItem>
                  <SelectItem value="preco-menor">Menor preço</SelectItem>
                  <SelectItem value="preco-maior">Maior preço</SelectItem>
                  <SelectItem value="nome">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                  <X className="w-4 h-4 mr-2" />
                  Limpar
                </Button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-8 p-4 bg-card rounded-xl border border-border animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Filtros</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar tudo
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Select value={selectedCategory} onValueChange={(v) => updateFilter('categoria', v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSize || "all"} onValueChange={(v) => updateFilter('tamanho', v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCondition || "all"} onValueChange={(v) => updateFilter('condicao', v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {conditions.map(c => (
                      <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(v) => updateFilter('ordenar', v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevância</SelectItem>
                    <SelectItem value="preco-menor">Menor preço</SelectItem>
                    <SelectItem value="preco-maior">Maior preço</SelectItem>
                    <SelectItem value="nome">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto" />
              <p className="text-muted-foreground mt-4">Carregando produtos...</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </section>
    </Layout>
  );
}
