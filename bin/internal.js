/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const config = require('../lib/config').getProperties();
const db = require('../lib/db');
const logger = require('../lib/logging')('bin.internal');
const server = require('../lib/server/internal').create();

logger.debug('config', config);
db.ping().done(function() {
  server.start(function() {
    logger.info('listening', server.info.uri);
  });
}, function(err) {
  logger.critical('db.ping', err);
});
