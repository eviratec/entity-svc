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

module.exports = class Thing {

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
      route('POST', `${prefix}/${this.pluralUriName}`, `create${this.name}`);
    }

    let canList = this.hasListRoute;
    if (canList) {
      route('GET', `${prefix}/${this.uriName}/List`, `get${this.name}List`);
    }

    this.hasReadRoute &&
      route('GET', thisRouteURI, `get${this.name}By${this.idProperty}`);

    this.hasUpdateRoute &&
      route('PUT', thisRouteURI, `update${this.name}By${this.idProperty}`);

    this.hasDeleteRoute &&
      route('DELETE', thisRouteURI, `delete${this.name}By${this.idProperty}`);

    this.additionalSubRoutes.forEach((route) => {
      route(route.method, `${thisRouteURI}/${route.uri}`, route.operationId);
    });

    this.subThings.forEach((thing) => {
      let subThingPrefix = thisRouteURI;
      r.push(...thing.routes(subThingPrefix));
    });

    return r;

    function route (method, uri, operationId) {
      r.push('| ' + [method, uri, operationId].join(' | ') + ' |');
    }

  }

};
