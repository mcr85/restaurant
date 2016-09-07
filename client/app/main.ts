'use strict'

require('angular-material/angular-material.css')
require('angular-material-data-table/dist/md-data-table.css')

import 'angular'
import 'angular-ui-router'
import 'angular-resource'
import 'angular-material'
import 'angular-material-data-table'


import MainController from './main.controller'
import Dishes from './dishes/dishes.module'

const main = angular
  .module('app', [
    'ui.router',
    'ngResource',
    'ngMaterial',
    'md.data.table',
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