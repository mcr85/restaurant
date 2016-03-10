'use strict'

import angular from 'angular'

import MainController from './main.controller'

const main = angular
  .module('Main', [])
  .controller('MainController', MainController)

export default main

angular.element(document).ready(() => angular.bootstrap(document, [main.name]))

console.log('jest main')