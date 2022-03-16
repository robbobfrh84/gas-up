function bucketPrivateAuthenticate() {
  const service = getService()
  if (!service.hasAccess()) {
    const authorizationUrl = service.getAuthorizationUrl()
    const template = HtmlService.createTemplate(save_file_to_bucket.authorize)
    template.authorizationUrl = authorizationUrl
    const page = template.evaluate()
    if (config.isManualTrigger) {
      console.log("* Bob!👀 Copy that link, paste it into the browser and authorize yourself: \n\n"+authorizationUrl)
    } else {
      SpreadsheetApp.getUi().showModalDialog(page, "Authorize Account")
    }
  } else {
    const bucket = this.config.bucketParams.GASUP_PRIVATE
    const { blob } = buildStaticJson()
    const result = uploadFile(service, this.config.bucketParams, bucket, blob)
    const successHTML = save_file_to_bucket.success(this.config.bucketParams, bucket)
    const html = result.id ? successHTML : save_file_to_bucket.fail
    const template = HtmlService.createTemplate(html)
    const page = template.evaluate()
    if (config.isManualTrigger) {
      console.log("* Bob!👀 Ok, looks like it worked: \n\n"+JSON.stringify(result,null,2))
    } else {
      SpreadsheetApp.getUi().showModalDialog(page, "Succesful Uploaded")
    }
  }

}


function getService() {
  return OAuth2.createService('ctrlq')
    .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
    .setTokenUrl('https://accounts.google.com/o/oauth2/token')
    .setClientId(this.config.bucketParams.CLIENT_ID)
    .setClientSecret(this.config.bucketParams.CLIENT_SECRET)
    .setCallbackFunction(this.config.bucketParams.CALLBACK)
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('https://www.googleapis.com/auth/devstorage.read_write')
    .setParam('access_type', 'offline')
    .setParam('approval_prompt', 'force')
    .setParam('login_hint', this.config.session.getActiveUser().getEmail())

}

function authCallback(request) {
  const service = getService()
  const authorized = service.handleCallback(request)
  if (authorized) {
    return HtmlService.createHtmlOutput('Connected to Google Cloud Storage. You can close this window now.')
  } else {
    return HtmlService.createHtmlOutput('Access Denied')
  }
}

function bucketLogout() {
  var service = getService()
  service.reset()
  if (!this.config.isManualTrigger) {
    SpreadsheetApp.getUi().alert("Logout Successful")
  } else {
    console.log("* Succesful logout")
  }
}
