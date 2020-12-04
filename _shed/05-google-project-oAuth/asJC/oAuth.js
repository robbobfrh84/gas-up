const _doc_Id = '<INSERT_SPREADSHEET_DOC_ID>'
var _doc_Id = '1AfBoKcaJRHBuB0z7N87t_yi4Quet06geam_ijnjGkJc'
var _sheet_name = 'Sheet1'

function setData(parameters) {
  const lock = LockService.getPublicLock()
  lock.waitLock(30000)

  try {
    const doc = SpreadsheetApp.openById(_doc_Id)
    const sheet = doc.getSheetByName(_sheet_name)
    const headRow = parameters.header_row || 1
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow()+1
    const row = []
    for (i in headers){
      if (headers[i] == "Timestamp"){
        row.push(new Date())
      } else if (headers[i] == "Email"){
        row.push(Session.getEffectiveUser().getEmail())
      } else {
        row.push(parameters[headers[i]])
      }
    }
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row])
    return getData()
  } catch(e){
    return {"result": JSON.stringify(e)}
  } finally {
    lock.releaseLock()
  }
}

function getData() {
  const doc = SpreadsheetApp.openById(_doc_Id)
  const sheet = doc.getSheetByName(_sheet_name)
  const numRows = sheet.getLastRow()-1

  if (numRows > 20) { //⚠️🚨 fix larger than 20 issue here!
    numRows = 20
  }
  const x = 'hello'

  /* NOTES ON LOGS!!!
  Logger.log(x)
  Logger.log(sheet)
  console.log('Hello Worldzzz!')
  console.log(sheet)
  */
  
  const data = sheet.getRange(2, 1, numRows, sheet.getLastColumn()).getValues()
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  headers = headers.map(function(p) { return p.replace(/\s+/g, '_') })

  const result = []
  for (var r = data.length - 1; r >= 0; r--){
    const row = data[r]
    const record = {}
    for (var h in headers){
      var type = typeof row[h]
      if (headers[h] == "Email"){
        row[h] = obscureEmail_(row[h])
      }
      if (row[h] instanceof Date){
        row[h] = String(row[h])
      }
      record[headers[h]] = row[h]
    }
    result.push(record)
  }
  return { "comments":result }
}

function obscureEmail_(email){
  return email.charAt(0)+'.....@'+email.replace(/.*@/, "")
}
