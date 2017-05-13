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

const knex = require('knex')({
  client: 'mysql',
  connection: {
    socketPath: '/run/mysqld/mysqld.sock',
    user: process.env.EV_MYSQL_USER,
    password: process.env.EV_MYSQL_PASS,
    database: process.env.EV_MYSQL_DB,
  }
});

const bookshelf = require('bookshelf')(knex);

const TypeAttribute = bookshelf.Model.extend({
  tableName: 'TypeAttributes',
  idAttribute: 'ID',
});

const EntityType = bookshelf.Model.extend({
  tableName: 'EntityTypes',
  idAttribute: 'ID',
  Attributes: function () {
    return this.hasMany(TypeAttribute, 'TypeID');
  },
  Entities: function () {
    return this.hasMany(Entity, 'TypeID');
  },
});

const EntityTypes = bookshelf.Collection.extend({
  model: EntityType,
});

const EntityAttribute = bookshelf.Model.extend({
  tableName: 'EntityAttributes',
  Entity: function () {
    return this.belongsTo(bookshelf.Model('EntityType'), 'EntityID', 'ID');
  },
});

const EntityAttributes = bookshelf.Collection.extend({
  model: EntityAttribute,
});

const Entity = bookshelf.Model.extend({
  tableName: 'Entities',
  idAttribute: 'ID',
  Attributes: function () {
    return this.hasMany(EntityAttribute, 'EntityID');
  },
  Type: function () {
    return this.belongsTo(EntityType, 'TypeID', 'ID');
  },
});

module.exports = {
  fetchTypeByClassName: function (UserID, EntityClassName) {
    return new Promise((resolve, reject) => {

      let q = {};

      q.where = { UserID: UserID, ClassName: EntityClassName };

      EntityType
        .query(q)
        .fetch({withRelated: ['Attributes']})
        .then((type) => {

          resolve(type);

        })
        .catch(err => {
          reject(err);
        });

    });

  },
  fetchTypeList: function (UserID) {
    return new Promise((resolve, reject) => {

      let q = {};

      q.where = { UserID: UserID };

      EntityTypes
        .query(q)
        .fetch({withRelated: ['Attributes']})
        .then((typeList) => {
          resolve(typeList);
        })
        .catch(err => {
          reject(err);
        });

    });

  },
  fetchItemList: function (UserID, EntityClassName) {
    return new Promise((resolve, reject) => {

      let q = {};

      q.where = { UserID: UserID, ClassName: EntityClassName };

      EntityType
        .query(q)
        .fetch({withRelated: ['Entities','Entities.Attributes']})
        .then((entityType) => {

          if (null === entityType) {
            return resolve([]);
          }

          resolve(entityType.related('Entities'));

        })
        .catch(err => {
          reject(err);
        });

    });

  },
  fetchTypeAttribute: function (UserID, EntityClassName, AttributeKey) {
    return new Promise((resolve, reject) => {

      let q = {};

      q.where = { UserID: UserID, ClassName: EntityClassName };

      EntityType
        .query(q)
        .fetch({withRelated: ['Attributes']})
        .then((entityType) => {

          if (null === entityType) {
            reject(new Error('No type found'));
            return;
          }

          resolve(entityType.related('Attributes').findWhere({AttributeKey: AttributeKey}));

        })
        .catch(err => {
          reject(err);
        });

    });
  },
  fetchEntityAttribute: function (UserID, EntityClassName, EntityID, AttributeKey) {
    return new Promise((resolve, reject) => {

      let q = {};

      q.where = { EntityID: EntityID, AttributeKey: AttributeKey };

      EntityAttribute
        .query(q)
        .fetch()
        // .fetch({withRelated: ['Attributes', 'Type', 'Type.Attributes']})
        .then((entityAttribute) => {

          if (null === entityAttribute) {
            reject(new Error('No entityAttribute found'));
            return;
          }

          resolve(entityAttribute);

        })
        .catch(err => {
          reject(err);
        });

    });
  },
  fetchEntityById: function (UserID, EntityClassName, EntityID) {
    return new Promise((resolve, reject) => {

      let q = {};

      q.where = { ID: EntityID, UserID: UserID };

      Entity
        .query(q)
        .fetch({withRelated: ['Type', 'Type.Attributes', 'Attributes']})
        .then((entity) => {

          if (null === entity) {
            reject(new Error('No entities'));
            return;
          }

          resolve(entity);

        })
        .catch(err => {
          reject(err);
        });

    });
  },
};
