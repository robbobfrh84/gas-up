/*
  to Execute in Script Editor: Gasup.clean_null_namedRanges()
*/
function clean_null_namedRanges() {
  const gsheet = SpreadsheetApp.getActiveSpreadsheet()
  gsheet.getNamedRanges().forEach(v=>{
    const name = v.getName()
    const value = gsheet.getRangeByName(name)
    if (!value && value == null) {
      console.log("* no nameRange... deleting: ", name)
      gsheet.removeNamedRange(name)
    } else {
      console.log("* nameRange exists: ", name)
    }
  })
}
