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
        var to, from, subject, bodyText, bodyHtml, cc, bcc
            , api_key = dexter.user('profile').api_key
            , url     = dexter.url('home')+'api/smtp/?api_key='+api_key
            , restler = require('restler')
            ;
        if(!api_key) {
            return this.fail('No API key provided');
        }
        if((to = step.input('to', null)) === null) {
            return this.fail('"to" field is required');
        }
        if((from = step.input('from', null)) === null) {
            return this.fail('"from" field is required');
        }
        if((subject = step.input('subject', null)) === null) {
            return this.fail('"subject" field is required');
        }
        if(
            (bodyText = step.input('text', null)) === null
            && (bodyHtml = step.input('html', null)) === null
        ) {
           return this.fail('Either "text" (for a text-based email), "html" (for an html-based email), or both are required');
        } 
        cc = step.input('cc', null);
        bcc = step.input('bcc', null);

        restler.post(url, {
            data: {
                to: to
                , from: from
                , subject: subject
                , text: bodyText
                , html: bodyHtml
                , cc: cc
                , bcc: bcc
            }
            , headers: {
                'X-Authorization': api_key
            }
        }).on('complete', function(result, response) {
            if(result instanceof Error) return this.fail(result);
            return response.statusCode == 200 
                ? this.complete({ noop: true })
                : this.fail({
                    message: 'Unexpected Response From Server ' + response.statusCode,
                    data: result
                });
        }.bind(this));
    }
};
