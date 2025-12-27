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

// Hall of Fame data is now stored in Firebase
// Use the import script (npm run import-hall-of-fame) to populate Firebase from a backup if needed

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

// Menu data is now stored in Firebase
// Use the import script (npm run import-menu) to populate Firebase from a backup if needed
// The menuCategories array has been removed - all menu data is fetched from Firebase via useMenuItems hook
