# Basic Google Apps Scripts (gas) READ & UPDATE requests

### Completed Examples and Links
* Example: [Google Sheet](https://docs.google.com/spreadsheets/d/1zLsDb_3fdmsNCU8hxzowFsHuN3cGwgQsKNfrFoNYWzg/edit#gid=0)
* Example: [Google Script](https://script.google.com/macros/d/M3sGa55zosYKVl0wVWOsN4Alcjm-Gs3hT/edit?uiv=2&mid=ACjPJvEFcSym25kEsCCKsCIscpp0Xn02k1oJwGB5CNpWWlfMQdSe7H0vtYt88nXedb4yDmtcYAH-E3JnTvXRGMMP1fkqqJmHYVqfMtPvFrVBTwteP0IduQk-Utc0S9SnqvDs-yJaOq3RcS0)
  * The same code can also found in the `code.js` file in this folder
* Example: as [URL](https://script.google.com/macros/s/AKfycbzLv7D7mTNzozq1KmwYxWdTuFCvoD5qMZPuB0HS40owa335_TKv/exec?action=READ&arg=all)
* Client Side Example: https://pair-programmers.github.io/gas-stack/04-google-script-api/part1-basic-public-read-update

### Create a Google App Script
To get started, login to your google account and start by creating a google **sheet**
* Visit > `sheet.google.com` > **Blank** > I renamed it: `basic-public-read-update`
* Tools > **Script editor** > I renamed: `basic-public-read-update`
* You can copy and Paste this basic code to get started...

```javascript
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({"programmer":"YOU","message":"Hey-oOO!"}))
}
```

* Publish > **Deploy as Web App**
* Select **NEW** > **Who has access to this app:** `Everyone, even anonymous`
  * NOTE: "access" is referencing _triggering_ the app, NOT viewing/editing the Google Sheet nor Script.
* Publish > **Deploy from manifest** > **web app meta-version**
* Copy that url for later 👈 That's **YOUR URL**
  * Now when you click the link top open in your browser, you should see the basic JSON object from _your_ google app script.

### Add basic READ & UPDATE to `Code.gs`
Before we add additional code to our `Code.gs` file in our script, we need to create some content to manipulate/read from our google sheet.

#### Add content to your Google Sheet.
Visit this google script for example content > [Example Google Sheet](https://docs.google.com/spreadsheets/d/1zLsDb_3fdmsNCU8hxzowFsHuN3cGwgQsKNfrFoNYWzg/edit#gid=0)
* File > **Make a copy** of this file into your own drive.
* If you decide to modify your own code. find the `code.js` file in this folder to copy/paste the entire contents into **Your** Scripts' `Code.gs` file.
  * Note: the `code.js` code specifies specific key/values of the "Page Views" Sheet in the example sheet linked above 👆. You may need to modify the code to fit your needs.

#### Anatomy of your Google Sheet as a DB.
Though it is not a requirement, I've chosen to use the 1st row of cells to represent the key-values to be transformed into a JSON object. This just to mimic the format of a database table for ease of use.

#### Update your changes
When your sheet's content and code.js file is complete. Remember you must...
* Publish > **Deploy as Web App** > AND create a new project version to activate changes when submitting your url.
* NOTE: if you chose to copy the sheet, you'll need to get a new URL.
  * Publish > **Deploy from manifest** > **web app meta-version**
  * Copy that url for later 👈 That's **YOUR URL**

Paste the url into a new browser window.
* If you get the message that starts with "unknown request: try adding... " You've got it working. Now, we can add the correct endpoints.
  * Here's my example url: `https://script.google.com/macros/s/AKfycbzLv7D7mTNzozq1KmwYxWdTuFCvoD5qMZPuB0HS40owa335_TKv/exec`

### Add conditional endpoints to your url.
With **YOUR URL** that you copied before, add the endpoint `?action=READ&arg=all`
* NOTE: the URL in the browser changes after execution, you need to use what you copied before.
* Here's my API as an example: https://script.google.com/macros/s/AKfycbzLv7D7mTNzozq1KmwYxWdTuFCvoD5qMZPuB0HS40owa335_TKv/exec?action=READ&arg=all

Both requests are handle within your Code.gs. One realizes you didn't add the endpoint and recommends one for you. while the other returns two sheets in JSON format.

### Add the API to client-side code
Find the `index.html` file in this folder or copy and paste the code below to your own `.html` to test your API on the client side.
* Make sure to change the `url` to **YOUR URL**
* To test, make some changes to your sheet and see it updated when the page is refreshed as well as the page count going up! fun!🤓

```html
<!DOCTYPE html><html lang="en">
<head>
  <title> part1-basic-public-read-update </title>
  <meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="simpleLoader.css">
  <style> td { border: 1px solid; padding: 3px;} </style>
</head>
<body>
  <h1> Google Script API basic READ & UPDATE </h1>
  <em>...Get all data and add to page view count.</em> <br> <br>
  Included: <br>
  &bull; Google Script API <code>READ_all</code> method returns all google spreadheets' data <br>
  &bull; Each 'sheet' within the spreadsheet displayed in html <code>&#60;table&#62;</code> <br> <br>
  &star; See Console for object of sheets (option+command+j) <br>
  <hr>
  <div class="relative">
    <div class="sLoader" id='loader1'> <div></div><div></div><div></div> </div>
  </div>
  <div id='tables'></div>
</body>
<script>

// - - - - - - - - - - - 👇        YOUR URL HERE          👇
const url = "https://script.google.com/macros/s/AKfycbzLv7D7mTNzozq1KmwYxWdTuFCvoD5qMZPuB0HS40owa335_TKv/exec?action=READ&arg=all"

window.onload = ()=>{
  _loader1 = true
  _get(url).then(payload => _build_sheets_tables(payload))
    .finally(() => _loader('off'))
}

_build_sheets_tables = (payload)=>{
  const data = JSON.parse(payload)
  console.log(" API: /exec?action=READ&arg=all endpoint returns payload: ", data);
  const tables = document.getElementById('tables')
  for (const sheet in data) {
    tables.innerHTML += `
      <h3>Sheet Name: <em>${sheet}</em></h3>
      <table id='dynamic-table-${sheet}'>
        <tr id='dynamic-headers-${sheet}'></tr>
      </table> <br>
    `
    const headers = document.getElementById("dynamic-headers-"+sheet)
    const table = document.getElementById("dynamic-table-"+sheet)
    for (const header in data[sheet][0]) {
      headers.innerHTML += `
        <th>${header}</th>
      `
    }
    data[sheet].map((row,ii)=>{
      table.innerHTML += `<tr id='row-${sheet}-${ii}'></tr>`
      const tdRow = document.getElementById('row-'+sheet+'-'+ii)
      for (val in row) {
        tdRow.innerHTML += `
         <td> ${row[val]} </td>
        `
      }
    })
  }
}

_get = (url)=>{
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          res(xhr.responseText)
        } else {
          rej(xhr)
        }
      }
    }
    xhr.send(null)
  })
}

var _loader1 = false
_loader = (direct_state_change)=>{
  if (direct_state_change) {
    if (direct_state_change === 'on') _loader1 = true
    if (direct_state_change === 'off') _loader1 = false
  } else {
    _loader1 = !_loader1
  }
  document.getElementById('loader1').style.display = _loader1 ? '' : 'none'
}

</script>
</html>
```
