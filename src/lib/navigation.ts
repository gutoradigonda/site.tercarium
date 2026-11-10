export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_LINKS: NavSection[] = [
  {
    title: 'Terços & Linhas',
    items: [
      { label: 'Linha Raízes', href: '/linha/raizes' },
      { label: 'Linha Fidelis', href: '/linha/fidelis' },
      { label: 'Linha Essência', href: '/linha/essencia' },
    ],
  },
  {
    title: 'Acessórios',
    items: [
      { label: 'Dezenas', href: '/acessorios/dezena' },
      { label: 'Cordões', href: '/acessorios/cordoes' },
    ],
  },
  {
    title: 'Coleções Especiais',
    items: [
      { label: 'São Bento', href: '/linha/colecao-sao-bento' },
      { label: 'São Miguel Arcanjo', href: '/linha/colecao-sao-miguel' },
    ],
  },
];