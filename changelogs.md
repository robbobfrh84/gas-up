# Change Logs
NOTE: Logs added in descending order(newest up top)

## Template
### vX.X.X 
<Short Descriptions / title>
- Commit Sha:
- Deploy Version:
- Permanent URL Version ID(#???): ``
- Client Side `Gasup_vX.X.X.js` added (ONLY IF IT WAS CHANGED!)
- Updated
  - ... like, did you update the version for "GAS Up starter 13 -> to -> 16"?
  - ... example: "tobob.earth: client `gasup.js` -> v1.0.2 -> v1.0.3"
- NOTES:
  -

----

### v1.1.0 
Single User Authentication Addition
- Commit Sha: 2638bf02b55a38649a7b91efb7d1175ac92559e5
- Deploy Version: Version 22 on Mar 16, 7:46 AM
- Permanent URL Version ID(25): `AKfycbwu9tQSLZ-AXYs8h6nVuqxb_zdi6gmHnjPKOw4udfGGNybtTGAk8rKiFIHIxkZhog0uIQ`
- Client Side `Gasup_v1.1.0.js` 
- Updated
  - Client side gets addition of `app` as a top level parameter in requests, same level as scope & request
    - This is only for passwords and app names at this point
  - Autentication for Public and Single User apps! 
    - First basic implimentation of this, we had to create and generate a developerMetadata object to relay info from library to sheet user.
    - Public is just as before, but with that variable set
    - Single User uses 1 password and can alway make read gsheet and read "specified" sheets public
- NOTES:
  - We created a placeholder for "users" the third option for authentication and most complicated. But still needs to be built, if ever.
  - Single User's publicRequests is also incomplete. Maybe add rows and public `update` requests down the line....
  
### v1.0.4 
Adding Increment value to an update row value
- Commit Sha: e19abe52a5196f19b52ebf5861410b2462c5b2d7
- Deploy Version: Version 20 on Dec 3, 4:19 PM
- Permanent URL ID (21): `AKfycbyNU31L91lHbB5iJtLYb2kF-h1usQHKIclJFlt58xQGv3LLd__Wy4nNat721b3IP0SgGA`
- Client Side `Gasup_v1.0.4.js` added 
- Updated
  - Added 'type' option to update row and 'increment' action to add +1 to cell value in row.
- NOTES:
  - This is the only operation for use the 'type' option when replacing 'row' option in update row.


### v1.0.3 
Top 5, raw image function handler
- Commit Sha: a8a50c8b0b614bb2c2a94bc686680dab168d9666
- Deploy Version: Version 19 on Dec 1, 9:46 AM
- App versions updated
  - tobob.earth: client `gasup.js` -> v1.0.2 -> v1.0.3
- NOTES:
  - pretty big and dirty update with a lot of changes on the fly as I built out top 5.


### v1.0.2 
Adding changes to `menu.js` within new Add-ons Google sheet Environment.
- Commit Sha: 0a6aa6369b25890e8f33094eb264a1ca46c494ad
- Deploy Version: Version 14 on Nov 10, 11:30 AM
- App versions updated
  - GAS Up starter 13 -> to -> 14
- NOTES:
  - This was all work around building the GAS Up starter Google Sheet and menu operations.

### v1.0.1 
GAS Up CRUD ALL Journey tester & Keys refactor
- Commit Sha: 6af2d3d0b5ff3074ad9bbc640f039278599a2d3c
- Deploy Version: Version 13 on Oct 15, 2:51 PM
- App versions updated
  - None.
- NOTES:
  - GAS Up CRUD All Journey
  - Refactoring `create sheet`(with keys) and `create keys` to use same method
  - Some formatting error handling for `create keys`

### v1.0.0 
GAS CRUD API
- Commit Sha: 089d372d84cd61018e15adf51e24bd98eafd8c56
- Deploy Version: 12
- Apps versions updated
  - GAS Up Starter: Version: 12
- NOTES:
  - Here it is! OG v1.0.1 🍾!
