const save_file_to_bucket = {

  authorize: /*html*/`
    <a href="<?= authorizationUrl ?>" target="_blank" style="font-size: 20px;">Authorization link</a>
    <br> <br>
    Once authorized... <br>
    👉 Please close the popup... <br>
    👉 And, select menu item <strong>again!</strong> <br>
  `,

  success: function(obj, bucket, x) { return /*html*/`
    <h2> File now in Google Cloud bucket</h2>
    <h4> Direct Link: </h4>
    <a target="_blank" href="https://storage.googleapis.com/${bucket}/${obj.FILE_PATH}/${obj.FILE_NAME}">
      https://storage.googleapis.com/${bucket}/${obj.FILE_PATH}/${obj.FILE_NAME}
    </a>
    <br>
    <h4> Bucket location: </h4>
    <a target="_blank" href="https://console.cloud.google.com/storage/browser/${bucket}/${obj.FILE_PATH}">
      https://console.cloud.google.com/storage/browser/${bucket}/${obj.FILE_PATH}
    </a>
  `},

  fail: /*html*/`
    <h3>
      Something went wrong saving your file to Google Cloud Storage Bucket. <br>
      &bull; Sorry, I just really don't have anything more to tell you...
    </h3>
  `,

}
