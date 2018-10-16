"use strict";

var React = require("react-native");

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  // STATUS CARD ---------------------------------------
  card: {
    borderRadius: 5,
    padding: 20
  },
  cardBigIcon: {
    fontSize: 50,
    color: "#ccc",
    position: "absolute",
    left: 30
  },
  cardTitle: {
    color: "#000",
    fontSize: 18,
    textAlign: "right"
  },
  cardValue: {
    color: "#000",
    fontSize: 28,
    textAlign: "right"
  },
  cardDivider: {
    marginTop: 10
  },
  cardBottom: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8
  },
  cardIcon: {
    fontSize: 18
  },
  cardSmallText: {
    paddingLeft: 10
  },
  tileHome: {
    margin: 20
  },
  // USER CARD -------------------------------------------
  userCard: {
    position: "relative",
    flex: 1,
    borderRadius: 5,
    minHeight: 150,
    padding: 0
  },
  userBackground: {
    alignSelf: "stretch",
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#45D9CF"
  },
  userContent: {
    width: "70%",
    alignSelf: "center",
    flexDirection: "column",
    paddingBottom: 20
  },
  userAvatar: {
    width: 120,
    height: 120,
    marginTop: -60,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#eee",
    alignSelf: "center"
  },
  userName: {
    alignSelf: "center",
    color: "#000",
    fontSize: 18,
    paddingTop: 5
  },
  userLogin: {
    alignSelf: "center"
  },
  userQuote: {
    alignSelf: "center",
    paddingTop: 10,
    color: "#050505",
    fontSize: 15,
    paddingBottom: 40
  },
  userSocial: {
    width: "80%",
    alignSelf: "center",
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  //USER SETTINGS --------------------------------------------------
  settingsTitle: {
    fontSize: 24,
    alignSelf: "flex-start",
    padding: 10,
    fontWeight: "100",
    paddingBottom: -10
  },
  //NOTIFICATIONS -----------------------------------------------------------------
  notsItem: {
    borderBottomWidth: 0
  },
  notsIcon: {
    marginRight: 20
  }
});
