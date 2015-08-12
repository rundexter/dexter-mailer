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
            ;
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
        cc = step.input('bcc', null);
        this.complete({
            to: to
            , from: from
            , subject: subject
            , text: bodyText
            , html: bodyHtml
            , cc: cc
            , bcc: bcc
        });
    }
};
