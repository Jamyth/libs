# Jamyth-CommitLint

A preset config of [commitlint](https://commitlint.js.org/#/) for [Git](https://git-scm.com/) commit message limitation.

Designed for internal projects

## Installation

```
yarn add -D husky commitlint jamyth-commitlint
or
npm i -D husky commitlint jamyth-commitlint
```

Then edit your package.json

```
{
    "dependencies": {},
    "husky": {
        "commit-msg": "commitlint --env HUSKY_GIT_PARAMS --config ./node_modules/jamyth-commitlint/dist/config.js"
    }
}
```

## Writing Your Own Config or Extends

```
// your-commitlint.config.js
const config = require('jamyth-commitlint');

module.exports = {
    ...config,
    // your configs
}
```
