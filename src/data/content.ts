export const WHATSAPP_NUMBER = '554738045222'

export const homeHighlights = [
  {
    title: 'Great Beer',
    description:
      'Taps com rótulos clássicos das escolas inglesa, irlandesa, belga, alemã e holandesa. Sempre há algo novo nos taps.',
  },
  {
    title: 'Great Food',
    description:
      'Gastronomia de pub europeu: fish & chips, burgers autorais, petiscos para dividir e receitas exclusivas da casa.',
  },
  {
    title: 'Great Sports',
    description:
      'Telões dedicados 100% a esportes. Quem chega primeiro escolhe o jogo, reúne a torcida e vibra à vontade.',
  },
  {
    title: 'Great Music',
    description:
      'Som ambiente celta e rock’n’roll no térreo, música ao vivo no mezzanino de quinta a sábado com bandas regionais.',
  },
]

export const hallOfFame = [
  {
    name: 'IRINEU',
    score: '13 Pints',
    image:
      'https://cloverpub.com.br/wp-content/smush-webp/2025/10/irineu-13-pint-768x1024.jpg.webp',
  },
  {
    name: 'JAYNE',
    score: '14 Pints',
    image:
      'https://cloverpub.com.br/wp-content/smush-webp/2025/10/Jayne-14-pint-768x1024.jpg.webp',
  },
  {
    name: 'ANDERSON',
    score: '12 Pints',
    image:
      'https://cloverpub.com.br/wp-content/smush-webp/2025/10/anderson-12-pint-768x1024.jpg.webp',
  },
]

export const beerStyles = [
  {
    name: 'IPA',
    description: 'Amargor marcante, final cítrico e aroma de lúpulos nobres.',
    image: 'https://cloverpub.com.br/wp-content/smush-webp/2025/04/Ipa-281x300.png.webp',
  },
  {
    name: 'Weiss',
    description: 'Trigo alemão, notas de banana e cravo para refrescar.',
    image: 'https://cloverpub.com.br/wp-content/smush-webp/2025/04/Weiss-281x300.png.webp',
  },
  {
    name: 'Belgian',
    description: 'Fermentação belga com especiarias e doçura equilibrada.',
    image: 'https://cloverpub.com.br/wp-content/smush-webp/2025/04/Belgian-281x300.png.webp',
  },
  {
    name: 'Pilsen',
    description: 'Clássica, dourada e super refrescante para qualquer ocasião.',
    image: 'https://cloverpub.com.br/wp-content/smush-webp/2025/04/pilsen-281x300.png.webp',
  },
  {
    name: 'Stout',
    description: 'Escura e cremosa, com notas de café e chocolate.',
    image: 'https://cloverpub.com.br/wp-content/smush-webp/2025/04/Stout-281x300.png.webp',
  },
]

export const menuImages = [
  'https://cloverpub.com.br/wp-content/smush-webp/2025/03/Imagem-do-WhatsApp-de-2025-10-21-as-16.14.43_ac5e13eb.jpg.webp',
  'https://cloverpub.com.br/wp-content/smush-webp/2025/03/Imagem-do-WhatsApp-de-2025-10-21-as-16.14.43_f3810eca.jpg.webp',
  'https://cloverpub.com.br/wp-content/smush-webp/2025/03/Imagem-do-WhatsApp-de-2025-10-21-as-16.16.31_815fd2a2.jpg.webp',
  'https://cloverpub.com.br/wp-content/smush-webp/2025/03/Imagem-do-WhatsApp-de-2025-10-21-as-16.16.31_667d9267.jpg.webp',
]

export const eventResources = [
  {
    title: '60 lugares em mesas',
    description: 'Monte confraternizações corporativas ou aniversários com serviço completo.',
  },
  {
    title: 'Auditório para 50 pessoas',
    description: 'Formato palestra com estrutura de cadeiras, palco e apoio técnico.',
  },
  {
    title: 'Palco para apresentações',
    description: 'Som dedicado e espaço pronto para shows, stand-ups ou DJs convidados.',
  },
  {
    title: 'Projetor + tela 80"',
    description: 'Perfeito para demonstrar produtos, premiações ou assistir aos grandes jogos.',
  },
  {
    title: 'Cardápio personalizável',
    description: 'Selecione previamente bebidas e pratos que farão parte da sua celebração.',
  },
]

