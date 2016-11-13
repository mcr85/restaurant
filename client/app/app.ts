'use strict'

import * as angular from 'angular'
import MainController from './main.controller'
import { Dishes } from './dishes'

export default class App {
  public static bootstrap() {
    const App = angular
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

    angular.bootstrap(document, [App.name], { 'strictDi': true })
  }
}