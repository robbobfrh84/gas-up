const _gas = new GAS("https://script.google.com/macros/s/AKfycbyATHfxHe6UHKZPxgZ3c7qNO7Li2ppiZ8GKWt-0kvGwmzygz40/exec")
var currentEdit = false
var _loaders = {
  '1': false,
  '2': false,
}

window.onload = ()=>{
  _loader('1','on')
  _gas.crud( "READ" , "all" ).then( payload => {
    if (!payload.error) {
      _build_sheets_tables(payload)
    }
  }).then( ()=>{
    _gas.crud( "UPDATE", "cell", {
      sheetName: "DB Data",
      cell: "B2",
      increment: 1
    })
  }).then( ()=>{
    _gas.crud( "UPDATE", "cell", {
      sheetName: "DB Data",
      cell: "B3",
      date: "Date()"
    })
  }).finally( ()=>{
    _loader('1','off')
  })
}

_build_sheets_tables = (data)=>{
  const tables = document.getElementById('tables')
  for (const sheet in data) {
    tables.innerHTML += `
      <h3>Sheet Name: <em>${sheet}</em></h3>
      <table id='dynamic-table-${sheet}'></table> <br>
    `
    _build_sheet_tables(sheet, data)
  }
  return data
}

_build_sheet_tables = (sheet, data)=>{
  const table = document.getElementById("dynamic-table-"+sheet)
  table.innerHTML = `<tr id='dynamic-headers-${sheet}'></tr>`
  const headers = document.getElementById("dynamic-headers-"+sheet)
  for (let header in data[sheet][0]) {
    if (['editable','deletable'].includes(header)) header = ''
    if (!['_Id'].includes(header)) {
      headers.innerHTML += `
        <th>${header}</th>
      `
    }

  }
  data[sheet].map((row,i)=>{
    table.innerHTML += `<tr id='row-${sheet}-${i}'></tr>`
    const tdRow = document.getElementById('row-'+sheet+'-'+i)
    const id = row._Id ? JSON.parse(row._Id)._Id : ""
    for (val in row) {
      if (val === 'edit') {
        if (row[val] === false) row[val] = '&#x1f512;'
        else row[val] = `
          <button onclick="_edit('${id}')" id="editBtn-${id}">
            Edit
          </button>
        `
      } else if (val === 'delete') {
        if (row[val] === false) row[val] = '&#x1f512;'
        else row[val] = `
          <button onclick="_deleteRec('Movies to watch','${id}')" id="delete-cancel-${id}">
            Delete
          </button>
        `
      }
      if (!['_Id'].includes(val)) {
        tdRow.innerHTML += `
         <td class='sheet-table ${val}' id="${val}-${id}">${row[val]}</td>
        `
      }
    }
  })
}

_addRec = (sheetName)=>{
  document.getElementById('input-submit').style.visibility = 'hidden'
  _loader('2','on')
  _gas.crud( "CREATE" , "row", {
    sheetName: sheetName,
    //_Id: false,
    content: {
      "Movie Name": document.getElementById('movie-name').value,
      "Notes & Quotes": document.getElementById('movie-notes').value,
      // "edit": false,
      // "delete": 'false',
    }
  }).then( payload => {
    if (!payload.error) {
      _build_sheet_tables(sheetName, payload.data)
    }
  }).finally( ()=>{
    _loader('2','off')
    document.getElementById('movie-name').value = ''
    document.getElementById('movie-notes').value = ''
    document.getElementById('input-submit').style.visibility = ''
  })
}

_editRec = (sheetName, nameVal, notesVal, id)=>{
  _loader('2','on')
  _gas.crud( "UPDATE" , "row", {
    sheetName: sheetName,
    _Id: id,
    content: {
      "Movie Name": nameVal,
      "Notes & Quotes": notesVal
    }
  }).then( payload => {
    if (!payload.error) {
      _build_sheet_tables(sheetName, payload.data)
    }
  }).finally( ()=>{
    _loader('2','off')
  })
}

_deleteRec = (sheetName, id)=>{
  _loader('2','on')
  _gas.crud( "DELETE" , "row", {
    sheetName: sheetName,
    _Id: id,
  }).then( payload => {
    if (!payload.error) {
      _build_sheet_tables(sheetName, payload.data)
    }
  }).finally( ()=>{
    _loader('2','off')
  })
}

_edit = (Id)=>{
  // Make NAME as input & focus
  const name = document.getElementById('Movie Name-'+Id)
  const nameVal = name.innerHTML
  name.innerHTML = `<input id='edit-rec-name' value="${nameVal}" class='w100'>`
  const inputName = document.getElementById('edit-rec-name')
  const len = inputName.value.length
  inputName.focus()
  inputName.setSelectionRange(len, len)
  // Make NOTES and input
  const notes = document.getElementById('Notes & Quotes-'+Id)
  const notesVal = notes.innerHTML
  notes.innerHTML = `<input id='edit-rec-notes' value="${notesVal}" class='w100'>`
  // Toggle DELETLE / * CANCEL * button
  const deleteCancelBtn = document.getElementById('delete-cancel-'+Id)
  deleteCancelBtn.innerHTML = '* Cancel *'
  deleteCancelBtn.onclick = ()=>{
    name.innerHTML = nameVal
    notes.innerHTML = notesVal
    editBtn.innerHTML = 'Edit'
    deleteCancelBtn.innerHTML = 'Delete'
    deleteCancelBtn.onclick = ()=>{
      _deleteRec("Movies to watch", Id)
    }
    editBtn.onclick = ()=>{ _edit(Id) }
    currentEdit = false
  }
  // Toggle EDIT / SUBMIT button
  const editBtn = document.getElementById('editBtn-'+Id)
  editBtn.innerHTML = 'Submit'
  editBtn.onclick = ()=>{
    const name = document.getElementById('edit-rec-name').value
    const notes = document.getElementById('edit-rec-notes').value
    _editRec("Movies to watch", name, notes, Id)
  }
  // Toggle other inputs and buttons if open
  if (currentEdit) currentEdit.click()
  currentEdit = deleteCancelBtn
}

_loader = (num, direct_state_change)=>{
  if (direct_state_change) {
    if (direct_state_change === 'on') _loaders[num] = true
    if (direct_state_change === 'off') _loaders[num] = false
  } else {
    _loaders[num] = !_loaders[num]
  }
  document.getElementById('loader'+num).style.display = _loaders[num] ? '' : 'none'
}