export const recruitmentHighlights = [
  'Time apaixonado por hospitalidade e cultura cervejeira.',
  'Programação semanal com música ao vivo e eventos especiais.',
  'Ambiente criativo para sugerir novos pratos, drinks e ativações.',
  'Escala organizada, capacitações internas e benefícios progressivos.',
]

export const contactInfo = {
  hours: 'Aberto de segunda a sábado — das 18h às 24h',
  phoneLabel: '(47) 3804-5222',
  phoneHref: 'tel:4738045222',
  addressLabel: 'Rua Otto Boehm – 356 · Joinville · SC',
  mapsHref:
    'https://www.google.com/maps/dir/?api=1&destination=R.+Otto+Boehm,+356+-+América,+Joinville+-+SC,+89201-700',
}

export type MenuItem = {
  name: string
  description: string
  price: number | string
  image?: string
}

export type MenuCategory = {
  id: string
  name: string
  headerImage?: string
  items: MenuItem[]
  subcategories?: {
    id: string
    name: string
    items: MenuItem[]
  }[]
}

// Placeholder image function - can be replaced with actual images later
const getItemImage = (_category: string, itemName: string): string => {
  // For now, using placeholder. In production, these would be actual image URLs
  return `https://via.placeholder.com/300x200/1f7a50/c6a15b?text=${encodeURIComponent(itemName)}`
}

