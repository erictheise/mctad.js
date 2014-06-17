[![Travis CI Build Status](https://travis-ci.org/erictheise/mctad.js.svg?branch=master)](https://travis-ci.org/erictheise/mctad.js)
[![Dependency Status](https://gemnasium.com/erictheise/mctad.js.svg)](https://gemnasium.com/erictheise/mctad.js)

mctad.js
========

Measures of Central Tendency And Dispersion: A JavaScript library for probability &amp; statistics

### About

__mctad.js__ is a JavaScript library for probability and statistics. A goal is to provide functionality missing from other
such libraries, such as having an awareness of many common discrete and continuous probability distributions, an ability
to generate random variables from those distributions, and having a basic implementation of directional statistics.

### Use

#### End-users

You'll want either the file `mctad.min.js` or the file `mctad.js` in the root of this repository.

Groc-generated documentation is online courtesy [GitHub pages](http://erictheise.github.io/mctad.js/) and included in
the `/doc/` directory when you `git clone` this repository.

#### Developers


### Conventions

The ability to use Greek letters directly in code appeals to me, and they are used internally. I am still considering
the extent to which they should be exposed externally. In an ideal world, it would be reliable to use constructions such
as p-hat (p̂) and x-bar (x̄) as variable names.

Even though it makes little or no difference to the JavaScript language, you will come across examples of _type hinting_,
e.g., in the form of 1 versus 1.0, to help clarify whether quantities are operationally expected to take integer or real
values.

#### Continuous and Discrete Probability Distributions

Distributions can be called by their common names and required parameters, e.g., `mctad.poisson(7)`. This returns an
object containing:

  * statistics on the distribution, including

    * _mean_
    * _median_
    * _mode_
    * _variance_
    * _skewness_
    * _entropy_

  * _pdf_, the _probability density function_ (continuous distributions), or _pmf_, the _probability mass function_
    (discrete distributions)
  * _cdf_, the _cumulative_distribution_function_
  * convenience methods to access _pmf_ as _P(X)_ and _cdf_ as _F(X)_
  * _generate(n)_, a method for generating _n_ random variables from the distribution

making it possible to say things such as

  * `mctad.poisson(7).mean`
  * `mctad.poisson(7).P(5)`
  * `mctad.poisson(7).F(2)`
  * `mctad.triangular(3, 9, 4).generate(36)`
  * `mctad.normal(60.2, 4.5).generate(100)`

Statistics on the distributions will return `undefined` if not implemented (this _is_ version 0.0.X after all ) or if
actually not defined for the distribution. Since there need not be a single mode, `mode` always returns an Array.


### Tests
_mctad.js_ uses [mocha]() with [chai assertions]() as a [grunt](http://gruntjs.com/) task to run the test suite. The
general format of the tests is to test exceptions before testing functionality. When possible, test data is taken from a
wikipedia article or other hopefully long-lived reference. If these are not available, hand-worked examples are used for
testing.


### Documentation
_mctad.js_ runs [groc](http://nevir.github.io/groc/) as a [grunt](http://gruntjs.com/) task to automatically generate
html documentation from comments in the source code. Access the documentation by opening a browser on your local copy of
`/doc/index.html` or looking at the associated [GitHub pages](http://erictheise.github.io/mctad.js/).

My contract with myself is to provide

  * purpose of the method
  * input and output formats
  * where the method is used, if primarily internal
  * a link to a wikipedia article or other hopefully long-lived reference
  * a blank line between the introduction and the function declaration
  * inline comments about key parameters and non-obvious calculations

Please alert me if you see me breaking my own contract. Contributions should follow this approach.

### Short Term To Do

* statistics
  * confidence intervals
  * harmonic mean

* discrete
  * tests for generators

* continuous
  * distributions
    * chi square
    * student's t
    * beta
  * generators
  * tests for generators

* distributions that "self-estimate" when given an Array instead of parameters
* chi square goodness of fit
* analysis of variance

### Long Term To Do

?
