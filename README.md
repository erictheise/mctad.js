![Travis CI Build Status](https://travis-ci.org/erictheise/mctad.js.svg?branch=master)

mctad.js
========

Measures of Central Tendency And Dispersion: A JavaScript library for probability &amp; statistics

### About
Informed by [simple-statistics], [science.js], [R].

### Use

#### End-users


#### Developers


### Conventions

Greek letters.
Type hinting, even if it's an untyped language.

#### Continuous and Discrete Probability Distributions

Any distribution can be called by its common name and its required parameters, e.g., `mctad.poisson(7)`. This returns an object containing:

  * statistics on the distribution
    * _mean_
    * _median_
    * _mode_
    * _variance_
    * _skewness_
    * _entropy_
  * _pmf_, the _probability mass function_
  * _cdf_, the _cumulative_distribution_function_
  * convenience methods to access _pmf_ as _P(X)_ and _cdf_ as _F(X)_
  * _generate(n)_, a method for generating _n_ random variables from the distribution

making it possible to say things such as

  * `mctad.poisson(7).mean`
  * `mctad.poisson(7).P(5)`
  * `mctad.poisson(7).F(2)`
  * `mctad.poisson(7).generate(36)`

Statistics on the distributions will return `undefined` if not implemented (this is version 0.1.0) or if actually not defined for the distribution. Since there need not be a single mode, `mode` always returns an Array.


### Tests
_mctad.js_ uses [mocha]() with [chai assertions]() as a [grunt](http://gruntjs.com/) task to run the test suite. The general format of the tests is to test exceptions before testing functionality. When possible, test data is taken from a wikipedia article or other hopefully long-lived reference. If these are not available, hand-worked examples are used for testing.


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
  * harmonic mean
  * confidence intervals

* discrete
  * generators
  * tests for generators

* continuous
  * distributions
    * normal
    * lognormal
    * student's t
    * chi square
    * beta
  * generators
  * tests for generators

* chi square goodness of fit
* analysis of variance
* linear regression
