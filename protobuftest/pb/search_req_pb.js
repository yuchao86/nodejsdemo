// source: pb/search_req.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.com.youku.server.pb.SearchRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.youku.server.pb.SearchRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.com.youku.server.pb.SearchRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.com.youku.server.pb.SearchRequest.displayName = 'proto.com.youku.server.pb.SearchRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.youku.server.pb.SearchRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.com.youku.server.pb.SearchRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.youku.server.pb.SearchRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.youku.server.pb.SearchRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    query: jspb.Message.getFieldWithDefault(msg, 1, ""),
    available: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    distance: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    location: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    offset: jspb.Message.getFieldWithDefault(msg, 5, 0),
    pageNumber: jspb.Message.getFieldWithDefault(msg, 6, 0),
    resultPerPage: jspb.Message.getFieldWithDefault(msg, 7, 0),
    extraData: msg.getExtraData_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.youku.server.pb.SearchRequest}
 */
proto.com.youku.server.pb.SearchRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.youku.server.pb.SearchRequest;
  return proto.com.youku.server.pb.SearchRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.youku.server.pb.SearchRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.youku.server.pb.SearchRequest}
 */
proto.com.youku.server.pb.SearchRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setQuery(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAvailable(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setDistance(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setLocation(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFixed64());
      msg.setOffset(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPageNumber(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setResultPerPage(value);
      break;
    case 8:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setExtraData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.youku.server.pb.SearchRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.youku.server.pb.SearchRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.youku.server.pb.SearchRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.youku.server.pb.SearchRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQuery();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAvailable();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getDistance();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getLocation();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getOffset();
  if (f !== 0) {
    writer.writeFixed64(
      5,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeBytes(
      8,
      f
    );
  }
};


/**
 * optional string query = 1;
 * @return {string}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getQuery = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setQuery = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool available = 2;
 * @return {boolean}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getAvailable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setAvailable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional float distance = 3;
 * @return {number}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getDistance = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setDistance = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double location = 4;
 * @return {number}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getLocation = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setLocation = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional fixed64 offset = 5;
 * @return {number}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getOffset = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setOffset = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 page_number = 6;
 * @return {number}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getPageNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setPageNumber = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.clearPageNumber = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.youku.server.pb.SearchRequest.prototype.hasPageNumber = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional uint32 result_per_page = 7;
 * @return {number}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getResultPerPage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setResultPerPage = function(value) {
  return jspb.Message.setField(this, 7, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.clearResultPerPage = function() {
  return jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.youku.server.pb.SearchRequest.prototype.hasResultPerPage = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional bytes extra_data = 8;
 * @return {!(string|Uint8Array)}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getExtraData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * optional bytes extra_data = 8;
 * This is a type-conversion wrapper around `getExtraData()`
 * @return {string}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getExtraData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getExtraData()));
};


/**
 * optional bytes extra_data = 8;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getExtraData()`
 * @return {!Uint8Array}
 */
proto.com.youku.server.pb.SearchRequest.prototype.getExtraData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getExtraData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.setExtraData = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.youku.server.pb.SearchRequest} returns this
 */
proto.com.youku.server.pb.SearchRequest.prototype.clearExtraData = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.youku.server.pb.SearchRequest.prototype.hasExtraData = function() {
  return jspb.Message.getField(this, 8) != null;
};


goog.object.extend(exports, proto.com.youku.server.pb);
