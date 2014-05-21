// Measures of Central Tendency And Dispersion: a JavaScript probability & statistics library
//
// It uses the [Javascript module pattern](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth)

var McTad = (function(pub) {

  if (typeof module !== 'undefined') {
    // Assign the `pub` object to exports, so that you can require
    // it in [node.js](http://nodejs.org/)
    module.exports = pub;
  }

  return pub;
}(McTad || {}));
