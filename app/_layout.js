import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Webtoon Hub",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vote"
        options={{
          title: "Vote",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="(home)/detail/[id]"
        options={{
          //   title: `Detail for ID: ${route.params?.id || "Unknown"}`,
          href: null,
        }}
      /> */}

      <Tabs.Screen
        name="detail/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
