function Notes_Only_Do_Not_Use() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet() 
  
/* ----- sheet ------ */
  var sheet = ss.getSheets()[sheet_index] // or e.source.getActiveSheet()

  Logger.log('Last Row Index: '+sheet.getLastRow())
  Logger.log('Last Column Index: '+sheet.getLastColumn())
  Logger.log("Get Sheet's Name:"+sheet.getName())
  Logger.log('Get all of last row: '+sheet.getRange(sheet.getName()+"!"+sheet.getLastRow()+":"+sheet.getLastRow()))
  Logger.log('Last Row Index: '+ss.setNamedRange("Name me something unique", lastRow)) // Must be to ss

/* ----- range ----- */
  var range = sheet.getRange(/* lots of options here */) 
  
  Logger.log('First Column Index of Range: '+range.getColumn())
  Logger.log('First Row Index of Range: '+range.getRow()) 
  Logger.log('First Row Index of Range (returns float): '+range.getRowIndex())
  
/* ----- For doGet(request) from Google Sheets actions ------ */
 
  // Get the raw query string of the initial request 
  var queryString = decodeURIComponent(request.queryString)
  console.log('queryString: ', queryString)
    
/* ----- For onEdit(e) from Google Sheets actions ----- */
   
  Logger.log("cell's new value that caused event: "+e.range.getValue())
  Logger.log("Event cell's Notation value example: B1: "+e.range.getA1Notation())
  Logger.log('Sheet of modified cell: '+e.source.getActiveSheet())
  
}
