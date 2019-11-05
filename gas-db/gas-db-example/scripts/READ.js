function READ(ss, arg) {
  
  console.log(arg)
    
  function main() {
    if (typeof arg.fields === 'string') { arg.fields = JSON.parse(arg.fields) }
    if (arg.scope === "all") { return all() }
    if (arg.scope === "sheet") { return sheet(sheetInd(ss, arg.fields.sheetName)) }
    if (arg.scope === "row") { return row() }
    if (arg.scope === "cell") { return cell() }
    else { return JSON.stringify({ error: "unknown READ request: "+arg.scope}) } 
  }
      
  function all() {
    var number_of_sheets = ss.getNumSheets()
    var sheets = {}
    for (var i = 0; i < number_of_sheets; i++) {
      sheets = sheet(i, sheets)
    }    
    return sheets
  }
  
  function sheet(sheet_index, sheets) {
    var sheet = ss.getSheets()[sheet_index]
    if (!sheets) { sheets = {} }
    sheets[sheet.getName()] = {}
    var range = sheet.getDataRange()
    var values = range.getValues()
    var rows = []
    for (var f = 1; f < values[0].length; f++) { // should check this here rather than every loop through, could get have time complex.
      if (!values[0][f]) values[0][f] = '?'+f
    }
    for (var j = 1; j < values.length; j++) {
      var row = {}
      for (var k = 0; k < values[j].length; k++) {
        if (values[0][k] === '_Id') {
          row[values[0][k]] = sheet.getRange(j+1,k+1).getNote()
        } else {
          row[values[0][k]] = values[j][k]
        }
      }
      rows.push(row)
    }
    sheets[sheet.getName()] = rows
    return sheets
  }
  
  function row() {
    var sheet_index = sheetInd(ss, arg.fields.sheetName)  
    var sheet = ss.getSheets()[sheet_index]
    var range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("r_"+arg.fields._Id).getValues()[0]
    var keys = ss.getRange(arg.fields.sheetName+"!1:1").getValues()[0]
    var row = {}
    var lastCol = 0
    for (var a = 0; a < keys.length; a++) { 
      if (keys[a]) lastCol = a
    }    
    for (var f = 0; f <= lastCol; f++) {
      var keyVal = !keys[f] ? '?'+f : keys[f]
      if (keys[f] === '_Id') {
        var thisRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("r_"+arg.fields._Id).getRow()
        row[keyVal] = sheet.getRange(thisRow, f+1).getNote()
      } else {
        row[keyVal] = range[f]
      }
    }
    return row
  }
  
  function cell() {
    var sheet_index = sheetInd(ss, arg.fields.sheetName)  
    var sheet = ss.getSheets()[sheet_index]
    var cell = ss.getRange(arg.fields.sheetName+"!"+arg.fields.cell).getValue()   
    return cell
  }
  
  return main()
  
}

function runTest_READ_all() {
  Logger.log(doGet({parameter: {
    action: "READ",
    scope: "all",
  }}).getContent())
}

function runTest_READ_sheet() {
  Logger.log(doGet({parameter: {
    action: "READ",
    scope: "sheet",
    fields: {
      sheetName: "DB Data"
    }
  }}).getContent())
}

function runTest_READ_row() {
  Logger.log(doGet({parameter: {
    action: "READ",
    scope: "row",
    fields: {
      sheetName: "main",
      _Id: "asu8_jnjm0fju"
    }
  }}).getContent())
}

function runTest_READ_cell() {
  Logger.log(doGet({parameter: {
    action: "READ",
    scope: "cell",
    fields: {
      sheetName: 'main',
      cell: 'A1'
    }
  }}).getContent())
}