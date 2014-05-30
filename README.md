mctad.js
========

## Measures of Central Tendency And Dispersion: A JavaScript library for probability &amp; statistics

### About
Informed by [simple-statistics], [science.js], [R].


### Use

#### End-users


#### Developers


### Tests
_mctad.js_ uses [mocha]() with [chai assertions]() as a [grunt](http://gruntjs.com/) task to run the test suite. The general format of the tests is to test exceptions before testing functionality. When possible, test data is taken from a wikipedia article or other hopefully long-lived reference.


### Documentation
_mctad.js_ runs [groc](http://nevir.github.io/groc/) as a [grunt](http://gruntjs.com/) task to automatically generate html documentation from comments in the source code. Access the documentation by opening a browser on your local copy of `/doc/index.html`.

My contract with myself is to provide

  * purpose of the method
  * input and output formats
  * where the method is used, if primarily internal
  * a link to a wikipedia article or other hopefully long-lived reference
  * a blank line between the introduction and the function declaration
  * inline comments about key parameters and non-obvious calculations

Please alert me if you see me breaking my own contract. Contributions should follow this approach.


### Contributing


### To Do

* statistics
  * other means
  * confidence intervals

* discrete
  * generators

* continuous
  * distributions
    * uniform
    * triangle
    * exponential
    * normal
    * student's t
    * chi square
    * beta
  * generators

* chi square goodness of fit
* analysis of variance
* linear regression
