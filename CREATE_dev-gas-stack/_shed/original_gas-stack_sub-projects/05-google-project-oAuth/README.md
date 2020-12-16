# Creating a Google Project and enabling oAuth with gmail


----
----
### As jordanCoder404@gmail.com (logged into JC's email/drive)
Following tutorial [link](https://mashe.hawksey.info/2015/10/google-sheets-as-a-database-authenticated-insert-with-apps-script-using-execution-api/)

#### Create (or copy) google sheet
* Start from [google sheet template:](https://docs.google.com/spreadsheets/d/10eby4LVkwk8aB0OJE0pfrx9utiEXJ9eIQdDYaGtkDew/edit#gid=0)
* file > `Make a Copy` > I renamed it: "oAuth" > open that google sheet instead
* Enable other users to view (*OR* skip if this is an admin type thing)
  * Share > Advanced > Change > `On - Anyone with a link`
  * Igore the link they give you... Instead 👇
* Copy sheet id from url
* ![sheet-id](asJC/sheetId.png)
* ☝️ This is your `_doc_Id`

#### Create an App Script
* `script.google.com` > Create Apps Script > I named it: "oAuth"
* Copy all code from `oAuth.js` and paste over all code in text area of `Code.js`
* Replace `_doc_Id` with *YOUR* doc id copied before
* Also, replace your `_sheet_name` if different
* Now, copy your script ID from the url similar to before.
* ☝️ That's your `Script Id`

#### Publish and allow Google Apps Script Execution API
* In your google script > Publish > **Deploy as API executable**
* Leave as *New* and add `Target-v1` in input > Deploy
* Press through scope warnings if any
* Copy API ID > Update
* In your google script > Resources > Cloud Platform Project
* Click blue link of project ID

⚠️ Note: When making changes and saving your App Script code you **must also** re-publish your API.
* Publish > **Deploy as API executable**
* _AND_, make a NEW **Version** > `Target-v1`


#### In the Google Cloud Platform
* Select the `hamburger icon` on the left to reveal the sidebar.
* Select API & Services Table > `Library`. Search: **Apps Script API**
* Select and `Enable`
* In API & Services Table > `Credentials` > `Create Credentials` > `oAuth Client ID`
* - [x] Web Applications > Name: can leave as is.
* Authorized JavaScript origin
  * Local: http://localhost:8080 (AND/Or any localhost port to develop on)
  * AND/Or: your domain
* `Create` > **COPY YOUR** `Client Id`
* ☝️ That's your `Client Id`

#### Add client-side code (`index.html`)
* Replace '<INSERT_YOUR_SCRIPT_ID>' with your `Script Id`
* Rep.ace '<INSERT_YOUR_CLIENT_ID>' with your `Client Id`
* Launch > http://localhost:8080 (Or any localhost port to develop on)

⚠️ Note:
* You may need to clear your cookies
* Also, sometimes re-loading and trying again seemed to kick it into gear with some 400 errors as well as debugging "you are not authorized" issues.

#### More
Developing scripts
* Logger.log(x) logs in ⌘+Enter(return)
* Normal console.log, logs in **View** > **StackDriver Logs**
