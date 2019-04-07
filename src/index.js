import I18n from './element/i18n';
import Alert from './element/alert';
import Badge from './element/badge';
import Breakcrumb from './element/breakcrumb';
import Button from './element/button';
import Checkbox from './element/checkbox';
import Dialog from './element/dialog';
import Dropdown from './element/dropdown';
import Loading from './element/loading';
import Message from './element/message';
import Notification from './element/notification';
import Progress from './element/progress';
import Radio from './element/radio';
import Rate from './element/rate';
import Steps from './element/steps';
import Switch from './element/switch';
import Tabs from './element/tabs';
import Tooltip from './element/tooltip';
import './element/theme-chalk/src/index.scss';

const $ = window.$;

const extend = [
  I18n,
  Dialog,
  Message,
  Notification
];
extend.forEach( e => e.init($, e.componentName, e.optionsName, I18n.optionsName));

const fn = [
  Alert,
  Badge,
  Breakcrumb,
  Button,
  Checkbox,
  Dropdown,
  Loading,
  Progress,
  Radio,
  Rate,
  Steps,
  Switch,
  Tabs,
  Tooltip
];
fn.forEach( f => f.init($, f.componentName, I18n.optionsName));
