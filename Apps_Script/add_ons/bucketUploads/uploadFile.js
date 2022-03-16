function uploadFile(service, obj, bucket, blob) {

  const bytes = blob.getBytes()

  const url = 'https://www.googleapis.com/upload/storage/v1/b/BUCKET/o?uploadType=media&name=FILE'
    .replace("BUCKET", bucket)
    .replace("FILE", encodeURIComponent(obj.FILE_PATH + "/" + obj.FILE_NAME))

  const response = UrlFetchApp.fetch(url, {
    method: "POST",
    contentLength: bytes.length,
    contentType: blob.getContentType(),
    payload: bytes,
    headers: {
      Authorization: 'Bearer ' + service.getAccessToken()
    }
  })

  return JSON.parse(response.getContentText())

}
