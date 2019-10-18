# Developing with a basic Google Apps Scripts CRUD API (Create, Read, Update, Delete)

### Prerequisites.
Note: this Guide is very similar in it's build flow as part1, but uses a fresh sheet, script and client-side code. So, it can stand alone as a guide.
* However, since it is similar we won't be going into detail on how to do a lot of the operations covered in part1.
* So, you may need to go reference part1 lost.

### Completed Examples and Links
* Example: [Google Sheet](https://docs.google.com/spreadsheets/d/1_H11Ws2sXCxY8jlLUV0mI-RsyrMBgdZ08fh9RsCF8Gc/edit#gid=0)
* Example: [Google Script](https://script.google.com/macros/d/MwSzb-cM7-GOIrcPa5Dh2OUEgAwng8dN7/edit?uiv=2&mid=ACjPJvE8bUdYgBVMbEfsTeWM9pvNfKE61yevvHNlkcIrh1xiLVvDQdkNddCxv4I8GE7SG9rG8M5j7fr_cjAuFxTCe-urbdCBbOMj-pyNpt_6IbPHzpEAhuaxagN93haRGE-jK1ZBQii4k38)
  * This source code can also found in the `.js` files within this folder
* Example URL: https://script.google.com/macros/s/AKfycbyATHfxHe6UHKZPxgZ3c7qNO7Li2ppiZ8GKWt-0kvGwmzygz40/exec?
* Example `GET` request Returns all data within all sheets of spreadsheet
  * Endpoint `action=GET&arg=all` > [link](https://script.google.com/macros/s/AKfycbyATHfxHe6UHKZPxgZ3c7qNO7Li2ppiZ8GKWt-0kvGwmzygz40/exec?action=GET&arg=all)
* Example post: as [ URL]()
* Example put: as [URL]()
* Example delete: as [URL]()
* Client Side Example: https://pair-programmers.github.io/gas-stack/04-google-script-api/part2-public-crud/



### Create a new Sheet, Script
Get started by logging into google and going to `sheets.google.com` > Rename as you like
* Tool > **Script Editor** > Rename as you like
* Publish > **Deploy as Web App**
* Select **NEW** > **Who has access to this app:** `Everyone, even anonymous`
  * NOTE: "access" is referencing _triggering_ the app, NOT viewing/editing the Google Sheet nor Script.
* Publish > **Deploy from manifest** > **web app meta-version**
* Copy that url for later 👈 That's **YOUR URL**
