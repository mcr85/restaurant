import { NgModule } from 'ng-metadata/core'
import uiRouter from 'angular-ui-router'
import { provideState } from './app.routing'

import { AppComponent } from './app.component'
import { DishesModule } from './components/dishes'

@NgModule({
  imports: [
    uiRouter,
    'ngResource',
    'ngMaterial',
    'md.data.table',
    DishesModule
  ],
  providers: [provideState],
  declarations: [AppComponent]
})
export class AppModule { }

// import { Dishes } from './dishes'

// const template = require('./app.html');

// class AppComponent implements ng.IComponentOptions {
//   templateUrl: './app.html'
// }

// export const App = angular
//   .module('app', [
//     'ui.router',
//     'ngResource',
//     'ngMaterial',
//     'md.data.table',
//     Dishes.name
//   ])
//   .component('app', new AppComponent())
//   .config(config)

// function config($stateProvider) {
//   'ngInject'

//   $stateProvider
//     .state('home', {
//       template: `<h1>Home</h1>`,
//       url: '/',
//     })
//     .state('dishes', {
//       url: '/dishes',
//       // template: require('./dishes/dishes.html'),
//       templateUrl: './dishes/dishes.html',
//       controller: 'DishesController',
//       controllerAs: 'dishesCtrl'
//     })
//     .state('menus', {
//       url: '/menus',
//       template: `<h1>Menus</h1>`
//     })
// }
