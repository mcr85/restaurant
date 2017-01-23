import { Component, OnInit } from 'ng-metadata/core'
import { DishesService } from './dishes.service'

const templateUrl = require('./dishes.html')

@Component({
  selector: 'dishes',
  templateUrl,
  providers: [DishesService]
})
export class DishesComponent implements OnInit {
  dishes
  dishesPromise: ng.IPromise<any>
  query

  constructor(private dishesService: DishesService) { }

  ngOnInit() {
    this.query = {
      order: 'name'
    }

    this.dishesPromise = this.dishesService.getDishes().then(data => this.dishes = data)
  }
}
