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
            LedColorConfig.prototype.green = 0;
    
            /**
             * LedColorConfig blue.
             * @member {number} blue
             * @memberof sign.LedColorConfig
             * @instance
             */
            LedColorConfig.prototype.blue = 0;
    
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
                    object.green = 0;
                    object.blue = 0;
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
    
        sign.LedConfig = (function() {
    
            /**
             * Properties of a LedConfig.
             * @memberof sign
             * @interface ILedConfig
             * @property {sign.LedConfig.Mode} mode LedConfig mode
             * @property {sign.ILedColorConfig} colorConfig LedConfig colorConfig
             * @property {number} pattern LedConfig pattern
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
             * LedConfig mode.
             * @member {sign.LedConfig.Mode} mode
             * @memberof sign.LedConfig
             * @instance
             */
            LedConfig.prototype.mode = 0;
    
            /**
             * LedConfig colorConfig.
             * @member {sign.ILedColorConfig} colorConfig
             * @memberof sign.LedConfig
             * @instance
             */
            LedConfig.prototype.colorConfig = null;
    
            /**
             * LedConfig pattern.
             * @member {number} pattern
             * @memberof sign.LedConfig
             * @instance
             */
            LedConfig.prototype.pattern = 0;
    
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
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mode);
                $root.sign.LedColorConfig.encode(message.colorConfig, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.pattern);
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
                        message.mode = reader.int32();
                        break;
                    case 2:
                        message.colorConfig = $root.sign.LedColorConfig.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.pattern = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("mode"))
                    throw $util.ProtocolError("missing required 'mode'", { instance: message });
                if (!message.hasOwnProperty("colorConfig"))
                    throw $util.ProtocolError("missing required 'colorConfig'", { instance: message });
                if (!message.hasOwnProperty("pattern"))
                    throw $util.ProtocolError("missing required 'pattern'", { instance: message });
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
                switch (message.mode) {
                default:
                    return "mode: enum value expected";
                case 0:
                case 1:
                    break;
                }
                {
                    var error = $root.sign.LedColorConfig.verify(message.colorConfig);
                    if (error)
                        return "colorConfig." + error;
                }
                if (!$util.isInteger(message.pattern))
                    return "pattern: integer expected";
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
                switch (object.mode) {
                case "SINGLE_COLOR":
                case 0:
                    message.mode = 0;
                    break;
                case "PATTERN":
                case 1:
                    message.mode = 1;
                    break;
                }
                if (object.colorConfig != null) {
                    if (typeof object.colorConfig !== "object")
                        throw TypeError(".sign.LedConfig.colorConfig: object expected");
                    message.colorConfig = $root.sign.LedColorConfig.fromObject(object.colorConfig);
                }
                if (object.pattern != null)
                    message.pattern = object.pattern >>> 0;
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
                    object.mode = options.enums === String ? "SINGLE_COLOR" : 0;
                    object.colorConfig = null;
                    object.pattern = 0;
                }
                if (message.mode != null && message.hasOwnProperty("mode"))
                    object.mode = options.enums === String ? $root.sign.LedConfig.Mode[message.mode] : message.mode;
                if (message.colorConfig != null && message.hasOwnProperty("colorConfig"))
                    object.colorConfig = $root.sign.LedColorConfig.toObject(message.colorConfig, options);
                if (message.pattern != null && message.hasOwnProperty("pattern"))
                    object.pattern = message.pattern;
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
    
            /**
             * Mode enum.
             * @name sign.LedConfig.Mode
             * @enum {string}
             * @property {number} SINGLE_COLOR=0 SINGLE_COLOR value
             * @property {number} PATTERN=1 PATTERN value
             */
            LedConfig.Mode = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SINGLE_COLOR"] = 0;
                values[valuesById[1] = "PATTERN"] = 1;
                return values;
            })();
    
            return LedConfig;
        })();
    
        sign.Config = (function() {
    
            /**
             * Properties of a Config.
             * @memberof sign
             * @interface IConfig
             * @property {boolean} motionEnabled Config motionEnabled
             * @property {number} motionTimeout Config motionTimeout
             * @property {number} deviceBrightness Config deviceBrightness
             * @property {sign.ILedConfig} ledConfig Config ledConfig
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
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Config motionEnabled.
             * @member {boolean} motionEnabled
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.motionEnabled = true;
    
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
             * Config ledConfig.
             * @member {sign.ILedConfig} ledConfig
             * @memberof sign.Config
             * @instance
             */
            Config.prototype.ledConfig = null;
    
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
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.motionEnabled);
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.motionTimeout);
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.deviceBrightness);
                $root.sign.LedConfig.encode(message.ledConfig, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message._unused != null && message.hasOwnProperty("_unused"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message._unused);
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
                        message.motionEnabled = reader.bool();
                        break;
                    case 2:
                        message.motionTimeout = reader.uint32();
                        break;
                    case 3:
                        message.deviceBrightness = reader.uint32();
                        break;
                    case 4:
                        message.ledConfig = $root.sign.LedConfig.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message._unused = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("motionEnabled"))
                    throw $util.ProtocolError("missing required 'motionEnabled'", { instance: message });
                if (!message.hasOwnProperty("motionTimeout"))
                    throw $util.ProtocolError("missing required 'motionTimeout'", { instance: message });
                if (!message.hasOwnProperty("deviceBrightness"))
                    throw $util.ProtocolError("missing required 'deviceBrightness'", { instance: message });
                if (!message.hasOwnProperty("ledConfig"))
                    throw $util.ProtocolError("missing required 'ledConfig'", { instance: message });
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
                if (typeof message.motionEnabled !== "boolean")
                    return "motionEnabled: boolean expected";
                if (!$util.isInteger(message.motionTimeout))
                    return "motionTimeout: integer expected";
                if (!$util.isInteger(message.deviceBrightness))
                    return "deviceBrightness: integer expected";
                {
                    var error = $root.sign.LedConfig.verify(message.ledConfig);
                    if (error)
                        return "ledConfig." + error;
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
                if (object.motionEnabled != null)
                    message.motionEnabled = Boolean(object.motionEnabled);
                if (object.motionTimeout != null)
                    message.motionTimeout = object.motionTimeout >>> 0;
                if (object.deviceBrightness != null)
                    message.deviceBrightness = object.deviceBrightness >>> 0;
                if (object.ledConfig != null) {
                    if (typeof object.ledConfig !== "object")
                        throw TypeError(".sign.Config.ledConfig: object expected");
                    message.ledConfig = $root.sign.LedConfig.fromObject(object.ledConfig);
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
                if (options.defaults) {
                    object.motionEnabled = true;
                    object.motionTimeout = 30;
                    object.deviceBrightness = 100;
                    object.ledConfig = null;
                    object._unused = options.bytes === String ? "" : [];
                }
                if (message.motionEnabled != null && message.hasOwnProperty("motionEnabled"))
                    object.motionEnabled = message.motionEnabled;
                if (message.motionTimeout != null && message.hasOwnProperty("motionTimeout"))
                    object.motionTimeout = message.motionTimeout;
                if (message.deviceBrightness != null && message.hasOwnProperty("deviceBrightness"))
                    object.deviceBrightness = message.deviceBrightness;
                if (message.ledConfig != null && message.hasOwnProperty("ledConfig"))
                    object.ledConfig = $root.sign.LedConfig.toObject(message.ledConfig, options);
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
