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

const Thing = class Thing {

  constructor (opt) {

    let parentThing;
    let hasParent;

    parentThing = opt.parentThing || null;

    this.name = opt.name;
    this.uriName = opt.uriName || this.name;
    this.pluralUriName = opt.pluralUriName || this.uriName + 's';
    this.uriPrefix = opt.uriPrefix;
    this.idProperty = opt.idProperty;
    this.parentThing = parentThing;

    this.additionalSubRoutes = opt.additionalSubRoutes || [];

    this.provide = opt.provide || {};

    this.subThings = [];

    hasParent = null !== parentThing;
    if (hasParent) {
      parentThing.connect(this);
    }

  }

  get hasListRoute () {
    return this.provide.l === true;
  }

  get hasCreateRoute () {
    return this.provide.c === true;
  }

  get hasReadRoute () {
    return this.provide.r === true;
  }

  get hasUpdateRoute () {
    return this.provide.u === true;
  }

  get hasDeleteRoute () {
    return this.provide.d === true;
  }

  connect (subThing) {
    this.subThings.push(subThing);
    this.bubbleConnect(subThing);
  }

  bubbleConnect (subThing, subSubThing) {

    let parentThing = this.parentThing;

    let isRoot;

    isRoot = null === parentThing;
    if (isRoot) {
      return;
    }

    parentThing.bubbleConnect(this, subThing);

  }

  routes (prefix) {

    let thisRouteURI;
    let r = [];

    prefix = prefix || '';

    thisRouteURI = `${prefix}/${this.uriPrefix}{${this.idProperty}}`;

    let canCreate = this.hasCreateRoute;
    if (canCreate) {
      r.push(`  POST   ${prefix}/${this.pluralUriName}`);
    }

    let canList = this.hasListRoute;
    if (canList) {
      r.push(`  GET    ${prefix}/${this.uriName}/List`);
    }

    this.hasReadRoute &&
      r.push('  GET    ' + thisRouteURI);

    this.hasUpdateRoute &&
      r.push('  PUT    ' + thisRouteURI);

    this.hasDeleteRoute &&
      r.push('  DELETE ' + thisRouteURI);

    this.additionalSubRoutes.forEach((route) => {
      r.push(`* ${route.method}    ${thisRouteURI}/${route.uri}`);
    });

    this.subThings.forEach((thing) => {
      let subThingPrefix = thisRouteURI;
      r.push(...thing.routes(subThingPrefix));
    });

    return r;

  }

};

module.exports = function () {

  let things = {};

  things.User = new Thing({
    name: 'User',
    uriPrefix: 'U/',
    idProperty: 'UserID',
    provide: {
      // r: true,
    },
    // additionalSubRoutes: [
    //   { method: 'PUT', uri: 'Password' },
    // ],
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

};
