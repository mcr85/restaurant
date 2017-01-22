import { Component, OnInit } from 'ng-metadata/core'
import { DishesService } from './dishes.service'

const templateUrl = require('./dishes.html')

console.error('templateUrl', templateUrl)

@Component({
  selector: 'dishes',
  templateUrl,
  providers: [DishesService]
})
export class DishesComponent implements OnInit {
  dishes

  constructor(private dishesService: DishesService) { }

  ngOnInit() {
    this.dishesService.getDishes().$promise.then(data => this.dishes = data)
  }
}
