export function provideState($stateProvider, $urlRouterProvider) {
  'ngInject'

  $stateProvider
    .state('home', {
      template: `<h1>Home</h1>`,
      url: '/',
    })
    .state('dishes', {
      url: '/dishes',
      component: 'dishes'
      // template: '<h1>Dishes</h1>'
      // template: require('./dishes/dishes.html'),
      // templateUrl: './dishes/dishes.html',
      // controller: 'DishesController',
      // controllerAs: 'dishesCtrl'
    })
    .state('menus', {
      url: '/menus',
      template: `<h1>Menus</h1>`
    })

  $urlRouterProvider.otherwise('/')
}
