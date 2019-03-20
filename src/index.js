const $ = require('jquery');
import Confirm from './components/confirm';
import I18n from './components/i18n'
import Loading from './components/loading';
import './components/theme-chalk/src/index.scss';
import './components/theme-chalk-extend/index.scss';

const extend = [
  I18n,
  Confirm
];
extend.forEach( e => e.init($, e.componentName, e.optionsName));

const fn = [
  Loading
];
fn.forEach( f => f.init($, f.componentName));
