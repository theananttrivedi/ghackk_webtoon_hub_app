import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Stack } from "expo-router";
import { webtoons } from "../data/webtoon";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites !== null) {
        const favoriteIds = JSON.parse(storedFavorites);
        const favoriteWebtoons = webtoons.filter((webtoon) =>
          favoriteIds.includes(webtoon.id)
        );
        setFavorites(favoriteWebtoons);
        console.log(favoriteWebtoons);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites !== null) {
        let favoriteIds = JSON.parse(storedFavorites);
        favoriteIds = favoriteIds.filter((favId) => favId !== id);
        await AsyncStorage.setItem("favorites", JSON.stringify(favoriteIds));
        loadFavorites();
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Favorites" }} />
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    backgroundColor: "#ff4444",
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  navButtonText: {
    color: "white",
    textAlign: "center",
  },
});
