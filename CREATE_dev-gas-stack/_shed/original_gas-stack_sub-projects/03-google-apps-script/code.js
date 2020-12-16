function doGet(request) {

  var action = request ? request.parameter.action : "GET" // for Run > Run Function > doGet testing purposes to force hard-coded condition.
  var arg = request ? request.parameter.arg : "all"  // ------- ^ Same ^

  const ss = SpreadsheetApp.getActiveSpreadsheet()

  if (request) {
    var total_page_views = ss.getRange("Page views!A2")
    var last_page_views = ss.getRange("Page views!B2")
    last_page_views.setValue(Date())
    total_page_views.setValue(total_page_views.getValue() + 1)
  }

  if (action === 'GET') {
    if (arg === 'all') {
      return ContentService.createTextOutput(GET_all(ss))
    } else {
      return ContentService.createTextOutput("unknown GET request: "+request)
    }
  } else {
    return ContentService.createTextOutput("unknown request: "+request)
  }

}

function GET_all(ss) {

  const number_of_sheets = ss.getNumSheets()
  var sheets = {}

  for (var i = 0; i < number_of_sheets; i++) {
    var s = ss.getSheets()[i]
    sheets[s.getName()] = {}
    var range = s.getDataRange()
    var values = range.getValues()
    var rows = []
    for (var j = 1; j < values.length; j++) {
      var row = {}
      for (var k = 0; k < values[i].length; k++) {
        row[values[0][k]] = values[j][k]
      }
      rows.push(row)
    }
    sheets[s.getName()] = rows
  }

  return JSON.stringify(sheets)

}
