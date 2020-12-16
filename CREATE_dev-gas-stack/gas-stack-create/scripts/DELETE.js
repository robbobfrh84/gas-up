function DELETE(ss, arg) {
  
  function main() {
    if (typeof arg.fields === 'string') { arg.fields = JSON.parse(arg.fields) }
    if (arg.scope === "row") { return row() }
    else { return JSON.stringify({ error: "unknown DELETE request: "+arg.scope}) } 
  }
  
  function row() {
    var sheet_index = sheetInd(ss, arg.fields.sheetName)  
    var sheet = ss.getSheets()[sheet_index]
    var range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("r_"+arg.fields._Id);
    ss.removeNamedRange("r_"+arg.fields._Id);    
    sheet.deleteRow(range.getRow())
    var params = { 
      scope: "sheet",
      fields: { 
        sheetName: arg.fields.sheetName
      }
    }
    return JSON.stringify({ response: "DELETE "+arg.scope+" successfully deleted row: ", data: READ(ss, params) })
  }

  return main()
    
}

function runTest_DELETE_row() {
  Logger.log(doGet({parameter: {
    action: "DELETE",
    scope: "row",
    fields: {
      sheetName: "Movies to watch",
      _Id: "Hv6P_jm8399t6",
    }
  }}).getContent())
}
