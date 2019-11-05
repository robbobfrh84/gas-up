function doGet(request) {

  var ss = SpreadsheetApp.getActiveSpreadsheet()

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

function onEdit(e) {

  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = e.source.getActiveSheet()
  var cell = e.range.getValue()
  var firstRow = sheet.getRange(sheet.getName()+"!1:1").getValues()[0]
  var row = e.range.getRow()

  if (cell === '_Id') {
    if (e.range.getRow() === 1 && !firstRow.includes('_Id', 2)) {
      var date = Date()
      var range = sheet.getRange(1, e.range.getColumn(), sheet.getLastRow(), 1)
      var values = range.getValues()
      var arr = []
      for (var i = 1; i < values.length; i++) {
        set_Id(ss, sheet, sheet.getRange(i+1, e.range.getColumn()), i+1)
      }
      sheet.setColumnWidth(e.range.getColumn(), 30)
      range.protect().setWarningOnly(true)
    } else if (sheet.getRange(1, e.range.getColumn()).getValue() === '_Id') {
      e.range.setValue('...')
      set_Id(ss, sheet, e.range, e.range.getRow())
      e.range.protect().setWarningOnly(true)
    }
  }
  else if (cell === '_Date') {
    e.range.setValue(Date())
  }
  else if (firstRow.includes('_Id', 1) && row !== 1) { // && it's not in the first row!
    Logger.log('ok in but...'+cell)
    var idCell = sheet.getRange(row, firstRow.indexOf('_Id')+1)
    if (cell === '_Del' && firstRow.indexOf('_Id')+1 === e.range.getColumn() && idCell.getNote()) {
      var note = JSON.parse(idCell.getNote())._Id
      Logger.log('--'+note)
      ss.removeNamedRange("r_"+JSON.parse(idCell.getNote())._Id);
      e.range.clearContent()
      e.range.clearNote()
    } else if (idCell.getNote()) {
      var note = JSON.parse(idCell.getNote())
      if (note._Id && note.modified) {
        note.modified = Date()
        idCell.setNote(JSON.stringify(note))
      }
    } else if (cell !== ""){
      Logger.log('new')
      set_Id(ss, sheet, sheet.getRange(row, firstRow.indexOf('_Id')+1), row)
      idCell.protect().setWarningOnly(true)
    }
  }
  else {
    Logger.log("no action taken on:  "+cell+" ("+e.range.getA1Notation()+")")
  }

}

function Id_Generator(length, timestamp) {
  var default_length = 4
  var length = length || default_length; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i=0; i < length; i++) { s += r.charAt(Math.floor(Math.random()*r.length)) }
  var time = timestamp || Date.now()
  return s+'_'+time.toString(36)
}

function sheetInd(ss, name) {
  var number_of_sheets = ss.getNumSheets()
  for (var i = 0; i < number_of_sheets; i++) {
    var s = ss.getSheets()[i]
    if (s.getName() === name) {
      return i
    }
  }
}

function set_Id(ss, sheet, cell, i) {
  if (!cell.getValue()) {
    cell.setValue('...')
  }
  if (!cell.getNote()) {
    var timestamp = new Date()
    var id = Id_Generator(null, timestamp.getTime())
    var metaData = {_Id: id,created:timestamp.toString(),modified:timestamp.toString(),content:'...'}
    cell.setNote(JSON.stringify(metaData))
    var rowRange = ss.getRange(sheet.getName()+"!"+i+":"+i)
    ss.setNamedRange("r_"+id, rowRange)
  }
}

Array.prototype.includes = function(str, amount) {
  var cnt = 0
  for (var i = 0; i < this.length; i++) {
    if (this[i] === str) {
      cnt++
      if (cnt >= amount) return true
    }
  }
  return false
}
