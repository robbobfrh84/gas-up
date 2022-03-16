/* ...PLEASE...READ...ALL...OF...THIS...FIRST
  🚨 Making changes in Script Editor and saving will be...
  ...OVERRODE if you deploy clasp changes without `clasp pull` first
  - That's true for custom bash commands like `bob deploy`...
  AND, When deploying changes from clasp, you'll need to hard refresh here...
  BUT, make sure to to pull & deploy in clasp if you want to test changes you've made HERE!
  - I recommend if you're working from Script Editor to not have any of the files open in atom.
    It'll prevent syncing issues.
*/

function test_getConfig_1() { // 🚨 👀 to test this, you need to make sure that in bucketStaticJson.js you're using the "💭 Direct Text upload" option!
  return {
    session: Session,
    isManualTrigger: true,
    bucketParams: { // for uploading to a Google Cloud Storage Bucket
      CLIENT_ID: '961691554146-gnlflht9956qsceejog5g0r9n2ne6i8p.apps.googleusercontent.com',
      CLIENT_SECRET: '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',
      BUCKET_NAME: 'gasup',
      FILE_PATH: 'lab/json', // leave as empty string if no folder path.
      FILE_NAME: 'test_bucketStaticJson.json',
      DRIVE_FILE: '1QiNfM2DUmQxUIaR7fILBhCCsDNtXGhPJ',
      CALLBACK: 'test_authCallback'
    }
  }
}
function test_bucketStaticJson() {
  this.config = test_getConfig_1()
  bucketStaticJson()
}
function test_bucketLogout() {
  this.config = test_getConfig_1()
  bucketLogout()
}
function test_authCallback(request) {
  this.config = test_getConfig_1()
  authCallback(request)
}


function test_readSheet() {
  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'read',
      scope: 'sheet',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
    }
  })
  console.log("response: ", response)
}

function test_createRow() {
  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'create',
      scope: 'row',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
      row: JSON.stringify({
        rank: 90,
        poster: '=IMAGE("https://storage.googleapis.com/gasup/top5/bob/jurassic_park.jpg")'
      }),
    }
  })
  console.log("response: ", response)
}

function test_readRow() {
  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'read',
      scope: 'row',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
      rowId: 'r_OWWhc0AF_kw5jdy9w',
    }
  })
  console.log("response: ", response.data.row)
}

function test_updateRow() {
  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'update',
      scope: 'row',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '685369503',
      rowId: 'r_ma5BVlFc_kw2hu8pr',
      row: JSON.stringify({
        rank: 13,
      }),
    }
  })
  console.log("response: ", response)
}

function test_readCells() {
  const response = doGet({
    parameter: {
      testInScriptEditor: true,
      request: 'read',
      scope: 'cells',
      id: '1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU',
      sheetId: '1225106489',
      cells: 'A1:B2',
    }
  })
  console.log("response: ", response.data)
}
