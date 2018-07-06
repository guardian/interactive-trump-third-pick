// Javascript that is inline. Should be used for anything that needs to be immediate
window.$ = require('./vendor/jquery.js');

var chart = require('./modules/chart.js');
var share = require('./modules/share.js');
var scroll = require('./modules/scroll.js');

chart.init();
share.init();
// scroll.init();
