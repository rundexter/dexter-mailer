var _ = require('lodash')
    , base = require('./default')
    ;
delete base.data.local_test_step.input.to;
module.exports = base;
