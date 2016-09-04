'use strict'

import 'angular'
import 'angular-ui-router'
import 'angular-resource'
// import 'angular-material'

import MainController from './main.controller'
import Dishes from './dishes/dishes.module'

const main = angular
  .module('app', [
    'ui.router',
    'ngResource',
    // 'ngMaterial',
    Dishes.name
  ])
  .config(config)
  .controller('MainController', MainController)

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

export default main