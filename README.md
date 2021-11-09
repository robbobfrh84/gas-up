<!-- [![Tweet](https://img.shields.io/twitter/url/https/github.com/jonsn0w/hyde.svg?style=social)](https://twitter.com/BobMain49) -->

[![clasp](https://github.com/google/clasp/actions/workflows/ci.yaml/badge.svg)](https://developers.google.com/apps-script/guides/clasp)
[![gas](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://developers.google.com/apps-script)
![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)
![made with love](https://img.shields.io/badge/Made%20With-Love-orange.svg)


# GAS Up ⛽️ 🚀
### Build dynamic client-side apps using Google Sheets as a database
- Build, read, update and delete sheets with client-side API requests.
- The connected google sheet is laid out _like_ a database with tables and entries.
- Customize your cloud "back-end" with an open-source Google Apps Script(GAS) library *here* in this repository!

### Accessible & updatable data, for a quick and light full-stack
- Build microsites
- Prototype web apps
- Host static data
- Integrate Iot apps and logging,
- Or, whatever else some wacky person might dream up 🤔😃🤯!

## GAS Up Stack
A complete GAS Up application consists of three major components.
- The **Client-side API library**
- A **Google Sheet**.  
- The **GAS Up** Apps Script Library "bound" to that Google Sheet.

### Getting started
For a "quick guide" to get up and running in a couple minutes, visit the [Getting started](https://github.com/robbobfrh84/gas-up/wiki/getting-started) section of our wiki.

### Documentation
All the documentation lives in our github [wiki](https://github.com/robbobfrh84/gas-up/wiki) page.

### Questions, bugs, issues, help, existentail crises relating to GAS Up
Visit our [discussion](https://github.com/robbobfrh84/gas-up/discussions) forum!


----
# How Does this work?
Google Sheets allow for javascript to control and automate Google Sheets with what they call "Google Apps Scripts". To see a simple example of this, start by creating a new [Google Sheet](sheet.google.com).
- Select: "Tools" > "Script editor" to see where you'd code your "Google Apps Script" app.
- Here, you can also add __Libraries__ that have already been created to do special things!

### **GAS Up** is an Apps Script library, and it's open source!
You don't even need to add any Google Apps Script code of your own to get started.
- GAS Up serves the API for client-side apps to directly. This allows the application to read and update data from any Google Sheet you own and allow access to. In addition, the Google Sheet itself can remain private.  

- For instance, say you want to use GAS Up to create a simple page view counter. The Google sheet that is being updated can remain private, while the client-side app is still allowed to "ping" the GAS Up API to incremented a cells values each time a webpage is loaded to a browser.
