import React, { Component } from "react";
import {
  Alert,
  Platform,
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  Slider,
  Switch,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
  Modal,
  Share
} from "react-native";
import { BleManager } from "react-native-ble-plx";
import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import SplashScreen from "react-native-splash-screen";

var buffer = require("buffer").Buffer;

// Import the config message
var protobuf = require("protobufjs/minimal");
import { sign } from "./config.pb.js";

// Default device config
var defaultConfig = require("./config.json");

// Colors config
var colorConfig = require("./colors.json");

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

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      info: "Start",
      values: {},
      config: defaultConfig,
      device: {
        id: null,
        config: null
      },
      deviceInfo: {},
      model: {
        color: "rgba(255,0,0,1)",
        opacity: 1
      },
      modal: {
        motion: false,
        info: false,
        registration: false
      },
      disabled: true
    };
    this.colors = colorConfig;
    this.device = null;
    this.payload = null;
    this.setColorAll = this.setColorAll.bind(this);
    this.manager = new BleManager();
  }

  info(message) {
    this.setState({ info: message });
  }

  error(message) {
    this.setState({ info: "ERROR: " + message });
  }

  scanAndConnect() {
    //set the first arg to the UUIDs of the services in use.
    this.manager.startDeviceScan(
      [batsUUID, disUUID, confsUUID],
      null,
      (error, device) => {
        this.info("Scanning...");
        console.log(device);

        //TODO: Connect if it contains the important information we need.
        if (
          device.localName != null &&
          device.localName.indexOf(" Light") !== -1
        ) {
          console.log(device);

          this.manager.stopDeviceScan();

          //Sets this globally
          this.device = device;

          // Then connect
          // TODO: clean this up a bit
          // TODO: Subscribe to battery notifications
          this.device
            .connect()
            .then(device => {
              this.setState({ disabled: false });
              device.onDisconnected(this.onDisconnect);
              this.info("Discovering services and characteristics");
              return device.discoverAllServicesAndCharacteristics();
            })
            .then(device => {
              return device.services();
            })
            .then(services => {
              // console.log(services);
              var temp = { name: device.localName };

              //TODO: validate that the device has all the necessary items to connect

              services.forEach((service, i) => {
                service.characteristics().then(chars => {
                  chars.forEach((char, i) => {
                    // console.log(char);

                    // If we have a config char set it up
                    if (char.uuid == confUUID) {
                      console.log("retrieving config char");
                      this.setState({
                        device: { config: char, id: this.device.id }
                      });
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
                                console.log(
                                  "Canceling connection not CD product"
                                );
                                device.cancelConnection();
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
      }
    );
  }

  onDisconnect = (error, device) => {
    this.info("Reconnecting..");

    this.setState({ disabled: true });
    this.setState({ deviceInfo: {} });

    const subscription = this.manager.onStateChange(state => {
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  };

  setColorAll(color) {
    //Update the model based on the color
    this.setState({
      model: {
        color:
          "rgb(" +
          color.colorConfig.red +
          "," +
          color.colorConfig.green +
          "," +
          color.colorConfig.blue +
          ")",
        opacity: this.state.config.deviceBrightness / 100
      }
    });

    // Temporary config for modification
    temp = this.state.config;

    // Modify the first frame
    temp.frames[0].leds.forEach(led => {
      led.colorConfig = color.colorConfig;
    });

    // Set the state and save it to disk
    this.setState({ config: temp });
    AsyncStorage.setItem("config", JSON.stringify(temp));

    // Convert the payload to binary and send it
    this.updateConfigPayload();
    this.sendConfig();
  }

  sendConfig = () => {
    if (this.state.device.config != null && this.payload != null) {
      this.info("Sending config.");

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

      chain = chain.then(() => {
        this.info("Config transfer complete.");
      });

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
    var err = sign.Config.verify(this.state.config);
    if (err) {
      console.log("proto err: " + err);
    }

    var message = sign.Config.create(this.state.config);

    console.log("message:" + JSON.stringify(message));

    this.payload = sign.Config.encode(message).finish();

    console.log("len: " + this.payload.length + " buf: " + this.payload);
  }

  componentWillMount() {
    // console.log("componentWillMount");

    // console.log("colors: " + JSON.stringify(this.colors));
    console.log("config: " + this.state.config);

    AsyncStorage.getItem("registered").then(value => {
      var temp = this.state.modal;

      if (value && value == "true") {
        temp.registration = false;
      } else {
        temp.registration = true;
      }

      this.setState({ modal: temp });

      // Once we get the previous state, if any, release the hounds
      SplashScreen.hide();
    });

    // Retrieve the config if it has been saved
    AsyncStorage.getItem("config")
      .then(value => {
        if (value) {
          console.log("setting from asyncstorage");
          this.setState({ config: JSON.parse(value) });
          console.log("config: " + JSON.stringify(this.state.config));
        }
      })
      .done();

    // Scan and connect
    const subscription = this.manager.onStateChange(state => {
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);

    this.updateConfigPayload();
  }

  //TODO confirm device via HTTPS
  onboard() {
    if (this.state.deviceInfo.name && this.state.deviceInfo.serial) {
      return (
        <View>
          <Text style={styles.instructions}>Is this your device?</Text>
          <Text style={styles.instructions}>
            Name: {this.state.deviceInfo.name}
          </Text>
          <Text style={styles.instructions}>
            SN: {this.state.deviceInfo.serial}
          </Text>
          <Button
            title="Yes"
            onPress={() => {
              var temp = this.state.modal;
              temp.registration = false;
              this.setState({ modal: temp });
              AsyncStorage.setItem("registered", "true");
            }}
          />

          <Button
            title="No"
            onPress={() => {
              // Disconnect
              this.device.cancelConnection();
            }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.instructions}>Connecting..</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal.registration}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.welcome}>Welcome!</Text>
            {this.onboard()}
          </View>
        </Modal>
        <View style={styles.header}>
          <View
            style={[
              styles.connectionIcon,
              this.state.disabled && styles.connectoinIconDisconnect
            ]}
          >
            <Icon
              style={{ fontSize: 30, color: "black" }}
              name="wifi"
              onPress={() => {
                Alert.alert("Connection!");
              }}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={[
              { width: 270, height: 270 },
              {
                backgroundColor: this.state.model.color,
                opacity: this.state.config.deviceBrightness / 100
              }
            ]}
          />
          <View style={styles.option}>
            {this.colors.map(color => {
              text =
                "rgb(" +
                color.colorConfig.red +
                "," +
                color.colorConfig.green +
                "," +
                color.colorConfig.blue +
                ")";
              return (
                <TouchableHighlight
                  disabled={this.state.disabled}
                  key={text}
                  onPress={() => this.setColorAll(color)}
                >
                  <View
                    style={{
                      width: 90,
                      height: 90,
                      backgroundColor: text
                    }}
                  />
                </TouchableHighlight>
              );
            })}
          </View>
          <View style={styles.option}>
            <View style={styles.labelHolder}>
              <Text style={styles.label}>Brightness</Text>
            </View>
            <View>
              <Slider
                style={{ width: 150 }}
                maximumValue={100}
                minimumValue={10}
                step={1}
                value={this.state.config.deviceBrightness}
                onValueChange={val => {
                  // console.log("Sliding value changed.");
                  var temp = this.state.config;
                  temp.deviceBrightness = val;
                  this.setState({ config: temp });
                  AsyncStorage.setItem("config", JSON.stringify(temp));
                }}
                onSlidingComplete={val => {
                  // console.log("Sliding complete.");
                  this.updateConfigPayload();
                  this.sendConfig();
                }}
                disabled={this.state.disabled}
              />
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modal.motion}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={styles.modal}>
              <Text style={styles.welcome}>What is Motion Mode?</Text>
              <Text style={styles.instructions}>
                Motion mode turns on your light only when motion is sensed.
                Think of it like a motion sensitive night light... but better.
              </Text>

              <Button
                title="Back"
                onPress={() => {
                  temp = this.state.modal;
                  temp.motion = false;
                  this.setState({ modal: temp });
                }}
              />
            </View>
          </Modal>
          <View style={styles.option}>
            <View style={styles.labelHolder}>
              <Text style={styles.label}>Motion mode</Text>
            </View>
            <View style={styles.icon}>
              <Icon
                style={styles.label}
                name="question-circle-o"
                onPress={() => {
                  temp = this.state.modal;
                  temp.motion = true;
                  this.setState({ modal: temp });
                }}
              />
            </View>
            <View style={styles.switch}>
              <Switch
                value={this.state.config.motionEnabled}
                disabled={this.state.disabled}
                onValueChange={val => {
                  var temp = this.state.config;
                  temp.motionEnabled = val;
                  this.setState({ config: temp });
                  AsyncStorage.setItem("config", JSON.stringify(temp));
                  this.updateConfigPayload();
                  this.sendConfig();
                }}
              />
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modal.info}
          >
            <View style={styles.modal}>
              <Text style={styles.welcome}>Info</Text>
              <Text style={styles.instructions}>{this.state.info}</Text>
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
              <Text style={styles.instructions}>
                App Version: {this.state.deviceInfo.version}
              </Text>
              <Text style={styles.welcome}>Config</Text>
              <Text style={styles.instructions}>
                {JSON.stringify(this.state.config)}
              </Text>

              <Button
                title="Share report!"
                onPress={() => {
                  var temp = {};

                  temp.message =
                    "State: " +
                    this.state.info +
                    "\n\nManufacturer: " +
                    this.state.deviceInfo.manufacturer +
                    "\n\nSN: " +
                    this.state.deviceInfo.serial +
                    "\n\nVerison: " +
                    this.state.deviceInfo.version +
                    "\n\nApp Version: " +
                    this.state.deviceInfo.version +
                    "\n\nConfig: " +
                    JSON.stringify(this.state.config);

                  temp.title = "Bug report!";

                  Share.share(temp, {
                    subject: temp.title,
                    excludedActivityTypes: [
                      "com.apple.UIKit.activity.PostToFacebook",
                      "com.apple.UIKit.activity.addToReadingList",
                      "com.apple.UIKit.activity.assignToContact",
                      "com.apple.UIKit.activity.PostToFacebook",
                      "com.apple.UIKit.activity.openInIBooks",
                      "com.apple.UIKit.activity.postToFlickr",
                      "com.apple.UIKit.activity.postToTencentWeibo",
                      "com.apple.UIKit.activity.postToVimeo",
                      "com.apple.UIKit.activity.postToWeibo",
                      "com.apple.UIKit.activity.PostToTwitter"
                    ]
                  });
                }}
              />

              <Button
                title="Back"
                onPress={() => {
                  temp = this.state.modal;
                  temp.info = false;
                  this.setState({ modal: temp });
                }}
              />
            </View>
          </Modal>
          <View style={{ paddingTop: 10 }}>
            <Button
              title="More info"
              onPress={() => {
                temp = this.state.modal;
                temp.info = true;
                this.setState({ modal: temp });
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  label: {
    fontSize: 20
  },
  labelHolder: {
    flex: 2,
    justifyContent: "center"
  },
  icon: {
    justifyContent: "center"
  },
  connectionIcon: {
    marginRight: 10,
    opacity: 1
  },
  connectoinIconDisconnect: {
    marginRight: 10,
    opacity: 0.2
  },
  switch: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  header: {
    marginTop: 22,
    height: 50,
    width: "100%",
    backgroundColor: "steelblue",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  container: {
    paddingTop: 22,
    paddingBottom: 44,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  modal: {
    flex: 1,
    width: "75%",
    justifyContent: "center",
    alignSelf: "center"
  },
  option: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 50,
    marginRight: 50,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default HomeScreen;
