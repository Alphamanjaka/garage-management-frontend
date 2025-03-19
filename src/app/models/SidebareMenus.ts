export const SidebareMenus = {
    ADMIN: [
      { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard' },
      { routeLink: 'employee-mgmt', icon: 'fal fa-box-open', label: 'Gestion employé' },
      { routeLink: 'stock-mgmt', icon: 'fal fa-cog', label: 'Gestion pièce' },
    ],
    EMPLOYE: [
      { routeLink: 'page1', icon: 'fal fa-home', label: 'Dashboard' },
      { routeLink: 'page2', icon: 'fal fa-box-open', label: 'Products' },
      { routeLink: 'page3', icon: 'fal fa-file', label: 'Pages' },
      { routeLink: 'page4', icon: 'fal fa-cog', label: 'Settings' },
    ],
  } as const;