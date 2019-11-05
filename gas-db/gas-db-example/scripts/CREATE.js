function CREATE(ss, arg) {

  function main() {
    if (typeof arg.fields === 'string') { arg.fields = JSON.parse(arg.fields) }
    if (arg.scope === "sheet") { return sheet() }
    if (arg.scope === "addkeys") { return addkeys() }
    if (arg.scope === "row") { return row() }
    else { return JSON.stringify({ error: "unknown CREATE request: "+arg.scope}) }
  }

  function sheet() {
    if (!sheetInd(ss, arg.fields.sheetName)){
      var yourNewSheet = ss.insertSheet()
      yourNewSheet.setName(arg.fields.sheetName)
      if (!arg.fields.keys) arg.fields.keys = []
      if (!arg.fields.keys.includes('_Id', 1)) arg.fields.keys.push('_Id')
      yourNewSheet.appendRow(arg.fields.keys)
      var sheet_index = sheetInd(ss, arg.fields.sheetName)
      var sheet = ss.getSheets()[sheet_index]
      var IdCol = arg.fields.keys.indexOf('_Id')
      var range = sheet.getRange(1, IdCol+1)
      var values = range.getValues()
      sheet.setColumnWidth(IdCol+1, 30)
      range.protect().setWarningOnly(true)
      return JSON.stringify({ response: "CREATE "+arg.scope+" successfully added sheet: "+arg.fields.sheetName+", with keys: "+arg.fields.keys })
    } else if (sheetInd(ss, arg.fields.sheetName)) {
      return JSON.stringify({ error: "! sheetName Already in use: "+JSON.stringify(arg)})
    }
  }

  function addkeys() {
    var sheet_index = sheetInd(ss, arg.fields.sheetName)
    var sheet = ss.getSheets()[sheet_index]
    var keys = ss.getRange(arg.fields.sheetName+"!1:1").getValues()[0]
    var lastInd = 0
    console.log(arg.fields.keys)
    for (var i = 0; i < keys.length; i++) {
      if (keys[i]) lastInd = i
    }
    var keyInd = 0
    for (var i = 0; i < arg.fields.keys.length; i++) {
      var range = sheet.getRange(1, lastInd+i+2)
      range.setValue(arg.fields.keys[keyInd+i])
    }
    return JSON.stringify({ response: "CREATE "+arg.scope+" successfully added keys: "+arg.fields.keys })

  }

  function row() {
    var sheet_index = sheetInd(ss, arg.fields.sheetName)
    var sheet = ss.getSheets()[sheet_index]
    var rows = sheet.getDataRange().getValues().length;
    var id = Id_Generator()
    var keys = ss.getRange(arg.fields.sheetName+"!1:1").getValues()[0]
    var newRow = []
    var idCol = -1
    var content = !arg.fields.content ? arg.fields.content = {} : arg.fields.content
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === "_Id") {
        if (arg.fields[keys[i]] !== false && arg.fields[keys[i]] !== 'false') {
          keys[i] = newRow.push("...")
          idCol = i
        } else { newRow.push("") }
      }
      else if (content[keys[i]] === false) {newRow.push(content[keys[i]])}
      else if (content[keys[i]] === true) {newRow.push(content[keys[i]])}
      else { content[keys[i]] ? newRow.push("'"+content[keys[i]]) : newRow.push("") }
    }
    sheet.appendRow(newRow)
    var lastRowNum = sheet.getLastRow()
    if (idCol > -1) {
      var lastRow = ss.getRange(arg.fields.sheetName+"!"+lastRowNum+":"+lastRowNum)
      var idCell = sheet.getRange(lastRowNum, idCol+1)
      var timestamp = new Date()
      var id = Id_Generator(null, timestamp.getTime())
      var metaData = {_Id:id,created:timestamp.toString(),modified:timestamp.toString(),content:'...'}
      idCell.setNote(JSON.stringify(metaData))
      ss.setNamedRange("r_"+id, lastRow)
    }
    var params = {
      scope: "row",
      fields: {
        sheetName: arg.fields.sheetName,
        _Id: id
      }
    }
    return JSON.stringify({ response: "CREATE "+arg.scope+" successfully added row: ", data: READ(ss, params) })
  }

  return main()

}

function runTest_CREATE_sheet() {
  Logger.log(doGet({parameter: {
    action: "CREATE",
    scope: "sheet",
    fields: {
      sheetName: "New Sheet",
      keys: ['name','age']
    }
  }}).getContent())
}

function runTest_CREATE_row() {
  Logger.log(doGet({parameter: {
    action: "CREATE",
    scope: "row",
    fields: {
      sheetName: "main",
      //_Id: false,
      content: {
        "key1": "Test func !",
        "key2": "with content",
        //"edit": false,
        //"delete": 'false',
      }
    }
  }}).getContent())
}

function runTest_CREATE_addkeys() {
  Logger.log(doGet({parameter: {
    action: "CREATE",
    scope: "addkeys",
    fields: {
      sheetName: "New Sheet",
      keys: ['loc','gender']
    }
  }}).getContent())
}
