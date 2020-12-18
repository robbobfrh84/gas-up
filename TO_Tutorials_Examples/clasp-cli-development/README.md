# Development with Google Apps Script CLI "Clasp"

NOTE:
* See: `/completed_walkthrough-12-2020` for a completed example.
* For a "skinny" guide: `quickstart.md` for a quick server & url api example

### Summery
* Install Clasp
* Setting up and local authentication
* Basic workflow example
* Adding Google Sheets
* Logs
* Deploy
* Develop and re-deploy flow
* Make public API web app
* Adding remote projects (multiple devs)
* Permanently Delete & Remove Project
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
# Setting up and local authentication
* This will allow you to run the `clasp run` locally to run GAS functions.  
* The below directions are mostly a summery from: https://github.com/google/clasp
* NOTE: Stick close to the order of events here. It's _real_ easy to miss something when going through UI especially... and then it'll not work.

#### Create Project folder
* $`mkdir clasp-dev-run-example ; cd clasp-dev-run-example`
* $`clasp login`
* $`clasp create clasp-dev-run-example` > select: "webapp"
  - This action creates `appscript.json` file in your folder, And GAS link

#### Add code locally and push for testing in browser
* $`clasp pull` > Will pull down the `code.js` form link
* add 👇 to "Code.js" file after pull.
  ```javascript
  function myFunction() {
    Logger.log("A log for you")
    return "Ok it works here"
  }
  ```
* $`clasp push`
* Open GAS in browser tab, OR just run $`clasp open` in cli
* ▶️ will run the selected "myFunction"
* Then, *view* > *logs* (or ⌘+enter)
* NOTE: to run function locally, you'll need to log in. But you'll have to first create a google cloud project for that.

#### Create Google Cloud project
* http://console.developers.google.com
* Find project dropdown and select **{NEW PROJECT}**
* **Project name**: "clasp-dev-run-example"
  * NOTE: can't reuse the name of a deleted project per google's docs
* Create new project (may take min)
* Find the **Kabab Icon** "settings and utilities"(next to user avatar)
  * find "Project ID" & "Project Number"

#### Add Project ID to local .clasp.json
* $`clasp setting projectId <your Project ID>`

#### Add OAuth
* At http://console.developers.google.com, Under **API API & Services** sidenav
* Select Tab: **OAuth consent screen**
  * **User type** Select **[x] External**: You want the WWW to be able to access this.
  * **{CREATE}**
* **App name**: "clasp-dev-run-example"
<!--  -->
* 🔥🔥🔥 ... Looks like this has changed...
<!--  -->
* **User support email**: your gmail email...
* Leave no-required empty,
* ...Scroll to **Developer contact information**: your gmail email...
* **{SAVE And Continue}**
* in "Scopes":
  * Select: **Add or Remove Scopes** > [x] View your email address
  * **{UPDATE}**
* **{SAVE And Continue}**
* in "Test Users"/"OptionalInfo":
  * Leave empty for now... **{SAVE And Continue}**
* **{Publish App}**

#### Add project Number to Script
* $`clasp open`
* **Resources** > **Cloud Platform project...**
* Paste `Project number` in **Change Project** Section and click **{Set Project}** & **{Confirm}**

#### Set OAuth 2 client
* $`clasp open --creds` <!-- https://console.developers.google.com -->
* Select: **Credentials**
* find **+ Create credentials** > **OAuth client ID**
* **Applicaiton type**: *Desktop App* (!🚨 Important)
* **Name**: I left default generated, like (..."Desktop client 1"... 🤷)
* Click **{CREATE}** & **{OK}** and find the download icon, download...
* RENAME!!! > `creds.json` and place in project folder

#### log in locally
* $`clasp login --creds creds.json`
* NOTE: click **advanced** to allow login.
  * small options, kinda hiddent `go to <your project> (unsafe)`
* **{Allow}**
* Add these Config lines to `appsscript.json` at end
  ```json
    "executionApi": {
      "access": "ANYONE"
    }
  ```
