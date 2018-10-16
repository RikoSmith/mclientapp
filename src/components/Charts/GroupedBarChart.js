import React from "react";
import { View } from "react-native";
import { BarChart, Grid } from "react-native-svg-charts";
import { Card } from "react-native-elements";

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
              width: 300
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
        </Card>
      </View>
    );
  }
}

export default GroupedBarChart;
