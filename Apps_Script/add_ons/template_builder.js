function template_builder({ url, vars }) {
  const response = UrlFetchApp.fetch(url)
  let fileText = response.getContentText()

  let htmlString = fileText
  Object.keys(vars).forEach( v => {
    const fileArr = htmlString.split("<?gasupTemplate-"+v+"/>")
    htmlString = fileArr.join(vars[v])
  })

  return htmlString
}
