function bucketPublic() {
  const { blob, json } = buildStaticJson(this.config.bucketParams.GASUP_PRIVATE) // in built
  console.log(" * json :", json)

  //...
  SpreadsheetApp.getUi().alert(/*html*/`
    🏗 WIP. See bucketJson/bucketJsonPublic.js \n
    ---- \n
    ${JSON.stringify(json, null, 2)}
  `)
}
