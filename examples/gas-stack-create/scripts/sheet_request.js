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