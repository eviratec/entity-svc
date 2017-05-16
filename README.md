# Eviratec Entity Service

[![Dependency Status](https://david-dm.org/eviratec/entity-svc/status.svg)](https://david-dm.org/eviratec/entity-svc)
[![devDependency Status](https://david-dm.org/eviratec/entity-svc/dev-status.svg)](https://david-dm.org/eviratec/entity-svc#info=devDependencies)

This repository contains the source for the Eviratec Entity (micro)service.

## Routes

| Method | URI | Operation ID |
|---|---|---|
| POST | /U/{UserID}/Types | createType |
| GET | /U/{UserID}/Type/List | getTypeList |
| GET | /U/{UserID}/T/{ClassName} | getTypeByClassName |
| POST | /U/{UserID}/T/{ClassName}/Attributes | createTypeAttribute |
| GET | /U/{UserID}/T/{ClassName}/A/{AttributeKey} | getTypeAttributeByAttributeKey |
| PUT | /U/{UserID}/T/{ClassName}/A/{AttributeKey} | updateTypeAttributeByAttributeKey |
| POST | /U/{UserID}/T/{ClassName}/Entities | createEntity |
| GET | /U/{UserID}/T/{ClassName}/Entity/List | getEntityList |
| GET | /U/{UserID}/T/{ClassName}/E/{EntityID} | getEntityByEntityID |
| DELETE | /U/{UserID}/T/{ClassName}/E/{EntityID} | deleteEntityByEntityID |
| GET | /U/{UserID}/T/{ClassName}/E/{EntityID}/A/{AttributeKey} | getEntityAttributeByAttributeKey |
| PUT | /U/{UserID}/T/{ClassName}/E/{EntityID}/A/{AttributeKey} | updateEntityAttributeByAttributeKey |
| DELETE | /U/{UserID}/T/{ClassName}/E/{EntityID}/A/{AttributeKey} | deleteEntityAttributeByAttributeKey |

## Env

### Requirements

* Eviratec core db *coming soon*

### Set up

1. `$ npm install`
2. `$ export EV_MYSQL_USER=root`
3. `$ export EV_MYSQL_PASS=*****`
4. `$ export EV_MYSQL_DB=eviratec`
5. `$ npm start`

## License

```
Copyright (c) 2017 Callan Peter Milne

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
```
