export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Pulpit',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },


      {
        _name: 'CSidebarNavTitle',
        _children: ['Zarządzanie']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Użytkownicy',
        to: '/users',
        icon: 'cilPeople'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Analiza']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Statystyki',
        icon: 'cilChartPie',
        items: [
          {
            name: 'Zamówienia',
            to: '/statistics/orders-charts'
          },
          {
            name: 'Ruch',
            to: '/statistics/traffic-charts'
          },
          {
            name: 'Kelnerzy',
            to: '/statistics/waiters-charts'
          },
          {
            name: 'Dania',
            to: '/statistics/dishes-charts'
          },
          {
            name: 'Składniki',
            to: '/statistics/ingredients-charts'
          },
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Raporty',
        to: '/statistics/reports',
        icon: 'cilDescription'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Sala']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Stoły',
        to: '/tables',
        icon: 'cilRectangle'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Gastronomia']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Kategorie',
        to: '/categories',
        icon: 'cilClipboard'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Dania',
        to: '/dishes',
        icon: 'cilDinner'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Składniki',
        to: '/ingredients',
        icon: 'cilFastfood'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Jednostki',
        to: '/units',
        icon: 'cil-calculator'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Informacje']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Pomoc',
        to: '/help',
        icon: 'cilLightbulb'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Kontakt',
        to: '/contact',
        icon: 'cil-Phone'
      },
    ]
  }
]