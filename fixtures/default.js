var _ = require('lodash')
    , env = require('./env')
    ;

module.exports = _.merge({
    simulation: true
    , instance_id: 'local_test_instance'
    , urls: {
        home: "http://rundexter.com/"
    }
    , instance_state: {
        active_step :  "local_test_step"
    }
    , workflow: {
        "id" : "local_test_workflow"
        , "title": "Local test workflow"
        , "description": "A fixture workflow used to test a module"
    }
    , environment: {
       /*
        * Any API keys you might need should go in the env.js file found in the same
        * folder as this fixture.  For example:
        *
        "parse_app_id": "abc123"
        , "parse_app_key": "foobar"
        */
    }
    , user: {
        /*
         * Your dexter user settings should go in the env.js file.  For example:
        profile: {
            email: "joe@test.com"
            , username: "joe"
        }
         */
    }
    , steps: {
        local_test_step: {
            id: 'local_test_step'
            , type: 'module'
            //The test runner will change YOUR_MODULE_NAME to the correct module name
            , name: 'YOUR_MODULE_NAME'
            , next: []
        }
    }
    , modules: {
        //The test runner will add the proper data here
    }
    , data: {
        local_test_step: {
            input: {
                //http://mailinator.com/inbox.jsp?to=dextertest
                to: ['dextertest@mailinator.com']
                , from: ['Dexter Test Fixture <code@rundexter.com>']
                , subject: ['dexter-mailer Fixture Test']
                , text: ['This is a test email']
                , html: ['<h3>Test</h3><p>This is a <em>test</em> email.</p>']
                //http://mailinator.com/inbox.jsp?to=dextertestcc
                , cc: ['dextertestcc@mailinator.com']
                //http://mailinator.com/inbox.jsp?to=dextertestbcc
                , bcc: ['dextertestbcc@mailinator.com']
            }
        }
    }
}, env);
