function UPDATE(ss, arg) {
  
  function main() {
    if (typeof arg.fields === 'string') { arg.fields = JSON.parse(arg.fields) }
    if (arg.scope === "cell") { return cell() }
    if (arg.scope === "row") { return row() }
    else { return JSON.stringify({ error: "unknown UPDATE request: "+arg.scope}) } 
  }
  
  function cell() {
    var cell = ss.getRange(arg.fields.sheetName+"!"+arg.fields.cell)
    if (arg.fields.increment && !isNaN(arg.fields.increment)) {
      cell.setValue(cell.getValue() + parseInt(arg.fields.increment))
      arg.scope = "cell"
      return JSON.stringify({ response: "CREATE "+arg.scope+" successfully updated cell: "+READ(ss, arg) })
    } else if (arg.fields.date === 'Date()') {
      cell.setValue(Date())
      arg.scope = "cell"
      return JSON.stringify({ response: "CREATE "+arg.scope+" successfully updated cell: "+READ(ss, arg) })
    } else if (arg.fields.content) {
      cell.setValue(arg.fields.content)
      arg.scope = "cell"
      return JSON.stringify({ response: "CREATE "+arg.scope+" successfully updated cell: "+READ(ss, arg) })
    } else {
      return JSON.stringify({ error: "!Required field or field value type may be missing: "+JSON.stringify(arg)})
    }
  }
  
  function row() {
    var sheet_index = sheetInd(ss, arg.fields.sheetName)  
    var sheet = ss.getSheets()[sheet_index]
    var range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("r_"+arg.fields._Id);
    var keys = ss.getRange(arg.fields.sheetName+"!1:1").getValues()[0]
    var originalValues = range.getValues()[0]
    var updatedRow = []  
    if (range != null) {
      for ( var i = 0; i < keys.length; i++) {
        if (keys[i] === '_Id' && arg.fields[keys[i]]) {
          var idCell = sheet.getRange(range.getRow(), i+1)
          var notes = JSON.parse(idCell.getNote())
          updatedRow.push(notes.content)
          notes.modified = Date()
          idCell.setNote(JSON.stringify(notes))
        } else if (arg.fields.content[keys[i]]) {
          updatedRow.push(arg.fields.content[keys[i]])
        } else {
          updatedRow.push(originalValues[i])
        }
      }
      range.setValues([updatedRow])
    }
    var params = { 
      scope: "row",
      fields: { 
        sheetName: arg.fields.sheetName,
        _Id: arg.fields._Id
      }
    }
    return JSON.stringify({ response: "UPDATE "+arg.scope+" successfully updated row", data: READ(ss, params) })
  }

  return main()
    
}

function runTest_UPDATE_row() {
  Logger.log(doGet({parameter: {
    action: "UPDATE",
    scope: "row",
    fields: {
      sheetName: "Movies to watch",
      _Id: "Hv6P_jm8399t6",
      content: {
        "Movie Name": "gfd!!!PSDFedited",
        "Notes & Quotes": ">>>that<",
      }
    }
  }}).getContent())
}

function runTest_UPDATE_cell() {
  Logger.log(doGet({parameter: {
    action: "UPDATE",
    scope: "cell",
    fields: {
      sheetName: "DB Data",
      cell: "E8",
      content: "Hi!"
    }
  }}).getContent())
}

function runTest_UPDATE_date() {
  Logger.log(doGet({parameter: {
    action: "UPDATE",
    scope: "cell",
    fields: {
      sheetName: "DB Data",
      cell: "B3",
      date: "Date()"
    }
  }}).getContent())
}

function runTest_UPDATE_cell_increment() {
  Logger.log(doGet({parameter: {
    action: "UPDATE",
    scope: "cell",
    fields: {
      sheetName: "DB Data",
      cell: "D9",
      increment: '10'
    }
  }}).getContent())
}