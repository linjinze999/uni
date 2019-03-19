const $ = require('jquery')
import Loading from './components/loading'
import Confirm from './components/confirm'
import './components/theme-chalk/src/index.scss';
import './components/theme-chalk-extend/index.scss';

const extend = [
  Confirm
];
extend.forEach( e => e.init($, e.componentName, e.optionsName));

const fn = [
  Loading
];
fn.forEach( f => f.init($, f.componentName));
