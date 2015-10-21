var restler  = require('restler');

module.exports = {
    /**
     * This optional function is called every time before the module executes.  It can be safely removed if not needed.
     *
     */
    init: function() {
    }
    /**
     * Send an email using the internal Dexter SMTP API.
     * Performs some very basic parameter sanity checking before calling the API.
     *
     * @param {WFDataStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {WFDataParser} dexter Container for all data used in this workflow.
     */
    , run: function(step, dexter) {
        var api_key  = dexter.user('profile').api_key
          , app_name = dexter.app('name')
          , url      = dexter.url('home')+'api/app/'+app_name+'/smtp/?api_key = '+api_key
          , to       = step.input('to')
          , subject  = step.input('subject')
          , bodyText = step.input('text')
          , bodyHtml = step.input('html')
          , cc       = step.input('cc', null)
          , bcc      = step.input('bcc', null)
          , reply_to = step.input('reply_to', null)
          , mailData
        ;
        if(!app_name) {
            return this.fail('app_name required');
        }
        if(!api_key) {
            return this.fail('No API key provided');
        }
        if(to.length === 0) {
            return this.fail('At least one "to" field is required');
        }
        if(!subject.first()) {
            return this.fail('"subject" field is required');
        }
        if(!bodyText.length && !bodyHtml.length) {
           return this.fail('Either "text" (for a text-based email), "html" (for an html-based email), or both are required');
        } 

        mailData = {
            data: {
                to: to.toArray().join(',')
                , reply_to: reply_to.first()
                , subject: subject.first()
                , text: bodyText.toArray().join("\n")
                , html: bodyHtml.toArray().join('<br>')
                , cc: cc.toArray().join(',')
                , bcc: bcc.toArray().join(',')
            }
            , headers: {
                'X-Authorization': api_key
            }
        };

        restler.post(url, mailData).on('complete', function(result, response) {
            if(result instanceof Error) return this.fail(result);
            result = result || '(no result)';
            return response.statusCode == 200 
                ? this.complete({ noop: true })
                : this.fail({
                    message: 'Unexpected Response From Server ' + response.statusCode,
                    data: result
                });
        }.bind(this));
    }
};
