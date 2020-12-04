// var _gas = new GAS('https://script.google.com/macros/s/AKfycby_lTu86Fl8EjJ3lJZ6MgJ8RHWsn5IphTTDf2KZEMLPN2TfzYTk/exec')

var _gas = new GAS('https://script.google.com/macros/s/AKfycbzY-MGz7l2yDHWMhFFIt4nOHR270wEhQuwDPZG7VlDNR58OvDM/exec')

function api(action, scope, options){

  if (!options) options = {}

  if (action == 'CREATE') {
    if (scope === 'sheet') {
      options.sheetName = sheetname.value
      options.keys = Array.from(document.querySelectorAll(".keys")).map(k=>k.value)
    }
  }

  loader.style.display = 'block';
  _gas.crud(action, scope, options)
    .then( payload => {
      if (action === "READ") {
        if (scope === 'all') sheets(payload)
      }
      if (action == 'CREATE') {
        if (scope === 'sheet') alert(options.sheetName+" has been created!")
      }
    })
    .finally( payload => loader.style.display = 'none')

}



function addKey() {
  let keys = Array.from(document.querySelectorAll(".keys")).map(k=>k.value)
  keys.push('')
  newSheetKeys.innerHTML = ""
  keys.forEach((key, i) => {
    newSheetKeys.innerHTML += /*html*/`
      <div id="key${i}">
        <input placeholder="...key name" class="keys" value="${key}">
        <button class="remove-btn" onclick="removeKey('key${i}')">❌</button>
        <br>
      </div>
    `
  })

}

function removeKey(id){
  const key = document.getElementById(id)
  key.innerHTML = ""
}

window.onload = ()=>{

  // _gas.crud( "READ" , "all", {
  //   sheetName: "Permissions"
  // }).then( payload => {
  //   console.log("payload :", payload)
  // })

  _gas.crud( "READ" , "all", )
    .then( payload => {
      console.log("payload :", payload)
    })

  // _gas.crud( "CREATE" , "sheet", {
  //   sheetName: 'B2',
  //   keys: ['name','age','...Other cool Fields']
  // }).then( payload => { console.log('do stuff with data!')})

  // _gas.crud( "READ" , "sheet", {
  //   sheetName: 'Example Sheet',
  // }).then( payload => {
  //   console.log("payload :", payload)
  // })

  // _gas.crud( "CREATE" , "row", {
  //   sheetName: 'Browser Created Sheet',
  //   content: {
  //     name: "Bob",
  //     age: 35
  //   }
  // }).then( payload => {
  //   console.log("payload :", payload)
  // })

}
