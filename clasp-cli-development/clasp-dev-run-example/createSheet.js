function createSpreadsheet(name) {
  var sheet = Sheets.newSpreadsheet();
  sheet.properties = Sheets.newSpreadsheetProperties();
  sheet.properties.title = name;
  var spreadsheet = Sheets.Spreadsheets.create(sheet);
}

var spreadsheetId = "1Vku81EurFewcNW7g22ICBlJKY-kopAfjlcEFXmvftwA" // found in sheet url
// Example: https://docs.google.com/spreadsheets/d/1XVVZZFU67jjABnlN1BwolyitVGw69KPSoPj2_bTtMHI/edit#gid=0
//👉 https://docs.google.com/spreadsheets/d/IDHERE/edit#gid=0

function read() {
  const cell = "A1"
  var result = Sheets.Spreadsheets.Values.get(spreadsheetId,cell);
  var numRows = result.values ? result.values.length : 0;
  Logger.log(result.values[0][0])
  return result.values[0][0]
}

function write(param) {
  const cell = "A2"
  var values = [[param]];
  var valueRange = Sheets.newValueRange();
  valueRange.values = values;
  var result = Sheets.Spreadsheets.Values.update(valueRange, spreadsheetId, cell, {
    valueInputOption: "RAW"
  });
  return "see Sheet!"
}
