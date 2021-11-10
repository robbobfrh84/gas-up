function onOpen(e) {
  /*
    This if / else set up came from docs example for controlling..
    USER AUTHENTICATION STATE. (https://developers.google.com/apps-script/reference/script/auth-mode)
    - But, it will not work until it's a proper add on.
    - For development it'll...
      - ALWAYS BE ELSE!
    🔒 SAVE IT ugly like this for when we're ready to impliment it as an add on.
  */
  var menu = SpreadsheetApp.getUi().createAddonMenu();
  if (e && e.authMode == ScriptApp.AuthMode.NONE) {
    console.log(' ! ScriptApp.AuthMode.NONE')
    // Add a normal menu item (works in all authorization modes).
    menu.addItem('Start workflow', 'gasup.startWorkflow');
  } else {
    console.log('else (ALWAYS and "else" in development)')
    // Add a menu item based on properties (doesn't work in AuthMode.NONE).
    var properties = PropertiesService.getDocumentProperties();
    var workflowStarted = properties.getProperty('workflowStarted') // see: add-ons folder
    if (workflowStarted) {
      menu.addItem('Check workflow status', 'gasup.checkWorkflow') // see: add-ons folder
    } else {
      menu.addItem('Create *Root sheet', 'gasup.createRootSheet')
      menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Create sheet')
        .addItem('Table', 'gasup.createTable') // see: add-ons folder
        .addItem('Grid', 'gasup.createGrid') // see: add-ons folder
      )
      menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Web app examples')
        .addItem('GAS Up Starter', 'gasup.gasUpStarter') // see: add-ons folder
      )
    }
  }
  menu.addToUi();
}
