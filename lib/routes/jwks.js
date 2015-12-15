/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const config = require('../config');

const KEYS = (function() {
  var priv = config.get('openid.key');

  function pub(key) {
    return {
      kty: key.kty,
      alg: 'RS256',
      kid: key.kid,
      use: 'sig',
      n: key.n,
      e: key.e
    };
  }

  var keys = [pub(priv)];
  var old = config.get('openid.oldKey');
  if (Object.keys(old).length) {
    keys.push(pub(old));
  }
  return { keys: keys };
})();

module.exports = {
  handler: function jwks(req, reply) {
    reply(KEYS);
  }
};
