import React, { Component } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Buffer } from "buffer";
import Permissions from "react-native-permissions";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";
import instance from "../../utils/axiosConf";
var RNFS = require("react-native-fs");
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";
var fft = require("fft-js"),
  MFCC = require("mfcc");
//var Meyda = require("meyda");
//Meyda.bufferSize = 512;
//Meyda.numberOfMFCCCoefficients = 30;

function concatTypedArrays(a, b) {
  // a, b TypedArray of same type
  var c = new a.constructor(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

class TablesScreen extends Component {
  sound = null;
  state = {
    audioFile: "",
    recording: false,
    loaded: false,
    paused: true,
    result: "Click Record"
  };
  counter = 0;
  audioBase64 = "";
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 38545,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "test.wav"
    };

    AudioRecord.init(options);

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      // do something with audio chunk
      this.counter++;
      if (this.counter <= 128) {
        this.audioBase64 = this.audioBase64.concat(data);
        console.log("real_time: " + this.counter);
        console.log("this.audioBase64 length: " + this.audioBase64.length);
        console.log(chunk);
        //f = Meyda.extract("mfcc", chunk);
        //console.log(f);
      }
      if (this.counter > 128) {
        this.stop();
      }
    });
  }

  checkPermission = async () => {
    const p = await Permissions.check("microphone");
    console.log("permission check", p);
    if (p === "authorized") return;
    this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request("microphone");
    console.log("permission request", p);
  };

  start = () => {
    console.log("start record");
    this.setState({ audioFile: "", recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log("stop record");
    this.setState({ result: "Processing..." });
    let audioFile = await AudioRecord.stop();
    this.setState({ audioFile, recording: false });
    final = [];
    console.log("audioFile", audioFile);
    console.log("audioBase64 length: " + this.audioBase64.length);
    //---------------------------------------------------
    //Feature Ext Version
    //-------------------------------------------

    /*buff = Buffer.from(this.audioBase64, "base64");
    final = Meyda.extract("mfcc", buff);
    /*division = Math.floor(this.audioBase64.length / 4);
    //Division
    for (i = 0; i < 4; i++) {
      if (i < 3) {
        str2 = this.audioBase64.slice(i * division, (i + 1) * division);
      } else {
        str2 = this.audioBase64.slice(i * division, this.audioBase64.length);
      }
      buff = Buffer.from(str2, "base64");
      fe = Meyda.extract("mfcc", buff);
      final = final.concat(fe);
      console.log(i + "-th slice: " + str2.length);
      console.log(i + "-th buff: " + buff.length);
      console.log(fe);
    }*/
    /*console.log("final");
    console.log("final:" + final);
    this.counter = 0;

    /*const f = new FormData();
    f.append("lol", "asdasd");
    f.append("features", JSON.stringify({ fe: final }));
    console.log(f);
    console.log("MY TOKEN: " + this.props.token);
    instance
      .post("/test_feature", f, {
        headers: {
          "x-access-token": this.props.token
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({ result: response.data.new_mood });
      })
      .catch(err => {
        console.log(err);
      });*/
    //------------------------------------
    //End of Feature Ext Version
    //------------------------------------

    //--------------------------------------------------
    //Feature Ext with Saving
    //--------------------------------------------------
    comp = this;
    token_auth = this.props.token;
    console.log("comp");
    console.log(comp);
    setTimeout(function() {
      RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then(result => {
          console.log("GOT RESULT", result);

          // stat the first file
          return Promise.all([
            RNFS.stat(result[result.length - 1].path),
            result[result.length - 1].path
          ]);
        })
        .then(statResult => {
          if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], "base64");
          }

          return "no file";
        })
        .then(contents => {
          // log the file contents
          const f = new FormData();
          f.append("lol", "asdasd");
          f.append("audio", contents);
          console.log(f);
          console.log("MY TOKEN: " + token_auth);
          console.log(contents.length);
          buff = Buffer.from(contents, "base64");
          console.log("buff size: " + buff.length);

          // Get our 32 complex FFT Phasors
          var phasors = fft.fft(buff);
          // Get our 32 frequency magnitudes
          var mags = fft.util.fftMag(phasors);
          // Construct an MFCC with the characteristics we desire
          var mfcc = MFCC.construct(
            32, // Number of expected FFT magnitudes
            20, // Number of Mel filter banks
            400, // Low frequency cutoff
            20000, // High frequency cutoff
            44100
          ); // Sample Rate (8khz)

          // Run our MFCC on the FFT magnitudes
          var coef = mfcc(mags);

          console.log(coef);

          instance
            .post("/test", f, {
              headers: {
                "x-access-token": token_auth
              }
            })
            .then(response => {
              console.log(response.data);
              comp.setState({ result: response.data.new_mood });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err.message, err.code);
        });
    }, 2000);
    //--------------------------------------------------
    //End of Feature Ext with Saving
    //--------------------------------------------------

    //--------------------------------------------------------\
    //Sending File
    //-----------------------------------------------------
    /*comp = this;
    token_auth = this.props.token;
    console.log("comp");
    console.log(comp);
    setTimeout(function() {
      RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then(result => {
          console.log("GOT RESULT", result);

          // stat the first file
          return Promise.all([
            RNFS.stat(result[result.length - 1].path),
            result[result.length - 1].path
          ]);
        })
        .then(statResult => {
          if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], "base64");
          }

          return "no file";
        })
        .then(contents => {
          // log the file contents
          const f = new FormData();
          f.append("lol", "asdasd");
          f.append("audio", contents);
          console.log(f);
          console.log("MY TOKEN: " + token_auth);
          console.log(contents.length);
          instance
            .post("/test", f, {
              headers: {
                "x-access-token": token_auth
              }
            })
            .then(response => {
              console.log(response.data);
              comp.setState({ result: response.data.new_mood });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err.message, err.code);
        });
    }, 2000);*/

    //-----------------------------------------------------
    //End Sending Files Version
    //-------------------------------------------------------
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject("file path is empty");
      }

      this.sound = new Sound(this.state.audioFile, "", error => {
        if (error) {
          console.log("failed to load the file", error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory("Playback");

    this.sound.play(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tCont}>
          <Text style={styles.text}>
            {recording ? "Recording..." : this.state.result}
          </Text>
        </View>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(TablesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  text: {
    fontSize: 24,
    alignSelf: "center"
  },
  tCont: {
    flex: 0.3,
    justifyContent: "center"
  }
});
