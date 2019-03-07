# My Memories App
---
### Open source project for easily saving memorable moments.

* Node backend using Google Cloud Functions
* Frontend PWA built with StencilJS
  * deployable as static site
  * login key supported if frontend is deployed publicly 
  * login can be disabled if deployed privately (Raspberry Pi home server, etc)
    * to disable, set value to false on line 13 of frontend/src/components/app-home/app-home.tsx

### User Steps
#### From "Frontend" Folder
 * generate Firebase json keyfile and store in root of src folder
   * [Instructions](https://firebase.google.com/docs/web/setup)
   * update db.js to import this keyfile
 * create apiKey.js in root of src folder that looks like the following
```export const apiKey = 'YOUR API KEY HERE';```
   * [This site works well](https://www.uuidgenerator.net/)   
 * ```npm install && npm run build``` from root of "frontend" folder  
#### From "gcloud-functions" folder 
 * install firebase cli then run ```firebase init``` from inside the "frontend" folder to setup the firebase link
 * ```firebase deploy``` from inside the "frontend" folder
 * After deploying your frontend PWA, update index.js to reflect the correct URL for each ```Access-Control-Allow-Origin``` header
 * install gcloud cli   
 * ```npm install && npm run build``` from root of "gcloud-functions" folder
 * from inside gcloud-functions/functions folder run the following command for each function exported in gcloud-functions/src/index.js
 ```gcloud functions deploy {FUNCTION NAME} --runtime nodejs6 --trigger-http```
   * example: ```gcloud functions deploy retrieveAll --runtime nodejs6 --trigger-http```
    
