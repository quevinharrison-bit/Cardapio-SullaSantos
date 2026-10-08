// Dados padrão da Confeitaria (Factory Defaults)

export const DEFAULT_STORE = {
  name: "Ateliê Fleur de Sucre",
  slogan: "Confeitaria artesanal elegante, momentos doces e inesquecíveis",
  bio: "Bolos festivos, fatias gourmet, brigadeiros artesanais e salgados sob encomenda. Faça seu pedido online!",
  whatsapp: "5511999998888",
  logoUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80",
  address: "Rua das Camélias, 142 - Bairro Jardim, São Paulo - SP",
  deliveryFee: 8.50,
  isOpen: true,
  adminPin: "1234",
  hours: "Terça a Sábado: 09h às 19h | Domingo: 09h às 14h"
};

export const DEFAULT_CATEGORIES = [
  { id: "bolos-festivos", name: "Bolos Festivos", icon: "cake", active: true },
  { id: "fatias-gourmet", name: "Fatias Gourmet", icon: "pie-chart", active: true },
  { id: "brigadeiros", name: "Brigadeiros & Docinhos", icon: "heart", active: true },
  { id: "empadoes", name: "Empadões & Salgados", icon: "utensils", active: true },
  { id: "sobremesas", name: "Sobremesas Individuais", icon: "cupcake", active: true }
];

export const DEFAULT_PRODUCTS = [
  // Bolos Festivos
  {
    id: "prod-1",
    name: "Bolo Red Velvet Velour",
    categoryId: "bolos-festivos",
    description: "Massa aveludada bordô levemente achocolatada, recheio cremoso de cream cheese e coulis caseiro de frutas vermelhas.",
    portion: "1.5 kg (Serve 12 a 15 pessoas)",
    price: 148.00,
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "Bolo Leite Ninho com Morangos",
    categoryId: "bolos-festivos",
    description: "Pão de ló macio de baunilha, recheio generoso de brigadeiro gourmet de Leite Ninho com morangos frescos e raspas de chocolate branco.",
    portion: "1.8 kg (Serve 15 a 18 pessoas)",
    price: 165.00,
    imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Bolo Trufado Cacau & Frutas Silvestres",
    categoryId: "bolos-festivos",
    description: "Bolo de cacau 70% belga com trufa intensa meio amarga, calda de vinho bordô e mirtilos frescos.",
    portion: "1.5 kg (Serve 12 a 15 pessoas)",
    price: 158.00,
    imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: false
  },

  // Fatias Gourmet
  {
    id: "prod-4",
    name: "Fatia Red Velvet Royale",
    categoryId: "fatias-gourmet",
    description: "Fatia generosa do nosso clássico Red Velvet com cobertura cremosa, macaron de framboesa e physalis.",
    portion: "Aprox. 200g",
    price: 22.50,
    imageUrl: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-5",
    name: "Fatia Banoffee Artesanal",
    categoryId: "fatias-gourmet",
    description: "Base crocante de biscoito amanteigado, doce de leite cozido na casa, bananas fatiadas e chantilly leve com canela em pó.",
    portion: "Aprox. 190g",
    price: 19.90,
    imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-6",
    name: "Fatia Pistache & Amoras",
    categoryId: "fatias-gourmet",
    description: "Creme aveludado de pistache 100% puro com redução artesanal de amoras silvestres e massa de amêndoas.",
    portion: "Aprox. 210g",
    price: 26.00,
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: true
  },

  // Brigadeiros & Docinhos
  {
    id: "prod-7",
    name: "Caixa Sexteto Brigadeiros Gourmet",
    categoryId: "brigadeiros",
    description: "Caixa presenteável com 6 unidades: Ao Leite 54%, Pistache, Ninho com Nutella, Churros, Creme Brûlée e Frutas Vermelhas.",
    portion: "Caixa com 6 un. (150g)",
    price: 34.00,
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-8",
    name: "Coxinha de Morango com Brigadeiro Belga",
    categoryId: "brigadeiros",
    description: "Morango seleto e suculento envolto em generosa camada de brigadeiro de chocolate belga e confeitos macios.",
    portion: "Unidade (Aprox. 95g)",
    price: 14.50,
    imageUrl: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-9",
    name: "Brigadeiro Bordô de Frutas Vermelhas",
    categoryId: "brigadeiros",
    description: "Brigadeiro artesanal feito com chocolate rubi e infusão natural de amoras e morangos.",
    portion: "Unidade (Aprox. 25g)",
    price: 6.00,
    imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: false
  },

  // Empadões & Salgados
  {
    id: "prod-10",
    name: "Empadão de Frango com Requeijão Cremoso",
    categoryId: "empadoes",
    description: "Massa podre tradicional derretendo na boca, frango desfiado temperado com ervas finas e requeijão cremoso de moenda.",
    portion: "Fatia generosa (250g)",
    price: 24.50,
    imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-11",
    name: "Empadão de Camarão com Catupiry Original",
    categoryId: "empadoes",
    description: "Camarões frescos salteados no azeite de ervas, molho especial da chef e generosa camada de Catupiry.",
    portion: "Fatia generosa (250g)",
    price: 33.00,
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-12",
    name: "Quiche Folhada de Alho-Poró & Brie",
    categoryId: "empadoes",
    description: "Massa folhada artesanal com creme leve de ovos caipiras, alho-poró refogado na manteiga e lâminas de queijo brie.",
    portion: "Fatia (200g)",
    price: 23.00,
    imageUrl: "https://images.unsplash.com/photo-1554998171-7e599bc95c01?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: false
  },

  // Sobremesas Individuais
  {
    id: "prod-13",
    name: "Copo da Felicidade Velvet & Nutella",
    categoryId: "sobrenesas",
    description: "Camadas de creme Ninho, Nutella pura, cubos de bolo Red Velvet, morangos frescos e raspas de chocolate.",
    portion: "Copo de 320ml",
    price: 28.50,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-14",
    name: "Panna Cotta com Geleia Artesanal de Framboesa",
    categoryId: "sobrenesas",
    description: "Sobremesa italiana aveludada infusionada com fava de baunilha de Madagascar e cobertura de geleia bordô de framboesa.",
    portion: "Pote de vidro (180g)",
    price: 21.00,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    isFeatured: false
  }
];

export const DEFAULT_ORDERS = [
  {
    id: "PED-1001",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    customerName: "Maria Oliveira",
    customerPhone: "11988887777",
    fulfillmentMethod: "delivery", // 'delivery' ou 'pickup'
    address: "Av. Paulista, 1000 - Apt 42, Bela Vista - São Paulo/SP",
    referencePoint: "Próximo ao MASP",
    paymentMethod: "pix",
    changeFor: "",
    prefDate: "Hoje",
    prefTime: "16:30",
    notes: "Favor mandar velas de aniversário se possível!",
    items: [
      { id: "prod-1", name: "Bolo Red Velvet Velour", price: 148.00, quantity: 1, notes: "Escrever 'Parabéns Ana' na plaquinha" },
      { id: "prod-7", name: "Caixa Sexteto Brigadeiros Gourmet", price: 34.00, quantity: 1, notes: "" }
    ],
    subtotal: 182.00,
    deliveryFee: 8.50,
    total: 190.50,
    status: "em_preparo" // 'pendente', 'em_preparo', 'pronto', 'concluido', 'cancelado'
  }
];
