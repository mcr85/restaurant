'use strict'

export default class DishesController {
  public dishes: Array<any>
  public loadDishesPromise: angular.IPromise<Array<any>>

  constructor(DishesService) {
    'ngInject'
  
    this.dishes = null

    // on initialize
    this.loadDishesPromise = DishesService.query().$promise.then((data) => {
      console.log('dishes', data)
      this.dishes = data
    })
  }
}