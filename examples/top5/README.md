# Top 5 ranking app with Google sheets

### How to replicate your own top 5
File > Copy the following Google Sheet: https://docs.google.com/spreadsheets/d/1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU/edit?usp=sharing
- Copy the `gas-up/examples/top5` folder and save it where you want to host your app.
- Open `onload.js`, in the start function, find where the  `app` is created and the `gasup` within it is instantiated (should have a`// ⭐️ Google Sheet Id.` note next to it).
- replace the `id` with your google sheet id you copied from before.
- You should be good to go.
- Questions: See https://github.com/robbobfrh84/gas-up/discussions for help.

# Top 5 Resources

### Google Cloud Storage Bucket: Image storage location
- Bucket: `gasup`
- Bucket Link: https://console.cloud.google.com/storage/browser/gasup;tab=objects?forceOnBucketsSortingFiltering=false&project=cloud-storage-314216&prefix=&forceOnObjectsSortingFiltering=false
- Bob's top 5: https://console.cloud.google.com/storage/browser/gasup/top5/bob?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=cloud-storage-314216&prefix=&forceOnObjectsSortingFiltering=false
