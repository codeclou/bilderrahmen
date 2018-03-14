# Development


**Start**
```
npm install
npm start
```

Goto

 * [http://localhost:7575/test/](http://localhost:7575/test/)


&nbsp;

# Release

**Howto Publish to npmjs.org**

:bangbang: DONE BY JENKINS ON TAGGED VERSIONS

 * (1) Create a new Release and Tag on GitHub (Web-Gui)
 * (2) Jenkins Job triggers `npm run build`
 * (3) Jenkins deployes tags to npmjs (dist dir)
