# calculator
Smart Calculator for Nodejs without using `eval` function. 

Focus on keeping the native of math expression.
Supported full [JS's Math functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) with some extension functions. 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard) [![browser support](https://ci.testling.com/dominhhai/calculator.png)
](https://ci.testling.com/dominhhai/calculator)

### infix
```
abs[-1] + 2 = 3
abs[-1] + 2^3 = 9
(PI - 1) * 3 = 6.424777960769379
-1 + 5 = 4
-1 + -5 = -6
1 + -5 = -4
```

### prefix
```
+ 2 1 = 3
+ 2 -1 = 1
```

### postfix
```
2 1 + = 3
2 -1 + = 1
```
