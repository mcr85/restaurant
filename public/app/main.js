'use strict'

import angular from 'angular'
import 'angular-ui-router'
import 'angular-material'
import MainController from './main.controller'

const main = angular
  .module('Main', [
    'ui.router',
    'ngMaterial'
  ])
  .config(config)
  .controller('MainController', MainController)

config.$inject = ['$stateProvider']
function config($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: `<h1>HOME</h1>`
    })
    .state('dishes', {
      url: '/dishes',
      template: `<h1>Dishes</h1>`
    })
    .state('menus', {
      url: '/menus',
      template: `<h1>Menus</h1>`
    })
}

export default main