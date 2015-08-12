var _ = require('lodash')
    , base = require('./default')
    ;
delete base.data.local_test_step.input.text;
delete base.data.local_test_step.input.html;
module.exports = base;

