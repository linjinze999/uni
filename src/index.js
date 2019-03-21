const $ = require('jquery');
import Dialog from './components/dialog';
import I18n from './components/i18n'
import Loading from './components/loading';
import './components/theme-chalk/src/index.scss';
import './components/theme-chalk-extend/index.scss';

const extend = [
  I18n,
  Dialog
];
extend.forEach( e => e.init($, e.componentName, e.optionsName, I18n.optionsName));

const fn = [
  Loading
];
fn.forEach( f => f.init($, f.componentName, I18n.optionsName));
