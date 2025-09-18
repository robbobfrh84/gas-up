const request = {

  page: function(callback) {
    const loader = setloader(_loader, "loader1")
    app.gasup.read.sheet({ sheetId: app.sheetId })
      .then( resp => this.success(resp.data.rows, callback, loader) )
      .catch( error => this.error(error, callback, loader))
  },

  vote: function(callback, rowId) {
    const loader = setloader(_loader, "loader1")
    app.gasup.update.row({ 
      sheetId: app.sheetId, 
      rowId: rowId,
      type: {
        increment: "stars"
      }
    })
    .then( resp => this.success(resp.data, callback, loader) )
    .catch( error => this.error(error, callback, loader))
  },


/* 🐣 Response result handlers 🐣 */
  success: function(data, callback, { loader, lId } ) {
    loader.off(lId)
    callback(data)
  },

  error: function(error, callback, { loader, lId } ) {
    loader.off(lId)
    console.log(" * ❌😵‍💫 GAS Up > error :", error)
  }

}
