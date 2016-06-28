'use strict'

export default class DishesController {
  constructor(DishesService) {
    console.log('dishes controller')
    
    this.dishes = null

    // on initialize
    this.loadDishesPromise = DishesService.query().$promise.then((data) => {
      console.log('dishes', data)
      this.dishes = data
    })
  }
}

DishesController.$inject = ['DishesService']