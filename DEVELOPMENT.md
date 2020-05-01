# Development

**Start**

```
npm install
npm start
```

Goto

- [http://localhost:7575/test/](http://localhost:7575/test/)

&nbsp;

# Release

**Howto Publish to npmjs.org**

:bangbang: DONE BY GITHUB ACTIONS ON TAGGED VERSIONS

- (1) Create a new Release and Tag on GitHub (Web-Gui)
- (2) GitHub Actions triggers `npm run build`
- (3) GitHub Action deployes tags to npmjs (dist dir)
