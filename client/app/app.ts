'use strict'

import * as angular from 'angular'
import { Dishes } from './dishes'

class AppComponent implements ng.IComponentOptions {
  public template: string = require('./app.html').toString()
}

export const App = angular
  .module('app', [
    'ui.router',
    'ngResource',
    'ngMaterial',
    'md.data.table',
    Dishes.name
  ])
  .component('app', new AppComponent())
  .config(config)

function config($stateProvider) {
  'ngInject'

  $stateProvider
    .state('home', {
      template: `<h1>Home</h1>`,
      url: '/',
    })
    .state('dishes', {
      url: '/dishes',
      template: require('./dishes/dishes.html'),
      controller: 'DishesController',
      controllerAs: 'dishesCtrl'
    })
    .state('menus', {
      url: '/menus',
      template: `<h1>Menus</h1>`
    })
}
