'use strict'

import angular from 'angular'
import main from './main'

angular.element(document).ready(() => angular.bootstrap(document, [main.name]))

export default main