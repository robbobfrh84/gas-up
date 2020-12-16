# Quickstart summery

Note: `clasp run` directions in "Setting up and authenticating for local development"

See: `quickstart-example` folder for example code.

#### Create Project Folder && `cd` in
* $`clasp create quickstart-example` > select: "webapp"
* $`touch get.js` 👇 copy/paste

```javascript
function doGet(e) {  
  const pie = JSON.stringify({
    pie: Math.PI,
    radius: parseInt(e.parameter.r),
    circumference: (e.parameter.r * Math.PI) * 2
  })
  return ContentService.createTextOutput(pie).setMimeType(ContentService.MimeType.JSON)
}
```
* $`clasp push`
* $`clasp open`

#### UI deploy as web app (1st time only)
* Publish > Deploy as web app
  * Who has access to the app: Everyone, even anonymous.
  * {deploy} > {Ok}

#### Bash
* $`clasp deployments` > copy ID that's followed by `@HEAD` > Paste 👇

Url: https://script.google.com/macros/s/PASTE_YOUR_ID_HERE/exec?r=23
* example: https://script.google.com/macros/s/AKfycbyzPmQvNwSXxveB8GqDC6AnTGT-3WfRwUU1rEFDZ3o/exec?r=23
