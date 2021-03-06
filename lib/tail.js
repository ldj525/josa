'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// tailHangul : string -> number
// Produces the tail consonant value of c.
// Assume c is a one-letter Hangul string.
var tailHangul = function tailHangul(c) {
  return (c.charCodeAt(0) - 44032) % 28;
};

// tailDigit : string -> number
// Produces the tail consonant value of d.
// Assume d is a one-letter digit.
var tailDigit = function tailDigit(d) {
  switch (d) {
    case '2':
    case '4':
    case '5':
    case '9':
      return 0;
    case '1':
    case '7':
    case '8':
      return 8;
    case '0':
      return 21;
    case '3':
      return 16;
    case '6':
      return 1;
  }
};

// tailEnglish : string -> number
// Produces the tail consonant value of cc.
// Assume cc is a two-letter English string.
var tailEnglish = function tailEnglish(cc) {
  return (/.n/i.test(cc) ? 4 : /ne/i.test(cc) ? 4 : /.l/i.test(cc) ? 8 : /le/i.test(cc) ? 8 : /.m/i.test(cc) ? 16 : /.p/i.test(cc) ? 17 : /et/i.test(cc) ? 19 : /ng/i.test(cc) ? 21 :
    /* else */0
  );
};

// tailEnglishInitial : string -> number
// Produces the tail consonant value of c.
// Assume c is a single-letter English string.
var tailEnglishInitial = function tailEnglishInitial(c) {
  switch (c.toLowerCase()) {
    case 'l':
    case 'r':
      return 8;
    case 'm':
      return 16;
    case 'n':
      return 4;
    default:
      return 0;
  }
};

// tail : string -> number
// Produces the tail consonant value of the last character (if possible).
// The return value 0 means no tail consonant.
//   - http://gernot-katzers-spice-pages.com/var/korean_hangul_unicode.html
var tail = function tail(word0) {
  var go = function go(word) {
    if (!word) throw new Error("There's no letter that can possibly have a tail consonant: " + word0);

    // Ignore text inside parentheses.
    var w = word.replace(/\([^)]*\)$/, '');
    var last = w[w.length - 1];

    if (/[가-힣]/.test(last)) return tailHangul(last);

    if (/\d/.test(last)) return tailDigit(last);

    if (/[a-z]{2}$/i.test(w)) return tailEnglish(w.slice(w.length - 2, w.length));

    if (/(?:^|[^a-z])[a-z]$/i.test(w)) return tailEnglishInitial(last);

    if (/[a-z][^a-z]?$/i.test(w)) return tailEnglishInitial(w[w.length - 2]);

    return go(w.slice(0, w.length - 1));
  };

  return go(word0);
};

// hasTail : string -> boolean
// Does a given word end with a tail consonant?
var hasTail = function hasTail(w) {
  return tail(w) !== 0;
};

exports.tailHangul = tailHangul;
exports.tailDigit = tailDigit;
exports.tailEnglish = tailEnglish;
exports.tailEnglishInitial = tailEnglishInitial;
exports.tail = tail;
exports.hasTail = hasTail;