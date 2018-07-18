/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Alert,
  Platform,
  FlatList,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import { BleManager } from "react-native-ble-plx";

var buffer = require("buffer").Buffer;

// Import the config message
var protobuf = require("protobufjs/minimal");
import { sign } from "./config.pb.js";

// Default device config
var defaultConfig = require("./config.json");

// Services
const batsUUID = "0000180f-0000-1000-8000-00805f9b34fb";
const disUUID = "0000180a-0000-1000-8000-00805f9b34fb";
const confsUUID = "0000f510-8d45-6280-f64d-ff5fb31a0972";

// Chars
const manufacturerUUID = "00002a29-0000-1000-8000-00805f9b34fb";
const modelUUID = "00002a24-0000-1000-8000-00805f9b34fb";
const serialUUID = "00002a25-0000-1000-8000-00805f9b34fb";
const versionUUID = "00002a26-0000-1000-8000-00805f9b34fb";
const confUUID = "0000f511-0000-1000-8000-00805f9b34fb";
const batUUID = "00002a19-0000-1000-8000-00805f9b34fb";

// Bluetooth Transfer stuff
const ble_config_tx_start = new Uint8Array([0xaa, 0xaa]);
const ble_config_tx_end = new Uint8Array([0x5a, 0xa5]);
const ble_config_chunk_size = 128;

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      info: "",
      values: {},
      device: {
        config: null
      },
      deviceInfo: {
        name: "",
        manufacturer: "",
        model: "",
        serial: "",
        version: ""
      },
      connected: false
    };
    this.device = null;
    this.payload = null;
    this.manager = new BleManager();
  }

  info(message) {
    this.setState({ info: message });
  }

  error(message) {
    this.setState({ info: "ERROR: " + message });
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      this.info("Scanning...");
      // console.log(device);

      //TODO: Connect if it contains the important information we need.
      if (
        device.localName != null &&
        device.localName.indexOf(" Light") !== -1
      ) {
        // console.log(device);

        this.manager.stopDeviceScan();

        //Sets this globally
        this.device = device;

        // Then connect
        // TODO: clean this up a bit
        // TODO: Subscribe to battery notifications
        this.device
          .connect()
          .then(device => {
            device.onDisconnected(this.onDisconnect);
            this.info("Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            return device.services();
          })
          .then(services => {
            // console.log(services);
            temp = {};

            //TODO: validate that the device has all the necessary items to connect

            services.forEach((service, i) => {
              service.characteristics().then(chars => {
                chars.forEach((char, i) => {
                  // console.log(char);

                  // If we have a config char set it up
                  if (char.uuid == confUUID) {
                    console.log("retrieving config char");
                    this.setState({ device: { config: char } });
                  }

                  if (char.isReadable) {
                    char.read().then(resp => {
                      if (resp.value) {
                        switch (char.uuid) {
                          case manufacturerUUID:
                            if (atob(resp.value) == "Circuit Dojo") {
                              temp.manufacturer = atob(resp.value);
                            } else {
                              // Disconnect and get out of here if the MFR is not us
                              device.disconnect();
                              return;
                            }

                            break;
                          case modelUUID:
                            temp.model = atob(resp.value);
                            break;
                          case serialUUID:
                            // TODO: Check local cache to see if the serial has
                            // already been checked
                            // TODO: if not, validate serial with web backend.=
                            // TODO: save validated results to file.
                            temp.serial = atob(resp.value);
                            break;
                          case versionUUID:
                            temp.version = atob(resp.value);
                            break;
                          default:
                        }

                        // console.log(atob(resp.value));
                        this.setState({
                          deviceInfo: temp
                        });
                      }
                    });
                  }
                });
              });
            });
            this.info("Services found");
          });
      }

      if (error) {
        console.log("error");
        this.error(error.message);
        return;
      }

      // if (device.localName != null && device.localName.indexOf("Light") != -1) {
      //   this.info("Connecting to " + device.localName);

      // TODO check if it has the DIS service
      // TODO check the MFR info
      // TODO check the serial #

      // this.manager.stopDeviceScan();
      // device
      //   .connect()
      //   .then(device => {
      //     this.info("Discovering services and characteristics");
      //     return device.discoverAllServicesAndCharacteristics();
      //   })
      //   .then(device => {
      //     this.info("Setting notifications");
      //     return this.setupNotifications(device);
      //   })
      //   .then(
      //     () => {
      //       this.info("Listening...");
      //     },
      //     error => {
      //       this.error(error.message);
      //     }
      //   );
      // }
    });
  }

  onDisconnect = (error, device) => {
    this.info("Reconnecting..");

    const subscription = this.manager.onStateChange(state => {
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  };

  //TODO: Move the logic for sending data to a separate function..
  _onButtonPressed = () => {
    if (this.state.device.config != null && this.payload != null) {
      // console.log(ble_config_tx_start);

      start = new buffer.from(ble_config_tx_start).toString("base64");
      finish = new buffer.from(ble_config_tx_end).toString("base64");

      index = 0;
      out = [];

      out.push(start);
      console.log("push " + start);

      while (index < this.payload.length) {
        offset = this.payload.length - index;

        if (offset > ble_config_chunk_size) {
          offset = ble_config_chunk_size;
        }

        // console.log("index " + index + " " + (index + offset));

        data = this.payload.slice(index, index + offset);
        dataEncoded = new buffer.from(data).toString("base64");

        console.log("push " + dataEncoded);
        out.push(dataEncoded);

        // Need to increment to the next one..
        index += offset;
      }

      console.log("push " + finish);
      out.push(finish);

      // We create the start of a promise chain
      let chain = Promise.resolve();

      index = 0;

      // And append each function in the array to the promise chain
      for (const func of out) {
        console.log("shifing " + out[index]);
        chain = chain.then(
          this.state.device.config.writeWithResponse(out[index++])
        );
      }

      // console.log("push " + finish);
      // out.push(finish);
      //
      // // Write the data sequentially
      // var chain = q.when();
      // for (var i = 0; i < out.length; i++) {
      //   console.log(out[i]);
      //   chain = chain.then(this.state.device.config.writeWithResponse(out[i]));
      // }
    } else {
      Alert.alert("Config not ready.");
    }
  };

  updateConfigPayload() {
    // Parse and update the payload
    var err = sign.Config.verify(this.config);
    if (err) {
      console.log("proto err: " + err);
    }

    var message = sign.Config.create(this.config);

    console.log("message:" + JSON.stringify(message));

    this.payload = sign.Config.encode(message).finish();

    console.log("len: " + this.payload.length + " buf: " + this.payload);
  }

  componentWillMount() {
    console.log("componentWillMount");

    //Set the default Config
    this.config = defaultConfig;
    console.log(this.config);

    // Scan and connect
    const subscription = this.manager.onStateChange(state => {
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);

    this.updateConfigPayload();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.info}</Text>
        <Text style={styles.instructions}>
          Manufacturer: {this.state.deviceInfo.manufacturer}
        </Text>
        <Text style={styles.instructions}>
          Model: {this.state.deviceInfo.model}
        </Text>
        <Text style={styles.instructions}>
          SN: {this.state.deviceInfo.serial}
        </Text>
        <Text style={styles.instructions}>
          Verison: {this.state.deviceInfo.version}
        </Text>
        <Text style={styles.welcome}>Config</Text>
        <Text style={styles.instructions}>
          {JSON.stringify(this.state.config)}
        </Text>
        <Button onPress={this._onButtonPressed} title="Send Config" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
