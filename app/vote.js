import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Stack } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import { webtoons } from "../data/webtoon";

const screenWidth = Dimensions.get("window").width;

export default function VoteScreen() {
  const initialVotes = {
    1: 5,
    2: 10,
    3: 3,
    4: 8,
    5: 6,
    6: 4,
    7: 1,
    8: 10,
  };

  const [votes, setVotes] = useState(
    webtoons.reduce(
      (acc, webtoon) => ({
        ...acc,
        [webtoon.id]: initialVotes[webtoon.id] || 0,
      }),
      {}
    )
  );

  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (id) => {
    if (!hasVoted) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [id]: prevVotes[id] + 1,
      }));
      setHasVoted(true);
    }
  };

  const chartData = {
    labels: webtoons.map((webtoon) =>
      webtoon.title.length > 14
        ? `${webtoon.title.substring(0, 14)}...`
        : webtoon.title
    ),
    datasets: [
      {
        data: webtoons.map((webtoon) => votes[webtoon.id]),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Vote" }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Top Webtoons</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            <BarChart
              data={chartData}
              width={screenWidth * 2.5}
              height={280}
              chartConfig={{
                // formatXLabel: (xLabel) => ` ${xLabel} `,
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.5,
                paddingHorizontal: 10,
              }}
              style={{
                marginVertical: 4,
                marginHorizontal: 10,
                borderRadius: 16,
                width: "100%",
              }}
            />
          </View>
        </ScrollView>

        {hasVoted && (
          <Text style={{ ...styles.title, color: "green" }}>
            Thanks for voting!
          </Text>
        )}
        {!hasVoted && (
          <>
            <Text style={styles.title}>Vote for Your Favorite Webtoon</Text>
            {webtoons.map((webtoon) => (
              <TouchableOpacity
                key={webtoon.id}
                style={styles.voteButton}
                onPress={() => handleVote(webtoon.id)}
              >
                <Text style={styles.voteButtonText}>{webtoon.title}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  voteButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: "100%",
  },
  voteButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "auto",
  },
});
