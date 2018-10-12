"use strict";

var React = require("react-native");

var { StyleSheet } = React;

module.exports = StyleSheet.create({
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
  }
});
