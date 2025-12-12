export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  size: string;
  condition: 'novo' | 'excelente' | 'bom' | 'usado';
  measurements?: {
    bust?: string;
    waist?: string;
    length?: string;
    shoulders?: string;
  };
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Blazer Vintage Tweed',
    description: 'Blazer clássico em tweed com botões dourados. Corte atemporal que combina elegância e conforto. Perfeito para looks de trabalho ou ocasiões especiais.',
    price: 189.90,
    originalPrice: 350.00,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600'],
    category: 'Casacos',
    size: 'M',
    condition: 'excelente',
    measurements: {
      bust: '96cm',
      waist: '88cm',
      length: '68cm',
      shoulders: '42cm'
    },
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Vestido Floral Anos 70',
    description: 'Vestido midi com estampa floral vibrante, típico dos anos 70. Tecido leve e fluido, perfeito para dias quentes.',
    price: 129.90,
    originalPrice: 220.00,
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600'],
    category: 'Vestidos',
    size: 'P',
    condition: 'bom',
    measurements: {
      bust: '88cm',
      waist: '72cm',
      length: '110cm'
    },
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Bolsa Couro Caramelo',
    description: 'Bolsa de couro legítimo em tom caramelo envelhecido. Design atemporal com detalhes em metal dourado.',
    price: 249.90,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'],
    category: 'Bolsas',
    size: 'Único',
    condition: 'excelente',
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Camisa Seda Champagne',
    description: 'Camisa em seda pura cor champagne. Elegante e versátil, pode ser usada em ocasiões formais ou casuais.',
    price: 159.90,
    originalPrice: 280.00,
    images: ['https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600'],
    category: 'Blusas',
    size: 'G',
    condition: 'novo',
    measurements: {
      bust: '104cm',
      length: '72cm',
      shoulders: '44cm'
    },
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Calça Pantalona Bege',
    description: 'Calça pantalona de alfaiataria em tom bege. Cintura alta e caimento impecável. Combina com tudo!',
    price: 119.90,
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600'],
    category: 'Calças',
    size: 'M',
    condition: 'excelente',
    measurements: {
      waist: '76cm',
      length: '108cm'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'Jaqueta Jeans Oversized',
    description: 'Jaqueta jeans vintage com lavagem clara e modelagem oversized. Peça curinga para qualquer guarda-roupa.',
    price: 139.90,
    originalPrice: 200.00,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'],
    category: 'Casacos',
    size: 'G',
    condition: 'bom',
    measurements: {
      bust: '112cm',
      length: '62cm',
      shoulders: '50cm'
    },
    inStock: true
  },
  {
    id: '7',
    name: 'Saia Midi Plissada',
    description: 'Saia midi plissada em tecido acetinado cor vinho. Elegante e sofisticada, perfeita para eventos.',
    price: 99.90,
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=600'],
    category: 'Saias',
    size: 'P',
    condition: 'excelente',
    measurements: {
      waist: '68cm',
      length: '75cm'
    },
    inStock: true
  },
  {
    id: '8',
    name: 'Cinto Couro Trançado',
    description: 'Cinto em couro trançado marrom escuro. Fivela em metal envelhecido. Artesanal e único.',
    price: 69.90,
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600'],
    category: 'Acessórios',
    size: 'M',
    condition: 'bom',
    inStock: true
  },
  {
    id: '9',
    name: 'Cardigan Tricô Mostarda',
    description: 'Cardigan em tricô grosso cor mostarda. Botões de madeira e bolsos frontais. Aconchegante e estiloso.',
    price: 149.90,
    originalPrice: 250.00,
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600'],
    category: 'Casacos',
    size: 'M',
    condition: 'excelente',
    measurements: {
      bust: '100cm',
      length: '65cm'
    },
    inStock: true
  },
  {
    id: '10',
    name: 'Chapéu Fedora Caramelo',
    description: 'Chapéu fedora em feltro cor caramelo. Fita decorativa em tecido. Clássico e atemporal.',
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600'],
    category: 'Acessórios',
    size: 'Único',
    condition: 'excelente',
    inStock: true
  },
  {
    id: '11',
    name: 'Blusa Renda Marfim',
    description: 'Blusa em renda delicada cor marfim. Mangas bufantes e gola alta. Romântica e feminina.',
    price: 109.90,
    images: ['https://images.unsplash.com/photo-1485968579169-a6d5e8e0a4d0?w=600'],
    category: 'Blusas',
    size: 'P',
    condition: 'novo',
    measurements: {
      bust: '90cm',
      length: '58cm'
    },
    inStock: true
  },
  {
    id: '12',
    name: 'Mocassim Couro Bordô',
    description: 'Mocassim clássico em couro bordô. Solado de borracha e forro em couro. Confortável e elegante.',
    price: 179.90,
    originalPrice: 320.00,
    images: ['https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=600'],
    category: 'Calçados',
    size: '38',
    condition: 'excelente',
    inStock: true
  }
];

export const categories = [
  'Todos',
  'Vestidos',
  'Blusas',
  'Casacos',
  'Calças',
  'Saias',
  'Bolsas',
  'Acessórios',
  'Calçados'
];

export const sizes = ['PP', 'P', 'M', 'G', 'GG', 'Único', '34', '35', '36', '37', '38', '39', '40'];

export const conditions = [
  { value: 'novo', label: 'Novo com etiqueta' },
  { value: 'excelente', label: 'Excelente estado' },
  { value: 'bom', label: 'Bom estado' },
  { value: 'usado', label: 'Usado' }
];