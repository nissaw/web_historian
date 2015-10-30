// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// use cron to run htmlfetcher
// call download URls on a schedule

var archive = require('../helpers/archive-helpers');
archive.downloadUrls();

