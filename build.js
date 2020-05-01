#!/usr/bin/env node

/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt - codeclou.io
 * https://github.com/codelcou/bilderrahmen
 */
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

const currentDir = shell.pwd().stdout;
const relativePath = (_path) => {
    const absolutePath = path.resolve(currentDir, _path);
    return absolutePath;
};

if (shell.test("-d", relativePath("./dist"))) {
    shell.rm("-rf", relativePath("./dist/"));
    shell.mkdir(relativePath("./dist/"));
}

//
// TYPINGS
//
shell.exec("tsc -d --module es2015 --target es2015  --outDir dist/typings");
shell.mv("dist/typings/bilderrahmen.d.ts", "dist/");
shell.rm("-rf", "./dist/typings");

//
// DIFFERENT MODULE BUILDS
//
shell.exec("tsc --module umd --target es5 --outDir dist/umd--es5");
shell.mv("dist/umd--es5/bilderrahmen.js", "dist/bilderrahmen.umd.es5.js");
shell.rm("-rf", "./dist/umd--es5");

shell.exec("tsc --module es2015 --target es5  --outDir dist/es2015--es5");
shell.mv("dist/es2015--es5/bilderrahmen.js", "dist/bilderrahmen.es2015.es5.js");
shell.rm("-rf", "./dist/es2015--es5");

shell.exec("tsc --module es2015 --target es2015  --outDir dist/es2015--es2015");
shell.mv(
    "dist/es2015--es2015/bilderrahmen.js",
    "dist/bilderrahmen.es2015.es2015.js"
);
shell.rm("-rf", "./dist/es2015--es2015");

//
// COMPRESS UMD BUNDLE
//
shell.exec(
    'uglifyjs  --compress --mangle --reserved "Bilderrahmen" --comments --output dist/bilderrahmen.umd.es5.min.js  dist/bilderrahmen.umd.es5.js'
);

//
// BUILD CSS
//
shell.exec("cp src/bilderrahmen.css dist/bilderrahmen.css");
shell.exec("postcss src/bilderrahmen.css > dist/bilderrahmen.min.css");

//
// WRITE FINAL LIB package.json
//
const templatePackageJson = JSON.parse(
    fs.readFileSync(relativePath("./build-package-json-template.json"))
);
const sourcePackageJson = JSON.parse(
    fs.readFileSync(relativePath("./package.json"))
);
// set values
templatePackageJson.version = sourcePackageJson.version;
templatePackageJson.description = sourcePackageJson.description;
fs.writeFileSync(
    relativePath("./dist/package.json"),
    JSON.stringify(templatePackageJson, null, 2)
);
