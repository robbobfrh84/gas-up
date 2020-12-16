function doGet(request) {

  var ss = SpreadsheetApp.getActiveSpreadsheet()

  Logger.log(request.parameter)
  Logger.log('hello')

  if (request.parameter.action === 'READ') {
    // handle READ conditions here...
    return ContentService.createTextOutput(JSON.stringify(READ(ss, request.parameter)))
  } else if (request.parameter.action === 'CREATE') {
    // handle Create conditions here...
    return ContentService.createTextOutput(CREATE(ss, request.parameter))
  } else if (request.parameter.action === 'UPDATE') {
    // handle UPDATE conditions here...
    return ContentService.createTextOutput(UPDATE(ss, request.parameter))
  } else if (request.parameter.action === 'DELETE') {
    // handle DELETE conditions here...
    return ContentService.createTextOutput(DELETE(ss, request.parameter))
  } else {
    return ContentService.createTextOutput(JSON.stringify({ error: "unknown request: "+request.parameter.action}))
  }

}
