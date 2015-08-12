var _ = require('lodash')
    , base = require('./default')
    ;
delete base.data.local_test_step.input.from;
module.exports = base;
