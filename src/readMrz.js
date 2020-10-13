'use strict';
var _options;

const { join } = require('path');

const mrzOcr = require('./internal/mrzOcr');
const symbols = require('./internal/symbols'); // SYMBOLS MRZ NUMBERS
const roiOptions = require('./roiOptions');

const fingerprintOptions = {
  baseDir: join(__dirname, '../fontData'),
  height: 12,
  width: 12,
  minSimilarity: 0.5,
  fontName: 'ocrb',
  category: symbols.label,
  ambiguity: true
};

var fontFingerprint = require('../fontData/12x12/mrz/ocrb.json');

async function readMrz(image, options = {}) {
  var { ocrResult, mask } = await mrzOcr(image, fontFingerprint, {
    method: 'svm',
    fs: _options.fs,
    roiOptions,
    fingerprintOptions
  });

  if (options.saveName) {
    mask.save(options.saveName);
  }

  return ocrResult;
  // return ocrResult.lines.map((line) => line.text);
}

module.exports = function(options) {
  _options=options;
  return readMrz;
}
