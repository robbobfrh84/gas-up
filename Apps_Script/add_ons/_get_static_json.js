function getStaticJson_JSON() { getStaticJson("json") }
function getStaticJson_js() { getStaticJson("js") }

function getStaticJson(type) {
  const gsheet = SpreadsheetApp.getActiveSpreadsheet()
  const id = gsheet.getId()
  const ui = SpreadsheetApp.getUi()

  const gsheetRequest = { id,
    request: "read",
    scope: "gsheet",
  }

  const jsonObject = {
    gsheets: api_sheets_db.gsheet.read(gsheetRequest).sheets,
    sheets: []
  }

  jsonObject.gsheets.forEach( sheet => {
    const sheetRequest = { id,
      sheetId: sheet.sheetId,
      request: "read",
      scope: "sheet"
    }
    const sheetObject = api_sheets_db.sheet.read(sheetRequest)
    jsonObject.sheets.push(sheetObject)
  })

  const htmlTemplate = HtmlService.createTemplateFromFile(
    'Apps_Script/add_ons/download.html'
  )

  let formattedJSON = JSON.stringify(jsonObject, null, 2)

  if (type === "js") {
    formattedJSON = "const staticJson = "+formattedJSON
  }

  htmlTemplate.dataFromServerTemplate = {
    text: "data:text/json;charset=utf-8," + encodeURIComponent(formattedJSON), // ⚠️ encodeURIComponent important, will cut off text if not included
    name: "gsheet."+type,
    popup_content: /*html*/`
      <h3>🏗</h3>
      <h2>gsheet.${type}</h2>
      <h3>generated</h3>
      <h3>🐣</h3>
    `
  }

  const html = htmlTemplate
    .evaluate()
    .setWidth(400)
    .setHeight(300)

  SpreadsheetApp.getUi()
    .showModalDialog(html, '⬇')

}