const getCategoryHeaderImage = (categoryName: string): string => {
  // Placeholder for category header images
  return `https://via.placeholder.com/800x300/134a32/c6a15b?text=${encodeURIComponent(categoryName)}`
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'sobremesas',
    name: 'SOBREMESAS',
    headerImage: getCategoryHeaderImage('SOBREMESAS'),
    items: [
      {
        name: 'Petit Gâteau',
        description:
          'Petit Gâteau de chocolate com casquinha crocante por fora e recheio quente e cremoso por dentro. Servido com uma bola de sorvete de creme e farofa crocante de amendoim.',
        price: 29,
        image: getItemImage('sobremesas', 'Petit Gâteau'),
      },
      {
        name: 'Sorvete Dark Ganache',
        description: 'Sorvete de creme, coberto com uma generosa camada de ganache de chocolate.',
        price: 20,
        image: getItemImage('sobremesas', 'Sorvete Dark Ganache'),
      },
      {
        name: 'Sorvete Red Berries',
        description:
          'Sorvete de creme servido com calda artesanal de frutas vermelhas, levemente ácida e refrescante.',
        price: 20,
        image: getItemImage('sobremesas', 'Sorvete Red Berries'),
      },
      {
        name: 'Churros',
        description:
          '10un. mini churros crocantes e dourados, polvilhados com açúcar e canela, com doce de leite cremoso.',
        price: 20,
        image: getItemImage('sobremesas', 'Churros'),
      },
    ],
  },
  {
    id: 'petiscos',
    name: 'PETISCOS',
    headerImage: getCategoryHeaderImage('PETISCOS'),
    items: [
      {
        name: 'Bacon Strips',
        description: 'Tiras crocantes de bacon defumado.',
        price: 13,
        image: getItemImage('petiscos', 'Bacon Strips'),
      },
      {
        name: 'Torresmo',
        description: 'Panceta suína preparada na hora.',
        price: 18,
        image: getItemImage('petiscos', 'Torresmo'),
      },
      {
        name: 'Queijo Coalho',
        description: 'Queijo coalho, Mel e Tomilho.',
        price: 29,
        image: getItemImage('petiscos', 'Queijo Coalho'),
      },
      {
        name: 'Amendoim',
        description: 'Escolha entre: Sem casca, Apimentado ou Salsa.',
        price: 5,
        image: getItemImage('petiscos', 'Amendoim'),
      },
    ],
  },
  {
    id: 'entradas',
    name: 'ENTRADAS',
    headerImage: getCategoryHeaderImage('ENTRADAS'),
    items: [
      {
        name: 'Mini Burgers',
        description:
          '6 un. Mini Burgers de 50g cada: 2 un. Tradicional, 2 un. Bacon Mayo e 2 un. Gorgonzola.',
        price: 90,
        image: getItemImage('entradas', 'Mini Burgers'),
      },
      {
        name: 'Fish and Chips',
        description:
          'Clássico inglês com 300g peixe branco empanado na cerveja, batatas e molho tártaro.',
        price: 90,
        image: getItemImage('entradas', 'Fish and Chips'),
      },
      {
        name: 'Hackepeter',
        description:
          '300g de mignon cru, picles, alcaparras, cebola roxa, cebolinha, salinha, páprica e ovo.',
        price: 120,
        image: getItemImage('entradas', 'Hackepeter'),
      },
      {
        name: 'Beef and Bread',
        description: '400g de tiras de mignon, pão caseiro, molho barbecue e maionese caseira.',
        price: 115,
        image: getItemImage('entradas', 'Beef and Bread'),
      },
      {
        name: "King's Chicken Fingers",
        description: '500g de frango empanado acompanhado de molho Clover Spicy.',
        price: 55,
        image: getItemImage('entradas', "King's Chicken Fingers"),
      },
      {
        name: 'Triple Sausages',
        description:
          '300g de salsichas típicas germânicas acompanhadas de pão caseiro e maionese caseira.',
        price: 65,
        image: getItemImage('entradas', 'Triple Sausages'),
      },
      {
        name: 'Bolinho de Carne',
        description:
          '8un. dos clássicos bolinhos de carne do Clover com tempero da casa. (sem glúten)',
        price: 65,
        image: getItemImage('entradas', 'Bolinho de Carne'),
      },
      {
        name: 'Batatas Fritas',
        description: 'As clássicas batatas fritas do Clover, acompanhadas de maionese caseira.',
        price: 45,
        image: getItemImage('entradas', 'Batatas Fritas'),
      },
      {
        name: 'Batatas Supreme',
        description: 'Batatas fritas com creme de cheddar do Clover e bacon crocante.',
        price: 60,
        image: getItemImage('entradas', 'Batatas Supreme'),
      },
      {
        name: 'Bruschetta',
        description: 'Tomate comit, manjericão, parmesão e pesto.',
        price: 39,
        image: getItemImage('entradas', 'Bruschetta'),
      },
    ],
  },
  {
    id: 'burgers',
    name: 'BURGERS',
    headerImage: getCategoryHeaderImage('BURGERS'),
    items: [
      {
        name: 'Tradicional',
        description: 'Com alface, tomate, mussarela, ketchup e maionese.',
        price: 49,
        image: getItemImage('burgers', 'Tradicional'),
      },
      {
        name: 'English Bacon',
        description: 'Com alface, tomate, cheddar e bacon mayo.',
        price: 55,
        image: getItemImage('burgers', 'English Bacon'),
      },
      {
        name: 'Catupiry Empanado',
        description:
          'Crocante e cremoso catupiry empanado, tomate seco caseiro, molho rosé e crumbs de bacon.',
        price: 69,
        image: getItemImage('burgers', 'Catupiry Empanado'),
      },
      {
        name: 'Gorgonzola Cream',
        description: 'Com alface, cebola roxa, creme de gorgonzola Clover e maionese caseira.',
        price: 56,
        image: getItemImage('burgers', 'Gorgonzola Cream'),
      },
      {
        name: 'Hot Chicken',
        description: 'Burger de frango e aveia, com molho Clover Spicy, alface e cebola roxa.',
        price: 49,
        image: getItemImage('burgers', 'Hot Chicken'),
      },
      {
        name: 'Veggie',
        description:
          'Burger de grão de bico, quinoa, linhaça e mandioca com cebola roxa, alface, tomate, ketchup e maionese. (vegetariano)',
        price: 56,
        image: getItemImage('burgers', 'Veggie'),
      },
      {
        name: 'Smoked Provoleta',
        description: 'Generoso provolone defumado, chimichurri fresco e tomate grelhado.',
        price: 62,
        image: getItemImage('burgers', 'Smoked Provoleta'),
      },
      {
        name: 'Kids Burgers',
        description:
          '2 un Mini Burger de 50g, com queijo mussarela e pão. Acompanha Batatas Fritas e Ketchup.',
        price: 40,
        image: getItemImage('burgers', 'Kids Burgers'),
      },
    ],
  },
  {
    id: 'carnes-e-pratos',
    name: 'CARNES E PRATOS',
    headerImage: getCategoryHeaderImage('CARNES E PRATOS'),
    items: [
      {
        name: 'Entrecôte',
        description: '300g de entrecôte grelhado. Acompanha batatas rústicas e salada.',
        price: 99,
        image: getItemImage('carnes-e-pratos', 'Entrecôte'),
      },
      {
        name: 'Mignon Mustard',
        description: '300g de medalhões de mignon ao molho mustard. Acompanha batatas rústicas e salada.',
        price: 95,
        image: getItemImage('carnes-e-pratos', 'Mignon Mustard'),
      },
      {
        name: 'Salada',
        description: 'Mix de americano, pepino, tomate cereja e croutons de pão caseiro.',
        price: 33,
        image: getItemImage('carnes-e-pratos', 'Salada'),
      },
      {
        name: 'Currywurst',
        description: 'Prato típico alemão com salsichas brancas germânicas, batatas fritas e molho curry.',
        price: 51,
        image: getItemImage('carnes-e-pratos', 'Currywurst'),
      },
      {
        name: 'Irish Breakfast',
        description: 'Prato típico irlandês com bacon, linguiça, ovo, pão caseiro e tomate.',
        price: 52,
        image: getItemImage('carnes-e-pratos', 'Irish Breakfast'),
      },
    ],
  },
  {
    id: 'drinks-sem-alcool',
    name: 'DRINKS SEM ÁLCOOL',
    headerImage: getCategoryHeaderImage('DRINKS SEM ÁLCOOL'),
    items: [
      {
        name: 'Piña Desejada *',
        description: 'Suco de abacaxi, Leite de coco e Leite condensado.',
        price: 26,
        image: getItemImage('drinks-sem-alcool', 'Piña Desejada'),
      },
      {
        name: 'No Sex on the Beach *',
        description: 'Suco de laranja e Morango de morango.',
        price: 26,
        image: getItemImage('drinks-sem-alcool', 'No Sex on the Beach'),
      },
      {
        name: 'Pink Lemonade',
        description: 'Limão siciliano, Morango framboesa e Água mineral.',
        price: 26,
        image: getItemImage('drinks-sem-alcool', 'Pink Lemonade'),
      },
    ],
  },
  {
    id: 'soda-italiana',
    name: 'SODA ITALIANA (473 ML)',
    headerImage: getCategoryHeaderImage('SODA ITALIANA'),
    items: [
      {
        name: 'Framboesa',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Framboesa'),
      },
      {
        name: 'Morango',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Morango'),
      },
      {
        name: 'Kiwi',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Kiwi'),
      },
      {
        name: 'Maçã Verde',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Maçã Verde'),
      },
      {
        name: 'Cranberry',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Cranberry'),
      },
      {
        name: 'Limão Siciliano',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Limão Siciliano'),
      },
      {
        name: 'Melão',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Melão'),
      },
      {
        name: 'Mirtilo',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Mirtilo'),
      },
      {
        name: 'Melancia',
        description: '',
        price: 23,
        image: getItemImage('soda-italiana', 'Melancia'),
      },
    ],
  },
  {
    id: 'outras-bebidas',
    name: 'OUTRAS BEBIDAS',
    headerImage: getCategoryHeaderImage('OUTRAS BEBIDAS'),
    items: [
      {
        name: 'Suco Laranja Int. 300 ml',
        description: '',
        price: 13,
        image: getItemImage('outras-bebidas', 'Suco Laranja'),
      },
      {
        name: 'Suco Uva Int. 300 ml',
        description: '',
        price: 13,
        image: getItemImage('outras-bebidas', 'Suco Uva'),
      },
      {
        name: 'Suco Maracujá Int. 300 ml',
        description: '',
        price: 13,
        image: getItemImage('outras-bebidas', 'Suco Maracujá'),
      },
      {
        name: 'Água com Gás',
        description: '',
        price: 7,
        image: getItemImage('outras-bebidas', 'Água com Gás'),
      },
      {
        name: 'Água sem Gás',
        description: '',
        price: 7,
        image: getItemImage('outras-bebidas', 'Água sem Gás'),
      },
      {
        name: 'Coca-Cola 220 ml',
        description: '',
        price: 8,
        image: getItemImage('outras-bebidas', 'Coca-Cola'),
      },
      {
        name: 'Tônica / Tônica Zero',
        description: '',
        price: 8,
        image: getItemImage('outras-bebidas', 'Tônica'),
      },
      {
        name: 'Guaraná',
        description: '',
        price: 8,
        image: getItemImage('outras-bebidas', 'Guaraná'),
      },
      {
        name: 'Sprite',
        description: '',
        price: 8,
        image: getItemImage('outras-bebidas', 'Sprite'),
      },
      {
        name: 'Red Bull',
        description: '',
        price: 20,
        image: getItemImage('outras-bebidas', 'Red Bull'),
      },
      {
        name: 'Red Bull Tropical',
        description: '',
        price: 20,
        image: getItemImage('outras-bebidas', 'Red Bull Tropical'),
      },
      {
        name: 'Red Bull sem Açúcar',
        description: '',
        price: 20,
        image: getItemImage('outras-bebidas', 'Red Bull sem Açúcar'),
      },
      {
        name: 'Lager Schornstein 355 ml',
        description: '',
        price: 15,
        image: getItemImage('outras-bebidas', 'Lager Schornstein'),
      },
      {
        name: 'Heineken Zero 355 ml',
        description: '',
        price: 15,
        image: getItemImage('outras-bebidas', 'Heineken Zero'),
      },
      {
        name: 'Café Expresso Starbucks',
        description: '',
        price: 6,
        image: getItemImage('outras-bebidas', 'Café Expresso'),
      },
    ],
  },
  {
    id: 'cervejas-no-tap',
    name: 'CERVEJAS NO TAP',
    headerImage: getCategoryHeaderImage('CERVEJAS NO TAP'),
    items: [
      {
        name: 'PILSEN',
        description: 'ABV 4,2% - IBU 10',
        price: '-',
        image: getItemImage('cervejas-no-tap', 'PILSEN'),
      },
      {
        name: 'BELGIAN - Clover Pub',
        description: 'ABV 5,2% - IBU 21 Golden Generation',
        price: '-',
        image: getItemImage('cervejas-no-tap', 'BELGIAN'),
      },
      {
        name: 'IPA - Clover Pub',
        description: 'ABV 5,9% - IBU 60 Hops United',
        price: '-',
        image: getItemImage('cervejas-no-tap', 'IPA'),
      },
      {
        name: 'STOUT',
        description: 'ABV 5,0% - IBU 20',
        price: '-',
        image: getItemImage('cervejas-no-tap', 'STOUT'),
      },
    ],
  },
  {
    id: 'gintonica',
    name: 'GINTÔNICA',
    headerImage: getCategoryHeaderImage('GINTÔNICA'),
    items: [
      {
        name: 'Limão Siciliano',
        description: 'Gin, Tônica e Limão siciliano.',
        price: 38,
        image: getItemImage('gintonica', 'Limão Siciliano'),
      },
      {
        name: 'Laranja e Hibisco',
        description: 'Gin, Tônica, Laranja e Flor de hibisco.',
        price: 43,
        image: getItemImage('gintonica', 'Laranja e Hibisco'),
      },
      {
        name: 'Wine Gin',
        description: 'Gin, Tônica, Vinho e Espuma de gengibre.',
        price: 46,
        image: getItemImage('gintonica', 'Wine Gin'),
      },
      {
        name: 'Gin Tropical',
        description: 'Gin, Red Bull Tropical e Laranja.',
        price: 47,
        image: getItemImage('gintonica', 'Gin Tropical'),
      },
    ],
  },
  {
    id: 'caipirinhas',
    name: 'CAIPIRINHAS*',
    headerImage: getCategoryHeaderImage('CAIPIRINHAS'),
    items: [
      {
        name: 'Steinhaeger',
        description: '',
        price: 29,
        image: getItemImage('caipirinhas', 'Steinhaeger'),
      },
      {
        name: 'Cachaça Ouro',
        description: '',
        price: 28,
        image: getItemImage('caipirinhas', 'Cachaça Ouro'),
      },
      {
        name: 'Sake',
        description: '',
        price: 29,
        image: getItemImage('caipirinhas', 'Sake'),
      },
      {
        name: 'Jägermeister 40',
        description: '',
        price: 29,
        image: getItemImage('caipirinhas', 'Jägermeister 40'),
      },
      {
        name: 'Smirnoff 30',
        description: '',
        price: 30,
        image: getItemImage('caipirinhas', 'Smirnoff 30'),
      },
      {
        name: 'Cachaça Prata',
        description: '',
        price: 28,
        image: getItemImage('caipirinhas', 'Cachaça Prata'),
      },
      {
        name: 'Absolut 37',
        description: '',
        price: 37,
        image: getItemImage('caipirinhas', 'Absolut 37'),
      },
      {
        name: 'Morango +7 Limão *20',
        description: '',
        price: '+7 / +20',
        image: getItemImage('caipirinhas', 'Morango Limão'),
      },
    ],
  },
  {
    id: 'negroni',
    name: 'NEGRONI',
    headerImage: getCategoryHeaderImage('NEGRONI'),
    items: [
      {
        name: 'Cherry Negroni',
        description: 'Gin, Campari, Vermouth Rosso e Cereja Amara.',
        price: 42,
        image: getItemImage('negroni', 'Cherry Negroni'),
      },
      {
        name: 'Coffee Negroni',
        description: 'Gin, Campari, Vermouth Rosso e Café Expresso.',
        price: 42,
        image: getItemImage('negroni', 'Coffee Negroni'),
      },
      {
        name: 'Morangoni',
        description: 'Gin, Campari, Vermouth Rosso e Morango.',
        price: 42,
        image: getItemImage('negroni', 'Morangoni'),
      },
      {
        name: 'Negroni',
        description: 'Gin, Campari e Vermouth Rosso.',
        price: 39,
        image: getItemImage('negroni', 'Negroni'),
      },
      {
        name: 'Negroni Sour',
        description: 'Gin, Campari, Vermouth Rosso, Limão siciliano e Clara de ovo.',
        price: 45,
        image: getItemImage('negroni', 'Negroni Sour'),
      },
      {
        name: 'Negroni Speciale',
        description: 'Gin Bulldog, Campari e Vermouth 1757.',
        price: 57,
        image: getItemImage('negroni', 'Negroni Speciale'),
      },
    ],
  },
  {
    id: 'drinks-classicos',
    name: 'DRINKS CLÁSSICOS',
    headerImage: getCategoryHeaderImage('DRINKS CLÁSSICOS'),
    items: [
      {
        name: 'Amaretto Sour',
        description: 'Amaretto, Limão e Clara de ovo.',
        price: 42,
        image: getItemImage('drinks-classicos', 'Amaretto Sour'),
      },
      {
        name: 'Jameson, Amaretto, Limão e Clara de ovo.',
        description: '',
        price: 37,
        image: getItemImage('drinks-classicos', 'Jameson Amaretto'),
      },
      {
        name: 'Aperol Spritz *',
        description: 'Aperol, Espumante brut, Água com gás e Laranja.',
        price: 37,
        image: getItemImage('drinks-classicos', 'Aperol Spritz'),
      },
      {
        name: 'Boulevardier',
        description: 'Bourbon, Vermouth Rosso e Campari.',
        price: 40,
        image: getItemImage('drinks-classicos', 'Boulevardier'),
      },
      {
        name: 'Bramble',
        description: 'Gin, Limão siciliano e Monin de framboesa.',
        price: 38,
        image: getItemImage('drinks-classicos', 'Bramble'),
      },
      {
        name: 'Clover Club',
        description: 'Gin, Limão siciliano, Monin de framboesa e Clara de ovo.',
        price: 39,
        image: getItemImage('drinks-classicos', 'Clover Club'),
      },
      {
        name: 'Cosmopolitan',
        description: 'Vodka, Monin de cranberry, Limão siciliano e Licor de laranja.',
        price: 39,
        image: getItemImage('drinks-classicos', 'Cosmopolitan'),
      },
      {
        name: 'Cuba Smirnoff *',
        description: 'Smirnoff e Coca-Cola.',
        price: 29,
        image: getItemImage('drinks-classicos', 'Cuba Smirnoff'),
      },
      {
        name: 'Fitzgerald',
        description: 'Gin, Limão siciliano, Xarope de açúcar e Angostura.',
        price: 40,
        image: getItemImage('drinks-classicos', 'Fitzgerald'),
      },
      {
        name: 'Jack & Coke',
        description: "Jack Daniel's e Coca-Cola.",
        price: 39,
        image: getItemImage('drinks-classicos', 'Jack & Coke'),
      },
      {
        name: 'Margarita',
        description: 'Tequila, Limão, Licor de laranja, Xarope de açúcar e Sal.',
        price: 42,
        image: getItemImage('drinks-classicos', 'Margarita'),
      },
      {
        name: 'Mojito',
        description: 'Rum, Limão, Hortelã, Xarope de açúcar e Água com gás.',
        price: 33,
        image: getItemImage('drinks-classicos', 'Mojito'),
      },
      {
        name: 'Moscow Mule *',
        description: 'Vodka, Limão, Espuma de gengibre, Açúcar e Angostura.',
        price: 40,
        image: getItemImage('drinks-classicos', 'Moscow Mule'),
      },
      {
        name: 'Old Fashioned',
        description: 'Bourbon, Angostura, Laranja e Cereja Amara.',
        price: 40,
        image: getItemImage('drinks-classicos', 'Old Fashioned'),
      },
      {
        name: 'Piña Colada',
        description: 'Rum, Leite de coco, Suco de abacaxi e Leite condensado.',
        price: 36,
        image: getItemImage('drinks-classicos', 'Piña Colada'),
      },
      {
        name: 'Whisky Sour',
        description: 'Jim Beam, Limão siciliano e Clara de ovo.',
        price: 40,
        image: getItemImage('drinks-classicos', 'Whisky Sour'),
      },
    ],
  },
  {
    id: 'drinks-autorais',
    name: 'DRINKS AUTORAIS',
    headerImage: getCategoryHeaderImage('DRINKS AUTORAIS'),
    items: [
      {
        name: 'Cherry Amaretto',
        description: 'Jameson, Amaretto, Limão, Cereja amara e Clara de ovo.',
        price: 43,
        image: getItemImage('drinks-autorais', 'Cherry Amaretto'),
      },
      {
        name: 'Clover Cuba *',
        description: 'Rum, Licor de laranja e Coca-Cola.',
        price: 38,
        image: getItemImage('drinks-autorais', 'Clover Cuba'),
      },
      {
        name: 'Jardim do Éden',
        description: 'Jack Apple, Hortelã, Xarope de açúcar e Limão.',
        price: 38,
        image: getItemImage('drinks-autorais', 'Jardim do Éden'),
      },
      {
        name: 'Mr. Beam',
        description: 'Bourbon, Amora, Limão siciliano e Monin de framboesa.',
        price: 39,
        image: getItemImage('drinks-autorais', 'Mr. Beam'),
      },
      {
        name: 'Red Bahamas',
        description: 'Rum, Morango, Hortelã, Xarope de açúcar e Limão.',
        price: 42,
        image: getItemImage('drinks-autorais', 'Red Bahamas'),
      },
      {
        name: 'Sir Ginger',
        description: 'Gin, Monin de toranja, Limão siciliano e Espuma de gengibre.',
        price: 40,
        image: getItemImage('drinks-autorais', 'Sir Ginger'),
      },
    ],
  },
  {
    id: 'drinks-premium',
    name: 'DRINKS PREMIUM',
    headerImage: getCategoryHeaderImage('DRINKS PREMIUM'),
    items: [
      {
        name: 'Blackberry Margarita',
        description: 'Amora, Limão, Hortelã, Tequila, Licor de laranja e Sal.',
        price: 57,
        image: getItemImage('drinks-premium', 'Blackberry Margarita'),
      },
      {
        name: 'Kentucky Boulevardier',
        description: 'Buffalo Trace, Campari e Vermouth 1757.',
        price: 60,
        image: getItemImage('drinks-premium', 'Kentucky Boulevardier'),
      },
      {
        name: 'Cuba Zacapa 23',
        description: 'Rum Zacapa 23 e Coca-Cola.',
        price: 70,
        image: getItemImage('drinks-premium', 'Cuba Zacapa 23'),
      },
      {
        name: 'Jager Bomb',
        description: 'Jägermeister, Limão siciliano e Red Bull.',
        price: 50,
        image: getItemImage('drinks-premium', 'Jager Bomb'),
      },
    ],
  },
  {
    id: 'doses-whiskey',
    name: 'DOSES WHISKEY (60ML)',
    headerImage: getCategoryHeaderImage('DOSES WHISKEY'),
    items: [
      {
        name: "Jack Daniel's",
        description: '',
        price: 32,
        image: getItemImage('doses-whiskey', "Jack Daniel's"),
      },
      {
        name: 'Jack Honey',
        description: '',
        price: 32,
        image: getItemImage('doses-whiskey', 'Jack Honey'),
      },
      {
        name: 'Jack Apple',
        description: '',
        price: 32,
        image: getItemImage('doses-whiskey', 'Jack Apple'),
      },
      {
        name: 'Fireball',
        description: '',
        price: 32,
        image: getItemImage('doses-whiskey', 'Fireball'),
      },
      {
        name: 'Jameson',
        description: '',
        price: 28,
        image: getItemImage('doses-whiskey', 'Jameson'),
      },
      {
        name: 'Jim Beam',
        description: '',
        price: 32,
        image: getItemImage('doses-whiskey', 'Jim Beam'),
      },
    ],
  },
  {
    id: 'whiskey-premium',
    name: 'WHISKEY PREMIUM (50ML)',
    headerImage: getCategoryHeaderImage('WHISKEY PREMIUM'),
    items: [
      {
        name: 'Jack Single Barrel',
        description: '',
        price: 45,
        image: getItemImage('whiskey-premium', 'Jack Single Barrel'),
      },
      {
        name: 'Glenlivet 12 Founders',
        description: '',
        price: 58,
        image: getItemImage('whiskey-premium', 'Glenlivet 12'),
      },
      {
        name: 'Glenlivet 18',
        description: '',
        price: 115,
        image: getItemImage('whiskey-premium', 'Glenlivet 18'),
      },
      {
        name: 'Glenfiddich 12',
        description: '',
        price: 56,
        image: getItemImage('whiskey-premium', 'Glenfiddich 12'),
      },
      {
        name: 'Glenfiddich 15',
        description: '',
        price: 74,
        image: getItemImage('whiskey-premium', 'Glenfiddich 15'),
      },
      {
        name: 'Glenfiddich 18',
        description: '',
        price: 130,
        image: getItemImage('whiskey-premium', 'Glenfiddich 18'),
      },
      {
        name: 'Macallan 12',
        description: '',
        price: 150,
        image: getItemImage('whiskey-premium', 'Macallan 12'),
      },
    ],
  },
  {
    id: 'outras-doses',
    name: 'OUTRAS DOSES (60ML)',
    headerImage: getCategoryHeaderImage('OUTRAS DOSES'),
    items: [
      {
        name: 'Campari',
        description: '',
        price: 16,
        image: getItemImage('outras-doses', 'Campari'),
      },
      {
        name: 'Licor Baileys',
        description: '',
        price: 28,
        image: getItemImage('outras-doses', 'Licor Baileys'),
      },
      {
        name: 'Licor Jägermeister',
        description: '',
        price: 26,
        image: getItemImage('outras-doses', 'Licor Jägermeister'),
      },
      {
        name: 'Licor 43',
        description: '',
        price: 33,
        image: getItemImage('outras-doses', 'Licor 43'),
      },
      {
        name: 'Licor Amaretto',
        description: '',
        price: 21,
        image: getItemImage('outras-doses', 'Licor Amaretto'),
      },
      {
        name: 'Tequila Premium',
        description: '',
        price: 30,
        image: getItemImage('outras-doses', 'Tequila Premium'),
      },
      {
        name: 'Steinhaeger',
        description: '',
        price: 15,
        image: getItemImage('outras-doses', 'Steinhaeger'),
      },
      {
        name: 'Havana 3',
        description: '',
        price: 23,
        image: getItemImage('outras-doses', 'Havana 3'),
      },
      {
        name: 'Havana 7',
        description: '',
        price: 38,
        image: getItemImage('outras-doses', 'Havana 7'),
      },
      {
        name: 'Zacapa 23',
        description: '',
        price: 68,
        image: getItemImage('outras-doses', 'Zacapa 23'),
      },
    ],
  },
]

