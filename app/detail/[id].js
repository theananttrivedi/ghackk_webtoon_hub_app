import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack, Tabs, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { webtoons } from "../../data/webtoon";
import { useRoute } from "@react-navigation/native";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const webtoon = webtoons.find((w) => w.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites !== null) {
        const favoritesArray = JSON.parse(favorites);
        setIsFavorite(favoritesArray.includes(id));
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter((favId) => favId !== id);
      } else {
        favoritesArray.push(id);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!webtoon) {
    return <Text>Webtoon not found</Text>;
  }

  useEffect(() => {
    navigation.setOptions({
      title: webtoon.title,
    });
  }, [navigation, params.id]);

  return (
    <View style={styles.container}>
      <Image source={webtoon.image} style={styles.image} />
      {/* <Text style={styles.title}>{webtoon.title}</Text> */}
      <Text style={styles.description}>{webtoon.description}</Text>
      <Button
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onPress={toggleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    columnGap: 12,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    textAlign: "justify",
    marginVertical: 24,
  },
});
