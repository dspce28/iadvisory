/**
 * iAdvisory — lead capture into a Google Sheet.
 *
 * Receives one POST per enquiry or loan application from iadvisory.in and
 * appends it as a row. Free, owned by you, and it keeps working if a phone
 * is lost or a WhatsApp account changes hands.
 *
 * Setup is in site/README.md. In short: paste this into the Apps Script
 * editor of a new Google Sheet, deploy it as a Web app with access set to
 * "Anyone", then put the resulting /exec URL into the LEAD_WEBHOOK secret
 * in GitHub.
 *
 * The site posts text/plain on purpose — a JSON content type would trigger a
 * CORS preflight that Apps Script does not answer, and the lead would never
 * arrive. The body is still JSON; this reads it from e.postData.contents.
 */

// Optional: your own email address to be notified on every lead. Leave
// blank to skip notifications.
var NOTIFY_EMAIL = '';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write a header row once, on the first lead.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Received', 'Reference', 'Type', 'Page', 'Details']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var details = (data.fields || [])
      .map(function (f) { return f.label + ': ' + f.value; })
      .join('\n');

    sheet.appendRow([
      new Date(data.receivedAt || Date.now()),
      data.reference || '',
      data.kind || '',
      data.page || '',
      details,
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New ' + (data.kind || 'lead') + ' — ' + (data.reference || ''),
        body: details + '\n\nPage: ' + (data.page || ''),
      });
    }

    return ContentService.createTextOutput('ok');
  } catch (err) {
    // Never return an error to the browser: the visitor has already been
    // handed off to WhatsApp and must not see a failure.
    console.error(err);
    return ContentService.createTextOutput('error');
  }
}

function doGet() {
  return ContentService.createTextOutput('iAdvisory lead endpoint is live.');
}
