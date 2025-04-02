export const SidebareMenus = {
    ADMIN: [
      { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard' },
      { routeLink: 'employee-mgmt', icon: 'fal fa-box-open', label: 'Gestion employé' },
      { routeLink: 'stock-mgmt', icon: 'fal fa-cog', label: 'Gestion pièce' },
    ],
    EMPLOYE: [
      { routeLink: 'tasks', icon: 'fal fa-home', label: 'Liste des taches' },
      { routeLink: '#', icon: 'fal fa-home', label: 'Autres' },
    ],
  } as const;