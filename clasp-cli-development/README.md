# Development with Google Apps Script CLI "Clasp"

NOTE: for a "skinny" guide `quickstart.md` for quick server/api

SEE: `clasp-dev-run-example` folder for example code.

### Summery
* Install Clasp
* Setting up and auth...
* Basic workflow Example
* Adding Google Sheets
* Logs
* Deploy
* Make Public API Web App
* Basic `clasp` CLI operations
* Resources


----
# Install Clasp

#### Install globally
* $`npm install @google/clasp -g` (globally)

#### Login using clasp (google)
* $`clasp login` > new browser tab to authenticate
* $`clasp logout`


----
# Setting up and authenticating for `run` methods in local development.
This below directions are mostly a summery from: https://github.com/google/clasp
* NOTE: Stick close to the order of events here. It's real easy to miss something when going through UI especially.. and then it not work...

#### Create Project folder
* $`mkdir clasp-dev-run-example ; cd clasp-dev-run-example`
* $`clasp login`
* $`clasp create clasp-dev-run-example`

#### Add code for testing
* $`clasp pull`
* add 👇 to "Code.js" file after pull.
```javascript
function myFunction() {
  Logger.log("A log for you")
  return "Ok it works here"
}
```
* $`clasp push` + test code in UI
  * ▶️ will run the selected "myFunction"
  * Then, *view* > *logs* (or ⌘+enter)

#### Create Google Cloud project
* http://console.developers.google.com
* Find project dropdown and select **{NEW PROJECT}**
* **Project name**: "clasp-dev-run-example"
  * NOTE: can't reuse the name of a deleted project per google's docs
* Create new project (may take min)

* Find the **Kabab Icon** "settings and utilities" (next to user avatar)
  * find "Project ID" & "Project Number"

#### Add Project ID to local .clasp.json
* $`clasp setting projectId clasp-dev-run-example`

#### Add OAuth
* At http://console.developers.google.com
* **API** > **OAuth consent screen**
* **Application name**: "clasp-dev-run-example"
* **{SAVE}**

#### Add project Number to Script
* $`clasp open`
* **Resources** > **Cloud Platform project...**
* Paste `Project number` in **Change Project** Section and click **{Set Project}**

#### Set OAuth 2 client
* $`clasp open --creds`
* **Create credentials** > **OAuth client ID**
* **Applicaiton type**: "other" (!🚨 Important)
  * Mistake I made: selected something else and it DIDN'T work.
* **Name**: I left mine default generated... like (..."Other client 1"... whatever)
* CLick **{OK}** and find the download icon.
* RENAME!!! > `creds.json` and place in project folder

#### log in locally
* $`clasp login --creds creds.json`
* NOTE: click **** to allow login.
  * small options, kinda hiddent `go to <your project> (unsafe)`
* **{Allow}**
* replace appsscript.json with ... 👇

```json
{
  "timeZone": "America/New_York",
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER",
  "executionApi": {
    "access": "ANYONE"
  }
}
```

* $`clasp push`
* Manifest file has been updated. Do you want to push and overwrite? {Y}

#### Test
* $`clasp run` > select myFunction > "Ok it works here" 🎉

----
# Basic workflow Example

#### Creating code.

You can code all you want in Google scripts the UI
* $`clasp open`

However, it's much better to work and push locally, just remember to...
* `clasp push` any local changes to scripts before testing locally
* And/Or: `clasp pull` if you make changes on the code in the UI

#### Running code

* Create a new file `testFunc.js` in your local project folder.
* Then, add the following starter code...

```javascript
function gasTest(){
  Logger.log("HI-eeeEE!") // use console.log for logs in terminal *see below
  return "Hello from GAS!"
}
```
* $`clasp push` > updates your changes to the cloud
* $`clasp run` > select the gasTest > see: `Hello from Gas!`
* $`clasp open` > see your updated code on UI.
* in the UI > `view` > `logs` > should see: `HI-eeeEE`

#### Running code with Arguments

You must make your code into JSON format as one raw/string/object argument.
* update the code to set a parameter.

```javascript
function gasTest(param){
  console.log("from logs: ", param) // user Logger.log for UI logs *see above
  return "Your argument was... 👉 " + param
}
```
* Update code ... $`clasp push`
* String: $`clasp run gasTest -p '"hello"'` > hello!
* Number: $`clasp run gasTest -p '32'` > 32
* Object: $`clasp run gasTest -p '{"string":"hello","number":32}'` > [object Object]
  * `return param.string` > hello
* Array: $`clasp run gasTest -p '[[4,5,6,7]]'` > 4,5,6,7
  * `return param[2]` > 6
