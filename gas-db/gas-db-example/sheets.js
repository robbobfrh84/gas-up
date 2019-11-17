function sheets(data){

  sheetsContainer.innerHTML = `
    <h2> <u> Sheets: </u> </h2>
  `

  for (const sheet in data) {
    sheetsContainer.innerHTML += /*html*/`
      <div class="sheet-container">

        <button class="get-sheet-btn get align-top" onclick="api('READ', 'sheet', {sheetName: '${sheet}'})">
          GET ${sheet}
        </button>

        <div class="inline-block code-block">
          <code>
            api('READ', 'sheet', {<br>
            &nbsp;&nbsp;&nbsp;sheetName: '${sheet}'<br>
            &nbsp;})
          </code>
        </div>

        <button class="delete-sheet-btn align-top delete" onclick="alert('create delete sheet functionality')">
          Delete Sheet
        </button>

        <div class="inline-block code-block">
          <code>
            api('DELETE', 'sheet', {<br>
            &nbsp;&nbsp;&nbsp;sheetName: '${sheet}'<br>
            &nbsp;})
          </code>
        </div>

      </div>
    `
  }
}
