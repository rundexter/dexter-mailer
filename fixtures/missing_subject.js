var _ = require('lodash')
    , base = require('./default')
    ;
delete base.data.local_test_step.input.subject;
module.exports = base;
