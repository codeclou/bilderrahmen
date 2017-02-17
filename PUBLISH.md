# Howto Publish

INFO: jsdelivr/unpkg.com uses github `build/*` files

(0) publish to npm (use because of proxy)

```
npm --registry https://registry.npmjs.org/ login
npm --registry https://registry.npmjs.org/ publish
```

(1) Create Git Tag

```
git tag -a 0.0.15 -m "rel 0.0.15"
git push origin 0.0.15
```

(2) Go to github releases and create release from tag.

(3) Increase version in package.json.
