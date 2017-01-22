import { Inject, Injectable } from 'ng-metadata/core'

@Injectable()
export class DishesService {
  constructor(@Inject('$resource') private $resource) { }

  getDishes() {
    return this.$resource('/api/dishes')
  }
}
