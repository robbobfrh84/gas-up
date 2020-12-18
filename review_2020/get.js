function doGet(e) {
  const pie = JSON.stringify({
    pie: Math.PI,
    radius: parseInt(e.parameter.r),
    circumference: (e.parameter.r * Math.PI) * 2,
    msg: "Umm... you're welcome!"
  })
  return ContentService.createTextOutput(pie).setMimeType(ContentService.MimeType.JSON)
}
function testGet(){
  return doGet({parameter:{r:23}}).getContent()
}
