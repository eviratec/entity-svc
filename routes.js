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

const yaml = require('js-yaml');

const db = require('./src/apps');
const thing = require('./src/thing')();
const apiRoutesJson = JSON.stringify(thing.routes, undefined, '  ');

const swaggerSpec = require('./src/swagger')(thing);
const swaggerJson = JSON.stringify(swaggerSpec, undefined, '  ');
const swaggerYaml = yaml.safeDump(swaggerSpec);

module.exports = function (app) {

  const TYPE_ENTITY_CLASS_NAME = 'Type';
  const URI = {};

  URI.USER = '/U/:UserID';

  URI.TYPES = '/U/:UserID/Types';
  URI.TYPE = '/U/:UserID/T/:ClassName';
  URI.TYPE_LIST = '/U/:UserID/Type/List';
  URI.TYPE_ATTR = '/U/:UserID/T/:ClassName/A/:AttributeKey';

  URI.ENTITIES = '/U/:UserID/T/:ClassName/Entities';
  URI.ENTITY = '/U/:UserID/T/:ClassName/E/:EntityID';
  URI.ENTITY_LIST = '/U/:UserID/T/:ClassName/Entity/List';
  URI.ENTITY_ATTR = '/U/:UserID/T/:ClassName/E/:EntityID/A/:AttributeKey';

  let routes = [];

  /**
   *     ______  _____ ______________
   *     |     \|     ||      |______
   *     |_____/|_____||_____ ______|
   *
   */

  /**
   * GET /routes
   */
  addRoute(app.get('/routes', (req, res) => {
    res.send(apiRoutesJson);
  }));

  /**
   * GET /swagger.json
   */
  addRoute(app.get('/swagger.json', (req, res) => {
    res.send(swaggerJson);
  }));

  /**
   * GET /swagger.yml
   */
  addRoute(app.get('/swagger.yml', (req, res) => {
    res.send(swaggerYaml);
  }));

  /**
   *     _________   __ _____ _______
   *        |     \_/  |_____]|______
   *        |      |   |      |______
   *
   */

  /**
  * GET /U/:UserID/T/:ClassName
  */
  addRoute(app.get(URI.TYPE, (req, res) => {
    getEntityTypeByClassName(req, res);
  }));

  function getEntityTypeByClassName (req, res) {

    let UserID = req.params.UserID;
    let ClassName = req.params.ClassName;

    db.fetchTypeByClassName(UserID, ClassName)
      .then(function (entity) {
        return res.send(JSON.stringify(entity, undefined, '  '));
      })
      .catch(err => {
        handle404(err, res);
      });

  }

  /**
   * GET /U/:UserID/T/:ClassName/List
   */
  addRoute(app.get(URI.ENTITY_LIST, (req, res) => {
    let UserID = req.params.UserID;
    let ClassName = req.params.ClassName;
    fetchItemOrTypeList(UserID, ClassName, 'List', res);
  }));

  /**
   * POST /U/:UserID/Types
   */
  addRoute(app.post(URI.TYPES, (req, res) => {
    let UserID = req.params.UserID;
    res.redirect(303, `/U/${UserID}/T/DomainName`);
  }));

  /**
   * getEntityTypeList
   *
   * <<[ GET ]>>
   * /U/:UserID/Type/List
   */
  addRoute(app.get(URI.TYPE_LIST, (req, res) => {
    let UserID = req.params.UserID;
    fetchItemOrTypeList(UserID, TYPE_ENTITY_CLASS_NAME, 'List', res);
  }));

  /**
   *     _________   ______________________   __
   *     |______| \  |   |     |     |     \_/
   *     |______|  \_|   |   __|__   |      |
   *
   */

  /**
   * getEntityList
   *
   * <<[ GET ]>>
   * /U/:UserID/T/:ClassName/Entity/List
   */
  addRoute(app.get(URI.ENTITY_LIST, (req, res) => {
    getEntityList(req, res);
  }));

  function getEntityList (req, res) {

    let UserID = req.params.UserID;
    let ClassName = req.params.ClassName;
    let EntityID = req.params.EntityID;

    req.params.AttributeKey = EntityID;

    fetchItemOrTypeList(UserID, ClassName, EntityID, res);

  }

  /**
   * getEntityByEntityId
   *
   * <<[ GET ]>>
   * /U/:UserID/T/:ClassName/E/:EntityID
   */
  addRoute(app.get(URI.ENTITY, (req, res) => {
    getEntityByEntityId(req, res);
  }));

  function getEntityByEntityId (req, res) {

    let UserID = req.params.UserID;
    let ClassName = req.params.ClassName;
    let EntityID = req.params.EntityID;

    db.fetchEntityById(UserID, ClassName, EntityID)
      .then(function (entity) {
        return res.send(JSON.stringify(entity, undefined, '  '));
      })
      .catch(err => {
        handle404(err, res);
      });

  }

  /**
   *     _________   __ _____ _______    _____________________ ______
   *        |     \_/  |_____]|______    |_____|   |      |   |_____/
   *        |      |   |      |______    |     |   |      |   |    \_
   *
   */

  /**
   * getTypeAttributeByAttributeKey
   *
   * <<[ GET ]>>
   * /U/:UserID/T/:ClassName/A/:AttributeKey
   */
  addRoute(app.get(URI.TYPE_ATTR, (req, res) => {
    getTypeAttributeByAttributeKey(req, res);
  }));

  function getTypeAttributeByAttributeKey (req, res) {

    let UserID = req.params.UserID;
    let ClassName = req.params.ClassName;
    let AttributeKey = req.params.AttributeKey;

    db.fetchTypeAttribute(UserID, ClassName, AttributeKey)
      .then(function (typeAttribute) {
        let typeAttrJson = JSON.stringify(typeAttribute, undefined, '  ');
        res.send(typeAttrJson);
      })
      .catch(err => {
        handle404(err, res);
      });

  }

  /**
   *     _________   ______________________   __    _____________________ ______
   *     |______| \  |   |     |     |     \_/      |_____|   |      |   |_____/
   *     |______|  \_|   |   __|__   |      |       |     |   |      |   |    \_
   *
   */

  /**
   * getEntityAttributeByAttributeKey
   *
   * <<[ GET ]>>
   * /U/:UserID/T/:ClassName/E/:EntityID/A/:AttributeKey
   */
  addRoute(app.get(URI.ENTITY_ATTR, (req, res) => {
    getEntityAttributeByAttributeKey(req, res);
  }));

  function getEntityAttributeByAttributeKey (req, res) {

    let UserID = req.params.UserID;
    let ClassName = req.params.ClassName;
    let EntityID = req.params.EntityID;
    let AttributeKey = req.params.AttributeKey;

    db.fetchEntityAttribute(UserID, ClassName, EntityID, AttributeKey)
      .then(function (entityAttribute) {
        let entityAttrJson = JSON.stringify(entityAttribute, undefined, '  ');
        res.send(entityAttrJson);
      })
      .catch(err => {
        handle404(err, res);
      });
  }

  /**
   * updateEntityAttributeByAttributeKey
   *
   * <<[ PUT ]>>
   * /U/:UserID/T/:ClassName/E/:EntityID/A/:AttributeKey
   */
  addRoute(app.put(URI.ENTITY_ATTR, (req, res) => {
    updateEntityAttributeByAttributeKey(req, res);
  }));

  function updateEntityAttributeByAttributeKey (req, res) {

    let UserID = req.params.UserID;
    let ClassName = req.params.ClassName;
    let EntityID = req.params.EntityID;
    let AttributeKey = req.params.AttributeKey;

    let newValue = '';

    req.on('data', (chunk) => {
      newValue = newValue + chunk;
    });

    db.fetchEntityAttribute(UserID, ClassName, EntityID, AttributeKey)
      .then(function (entityAttribute) {
        putEntityAttributeValue(entityAttribute, newValue, res);
      })
      .catch(err => {
        handle404(err, res);
      });

  }

  function putEntityAttributeValue (entityAttribute, newValue, res) {
    db.putEntityAttributeValue(entityAttribute, newValue)
      .then(function (entityAttribute) {
        let entityAttrJson = JSON.stringify(entityAttribute, undefined, '  ');
        res.send(entityAttrJson);
      })
      .catch(err => {
        handle500(err, res);
      });
  }

  return routes;

  function addRoute (route) {
    routes.push(route);
  }

  function apiUri (arr) {
    return '/' + arr.join('/');
  }

  function handle404 (err, res) {
    logErr(err);
    res.sendStatus(404);
  }

  function handle500 (err, res) {
    logErr(err);
    res.sendStatus(500);
  }

  function logErr (err) {
    console.log(err.message);
    console.log(err.stack);
  }

  function fetchItemOrTypeList (UserID, ClassName, EntityID, res) {

    let isTypeListRequest = TYPE_ENTITY_CLASS_NAME === ClassName;
    if (isTypeListRequest) {
      return fetchTypeList(UserID, ClassName, res);
    }

    return fetchItemList(UserID, ClassName, res);

  }

  function fetchItemList (UserID, ClassName, res) {

    return db.fetchItemList(UserID, ClassName)
      .then(function (itemList) {
        return res.send(JSON.stringify(itemList, undefined, '  '));
      })
      .catch(err => {
        handle404(err, res);
      });

  }

  function fetchTypeList (UserID, ClassName, res) {

    return db.fetchTypeList(UserID)
      .then(function (typeList) {
        return res.send(JSON.stringify(typeList, undefined, '  '));
      })
      .catch(err => {
        handle404(err, res);
      });

  }

};
