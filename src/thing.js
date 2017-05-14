/**
 * Copyright (c) 2017 Callan Peter Milne
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
'use strict';

const Thing = require('./Thing');

module.exports = function () {

  let things = {};

  things.User = new Thing({
    name: 'User',
    uriPrefix: 'U/',
    idProperty: 'UserID',
  });

  things.Type = new Thing({
    name: 'Type',
    uriPrefix: 'T/',
    idProperty: 'ClassName',
    parentThing: things.User,
    provide: {
      l: true,
      c: true,
      r: true,
    },
  });

  things.TypeAttribute = new Thing({
    name: 'TypeAttribute',
    uriName: 'Attribute',
    uriPrefix: 'A/',
    idProperty: 'AttributeKey',
    parentThing: things.Type,
    provide: {
      c: true,
      r: true,
      u: true,
    },
  });

  things.Entity = new Thing({
    name: 'Entity',
    pluralUriName: 'Entities',
    uriPrefix: 'E/',
    idProperty: 'EntityID',
    parentThing: things.Type,
    provide: {
      l: true,
      c: true,
      r: true,
      d: true,
    },
  });

  things.EntityAttribute = new Thing({
    name: 'EntityAttribute',
    uriName: 'Attribute',
    uriPrefix: 'A/',
    idProperty: 'AttributeKey',
    parentThing: things.Entity,
    provide: {
      r: true,
      u: true,
      d: true,
    },
  });

  let routes = things.User.routes();

  process.stdout.write(JSON.stringify(routes, undefined, '  '));
  process.stdout.write(''+routes.length);

  return routes;

};
