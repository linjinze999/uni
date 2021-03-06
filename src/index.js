import I18n from './element/i18n';
import Alert from './element/alert';
import Badge from './element/badge';
import Breakcrumb from './element/breakcrumb';
import Button from './element/button';
import Carousel from './element/carousel';
import Checkbox from './element/checkbox';
import Collapse from './element/collapse';
import ColorPicker from './element/colorPicker';
import Dialog from './element/dialog';
import Dropdown from './element/dropdown';
import Input from './element/input';
import InputNumber from './element/inputNumber';
import Loading from './element/loading';
import Message from './element/message';
import Notification from './element/notification';
import Popover from './element/popover';
import Progress from './element/progress';
import Radio from './element/radio';
import Rate from './element/rate';
import Select from './element/select';
import Cascader from './element/cascader';
import Slider from './element/slider';
import Steps from './element/steps';
import Switch from './element/switch';
import Tabs from './element/tabs';
import Timeline from './element/timeline';
import Tooltip from './element/tooltip';
import Transfer from './element/transfer';
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
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  ColorPicker,
  Dropdown,
  Input,
  InputNumber,
  Loading,
  Popover,
  Progress,
  Radio,
  Rate,
  Select,
  Slider,
  Steps,
  Switch,
  Tabs,
  Timeline,
  Tooltip,
  Transfer
];
fn.forEach( f => f.init($, f.componentName, I18n.optionsName));
