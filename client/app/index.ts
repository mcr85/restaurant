'use strict'

require('angular-material/angular-material.css')
require('angular-material-data-table/dist/md-data-table.css')

import 'angular'
import main from './main'

angular.element(document).ready(() => angular.bootstrap(document, [main.name]))