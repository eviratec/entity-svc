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

const db = require('./src/apps');

module.exports = function (app) {

  const USER_ID_PREFIX = 'U';
  const ENTITY_ID_PREFIX = 'E';
  const ENTITY_CLASS_PREFIX = 'T';
  const ATTR_KEY_PREFIX = 'A';

  const USER_CLASS_NAME = 'User';
  const LIST_CLASS_NAME = 'List';
  const USER_ID = ':UserID';
  const ENTITY_CLASS_NAME = ':EntityClassName';
  const ENTITY_ID = ':EntityID';
  const ATTRIBUTE_KEY = ':AttributeKey';
  const TYPE_ENTITY_CLASS_NAME = 'Type';

  const URI = {

    /**
     * #/U/:UserID
     */
     USER: apiUri([
      USER_ID_PREFIX,
      USER_ID,
    ]),

    /**
     * #/U/:UserID/T/:EntityClassName
     */
     TYPE: apiUri([
      USER_ID_PREFIX,
      USER_ID,
      ENTITY_CLASS_PREFIX,
      ENTITY_CLASS_NAME,
    ]),

    /**
     * #/U/:UserID/T/:EntityClassName/A/:AttributeKey
     */
     TYPE_ATTR: apiUri([
      USER_ID_PREFIX,
      USER_ID,
      ENTITY_CLASS_PREFIX,
      ENTITY_CLASS_NAME,
      ATTR_KEY_PREFIX,
      ATTRIBUTE_KEY,
    ]),

    /**
     * #/U/:UserID/T/:EntityClassName/E/:EntityID
     */
     ENTITY: apiUri([
      USER_ID_PREFIX,
      USER_ID,
      ENTITY_CLASS_PREFIX,
      ENTITY_CLASS_NAME,
      ENTITY_ID_PREFIX,
      ENTITY_ID,
    ]),

    /**
     * #/U/:UserID/T/:EntityClassName/E/:EntityID/A/:AttributeKey
     */
     ENTITY_ATTR: apiUri([
      USER_ID_PREFIX,
      USER_ID,
      ENTITY_CLASS_PREFIX,
      ENTITY_CLASS_NAME,
      ENTITY_ID_PREFIX,
      ENTITY_ID,
      ATTR_KEY_PREFIX,
      ATTRIBUTE_KEY,
    ]),

  }

  let routes = [];

  function fetchItemOrTypeList (UserID, EntityClassName, EntityID, res) {

    let isTypeListRequest;

    isTypeListRequest = TYPE_ENTITY_CLASS_NAME === EntityClassName;
    if (isTypeListRequest) {
      return fetchTypeList(UserID, EntityClassName, res);
    }

    return fetchItemList(UserID, EntityClassName, res);

  }

  function fetchItemList (UserID, EntityClassName, res) {

    return db.fetchItemList(UserID, EntityClassName)
      .then(function (itemList) {
        return res.send(JSON.stringify(itemList, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }

  function fetchTypeList (UserID, EntityClassName, res) {

    return db.fetchTypeList(UserID)
      .then(function (typeList) {
        return res.send(JSON.stringify(typeList, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }

  // GET /User/:UserID/:EntityClassName
  addRoute(app.get(URI.TYPE, (req, res) => {

    let UserID = req.params.UserID;
    let EntityClassName = req.params.EntityClassName;
    let EntityID = req.params.EntityID;

    db.fetchTypeByClassName(UserID, EntityClassName)
      .then(function (entity) {
        return res.send(JSON.stringify(entity, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  // GET /User/:UserID/:EntityClassName/:EntityID
  addRoute(app.get(URI.ENTITY, (req, res) => {

    let UserID = req.params.UserID;
    let EntityClassName = req.params.EntityClassName;
    let EntityID = req.params.EntityID;

    // GET /User/:UserID/:EntityClassName/List
    if (LIST_CLASS_NAME === EntityID) {
      req.params.AttributeKey = EntityID;
      return fetchItemOrTypeList(UserID, EntityClassName, EntityID, res);
    }

    // Non-numerical EntityID
    if (false === /^[0-9]+$/.test(EntityID)) {
      let AttributeKey = EntityID;
      return db.fetchTypeAttribute(UserID, EntityClassName, AttributeKey)
        .then(function (typeAttribute) {
          return res.send(JSON.stringify(typeAttribute, undefined, '  '));
        })
        .catch(err => {
          console.log(err.message);
          console.log(err.stack);
        });
    }

    db.fetchEntityById(UserID, EntityClassName, EntityID)
      .then(function (entity) {
        return res.send(JSON.stringify(entity, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  // GET /User/:UserID/:EntityClassName/:AttributeKey
  addRoute(app.get(URI.TYPE_ATTR, (req, res) => {

    let UserID = req.params.UserID;
    let EntityClassName = req.params.EntityClassName;
    let AttributeKey = req.params.AttributeKey;

    // GET /User/:UserID/:EntityClassName/List
    if (LIST_CLASS_NAME === AttributeKey) {
      return fetchItemOrTypeList(UserID, EntityClassName, AttributeKey, res);
    }

    db.fetchTypeAttribute(UserID, EntityClassName, AttributeKey)
      .then(function (typeAttribute) {
        return res.send(JSON.stringify(typeAttribute, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  // PUT /User/:UserID/:EntityClassName/:EntityID/:AttributeKey
  addRoute(app.put(URI.ENTITY_ATTR, (req, res) => {

    let UserID = req.params.UserID;
    let EntityClassName = req.params.EntityClassName;
    let EntityID = req.params.EntityID;
    let AttributeKey = req.params.AttributeKey;

    let newValue = '';

    req.on('data', (chunk) => {
      newValue = newValue + chunk;
    });

    db.fetchEntityAttribute(UserID, EntityClassName, EntityID, AttributeKey)
      .then(function (entityAttribute) {
        entityAttribute.set('AttributeValue', newValue);
        return res.send(JSON.stringify(entityAttribute, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  // GET /User/:UserID/:EntityClassName/:EntityID/:AttributeKey
  addRoute(app.get(URI.ENTITY_ATTR, (req, res) => {

    let UserID = req.params.UserID;
    let EntityClassName = req.params.EntityClassName;
    let EntityID = req.params.EntityID;
    let AttributeKey = req.params.AttributeKey;

    db.fetchEntityAttribute(UserID, EntityClassName, EntityID, AttributeKey)
      .then(function (entityAttribute) {
        return res.send(JSON.stringify(entityAttribute, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  return routes;

  function addRoute (route) {
    routes.push(route);
  }

  function apiUri (arr) {
    return '/' + arr.join('/');
  }

};
