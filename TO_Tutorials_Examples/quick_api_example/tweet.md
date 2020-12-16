### Tweet 1

🥧 Quick PI API 🥧

🌍 script.google.com

🔗👇 📝 code 👉 save

Publish 👉 Deploy as web app

👀: Anyone, even anonymous

{Deploy} 👉 {Ok}

Publish > Deploy from manifest

🚨 just COPY link 🚨 - 🥺 * don't ❌click❌

📝 url + 👉 "?r=23"



### Tweet 2

function doGet(e) {
  const pie = JSON.stringify({
    pie: Math.PI,
    radius: parseInt(e.parameter.r),
    circumference: (e.parameter.r * Math.PI) * 2
  })
  return ContentService.createTextOutput(pie).setMimeType(ContentService.MimeType.JSON)
}
