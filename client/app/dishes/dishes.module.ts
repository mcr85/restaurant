'use strict'

import * as angular from 'angular'

import DishesController from './dishes.controller'
import DishesService from './dishes.service'
// import mdDataTable from 'daniel-nagy/md-data-table'
// import 'daniel-nagy/md-data-table.css!'

const Dishes = angular.module('Dishes', [])
  .factory('DishesService', DishesService)
  .controller('DishesController', DishesController)

export default Dishes
