const _gas = new GAS('https://script.google.com/macros/s/AKfycbzY-MGz7l2yDHWMhFFIt4nOHR270wEhQuwDPZG7VlDNR58OvDM/exec')
let sheets;

window.onload = ()=>{
  api("READ" , "all", {}, (gasSheets)=>{
    buildSheets(gasSheets)
  })
}

const createSheet = function() {
  api("CREATE", "sheet", {
    sheetName: createSheetName.value
  }, ()=>{
    window.requestAnimationFrame(()=>{
      api("READ" , "all", {}, (gasSheets)=>{
        buildSheets(gasSheets)
        alert("New Sheet Created: "+createSheetName.value)
      })
    })
  })
}

const api = function(crud, what, options, callback) {
  loader.style.display = 'block';
  _gas.crud( crud, what, options )
    .then( data => {
      if (callback) callback(data)
    })
    .finally( () => loader.style.display = 'none')
}

const buildSheets = function(gasSheets) {
  sheets = gasSheets
  const sheetNames = Object.keys(sheets).map(sheet => {
    return /*html*/`
      <span class="tabs">${sheet}</span>
    `
  }).join("")
  sheetsContainer.innerHTML = /*html*/ `
    <h3>All Sheets:${sheetNames}</h3><hr>
  `
  Object.keys(sheets).forEach(sheet => {
    if (sheets[sheet].length > 0) {
      const table = buildSheet(sheets[sheet])
      sheetsContainer.innerHTML += /*html*/ `
        <h3>${sheet}</h3>
        ${table}
      `
    } else {
      sheetsContainer.innerHTML += /*html*/ `
        <h3>${sheet}</h3><em>*empty</em>
      `
    }
  })
}

const buildSheet = function(sheet) {
  const headers = Object.keys(sheet[0]).map( key => {
    return /*html*/`<th>${key}</th>`
  }).join("")
  const rows = sheet.map( row => {
    return /*html*/ `<tr>${buildRow(row)}</tr>`
  }).join("")
  return /*html*/`
    <table>
      <tr>${headers}</tr>
      ${rows}
    </table>
  `
}

const buildRow = function(row) {
  return Object.keys(row).map( value => {
    return /*html*/`<td>${row[value]}</td>`
  }).join("")
}
