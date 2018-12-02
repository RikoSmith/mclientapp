import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
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
    paused: true
  };

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,
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
    console.log("stop record");
    let audioFile = await AudioRecord.stop();
    console.log("audioFile", audioFile);
    this.setState({ audioFile, recording: false });
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

      const f = new FormData();
      f.append("weight", "65");
      f.append("hbeat", "75");
      f.append("mood", "moderate");
      f.append("totdo", "w7");

      RNFS.readDir(RNFS.DocumentDirectoryPath1)
        .then(result => {
          console.log("GOT RESULT", result);
          f.append("audio", {
            uri:
              "file://" +
              RNFS.DocumentDirectoryPath +
              "/" +
              result[result.length - 1].name,
            type: "audio/wave",
            name: result[result.length - 1].name
          });
          return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then(statResult => {
          if (statResult[0].isFile()) {
            console.log("MY FILE:" + statResult[0].name);
          }
          return "no file";
        })
        .then(contents => {
          console.log(contents);
        })
        .catch(err => {
          console.log(err.message, err.code);
        });
      //--------------------------------------------------------\
      //-----------------------------------------------------
      // RNFS.readDir(RNFS.ExternalStorageDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      //   .then(result => {
      //     console.log("GOT RESULT", result);
      //     f.append("audio", {
      //       uri:
      //         "file://" +
      //         RNFS.ExternalStorageDirectoryPath +
      //         "/" +
      //         result[result.length - 1].name,
      //       type: "audio/wave",
      //       name: result[result.length - 1].name
      //     });

      //     // stat the first file
      //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      //   })
      //   .then(statResult => {
      //     if (statResult[0].isFile()) {
      //       console.log("MY FILE:" + statResult[0].name);
      //     }

      //     return "no file";
      //   });
      //-----------------------------------------------------
      console.log(f);
      console.log("MY TOKEN: " + this.props.token);
      instance
        .post("/fdata", f, {
          headers: {
            "x-access-token": this.props.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
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
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.load} title="Send" disabled={recording} />
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
  }
});
