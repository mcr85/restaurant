'use strict'

export default function DishesService($resource) {
  'ngInject'

  return $resource('/api/dishes')
}