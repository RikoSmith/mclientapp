import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Card } from "react-native-elements";

var width = Dimensions.get("window").width;

class GroupedBarChart extends React.PureComponent {
  render() {
    const data1 = [14, 100, 85, 35, 53, 66, 96, 33, 73, 8].map(value => ({
      value
    }));
    const data2 = [24, 28, 93, 77, 52, 21, 53, 89, 10, 86].map(value => ({
      value
    }));

    const barData = [
      {
        data: data1,
        svg: {
          fill: "#1dc7ea"
        }
      },
      {
        data: data2,
        svg: {
          fill: "#fb404b"
        }
      }
    ];

    return (
      <View>
        <Card title="Bar Chart">
          <BarChart
            style={{
              height: 200,
              width: width * 0.8,
              alignSelf: "center"
            }}
            data={barData}
            yAccessor={({ item }) => item.value}
            svg={{
              fill: "green"
            }}
            contentInset={{ top: 30, bottom: 30 }}
            {...this.props}
          >
            <Grid
              svg={{
                strokeDasharray: [2, 2]
              }}
            />
          </BarChart>
          <YAxis
            data={data1}
            contentInset={{ top: 30, bottom: 30 }}
            svg={{
              fill: "grey",
              fontSize: 10
            }}
            numberOfTicks={10}
            formatLabel={value => `${value}ºC`}
          />
          <XAxis
            style={{
              marginHorizontal: -10,
              width: width * 0.8,
              alignSelf: "center"
            }}
            data={data1}
            formatLabel={(value, index) => index}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: "black" }}
          />
        </Card>
      </View>
    );
  }
}

export default GroupedBarChart;
