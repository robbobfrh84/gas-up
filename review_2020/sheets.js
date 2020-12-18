function createSheet(param) {
  var sheet = Sheets.newSpreadsheet();
  sheet.properties = Sheets.newSpreadsheetProperties();
  sheet.properties.title = "review_2020 from CLASP";
  var spreadsheet = Sheets.Spreadsheets.create(sheet);
  return "Created Google Sheet "+sheet.properties.title
}

var spreadsheetId = "1rC1H-NgDPuB3DfXuvR1a-7OKWt7kU7GIGQXxt3Ewovs" // found in sheet url
// Example: https://docs.google.com/spreadsheets/d/1XVVZZFU67jjABnlN1BwolyitVGw69KPSoPj2_bTtMHI/edit#gid=0
//👉 https://docs.google.com/spreadsheets/d/IDHERE/edit#gid=0

function read() {
  const cell = "A1" // param
  var result = Sheets.Spreadsheets.Values.get(spreadsheetId,cell);
  var numRows = result.values ? result.values.length : 0;
  Logger.log(result.values[0][0])
  return result.values[0][0]
}

function write() {
  const cell = "A2"
  var values = [["HI from clasp!"]] // [[param]];
  var valueRange = Sheets.newValueRange();
  valueRange.values = values;
  var result = Sheets.Spreadsheets.Values.update(valueRange, spreadsheetId, cell, {
    valueInputOption: "RAW"
  });
  return "see Sheet!"
}
