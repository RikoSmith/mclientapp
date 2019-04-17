import React, { Component } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { Divider, Button } from "react-native-elements";
import { Buffer } from "buffer";
import Permissions from "react-native-permissions";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";
import instance from "../../utils/axiosConf";
var RNFS = require("react-native-fs");
import { connect } from "react-redux";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const recText = [
  "Analyzing...",
  "Hacking Google's voice recognition systems...",
  "Processing...",
  "Magic is happening now...",
  "Applying prediction models...",
  "Waiting Paul the Octopus's prediction..."
];

const notStress = [
  { message: "You seem not stressed", button: false },
  { message: "Did not detect any stress signs", button: false },
  {
    message: "You are feeling good, but anyway checkout these funny cat videos",
    button: true,
    bText: "Open cat videos",
    bLink: "https://www.youtube.com/watch?v=XyNlqQId-nk"
  },
  { message: "Everything is OK", button: false },
  {
    message:
      "Low stress level, but here are some meditation playlist just in case",
    button: true,
    bText: "Open playlist",
    bLink: "https://www.youtube.com/watch?v=F1z_ZSnn_1k"
  },
  { message: "Negligible level of stress detected, you're OK", button: false },
  {
    message: "You are feeling good, no need for relaxation measures",
    button: false
  }
];

const stress = [
  {
    message: "You are stressed. Strongly recommend these cute puppies",
    button: true,
    bText: "Puppies",
    bLink: "https://www.youtube.com/watch?v=UiBBfWyApyA"
  },
  {
    message: "Stressed, you need some help...Get the daily cuteness dose",
    button: true,
    bText: "Daily dose",
    bLink: "https://www.youtube.com/watch?v=C9OMAX91oyw"
  },
  {
    message: "Seems like you are a bit stressed. It's time for clumsy pandas",
    button: true,
    bText: "Clumsy pandas",
    bLink: "https://www.youtube.com/watch?v=wAEzpwvrveg&t=2s"
  },
  {
    message: "Stress is detected. Solution: Try Not To Laugh Challenge",
    button: true,
    bText: "Accept challenge",
    bLink: "https://www.youtube.com/watch?v=_uh2R0jSIGs"
  },
  {
    message:
      "Moderate level of stress detected. Meditation and relaxation advised",
    button: true,
    bText: "Meditate",
    bLink: "https://www.youtube.com/watch?v=ubL_HF2RGsA"
  }
];

class TablesScreen extends Component {
  sound = null;
  state = {
    audioFile: "",
    recording: false,
    loaded: false,
    paused: true,
    result: "Click Record",
    resultShown: false,
    lastId: null,
    n: 0,
    stressed: null,
    fShown: false
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
    this.setState({
      audioFile: "",
      recording: true,
      loaded: false,
      resultShown: false,
      fShown: false
    });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    n = getRandomInt(0, recText.length - 1);
    this.setState({ result: recText[n] });
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
              if (response.data.new_mood === "stressed") {
                n = getRandomInt(0, stress.length - 1);
                console.log("stressed: " + n);
                comp.setState({
                  result: stress[n].message,
                  resultShown: true,
                  fShown: true,
                  lastId: response.data.fdata_id,
                  n,
                  stressed: true
                });
              } else {
                n = getRandomInt(0, notStress.length - 1);
                console.log("not stressed: " + n);
                comp.setState({
                  result: notStress[n].message,
                  resultShown: true,
                  fShown: true,
                  lastId: response.data.fdata_id,
                  n,
                  stressed: false
                });
              }
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

  feedbackHandlerFalse = () => {
    console.log("feedback handler: false");
    this.setState({ fShown: false });
    const f = new FormData();
    console.log("sending feedback");
    f.append("feedback", false);
    f.append("lastId", this.state.lastId);
    instance
      .post("/feedback", f, {
        headers: {
          "x-access-token": token_auth
        }
      })
      .then(response => {
        console.log("sent feedback");
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  feedbackHandlerTrue = () => {
    console.log("feedback handler true");
    this.setState({ fShown: false });
    const f = new FormData();
    console.log("sending feedback");
    f.append("feedback", true);
    f.append("lastId", this.state.lastId);
    instance
      .post("/feedback", f, {
        headers: {
          "x-access-token": token_auth
        }
      })
      .then(response => {
        console.log("sent feedback");
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  feedbackSkip = () => {
    this.setState({ fShown: false });
  };

  render() {
    //console.log("rendering TS");
    const {
      recording,
      paused,
      audioFile,
      resultShown,
      result,
      fShown
    } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 350,
            backgroundColor: "#fff",
            margin: 20,
            padding: 20
          }}
        >
          <Text style={styles.textHeader}>Stress Level</Text>
          <Divider style={{ marginBottom: 20 }} />
          <View style={styles.tCont}>
            {!resultShown && (
              <Text style={styles.text}>
                {recording ? "Recording..." : result}
              </Text>
            )}
            {resultShown && this.state.stressed && (
              <Text style={styles.textRed}>
                {recording ? "Recording..." : result}
              </Text>
            )}
            {resultShown && !this.state.stressed && (
              <Text style={styles.textGreen}>
                {recording ? "Recording..." : result}
              </Text>
            )}
          </View>
          {resultShown && this.state.stressed && (
            <View>
              <Divider style={{ marginBottom: 20, marginTop: 20 }} />
              <Button
                type="clear"
                containerStyle={styles.lbutton}
                title={stress[this.state.n].bText}
                onPress={() => Linking.openURL(stress[this.state.n].bLink)}
              />
            </View>
          )}
          {resultShown &&
            !this.state.stressed &&
            notStress[this.state.n].bText && (
              <View>
                <Divider style={{ marginBottom: 20, marginTop: 20 }} />
                <Button
                  containerStyle={styles.lbutton}
                  type="clear"
                  title={notStress[this.state.n].bText}
                  onPress={() => Linking.openURL(notStress[this.state.n].bLink)}
                />
              </View>
            )}
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
        <View>
          {fShown && <Text style={styles.textFeedback}>Is it correct?</Text>}
          {fShown && (
            <View style={styles.fButtons}>
              <Button
                type="clear"
                title="Yes, it is"
                onPress={this.feedbackHandlerTrue}
              />
              <Button type="clear" title="Skip" onPress={this.feedbackSkip} />
              <Button
                type="clear"
                title="No, it's not"
                onPress={this.feedbackHandlerFalse}
              />
            </View>
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
    justifyContent: "center",
    backgroundColor: "#edf0fd"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 80,
    marginTop: 20
  },
  text: {
    fontSize: 24,
    alignSelf: "center",
    textAlign: "center",
    color: "#222"
  },
  textGreen: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#2e9e97"
  },
  textRed: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#cf1717"
  },
  textFeedback: {
    fontSize: 16,
    alignSelf: "center",
    margin: 20,
    marginBottom: 10,
    marginTop: 50
  },
  tCont: {
    flex: 0.3,
    justifyContent: "center",
    alignSelf: "center"
  },
  fButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  textHeader: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#888",
    padding: 5
  },
  lbutton: {
    color: "red"
  }
});
