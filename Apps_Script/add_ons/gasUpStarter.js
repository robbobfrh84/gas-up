function gasUpStarter() {

  const file = template_builder({
    url: config.index_html_link,
    vars: {
      test: "<h3> Oh, HI! This text was dynamically added with GAS Up!⛽️🚀 </h3>",
      sheetUrl: /*html*/`
  <a href="https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}" target="_blank">
    Google Sheet Url ↗️
  </a>
      `,
      id: SpreadsheetApp.getActiveSpreadsheet().getId(),
      deployId: config.deployId,
      client_library_link: config.client_library_link
    }
  })

  const htmlTemplate = HtmlService.createTemplateFromFile('Apps_Script/add_ons/download.html')
  htmlTemplate.dataFromServerTemplate = {
    text: "data:text/plain;charset=utf-8," + encodeURIComponent(file),
    name: 'gas-up-starter.html'
  }

  const html = htmlTemplate
    .evaluate()
    .setWidth(400)
    .setHeight(300)

  SpreadsheetApp.getUi()
    .showModalDialog(html, '⬇')

  return true
}
