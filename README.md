# Dexter Mailer

This [Dexter](http://rundexter.com) module will send an email containing configured data.

You can send either text or HTML, but not both.

If you pass multiple text or HTML records to this function, they'll be concatenated by newlines and sent as a single email to all recipients.

# Configuring the Step

## Input parameters

Parameter|Required|Multiple|Details
---------|--------|-------
to | Yes | Yes | Either a valid email or a "Joe Example <joe@example.com>" string
from | No | No | Who you'd like the email to be from
subject | Yes | No | The subject of your email
html | No | Yes | HTML content to email*
text | No | Yes | Text content to email*
cc | No | Yes | CC'd recipients, same format requirements as "to"
bcc | No | Yes | BCC'd recipients, same format requirements as "to".

\* Either text or html is required.  Multiple values will be concatenated and sent
in a single email to all recipients.
