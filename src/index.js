const $ = require('jquery');
import I18n from './element/i18n'
import Button from './element/button';
import Radio from './element/radio';
import Checkbox from './element/checkbox';
import Switch from './element/switch';
import Dialog from './element/dialog';
import Loading from './element/loading';
import Progress from './element/progress';
import './element/theme-chalk/src/index.scss';

const extend = [
  I18n,
  Dialog
];
extend.forEach( e => e.init($, e.componentName, e.optionsName, I18n.optionsName));

const fn = [
  Radio,
  Checkbox,
  Switch,
  Loading,
  Progress,
  Button
];
fn.forEach( f => f.init($, f.componentName, I18n.optionsName));
