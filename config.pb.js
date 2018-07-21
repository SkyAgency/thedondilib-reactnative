/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.sign = (function() {
    
        /**
         * Namespace sign.
         * @exports sign
         * @namespace
         */
        var sign = {};
    
        sign.LedColorConfig = (function() {
    
            /**
             * Properties of a LedColorConfig.
             * @memberof sign
             * @interface ILedColorConfig
             * @property {number} red LedColorConfig red
             * @property {number} green LedColorConfig green
             * @property {number} blue LedColorConfig blue
             */
    
            /**
             * Constructs a new LedColorConfig.
             * @memberof sign
             * @classdesc Represents a LedColorConfig.
             * @implements ILedColorConfig
             * @constructor
             * @param {sign.ILedColorConfig=} [properties] Properties to set
             */
            function LedColorConfig(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LedColorConfig red.
             * @member {number} red
             * @memberof sign.LedColorConfig
             * @instance
             */
            LedColorConfig.prototype.red = 255;
    
            /**
             * LedColorConfig green.
             * @member {number} green
             * @memberof sign.LedColorConfig
             * @instance
             */
            LedColorConfig.prototype.green = 255;
    
            /**
             * LedColorConfig blue.
             * @member {number} blue
             * @memberof sign.LedColorConfig
             * @instance
             */
            LedColorConfig.prototype.blue = 255;
    
            /**
             * Creates a new LedColorConfig instance using the specified properties.
             * @function create
             * @memberof sign.LedColorConfig
             * @static
             * @param {sign.ILedColorConfig=} [properties] Properties to set
             * @returns {sign.LedColorConfig} LedColorConfig instance
             */
            LedColorConfig.create = function create(properties) {
                return new LedColorConfig(properties);
            };
    
            /**
             * Encodes the specified LedColorConfig message. Does not implicitly {@link sign.LedColorConfig.verify|verify} messages.
             * @function encode
             * @memberof sign.LedColorConfig
             * @static
             * @param {sign.ILedColorConfig} message LedColorConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedColorConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.red);
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.green);
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.blue);
                return writer;
            };
    
            /**
             * Encodes the specified LedColorConfig message, length delimited. Does not implicitly {@link sign.LedColorConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof sign.LedColorConfig
             * @static
             * @param {sign.ILedColorConfig} message LedColorConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedColorConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LedColorConfig message from the specified reader or buffer.
             * @function decode
             * @memberof sign.LedColorConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sign.LedColorConfig} LedColorConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedColorConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sign.LedColorConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.red = reader.uint32();
                        break;
                    case 2:
                        message.green = reader.uint32();
                        break;
                    case 3:
                        message.blue = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("red"))
                    throw $util.ProtocolError("missing required 'red'", { instance: message });
                if (!message.hasOwnProperty("green"))
                    throw $util.ProtocolError("missing required 'green'", { instance: message });
                if (!message.hasOwnProperty("blue"))
                    throw $util.ProtocolError("missing required 'blue'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a LedColorConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sign.LedColorConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sign.LedColorConfig} LedColorConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedColorConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LedColorConfig message.
             * @function verify
             * @memberof sign.LedColorConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LedColorConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.red))
                    return "red: integer expected";
                if (!$util.isInteger(message.green))
                    return "green: integer expected";
                if (!$util.isInteger(message.blue))
                    return "blue: integer expected";
                return null;
            };
    
            /**
             * Creates a LedColorConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sign.LedColorConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sign.LedColorConfig} LedColorConfig
             */
            LedColorConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.sign.LedColorConfig)
                    return object;
                var message = new $root.sign.LedColorConfig();
                if (object.red != null)
                    message.red = object.red >>> 0;
                if (object.green != null)
                    message.green = object.green >>> 0;
                if (object.blue != null)
                    message.blue = object.blue >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a LedColorConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sign.LedColorConfig
             * @static
             * @param {sign.LedColorConfig} message LedColorConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LedColorConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.red = 255;
                    object.green = 255;
                    object.blue = 255;
                }
                if (message.red != null && message.hasOwnProperty("red"))
                    object.red = message.red;
                if (message.green != null && message.hasOwnProperty("green"))
                    object.green = message.green;
                if (message.blue != null && message.hasOwnProperty("blue"))
                    object.blue = message.blue;
                return object;
            };
    
            /**
             * Converts this LedColorConfig to JSON.
             * @function toJSON
             * @memberof sign.LedColorConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LedColorConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LedColorConfig;
        })();
    
        sign.LedPosition = (function() {
    
            /**
             * Properties of a LedPosition.
             * @memberof sign
             * @interface ILedPosition
             * @property {number} x LedPosition x
             * @property {number} y LedPosition y
             */
    
            /**
             * Constructs a new LedPosition.
             * @memberof sign
             * @classdesc Represents a LedPosition.
             * @implements ILedPosition
             * @constructor
             * @param {sign.ILedPosition=} [properties] Properties to set
             */
            function LedPosition(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LedPosition x.
             * @member {number} x
             * @memberof sign.LedPosition
             * @instance
             */
            LedPosition.prototype.x = 97;
    
            /**
             * LedPosition y.
             * @member {number} y
             * @memberof sign.LedPosition
             * @instance
             */
            LedPosition.prototype.y = 0;
    
            /**
             * Creates a new LedPosition instance using the specified properties.
             * @function create
             * @memberof sign.LedPosition
             * @static
             * @param {sign.ILedPosition=} [properties] Properties to set
             * @returns {sign.LedPosition} LedPosition instance
             */
            LedPosition.create = function create(properties) {
                return new LedPosition(properties);
            };
    
            /**
             * Encodes the specified LedPosition message. Does not implicitly {@link sign.LedPosition.verify|verify} messages.
             * @function encode
             * @memberof sign.LedPosition
             * @static
             * @param {sign.ILedPosition} message LedPosition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedPosition.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.x);
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.y);
                return writer;
            };
    
            /**
             * Encodes the specified LedPosition message, length delimited. Does not implicitly {@link sign.LedPosition.verify|verify} messages.
             * @function encodeDelimited
             * @memberof sign.LedPosition
             * @static
             * @param {sign.ILedPosition} message LedPosition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedPosition.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LedPosition message from the specified reader or buffer.
             * @function decode
             * @memberof sign.LedPosition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sign.LedPosition} LedPosition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedPosition.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sign.LedPosition();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.x = reader.uint32();
                        break;
                    case 2:
                        message.y = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("x"))
                    throw $util.ProtocolError("missing required 'x'", { instance: message });
                if (!message.hasOwnProperty("y"))
                    throw $util.ProtocolError("missing required 'y'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a LedPosition message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sign.LedPosition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sign.LedPosition} LedPosition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedPosition.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LedPosition message.
             * @function verify
             * @memberof sign.LedPosition
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LedPosition.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
                return null;
            };
    
            /**
             * Creates a LedPosition message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sign.LedPosition
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sign.LedPosition} LedPosition
             */
            LedPosition.fromObject = function fromObject(object) {
                if (object instanceof $root.sign.LedPosition)
                    return object;
                var message = new $root.sign.LedPosition();
                if (object.x != null)
                    message.x = object.x >>> 0;
                if (object.y != null)
                    message.y = object.y >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a LedPosition message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sign.LedPosition
             * @static
             * @param {sign.LedPosition} message LedPosition
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LedPosition.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.x = 97;
                    object.y = 0;
                }
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = message.y;
                return object;
            };
    
            /**
             * Converts this LedPosition to JSON.
             * @function toJSON
             * @memberof sign.LedPosition
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LedPosition.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LedPosition;
        })();
    
        sign.LedConfig = (function() {
    
            /**
             * Properties of a LedConfig.
             * @memberof sign
             * @interface ILedConfig
             * @property {sign.ILedPosition} position LedConfig position
             * @property {boolean} enabled LedConfig enabled
             * @property {number} duty LedConfig duty
             * @property {sign.ILedColorConfig} colorConfig LedConfig colorConfig
             */
    
            /**
             * Constructs a new LedConfig.
             * @memberof sign
             * @classdesc Represents a LedConfig.
             * @implements ILedConfig
             * @constructor
             * @param {sign.ILedConfig=} [properties] Properties to set
             */
            function LedConfig(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LedConfig position.
             * @member {sign.ILedPosition} position
             * @memberof sign.LedConfig
             * @instance
             */
            LedConfig.prototype.position = null;
    
            /**
             * LedConfig enabled.
             * @member {boolean} enabled
             * @memberof sign.LedConfig
             * @instance
             */
            LedConfig.prototype.enabled = false;
    
            /**
             * LedConfig duty.
             * @member {number} duty
             * @memberof sign.LedConfig
             * @instance
             */
            LedConfig.prototype.duty = 255;
    
            /**
             * LedConfig colorConfig.
             * @member {sign.ILedColorConfig} colorConfig
             * @memberof sign.LedConfig
             * @instance
             */
            LedConfig.prototype.colorConfig = null;
    
            /**
             * Creates a new LedConfig instance using the specified properties.
             * @function create
             * @memberof sign.LedConfig
             * @static
             * @param {sign.ILedConfig=} [properties] Properties to set
             * @returns {sign.LedConfig} LedConfig instance
             */
            LedConfig.create = function create(properties) {
                return new LedConfig(properties);
            };
    
            /**
             * Encodes the specified LedConfig message. Does not implicitly {@link sign.LedConfig.verify|verify} messages.
             * @function encode
             * @memberof sign.LedConfig
             * @static
             * @param {sign.ILedConfig} message LedConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                $root.sign.LedPosition.encode(message.position, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.enabled);
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.duty);
                $root.sign.LedColorConfig.encode(message.colorConfig, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified LedConfig message, length delimited. Does not implicitly {@link sign.LedConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof sign.LedConfig
             * @static
             * @param {sign.ILedConfig} message LedConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LedConfig message from the specified reader or buffer.
             * @function decode
             * @memberof sign.LedConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sign.LedConfig} LedConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sign.LedConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.position = $root.sign.LedPosition.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.enabled = reader.bool();
                        break;
                    case 3:
                        message.duty = reader.uint32();
                        break;
                    case 4:
                        message.colorConfig = $root.sign.LedColorConfig.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("position"))
                    throw $util.ProtocolError("missing required 'position'", { instance: message });
                if (!message.hasOwnProperty("enabled"))
                    throw $util.ProtocolError("missing required 'enabled'", { instance: message });
                if (!message.hasOwnProperty("duty"))
                    throw $util.ProtocolError("missing required 'duty'", { instance: message });
                if (!message.hasOwnProperty("colorConfig"))
                    throw $util.ProtocolError("missing required 'colorConfig'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a LedConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sign.LedConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sign.LedConfig} LedConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LedConfig message.
             * @function verify
             * @memberof sign.LedConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LedConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                {
                    var error = $root.sign.LedPosition.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                if (typeof message.enabled !== "boolean")
                    return "enabled: boolean expected";
                if (!$util.isInteger(message.duty))
                    return "duty: integer expected";
                {
                    var error = $root.sign.LedColorConfig.verify(message.colorConfig);
                    if (error)
                        return "colorConfig." + error;
                }
                return null;
            };
    
            /**
             * Creates a LedConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sign.LedConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sign.LedConfig} LedConfig
             */
            LedConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.sign.LedConfig)
                    return object;
                var message = new $root.sign.LedConfig();
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".sign.LedConfig.position: object expected");
                    message.position = $root.sign.LedPosition.fromObject(object.position);
                }
                if (object.enabled != null)
                    message.enabled = Boolean(object.enabled);
                if (object.duty != null)
                    message.duty = object.duty >>> 0;
                if (object.colorConfig != null) {
                    if (typeof object.colorConfig !== "object")
                        throw TypeError(".sign.LedConfig.colorConfig: object expected");
                    message.colorConfig = $root.sign.LedColorConfig.fromObject(object.colorConfig);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a LedConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sign.LedConfig
             * @static
             * @param {sign.LedConfig} message LedConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LedConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.position = null;
                    object.enabled = false;
                    object.duty = 255;
                    object.colorConfig = null;
                }
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.sign.LedPosition.toObject(message.position, options);
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    object.enabled = message.enabled;
                if (message.duty != null && message.hasOwnProperty("duty"))
                    object.duty = message.duty;
                if (message.colorConfig != null && message.hasOwnProperty("colorConfig"))
                    object.colorConfig = $root.sign.LedColorConfig.toObject(message.colorConfig, options);
                return object;
            };
    
            /**
             * Converts this LedConfig to JSON.
             * @function toJSON
             * @memberof sign.LedConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LedConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LedConfig;
        })();
    
        sign.LedFrame = (function() {
    
            /**
             * Properties of a LedFrame.
             * @memberof sign
             * @interface ILedFrame
             * @property {number} duration LedFrame duration
             * @property {Array.<sign.ILedConfig>|null} [leds] LedFrame leds
             * @property {number|null} [_unused] LedFrame _unused
             */
    
            /**
             * Constructs a new LedFrame.
             * @memberof sign
             * @classdesc Represents a LedFrame.
             * @implements ILedFrame
             * @constructor
             * @param {sign.ILedFrame=} [properties] Properties to set
             */
            function LedFrame(properties) {
                this.leds = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LedFrame duration.
             * @member {number} duration
             * @memberof sign.LedFrame
             * @instance
             */
            LedFrame.prototype.duration = 0;
    
            /**
             * LedFrame leds.
             * @member {Array.<sign.ILedConfig>} leds
             * @memberof sign.LedFrame
             * @instance
             */
            LedFrame.prototype.leds = $util.emptyArray;
    
            /**
             * LedFrame _unused.
             * @member {number} _unused
             * @memberof sign.LedFrame
             * @instance
             */
            LedFrame.prototype._unused = 0;
    
            /**
             * Creates a new LedFrame instance using the specified properties.
             * @function create
             * @memberof sign.LedFrame
             * @static
             * @param {sign.ILedFrame=} [properties] Properties to set
             * @returns {sign.LedFrame} LedFrame instance
             */
            LedFrame.create = function create(properties) {
                return new LedFrame(properties);
            };
    
            /**
             * Encodes the specified LedFrame message. Does not implicitly {@link sign.LedFrame.verify|verify} messages.
             * @function encode
             * @memberof sign.LedFrame
             * @static
             * @param {sign.ILedFrame} message LedFrame message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedFrame.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.duration);
                if (message.leds != null && message.leds.length)
                    for (var i = 0; i < message.leds.length; ++i)
                        $root.sign.LedConfig.encode(message.leds[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message._unused != null && message.hasOwnProperty("_unused"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message._unused);
                return writer;
            };
    
            /**
             * Encodes the specified LedFrame message, length delimited. Does not implicitly {@link sign.LedFrame.verify|verify} messages.
             * @function encodeDelimited
             * @memberof sign.LedFrame
             * @static
             * @param {sign.ILedFrame} message LedFrame message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LedFrame.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LedFrame message from the specified reader or buffer.
             * @function decode
             * @memberof sign.LedFrame
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sign.LedFrame} LedFrame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedFrame.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sign.LedFrame();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.duration = reader.uint32();
                        break;
                    case 2:
                        if (!(message.leds && message.leds.length))
                            message.leds = [];
                        message.leds.push($root.sign.LedConfig.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message._unused = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("duration"))
                    throw $util.ProtocolError("missing required 'duration'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a LedFrame message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sign.LedFrame
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sign.LedFrame} LedFrame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LedFrame.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LedFrame message.
             * @function verify
             * @memberof sign.LedFrame
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LedFrame.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.duration))
                    return "duration: integer expected";
                if (message.leds != null && message.hasOwnProperty("leds")) {
                    if (!Array.isArray(message.leds))
                        return "leds: array expected";
                    for (var i = 0; i < message.leds.length; ++i) {
                        var error = $root.sign.LedConfig.verify(message.leds[i]);
                        if (error)
                            return "leds." + error;
                    }
                }
                if (message._unused != null && message.hasOwnProperty("_unused"))
                    if (!$util.isInteger(message._unused))
                        return "_unused: integer expected";
                return null;
            };
    
            /**
             * Creates a LedFrame message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sign.LedFrame
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sign.LedFrame} LedFrame
             */
            LedFrame.fromObject = function fromObject(object) {
                if (object instanceof $root.sign.LedFrame)
                    return object;
                var message = new $root.sign.LedFrame();
                if (object.duration != null)
                    message.duration = object.duration >>> 0;
                if (object.leds) {
                    if (!Array.isArray(object.leds))
                        throw TypeError(".sign.LedFrame.leds: array expected");
                    message.leds = [];
                    for (var i = 0; i < object.leds.length; ++i) {
                        if (typeof object.leds[i] !== "object")
                            throw TypeError(".sign.LedFrame.leds: object expected");
                        message.leds[i] = $root.sign.LedConfig.fromObject(object.leds[i]);
                    }
                }
                if (object._unused != null)
                    message._unused = object._unused >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a LedFrame message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sign.LedFrame
             * @static
             * @param {sign.LedFrame} message LedFrame
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LedFrame.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.leds = [];
                if (options.defaults) {
                    object.duration = 0;
                    object._unused = 0;
                }
                if (message.duration != null && message.hasOwnProperty("duration"))
                    object.duration = message.duration;
                if (message.leds && message.leds.length) {
                    object.leds = [];
                    for (var j = 0; j < message.leds.length; ++j)
                        object.leds[j] = $root.sign.LedConfig.toObject(message.leds[j], options);
                }
                if (message._unused != null && message.hasOwnProperty("_unused"))
                    object._unused = message._unused;
                return object;
            };
    
            /**
             * Converts this LedFrame to JSON.
             * @function toJSON
             * @memberof sign.LedFrame
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LedFrame.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LedFrame;
        })();
    
        sign.Config = (function() {
    
            /**
             * Properties of a Config.
             * @memberof sign
             * @interface IConfig
             * @property {boolean} animationEnabled Config animationEnabled
             * @property {boolean} motionEnabled Config motionEnabled
             * @property {boolean} monogamyMode Config monogamyMode
             * @property {number} motionTimeout Config motionTimeout
             * @property {number} deviceBrightness Config deviceBrightness
             * @property {Array.<sign.ILedFrame>|null} [frames] Config frames
             * @property {Uint8Array|null} [_unused] Config _unused
             */
    
            /**
             * Constructs a new Config.
             * @memberof sign
             * @classdesc Represents a Config.
             * @implements IConfig
             * @constructor
             * @param {sign.IConfig=} [properties] Properties to set
             */
            function Config(properties) {
                this.frames = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Config animationEnabled.
             * @member {boolean} animationEnabled
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.animationEnabled = false;
    
            /**
             * Config motionEnabled.
             * @member {boolean} motionEnabled
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.motionEnabled = true;
    
            /**
             * Config monogamyMode.
             * @member {boolean} monogamyMode
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.monogamyMode = true;
    
            /**
             * Config motionTimeout.
             * @member {number} motionTimeout
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.motionTimeout = 30;
    
            /**
             * Config deviceBrightness.
             * @member {number} deviceBrightness
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.deviceBrightness = 100;
    
            /**
             * Config frames.
             * @member {Array.<sign.ILedFrame>} frames
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.frames = $util.emptyArray;
    
            /**
             * Config _unused.
             * @member {Uint8Array} _unused
             * @memberof sign.Config
             * @instance
             */
            Config.prototype._unused = $util.newBuffer([]);
    
            /**
             * Creates a new Config instance using the specified properties.
             * @function create
             * @memberof sign.Config
             * @static
             * @param {sign.IConfig=} [properties] Properties to set
             * @returns {sign.Config} Config instance
             */
            Config.create = function create(properties) {
                return new Config(properties);
            };
    
            /**
             * Encodes the specified Config message. Does not implicitly {@link sign.Config.verify|verify} messages.
             * @function encode
             * @memberof sign.Config
             * @static
             * @param {sign.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.animationEnabled);
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.motionEnabled);
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.monogamyMode);
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.motionTimeout);
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.deviceBrightness);
                if (message.frames != null && message.frames.length)
                    for (var i = 0; i < message.frames.length; ++i)
                        $root.sign.LedFrame.encode(message.frames[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message._unused != null && message.hasOwnProperty("_unused"))
                    writer.uint32(/* id 7, wireType 2 =*/58).bytes(message._unused);
                return writer;
            };
    
            /**
             * Encodes the specified Config message, length delimited. Does not implicitly {@link sign.Config.verify|verify} messages.
             * @function encodeDelimited
             * @memberof sign.Config
             * @static
             * @param {sign.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Config message from the specified reader or buffer.
             * @function decode
             * @memberof sign.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sign.Config} Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Config.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sign.Config();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.animationEnabled = reader.bool();
                        break;
                    case 2:
                        message.motionEnabled = reader.bool();
                        break;
                    case 3:
                        message.monogamyMode = reader.bool();
                        break;
                    case 4:
                        message.motionTimeout = reader.uint32();
                        break;
                    case 5:
                        message.deviceBrightness = reader.uint32();
                        break;
                    case 6:
                        if (!(message.frames && message.frames.length))
                            message.frames = [];
                        message.frames.push($root.sign.LedFrame.decode(reader, reader.uint32()));
                        break;
                    case 7:
                        message._unused = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("animationEnabled"))
                    throw $util.ProtocolError("missing required 'animationEnabled'", { instance: message });
                if (!message.hasOwnProperty("motionEnabled"))
                    throw $util.ProtocolError("missing required 'motionEnabled'", { instance: message });
                if (!message.hasOwnProperty("monogamyMode"))
                    throw $util.ProtocolError("missing required 'monogamyMode'", { instance: message });
                if (!message.hasOwnProperty("motionTimeout"))
                    throw $util.ProtocolError("missing required 'motionTimeout'", { instance: message });
                if (!message.hasOwnProperty("deviceBrightness"))
                    throw $util.ProtocolError("missing required 'deviceBrightness'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Config message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sign.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sign.Config} Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Config.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Config message.
             * @function verify
             * @memberof sign.Config
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Config.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (typeof message.animationEnabled !== "boolean")
                    return "animationEnabled: boolean expected";
                if (typeof message.motionEnabled !== "boolean")
                    return "motionEnabled: boolean expected";
                if (typeof message.monogamyMode !== "boolean")
                    return "monogamyMode: boolean expected";
                if (!$util.isInteger(message.motionTimeout))
                    return "motionTimeout: integer expected";
                if (!$util.isInteger(message.deviceBrightness))
                    return "deviceBrightness: integer expected";
                if (message.frames != null && message.hasOwnProperty("frames")) {
                    if (!Array.isArray(message.frames))
                        return "frames: array expected";
                    for (var i = 0; i < message.frames.length; ++i) {
                        var error = $root.sign.LedFrame.verify(message.frames[i]);
                        if (error)
                            return "frames." + error;
                    }
                }
                if (message._unused != null && message.hasOwnProperty("_unused"))
                    if (!(message._unused && typeof message._unused.length === "number" || $util.isString(message._unused)))
                        return "_unused: buffer expected";
                return null;
            };
    
            /**
             * Creates a Config message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sign.Config
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sign.Config} Config
             */
            Config.fromObject = function fromObject(object) {
                if (object instanceof $root.sign.Config)
                    return object;
                var message = new $root.sign.Config();
                if (object.animationEnabled != null)
                    message.animationEnabled = Boolean(object.animationEnabled);
                if (object.motionEnabled != null)
                    message.motionEnabled = Boolean(object.motionEnabled);
                if (object.monogamyMode != null)
                    message.monogamyMode = Boolean(object.monogamyMode);
                if (object.motionTimeout != null)
                    message.motionTimeout = object.motionTimeout >>> 0;
                if (object.deviceBrightness != null)
                    message.deviceBrightness = object.deviceBrightness >>> 0;
                if (object.frames) {
                    if (!Array.isArray(object.frames))
                        throw TypeError(".sign.Config.frames: array expected");
                    message.frames = [];
                    for (var i = 0; i < object.frames.length; ++i) {
                        if (typeof object.frames[i] !== "object")
                            throw TypeError(".sign.Config.frames: object expected");
                        message.frames[i] = $root.sign.LedFrame.fromObject(object.frames[i]);
                    }
                }
                if (object._unused != null)
                    if (typeof object._unused === "string")
                        $util.base64.decode(object._unused, message._unused = $util.newBuffer($util.base64.length(object._unused)), 0);
                    else if (object._unused.length)
                        message._unused = object._unused;
                return message;
            };
    
            /**
             * Creates a plain object from a Config message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sign.Config
             * @static
             * @param {sign.Config} message Config
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Config.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.frames = [];
                if (options.defaults) {
                    object.animationEnabled = false;
                    object.motionEnabled = true;
                    object.monogamyMode = true;
                    object.motionTimeout = 30;
                    object.deviceBrightness = 100;
                    object._unused = options.bytes === String ? "" : [];
                }
                if (message.animationEnabled != null && message.hasOwnProperty("animationEnabled"))
                    object.animationEnabled = message.animationEnabled;
                if (message.motionEnabled != null && message.hasOwnProperty("motionEnabled"))
                    object.motionEnabled = message.motionEnabled;
                if (message.monogamyMode != null && message.hasOwnProperty("monogamyMode"))
                    object.monogamyMode = message.monogamyMode;
                if (message.motionTimeout != null && message.hasOwnProperty("motionTimeout"))
                    object.motionTimeout = message.motionTimeout;
                if (message.deviceBrightness != null && message.hasOwnProperty("deviceBrightness"))
                    object.deviceBrightness = message.deviceBrightness;
                if (message.frames && message.frames.length) {
                    object.frames = [];
                    for (var j = 0; j < message.frames.length; ++j)
                        object.frames[j] = $root.sign.LedFrame.toObject(message.frames[j], options);
                }
                if (message._unused != null && message.hasOwnProperty("_unused"))
                    object._unused = options.bytes === String ? $util.base64.encode(message._unused, 0, message._unused.length) : options.bytes === Array ? Array.prototype.slice.call(message._unused) : message._unused;
                return object;
            };
    
            /**
             * Converts this Config to JSON.
             * @function toJSON
             * @memberof sign.Config
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Config.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Config;
        })();
    
        return sign;
    })();

    return $root;
});
