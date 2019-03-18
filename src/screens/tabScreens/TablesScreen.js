import React, { Component } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Buffer } from "buffer";
import Permissions from "react-native-permissions";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";
import instance from "../../utils/axiosConf";
var RNFS = require("react-native-fs");
import { connect } from "react-redux";

class TablesScreen extends Component {
  sound = null;
  state = {
    audioFile: "",
    recording: false,
    loaded: false,
    paused: true,
    result: "Click Record"
  };
  audioBase64 = "";
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 48000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "test.wav"
    };

    AudioRecord.init(options);

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      // do something with audio chunk
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
    this.setState({ result: "Processing..." });
    //console.log("63");
    let audioFile = await AudioRecord.stop();
    //console.log("65");
    this.setState({ audioFile, recording: false });
    //console.log("67");

    //--------------------------------------------------------\
    //-----------------------------------------------------
    comp = this;
    token_auth = this.props.token;
    setTimeout(function() {
      RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then(result => {
          //console.log("GOT RESULT", result);
          //console.log("75-76");
          // stat the first file
          return Promise.all([
            RNFS.stat(result[result.length - 1].path),
            result[result.length - 1].path
          ]);
        })
        .then(statResult => {
          if (statResult[0].isFile()) {
            // if we have a file, read it
            //console.log("80-82");
            return RNFS.readFile(statResult[1], "base64");
          }

          return "no file";
        })
        .then(contents => {
          //console.log("89");
          // log the file contents
          const f = new FormData();
          f.append("lol", "asdasd");
          f.append("audio", contents);
          //console.log(f);
          //console.log("MY TOKEN: " + token_auth);
          //console.log(contents.length);
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
          //console.log("103-116");
          console.log(err.message, err.code);
        });
    }, 2000);

    //-----------------------------------------------------
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
    //console.log("rendering TS");
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
