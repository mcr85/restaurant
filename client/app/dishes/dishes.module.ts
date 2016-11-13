'use strict'

import * as angular from 'angular'

import DishesController from './dishes.controller'
import DishesService from './dishes.service'

export const Dishes = angular.module('Dishes', [])
  .factory('DishesService', DishesService)
  .controller('DishesController', DishesController)
