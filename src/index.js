import $ from 'jquery'
import Loading from './components/loading'
import Confirm from './components/confirm'

const extend = [
  Confirm
]
extend.forEach( e => e.init($, e.componentName, e.optionsName))

const fn = [
  Loading
]
fn.forEach( f => f.init($, f.componentName))
