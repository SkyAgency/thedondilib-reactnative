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
  Share,
  Dimensions
} from "react-native";
import { BleManager } from "react-native-ble-plx";
import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import SplashScreen from "react-native-splash-screen";
import { ColorPicker } from "react-native-color-picker";

var buffer = require("buffer").Buffer;
var tinycolor = require("tinycolor2");

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

const defaultState = {};

const defaultDeviceInfo = {
  id: "",
  model: "",
  name: "",
  serial: "",
  manufacturer: "",
  version: ""
};

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      info: "Start",
      values: {},
      config: defaultConfig,
      deviceInfo: defaultDeviceInfo,
      modal: {
        motion: false,
        info: false,
        registration: true,
        connection: false
      },
      disabled: true,
      configFetched: false
    };
    this.busy = false;
    this.colors = colorConfig;
    this.defaultColorSet = false;
    this.device = null;
    this.lastPayload = null;
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

  processChar(char, temp) {
    // If we have a config char set it up
    if (char.value != null) {
      switch (char.uuid) {
        case manufacturerUUID:
          if (atob(char.value) == "Circuit Dojo") {
            temp.manufacturer = atob(char.value);
          } else {
            return false;
          }
          break;
        case modelUUID:
          temp.model = atob(char.value);
          break;
        case serialUUID:
          // TODO: Check local cache to see if the serial has
          // already been checked
          // TODO: if not, validate serial with web backend.=
          // TODO: save validated results to file.
          temp.serial = atob(char.value);
          break;
        case versionUUID:
          temp.version = atob(char.value);
          break;
        default:
      }

      // console.log(temp);
    }

    return true;
  }

  scanAndConnect() {
    this.info("Scanning...");
    //set the first arg to the UUIDs of the services in use.
    this.manager.startDeviceScan([batsUUID, disUUID], null, (error, device) => {
      this.info("Scanning...");
      // console.log(device);

      //TODO: Connect if it contains the important information we need.
      if (
        device.localName != null &&
        device.localName.indexOf(" Light") !== -1
      ) {
        this.manager.stopDeviceScan();

        // If the device id is set, but the IDs do not match, abort!
        if (
          this.state.deviceInfo.id != "" &&
          this.state.deviceInfo.id != device.id
        ) {
          console.log("id is set but no match");
          return;
        } else {
          console.log("id is set with match");
        }

        //Sets this globally
        this.device = device;

        // Then connect
        // TODO: clean this up a bit
        // TODO: Subscribe to battery notifications
        this.device
          .connect()
          .then(device => {
            // console.log(device);
            device.onDisconnected(this.onDisconnect);
            this.setState({ disabled: false });
            this.info("Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            return device.services();
          })
          .then(services => {
            // console.log(services);
            var temp = this.state.deviceInfo;
            temp.name = device.localName;
            temp.id = device.id;

            // console.log(temp);

            //TODO: validate that the device has all the necessary items to connect

            let chain = Promise.resolve();

            services.forEach((service, i) => {
              chain = chain.then(() => {
                return service.characteristics();
              });

              chain = chain.then(chars => {
                chars.forEach((char, i) => {
                  if (char.isReadable) {
                    return char.read().then(char => {
                      // console.log(char);

                      if (!this.processChar(char, temp)) {
                        // Disconnect and get out of here if the MFR is not us
                        console.log("Canceling connection not CD product");
                        device.cancelConnection();
                        return;
                      }

                      // console.log("set device info");
                      this.setState({
                        deviceInfo: temp
                      });

                      // console.log("returning ok: " + JSON.stringify(temp));
                    });
                  }
                  // console.log(char);
                });
              });
            });

            return chain;
          })
          .then(() => {
            // Update config..
            if (!this.state.modal.registration) {
              this.updateConfig();
            }

            this.info("Services found");
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      if (error) {
        console.log("error");
        this.error(error.message);
        return;
      }
    });
  }

  onDisconnect = (error, device) => {
    this.info("Reconnecting..");

    console.log("reconnecting");

    this.setState({ disabled: true });
    this.setState({ deviceInfo: defaultDeviceInfo });

    const subscription = this.manager.onStateChange(state => {
      console.log("subscipt " + state);
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  };

  getStateFromFile() {
    // Retrieve the config if it has been saved
    return AsyncStorage.getItem("state");
  }

  saveStateToFile() {
    console.log(JSON.stringify(this.state.config));
    AsyncStorage.setItem("state", JSON.stringify(this.state));
  }

  async clearStateFile() {
    try {
      await AsyncStorage.removeItem("state");
      return true;
    } catch (exception) {
      return false;
    }
  }

  getColorAll() {
    color = this.state.config.frames[0].leds[0].colorConfig;

    console.log("getColorAll:" + JSON.stringify(color));

    // console.log("heex string ", tinycolor(out).toHexString());

    return { r: color.red, g: color.green, b: color.blue };
  }

  setColorAll(color) {
    //Update the model based on the color
    console.log("color:" + JSON.stringify(color));

    // Temporary config for modification
    temp = this.state.config;

    // Modify the first frame
    temp.frames[0].leds.forEach(led => {
      led.colorConfig = { red: color.r, green: color.g, blue: color.b };
      led.enabled = true;
      led.duty = 100;
    });

    // Set the state and save it to disk
    this.setState({ config: temp });

    if (!this.disabled) {
      this.updateConfig();
    }
  }

  sendConfigPayload(callback) {
    if (
      this.state.config != null &&
      this.payload != null &&
      !this.busy &&
      !this.disabled
    ) {
      this.info("Sending config.");

      this.busy = true;

      // Set old config
      this.lastPayload = this.payload;

      start = new buffer.from(ble_config_tx_start).toString("base64");
      finish = new buffer.from(ble_config_tx_end).toString("base64");

      index = 0;
      out = [];

      out.push(start);
      // console.log("push " + start);

      while (index < this.payload.length) {
        offset = this.payload.length - index;

        if (offset > ble_config_chunk_size) {
          offset = ble_config_chunk_size;
        }

        // console.log("index " + index + " " + (index + offset));

        data = this.payload.slice(index, index + offset);
        dataEncoded = new buffer.from(data).toString("base64");

        // console.log("push " + dataEncoded);
        out.push(dataEncoded);

        // Need to increment to the next one..
        index += offset;
      }

      // console.log("push " + finish);
      out.push(finish);

      // We create the start of a promise chain
      let chain = Promise.resolve();

      index = 0;

      // And append each function in the array to the promise chain
      for (const func of out) {
        // console.log("shifing " + out[index]);
        chain = chain.then(() => {
          return this.device.writeCharacteristicWithResponseForService(
            confsUUID,
            confUUID,
            out[index++]
          );
        });
      }

      chain = chain.then(() => {
        // console.log(this.state.config);
        this.busy = false;

        // Call the callback if its there
        callback && callback();

        // If they are not equal.. send!
        if (this.payload != this.lastPayload) {
          this.sendConfigPayload();
        }
      });
    }
  }

  updateConfigPayload() {
    // Parse and update the payload
    var err = sign.Config.verify(this.state.config);
    if (err) {
      console.log("proto err: " + err);
    }

    var message = sign.Config.create(this.state.config);

    // console.log("message:" + JSON.stringify(message));

    this.payload = sign.Config.encode(message).finish();

    // console.log("len: " + this.payload.length + " buf: " + this.payload);
  }

  componentWillMount() {
    // console.log("componentWillMount");

    this.getStateFromFile().then(state => {
      if (state) {
        console.log("state from file: " + state);

        var tstate = JSON.parse(state);
        tstate.configFetched = false;
        tstate.disabled = true;
        this.setState(tstate);

        // First set the color wheel
        this.setColorWheelDefault();

        // Then set the configFetched to true!
        this.setState({ configFetched: true });
      }

      // Once we get the previous state, if any, release the hounds
      SplashScreen.hide();
    });

    // Scan and connect
    const subscription = this.manager.onStateChange(state => {
      console.log("subscipt " + state);
      if (state === "PoweredOn") {
        console.log("subscript");
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  _onOnboardingYesButtonPressed = () => {
    var temp = this.state.modal;
    temp.registration = false;
    this.setState({ modal: temp });
    this.saveStateToFile();
  };

  _onOnboardingNoButtonPressed = () => {
    // Disconnect
    this.device.cancelConnection();
  };

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
          <Button title="Yes" onPress={this._onOnboardingYesButtonPressed} />
          <Button title="No" onPress={this._onOnboardingNoButtonPressed} />
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

  _onColorChange = color => {
    // console.log("hsb " + JSON.stringify(color));
    // Always set these to 100 as we don't have the sliders
    color.v = 100;
    color.s = 100;
    var temp = tinycolor(color).toRgb();
    this.setColorAll(temp);
  };

  setColorWheelDefault() {
    this.setState({
      wheelDefault: tinycolor(this.getColorAll()).toHexString()
    });

    console.log("wheel default " + this.state.wheelDefault);
  }

  loadColorWheel = () => {
    if (this.state.configFetched) {
      return (
        <ColorPicker
          defaultColor={this.state.wheelDefault}
          hideSliders={true}
          onColorChange={this._onColorChange}
          style={{
            width: Dimensions.get("window").width * 0.8,
            height: Dimensions.get("window").width * 0.8,
            marginLeft: 25,
            marginRight: 25,
            alignSelf: "center"
          }}
        />
      );
    } else {
      return;
    }
  };

  _onShareReportPressed = () => {
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
  };

  _onInfoBackPressed = () => {
    temp = this.state.modal;
    temp.info = false;
    this.setState({ modal: temp });
  };

  _onMotionInfoBackPressed = () => {
    temp = this.state.modal;
    temp.motion = false;
    this.setState({ modal: temp });
  };

  loadRegistrationModal() {
    return (
      <Modal
        animationType="none"
        transparent={false}
        visible={this.state.modal.registration}
      >
        <View style={styles.modal}>
          <Text style={styles.welcome}>Welcome!</Text>
          {this.onboard()}
        </View>
      </Modal>
    );
  }

  loadMotionInfoModal() {
    return (
      <Modal
        animationType="none"
        transparent={false}
        visible={this.state.modal.motion}
      >
        <View style={styles.modal}>
          <Text style={styles.welcome}>What is Motion Mode?</Text>
          <Text style={styles.instructions}>
            Motion mode turns on your light only when motion is sensed. Think of
            it like a motion sensitive night light... but better.
          </Text>

          <Button title="Back" onPress={this._onMotionInfoBackPressed} />
        </View>
      </Modal>
    );
  }

  updateConfig(callback) {
    this.saveStateToFile();
    this.updateConfigPayload();
    this.sendConfigPayload(callback);
  }

  test() {
    console.log("test");
  }

  _onConnectionBackPressed = () => {
    temp = this.state.modal;
    temp.connection = false;
    this.setState({ modal: temp });
  };

  _onDeleteOkButtonPressed = () => {
    //async wait for this to complete
    this.clearStateFile();

    var temp = this.state.config;
    temp.monogamyMode = false;
    this.setState({ config: temp });

    //Update config..
    this.updateConfig(() => {
      console.log("canceling conneciton");
      this.manager.cancelDeviceConnection(this.state.deviceInfo.id);
    });

    temp.monogamyMode = true;
    this.setState({ config: temp });

    var temp = this.state.modal;
    temp.registration = true;
    temp.connection = false;
    this.setState({ modal: temp });
    this.saveStateToFile();
  };

  _onDeleteCancelButtonPressed = () => {
    console.log("canceled!");
  };

  _onDisableMonogamySwitchChange = val => {
    console.log("Monogamy mode: " + val);
    var temp = this.state.config;
    temp.monogamyMode = val;
    this.setState({ config: temp });
    this.updateConfig();
  };

  loadConnectionModal() {
    return (
      <Modal
        animationType="none"
        transparent={false}
        visible={this.state.modal.connection}
      >
        <View style={styles.connectionModal}>
          <Text style={styles.welcome}>
            {this.state.disabled
              ? "Disconnected."
              : this.state.deviceInfo.name + " connected."}
          </Text>

          <View style={styles.option}>
            <View style={styles.labelHolder}>
              <Text style={{ fontSize: 15, flex: 2 }}>
                Only connect to this phone
              </Text>
            </View>
            <View style={styles.switch}>
              <Switch
                value={this.state.config.monogamyMode}
                disabled={this.state.disabled}
                onValueChange={this._onDisableMonogamySwitchChange}
              />
            </View>
          </View>

          <Button
            title="Remove Connection"
            disabled={this.state.disabled}
            onPress={() => {
              Alert.alert(
                "Delete Connection",
                "Are you sure you want to delete the connection?",
                [
                  {
                    text: "Cancel",
                    onPress: this._onDeleteCancelButtonPressed,
                    style: "cancel"
                  },
                  { text: "OK", onPress: this._onDeleteOkButtonPressed }
                ],
                { cancelable: false }
              );
            }}
          />
          <Button title="Back" onPress={this._onConnectionBackPressed} />
        </View>
      </Modal>
    );
  }

  loadInfoModal() {
    return (
      <Modal
        animationType="none"
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
          <Button title="Share report!" onPress={this._onShareReportPressed} />
          <Button title="Back" onPress={this._onInfoBackPressed} />
        </View>
      </Modal>
    );
  }

  _onBrightnessSliderChange = val => {
    // console.log("Sliding value changed.");
    var temp = this.state.config;
    temp.deviceBrightness = val;
    this.setState({ config: temp });
  };

  _onBrightnessSliderComplete = val => {
    // console.log("Sliding complete.");
    this.updateConfig();
  };

  _onMotionSwichChanged = val => {
    var temp = this.state.config;
    temp.motionEnabled = val;
    this.setState({ config: temp });
    this.updateConfig();
  };

  _onMotionQuestionButtonPressed = () => {
    temp = this.state.modal;
    temp.motion = true;
    this.setState({ modal: temp });
  };

  _onInfoButtonPressed = () => {
    temp = this.state.modal;
    temp.info = true;
    this.setState({ modal: temp });
  };

  _onConnectionButtonPressed = () => {
    temp = this.state.modal;
    temp.connection = true;
    this.setState({ modal: temp });
  };

  render() {
    return (
      <View style={styles.view}>
        {this.loadRegistrationModal()}
        {this.loadInfoModal()}
        {this.loadMotionInfoModal()}
        {this.loadConnectionModal()}
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
              onPress={this._onConnectionButtonPressed}
            />
          </View>
        </View>

        {this.loadColorWheel()}
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
              onValueChange={this._onBrightnessSliderChange}
              onSlidingComplete={this._onBrightnessSliderComplete}
              disabled={this.state.disabled}
            />
          </View>
        </View>
        <View style={styles.option}>
          <View style={styles.labelHolder}>
            <Text style={styles.label}>Motion mode</Text>
          </View>
          <View style={styles.icon}>
            <Icon
              style={styles.label}
              name="question-circle-o"
              onPress={this._onMotionQuestionButtonPressed}
            />
          </View>
          <View style={styles.switch}>
            <Switch
              value={this.state.config.motionEnabled}
              disabled={this.state.disabled}
              onValueChange={this._onMotionSwichChanged}
            />
          </View>
        </View>

        <View style={{ paddingTop: 10 }}>
          <Button title="More info" onPress={this._onInfoButtonPressed} />
        </View>
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
  deleteButton: {
    paddingTop: 10,
    paddingBottom: 10
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
  connectionModal: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
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
