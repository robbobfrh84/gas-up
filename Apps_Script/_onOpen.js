function onOpen(e) {
  /*
    This if / else set up came from docs example for controlling..
    USER AUTHENTICATION STATE. (https://developers.google.com/apps-script/reference/script/auth-mode)
    - But, it will not work until it's a proper add on.
    - For development it'll...
      - ALWAYS BE ELSE!
    🔒 SAVE IT ugly like this for when we're ready to impliment it as an add on.
  */
  authentication_check() // see api/authentication
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  if (e && e.authMode == ScriptApp.AuthMode.NONE) {
    console.log(' * ! ScriptApp.AuthMode.NONE')
    // Add a normal menu item (works in all authorization modes).
    menu.addItem(' * Start workflow', 'gasup.startWorkflow')
  } else {
    console.log(' * else (ALWAYS and "else" in development)')
    // Add a menu item based on properties (doesn't work in AuthMode.NONE).
    var properties = PropertiesService.getDocumentProperties()
    var workflowStarted = properties.getProperty('workflowStarted')
    if (workflowStarted) {
      menu.addItem(' * Check workflow status', 'gasup.checkWorkflow')
    } else {
      createMenuItems(menu)
    }
  }
  menu.addToUi()

}

function createMenuItems(menu) {

  const createSheet = SpreadsheetApp.getUi().createMenu('Create sheet')
  createSheet.addItem('Table', 'gasup.createTable')
  createSheet.addItem('Grid', 'gasup.createGrid')

  const webAppExamples = SpreadsheetApp.getUi().createMenu('Web app examples')
  webAppExamples.addItem('GAS Up Starter', 'gasup.gasUpStarter')

  const getStaticJson = SpreadsheetApp.getUi().createMenu('Get static JSON')
  getStaticJson.addItem('gsheet.json', 'gasup.getStaticJson_JSON')
  getStaticJson.addItem('gsheet.js', 'gasup.getStaticJson_js')


  menu.addItem('Create *Root sheet', 'gasup.createRootSheet')
  menu.addSubMenu(createSheet)
  menu.addSubMenu(webAppExamples)
  menu.addSubMenu(getStaticJson)

  // add additional extentions per config
  if (config.extensions === "all") {
    const lab = SpreadsheetApp.getUi().createMenu('Lab 🧪')
    lab.addItem('Upload JSON to private bucket', 'gasup.bucketPrivateAuthenticate')
    lab.addItem('Logout authenticated bucket', 'gasup.bucketLogout')
    lab.addSeparator()
    lab.addItem('Upload JSON to public bucket', 'gasup.bucketPublic')
    menu.addSubMenu(lab)
  }

}

// 🧪 ⏰ FOR LATER TESTING WITH CHECKING AUTHENTICATION
function startWorkflow() {
  console.log(" * startWorkflow()")
  return false
}

function checkWorkflow() {
  console.log(" * checkWorkflow()")
  return false
}