* Multi: $`clasp run gasTest -p '["A string", "32"]'`
  * `function gasTest(p1,p2) {return p1+' '+p2}` > A String 32

----
# Adding Google Sheets

#### Add `createSheet.js` code
* $`touch createSheets.js`

```javascript
function createSpreadSheet() {
  var sheet = Sheets.newSpreadsheet();
  sheet.properties = Sheets.newSpreadsheetProperties();
  sheet.properties.title = "OK lets go";
  var spreadsheet = Sheets.Spreadsheets.create(sheet);
}
```
* $`clasp push`
* $`clasp open`
* **Resources** > **Advanced Google services**
* find **Google Sheets API** > Toggled **ON**

* $`clasp run createSpreadSheet -p '"my new sheet"'`
  * You'll get an alert that you need to add scopes from script url.
  * Copy paste scopes form script
* $`clasp pull`
* Update manifest > $`clasp login --creds creds.js`
* Again: $`clasp run createSpreadsheet -p '"my new sheet"'`
* Go to http://sheets.google.com
  * See new sheet here.

For Read and Write code to sheet, see `clasp-dev-run-example/createSheet.js`
  * Add something to A1 to test... > "HEEEELLLOOO"
  * `clasp run read` > HEEEELLLOOO
  * `clasp run write -p '"World"'` >

----
# Logs

👀 🔥 👀 live logs! VERY useful for development...
* open new terminal tab for...
  * $`clasp logs ---watch` > refreshes every 1-2 sec.

Static logging
* $`clasp logs` or
* 🔥 `clasp logs --json`
  * Gives you a ton more info about the request.

----
# Deploy

Get basic deploy info...
* $`clasp deployments` > lists deployments of a script.

Create a new Deployment (Make sure you've $`clasp push`)
* $`clasp deploy` > example: Created version 1.
  * More info: https://github.com/google/clasp

Redeploy
* $`clasp version 1 redeploy` > do it this way usually through development.
  * ... unless you have diff versions. you wanna keep.

Undeploy
* $`clasp deployments` > see all ids.
* $`clasp undeploy <ID>`

----
# Make Public API Web App

#### Create new file and add a GET request
* $`touch get.js` and add this code...
```javascript
function doGet(e) {
  const pie = JSON.stringify({
    pie: Math.PI,
    radius: parseInt(e.parameter.r),
    circumference: (e.parameter.r * Math.PI) * 2
  })
  return ContentService.createTextOutput(pie).setMimeType(ContentService.MimeType.JSON)
}
function testGet(){
  return doGet({parameter:{r:23}}).getContent()
}
```
* $`clasp push`
* $`clasp run testGet` > response as object with circumference of circle!

#### Deploy as web app
* $`clasp open`
* **Publish** > **Deploy as web app**
  * Who has access to the app: Everyone, even anonymous.
  * **{deploy}** > **{Ok}**
* Now, you can just do...
* `clasp version 1 redeploy` to update deployment
* OR: `clasp deplay` for a new version.

#### Create URL and endpoint to test
* $`clasp deployments` > copy ID that's followed by `@HEAD` > Paste 👇

Url: https://script.google.com/macros/s/PASTE_YOUR_ID_HERE/exec?r=23
* example: https://script.google.com/macros/s/AKfycbxvODgI6BmxYjdDKWEj-mrbaXHWUD_AklE7SoqGjr2S/exec?r=23


----
# Basic `clasp` CLI operations
* $`clasp` > shows all commands
* $`cd` Into your project's folder
* $`clasp create` > Select `standalone`
  * may need to enable Google Apps Scripts by following link
  * it'll create 2x files `.clasp.json`(script-Id) & `appscript.json`
* $`clasp list` > shows all your projects
  * see "Delete & Remove Project"
* $`claps open` > opens project in online editor
* $`clasp pull` > updates local code to edits made on online editor.
* $`clasp push` > pushes local changes to online editor.
* $`clasp run` (NOTE: you'll need to set up the project completely from steps above.)
  * you can select form the created functions

#### permanently Delete & Remove Project
* visit: http://script.google.com
  * Select the menu icon > {Remove}
  * Then visit "Trash" and permanently remove.
* visit: http://console.developers.google.com
  * Select the project you want to delete.
  * Next to your google avatar, select the menu icon ...
  * 'Project settings'
  * {SHUT DOWN}
  * NOTE: This will let you know it's gonna be like a month to finalize ...
* now you can `clasp list` and see it gone.

----
# Resources
* https://developers.google.com/apps-script/guides/clasp
  * https://codelabs.developers.google.com/codelabs/clasp
  * https://developers.google.com/apps-script/guides/projects
  * https://github.com/google/clasp
  * https://github.com/google/clasp/blob/master/docs/run.md
