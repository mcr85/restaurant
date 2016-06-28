'use strict'

import angular from 'angular'
import DishesController from './dishes.controller'
import DishesService from './dishes.service'
import mdDataTable from 'daniel-nagy/md-data-table'
import 'daniel-nagy/md-data-table.css!'

const Dishes = angular.module('Dishes', [
  'md.data.table'
])
  .factory('DishesService', DishesService)
  .controller('DishesController', DishesController)

export default Dishes
