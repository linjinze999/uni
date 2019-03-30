const $ = require('jquery');
import I18n from './element/i18n';
import Alert from './element/alert';
import Button from './element/button';
import Badge from './element/badge';
import Checkbox from './element/checkbox';
import Dialog from './element/dialog';
import Loading from './element/loading';
import Message from './element/message';
import Progress from './element/progress';
import Radio from './element/radio';
import Rate from './element/rate';
import Switch from './element/switch';
import './element/theme-chalk/src/index.scss';

const extend = [
  I18n,
  Dialog,
  Message
];
extend.forEach( e => e.init($, e.componentName, e.optionsName, I18n.optionsName));

const fn = [
  Alert,
  Radio,
  Checkbox,
  Switch,
  Loading,
  Progress,
  Button,
  Rate,
  Badge
];
fn.forEach( f => f.init($, f.componentName, I18n.optionsName));
