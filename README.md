# My Memories App (WIP)
---
### Open source project for easily saving memorable moments.

Done:

* Node backend using Google Cloud Functions

To Do:

* Frontend
 * PWA built with StencilJS
 * deployable as static site to Google Cloud Hosting or to home server (Raspberry Pi, etc) via Docker

 User Steps (WIP):

 * generate Google Cloud projectID and keyfile
 * create/add api key

 Instructions (WIP)
 * Backend
  * npm run start (to start the Google Cloud Functions emulator)
  * npm run build (after any changes to the backend functions)
  * To load a function in the local emulator, you must fire the command from within the "lib" folder
   * functions deploy retrieveAll --trigger-http --local-path=~/Personal/MyMemories/gcloud-functions/lib/index.js
   * functions deploy retrieveByYear --trigger-http --local-path=~/Personal/MyMemories/gcloud-functions/lib/index.js
   * functions deploy save --trigger-http --local-path=~/Personal/MyMemories/gcloud-functions/lib/index.js
   * functions deploy login --trigger-http --local-path=~/Personal/MyMemories/gcloud-functions/lib/index.js
  * To stop a local function do "functions delete {functionName}"
   * ex: functions delete retrieveAll
   * This will not delete any code. It will only remove the locally running function from the emulator.
  * npm run stop (to stop the functions emulator)
  * npm run forceKill (to force stop the functions emulator if it's hung) 
    
