function gasUpStarter() {

  const filename = "gas-up-starter.html"

  const file = template_builder({
    url: config.index_html_link,
    name: filename,
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

  const htmlTemplate = HtmlService.createTemplateFromFile(
    'Apps_Script/add_ons/download.html'
  )

  htmlTemplate.dataFromServerTemplate = {
    text: "data:text/plain;charset=utf-8," + encodeURIComponent(file), // ⚠️ encodeURIComponent important, will cut off text if not included
    name: filename,
    popup_content: /*html*/`
      <h3> Download and open </h3>
      <h2> ${filename} </h2>
      <h3> in your browser! </h3>
      <hr>
      <div> Note: You may need to <strong>Share</strong> this google sheet to 'anyone with a link' if you want the API data to display properly. </div>
      <hr>
    `
  }

  const html = htmlTemplate
    .evaluate()
    .setWidth(400)
    .setHeight(300)

  SpreadsheetApp.getUi()
    .showModalDialog(html, '⬇')

}
