function buildStaticJson() {

  // 🗓 Direct get all sheets as JSON upload.
  const json = getStaticJson("json", true)
  const blob = Utilities.newBlob(JSON.stringify(json, null, 2))

  // 💭 Direct Text upload
  // const blob = Utilities.newBlob("OH hi from gas-up lib")

  // 🔥 uploads from drive by file ID.
  // const blob = DriveApp.getFileById(this.config.bucketParams.DRIVE_FILE).getBlob()

  return { blob, json }

}
