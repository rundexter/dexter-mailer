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
            var api_key = dexter.user('profile').api_key
            , url     = dexter.url('home')+'api/smtp/?api_key='+api_key
            , restler = require('restler')
            , to = step.input('to')
            , from = step.input('from')
            , subject = step.input('subject')
            , bodyText = step.input('text')
            , bodyHtml = step.input('html')
            , cc = step.input('cc')
            , bcc = step.input('bcc')
            , mailData
            ;
        if(!api_key) {
            return this.fail('No API key provided');
        }
        if(to.length === 0) {
            return this.fail('At least one "to" field is required');
        }
        if(!from.first()) {
            return this.fail('"from" field is required');
        }
        if(!subject.first()) {
            return this.fail('"subject" field is required');
        }
        if(!bodyText.length && !bodyHtml.length) {
           return this.fail('Either "text" (for a text-based email), "html" (for an html-based email), or both are required');
        } 
        cc = step.input('cc', null);
        bcc = step.input('bcc', null);

        mailData = {
            data: {
                to: to.toArray().join(',')
                , from: from.first()
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