* $`clasp push`
* "Manifest file has been updated. Do you want to push and overwrite?" {Y}

#### Test
* $`clasp run` > select myFunction > "Ok it works here" 🎉


----
# Basic workflow example

#### Creating code.
You can code all you want in Google scripts the UI
* $`clasp open`
* However, it's much better to work and push locally, just remember to...
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
* in the UI > `view` > `logs` > `Apps Script Dashboard` at bottom > **{ok}**
  * Click on the most recent log at the top, should see: `HI-eeeEE`
* NOTE: if you press the **{>}** play button in the GAS UI, you'll see the logs "logged" right in the window before the dashboard. But, `clasp run` logs don't show up there.

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
  function createSpreadSheet(param) {
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
* There's a notification tell you that you much also enable the service in the **Google Cloud Platform API Dashboard** > So click that link...
* Find & click **+ Enable APIs and Serves**
* If you just search "sheets", it'll filter to **Google Sheets API**
* Select and **{Enable}**

<!-- * $`clasp run createSpreadSheet -p '"my new sheet"'`
  * You'll get an alert that you need to add scopes from script url.
  * Copy paste scopes form script
* $`clasp pull` -->
🙃
🙃
🙃


* $`clasp pull`
* Now, add oauth scope to `appsscript.json` at the end.
  ```JSON
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets"
  ]
  ```
* $`clasp push` > **{y}**
* you now need to update your credentials > $`clasp login --creds creds.json`

Now try: $`clasp run createSpreadsheet -p '"my new sheet"'`
* Go to http://sheets.google.com > find your sheet!

For Read and Write code to sheet, see `sheets.js` in`/completed_walkthrough...`
  * Add something to A1 to test... > "HEEEELLLOOO"
  * `clasp run read` > HEEEELLLOOO
  * `clasp run write -p '"World"'`


----
# Logs
Live logs! 👀 🔥 👀 VERY useful for development!
* open new terminal tab for...
  * $`clasp logs ---watch` > refreshes every 1-2 sec.

Static logging
* $`clasp logs` or
* 🔥 $`clasp logs --json` / $`clasp logs --json --watch`
  * Gives you a ton more info about the request.

----
# Develop and re-deploy flow

Get basic deploy info...
* $`clasp deployments` > lists deployments of a script.

Create a new Deployment (Make sure you've $`clasp push`)
* $`clasp deploy` > example: Created version 1.
  * More info: https://github.com/google/clasp

Redeploy (you probably don't want a bazillion version, so use redeploy)
* $`clasp version 1 redeploy` > do it this way usually through development.
  * ... unless you have diff versions. you wanna keep.

Undeploy
* $`clasp deployments` > see all ids.
* $`clasp undeploy <ID>`

After you `clasp push` your changes...
* $`clasp deploy`
  * Note: this will create a new version. COPY that id.

Sometime, you'll really be pushing and deploying at the same time, same version.
* $`clasp push`, then
* $`clasp deploy -i <the version id>` or whatever version you want to deploy from. Note, you might need to check the browser ui to get the most current version
  * Example: `clasp deploy -i /s/AKfycbyGSuUQMuuaPAYAF-mgbg52A-ZLUv6h-jZ_Bk_kO0hf0PylmdPvWwytGpas4v9hq0_y`

#### ALL IN ONE!
- $`clasp push; clasp deploy -i AKfycbyGSuUQMuuaPAYAF-mgbg52A-ZLUv6h-jZ_Bk_kO0hf0PylmdPvWwytGpas4v9hq0_y`


----
# Make public API web app

#### Deploy as web app
* $`clasp open`
* **Publish** > **Deploy as web app**
  * Who has access to the app: Everyone, even anonymous.
  * **{deploy}** > **{Ok}**
* Now, you can just do...
* `clasp version 1 redeploy` to update deployment
  * When I did this, it said it created a higher(incrementing) version.
  * But, it did not when I checked deployments. So... whatever.
* OR: `clasp deploy` for a new version.

#### Get the Browser link !Important
* $`clasp open`
* Select the **Publish** tab > **deploy from manifest**
* Open the **Latest Version (Head)**
* Copy the link with the globe icon.
* Should look something like: https://script.google.com/macros/s/AKfycbzX6PG8Iw05uHoDrW1AD7I9gRKpznYYxr0dQIgQUWKi/exec
  * Note, this link won't do anything yet.

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

#### Run with your URL!
* Update the deployment: `clasp deploy` OR `clasp version 1 redeploy`
* Using the URL you got from above, just add `/r=23` to the end.
* example: https://script.google.com/macros/s/AKfycbxvODgI6BmxYjdDKWEj-mrbaXHWUD_AklE7SoqGjr2S/exec?r=23
* should see your api response in the browser!


----
# Cloning remote projects
Let's say you, or another developer, is on another computer and wants to contribute. *NOTE:* This also assumes you're using the same login (different account may include additional steps)

Clone the project
- $`clasp login` > login through the popup auth.
- $`clasp list` > shows all projects under this account.
  - Here, you can get the projectID from the code you want to clone
  - The Script ID is between `https://script.google.com/d/` and `/edit`
  - Also, within the GAS in the browser: **File** > **Project Properties**
- $`mkdir <name of project>` & `cd` > You have to create the folder name
- $`clasp clone <Script ID>`
- Now, you should be able to makes changes and $`clasp push`

NOTE: This acts just like github repo. So, it's easy to re-Clone to change directory around your local machine.

#### How do know what project I'm using?
* It's just controlled by the .clasp.json file.
* So, if you `cd` out of once project in into another, you'll be controlling that project.

#### Log in locally
NOTE: This assumes you've already setup credentials for local development.
* See: "Setting up and authentication" section above

You'll be missing some credentials you still need
* visit https://console.developers.google.com/
* Make sure your app is selected > click **Credentails** on the left nav
* Find the "OAuth 2.0 Client IDs" you set up and download the .json file.
* change the .json file name to `creds.json` AND move into project folder.

Add your Prjoect Id
* find your project_id within that `creds.json` file and copy it.
* $`clasp settings projectId <Your Project ID>` This adds it to your .clasp.json

Now, you can finally log in locally
* $`clasp login --creds creds.json` > looks for "Advanced" options to finish login.
* Should only have to do this initially though.


----
# Permanently Delete & Remove Project (Sheets too!)
* visit: http://script.google.com
  * Select the menu icon > {Remove} (visit "Trash" to permanently remove)
* visit: http://script.google.com
  * Select the menu icon > {Remove} (visit "Trash" to permanently remove)
* visit: http://console.developers.google.com
  * Select the project you want to delete.
  * Next to your google avatar, select the menu icon ...
  * 'Project settings'
  * {SHUT DOWN}
  * NOTE: This will let you know it's gonna be like a month to finalize ...
* now you can `clasp list` and see it gone.


----
# Basic `clasp` CLI operations
* $`clasp` > shows all commands
* $`cd` Into your project's folder
* $`clasp create` > Select `standalone`
  * may need to enable Google Apps Scripts by following link
  * it'll create 2x files `.clasp.json`(script-Id) & `appscript.json`
* $`clasp list` > shows all your projects
  * NOTE: the project you're accessing, is the folder you're in.
  * So the `.clasp.json` file tells you what project to pull/push from...
* $`clasp clone <Script ID>` > Clones project contents to current directory.
* $`claps open` > opens project in online editor
* $`clasp pull` > updates local code to edits made on online editor.
* $`clasp push` > pushes local changes to online editor.
* $`clasp run` (NOTE: you'll need to set up the project completely from steps above.)
  * you can select form the created functions


----
# Resources
* https://developers.google.com/apps-script/guides/clasp
  * https://codelabs.developers.google.com/codelabs/clasp
  * https://developers.google.com/apps-script/guides/projects
  * https://github.com/google/clasp
  * https://github.com/google/clasp/blob/master/docs/run.md
