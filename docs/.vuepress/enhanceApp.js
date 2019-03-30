export default ({ isServer }) => {
  if (!isServer) {
    window.$ = window.jQuery = require('jquery');
    require('../../src/index');
  }
}
