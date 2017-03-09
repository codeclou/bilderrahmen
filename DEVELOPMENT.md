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

:bangbang: Mind the license comment in `.babelrc` which will be written to the final js.file!

**Howto Publish to npmjs.org**

(0) Have it build and no pending commits

```
npm install
npm run build
```

(1) use this because of npm proxy:

```
npm --registry https://registry.npmjs.org/ login
npm --registry https://registry.npmjs.org/ publish
```

(2) Create Git Tag

```
git tag -a 0.0.15 -m "rel 0.0.15"
git push origin 0.0.15
```

(3) Go to github releases and create release from tag.

(4) Increase version in package.json.

```
git add . -A && git commit -m "version bump" && git push
```
