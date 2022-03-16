const request = {

  page: function(app, callback) {
    const loader = setloader(_loader, "loader1")
    app.gasup.read.sheet({ sheetId: app.sheetId })
      .then( resp => this.success(app, resp.data.rows, callback, loader) )
      .catch( error => this.error(error, callback, loader))
  },


/* 🐣 Response result handlers 🐣 */
  success: function(app, data, callback, { loader, lId } ) {
    loader.off(lId)
    callback(app, data)
  },

  error: function(error, callback, { loader, lId } ) {
    loader.off(lId)
    console.log(" * ❌😵‍💫 GAS Up > error :", error)
  }

}
