# `S`mart `Calc`ulator
Smart Calculator for Nodejs without using `eval` function.

Focus on keeping the native math expression with all type of [Polish notations](https://en.wikipedia.org/wiki/Polish_notation).
Full-Supported the [JS's Math functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) with some extension functions.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![build status](https://secure.travis-ci.org/dominhhai/calculator.svg)](http://travis-ci.org/dominhhai/calculator)

# Show case
## infix
```
100 = 100
1 + -5 = -4
-1 + 5 = 4
-1 + -5 = -6
abs[-1] + 2 = 3
abs[-1] + 2^3 = 9
-1 - |-3| + 2^5 = 28
-10 - abs(-3) + 2^5 = 18
-1 - abs(-3) + pow[2, 5] = 28
sin(90) + 5 = 5.893996663600558
(PI - 1) * 3 = 6.424777960769379
PI + 1 + 10%3 = 5.141592653589793
5! + 2 = 122

pow(5,|1 - 4|) = 125
max(10, 20 + 5, 30 - 40, min ( 40, 100)) = 40
max(10, 20 + 5, min ( 40, 100) * 4,30 - 40) = 160

9 - 3 : 1/3 + 1 = 1
```

## postfix
```
1 -5 + = -4
-1 5 + = 4
-1 -5 + = -6
abs[-1] 2 + = 3
abs[-1] 2^3 + = 9
-1 |-3| - 2^5 + = 28
-10 abs(-3) - 2^5 + = 18
-1 abs(-3) - pow[2, 5] + = 28
sin(90) 5 + = 5.893996663600558
PI 1 - 3 * = 6.424777960769379
PI 1 + 10%3 + = 5.141592653589793
5! 2 + = 122

. 5 . 1 3 - abs. pow. = 25
. 10 20 5 + 30 40 - . 40 100 min. max. = 40
. 10 20 5 + . 40 100 min. 4 * 30 40 - max. = 160

9 3 1 3 / : - 1 + = 1
```

## prefix
```
+ 1 -5 = -4
+ -1 5 = 4
+ -1 -5 = -6
+ abs[-1] 2 = 3
+ abs[-1] 2^3 = 9
+ - -1 |-3| 2^5 = 28
+ - -10 abs(-3) 2^5 = 18
+ - -1 abs(-3) pow[2, 5] = 28
+ sin(90) 5 = 5.893996663600558
* - PI 1 3 = 6.424777960769379
+ + PI 1 10%3 = 5.141592653589793
+ 5! 2 = 122

.pow 5 .abs - 1 4 . . = 125
.max 10 + 20 5 - 30 40 .min 40 100 . . = 40
.max 10 + 20 5 * .min 40 100 . 4 - 30 40 . = 160

+ - 9 : 3 / 1 3 1 = 1
```

# Installation
Global scope:
`npm install scalc -g`

Local scope:
`npm install scalc --save`

# Usage
## Command Line
Wrap your expression with double quotes or single quotes

`scalc "your_expression"`

`scalc 'your_expression'`

or without any quotes

`scalc your_expression`

E.x: `scalc "1 + 5*(PI - 10 * 2^5)"` or `scalc 1 + 5*[PI - 10 * 2^5]`

The result will be copied to the system clipboard, so you can easily paste to anywhere.

## API
```
var scalc = require('scalc')
var result = scalc(your_expression)
```

# Contributing
Feel free to send your PRs!

1. Fork it ٩◔̯◔۶
2. Install dependencies: `npm install`
3. Test your changes: `npm test`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your repo: `git push`
5. Submit a pull request ♥‿♥

✌(-‿-)✌ You can use [git-u](https://www.npmjs.com/package/git-u) for quicker clone: `git-u your_name your_repo`

# License
[MIT](https://github.com/dominhhai/calculator/blob/master/LICENSE)
