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

module.exports = function () {
  return {
    "NewEntity": {
      "type": "object",
      "additionalProperties": false,
      "required": ["TypeID", "Attributes"],
      "properties": {
        "TypeID": {
          "type": "number",
          "example": 1420117
        },
        "Attributes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/NewEntityAttribute"
          }
        }
      }
    },
    "Entity": {
      "type": "object",
      "additionalProperties": false,
      "required": ["ID"],
      "properties": {
        "ID": {
          "type": "number",
          "example": 1381007
        },
        "TypeID": {
          "type": "number",
          "example": 1420117
        },
        "UserID": {
          "type": "number",
          "example": 1775619
        },
        "Created": {
          "type": "string",
          "format": "date-time"
        },
        "Deleted": {
          "type": "string",
          "format": "date-time",
          "default": null
        },
        "Attributes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EntityAttribute"
          }
        }
      }
    },
    "NewEntityType": {
      "type": "object",
      "additionalProperties": false,
      "required": ["ClassName", "Label"],
      "properties": {
        "ParentID": {
          "type": "number",
          "default": null
        },
        "ClassName": {
          "type": "string",
          "example": "DomainName"
        },
        "Slug": {
          "type": "string",
          "example": "domain-name"
        },
        "Label": {
          "type": "string",
          "example": "Domain Name"
        },
        "Attributes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/NewTypeAttribute"
          }
        }
      }
    },
    "EntityType": {
      "type": "object",
      "additionalProperties": false,
      "required": ["ID"],
      "properties": {
        "ID": {
          "type": "number",
          "example": 1381007
        },
        "UserID": {
          "type": "number",
          "example": 1775619
        },
        "ParentID": {
          "type": "number"
        },
        "ClassName": {
          "type": "string",
          "example": "DomainName"
        },
        "Slug": {
          "type": "string",
          "example": "domain-name"
        },
        "Label": {
          "type": "string",
          "example": "Domain Name"
        },
        "Created": {
          "type": "string",
          "format": "date-time"
        },
        "Modified": {
          "type": "string",
          "format": "date-time"
        },
        "Deleted": {
          "type": "string",
          "format": "date-time",
          "default": null
        },
        "Attributes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TypeAttribute"
          }
        }
      }
    },
    "NewEntityAttribute": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "AttributeKey": {
          "type": "string",
          "example": "FirstGivenName"
        },
        "AttributeValue": {
          "type": "string",
          "example": "Charlton"
        }
      }
    },
    "EntityAttribute": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "EntityID": {
          "type": "number"
        },
        "AttributeKey": {
          "type": "string"
        },
        "AttributeValue": {
          "type": "string"
        },
        "Created": {
          "type": "string",
          "format": "date-time"
        },
        "Modified": {
          "type": "string",
          "format": "date-time"
        },
        "Deleted": {
          "type": "string",
          "format": "date-time",
          "default": null
        }
      }
    },
    "NewTypeAttribute": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "AttributeKey": {
          "type": "string",
          "example": "FurColour"
        },
        "Label": {
          "type": "string",
          "example": "Fur Colour"
        },
        "Required": {
          "type": "boolean",
          "default": false
        },
        "DefaultValue": {
          "type": "string"
        }
      }
    },
    "TypeAttribute": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "TypeID": {
          "type": "number"
        },
        "AttributeKey": {
          "type": "string",
          "example": "FurColour"
        },
        "Label": {
          "type": "string",
          "example": "Fur Colour"
        },
        "Required": {
          "type": "boolean"
        },
        "DefaultValue": {
          "type": "string"
        },
        "Created": {
          "type": "string",
          "format": "date-time"
        },
        "Modified": {
          "type": "string",
          "format": "date-time"
        },
        "Deleted": {
          "type": "string",
          "format": "date-time",
          "default": null
        }
      }
    }
  }
};
