'use strict'

export default function DishesService($resource) {
  return $resource('/api/dishes')
}

DishesService.$inject = ['$resource']