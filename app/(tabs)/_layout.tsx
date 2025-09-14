import { HapticTab } from "@/components/HapticTab";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import BooksIcon from "@/icons/Books";
import CategoriesIcon from "@/icons/Categories";
import CommunityIcon from "@/icons/Community";
import HomeIcon from "@/icons/Home";
import MenuIcon from "@/icons/Menu";

export default function TabLayout() {
  const { t } = useTranslation();
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#65382C",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "SomarMedium",
        },
        tabBarStyle: {
          paddingBottom: 30,
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: t("categories"),
          tabBarIcon: ({ color }) => <CategoriesIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: t("my_books"),
          tabBarIcon: ({ color }) => <BooksIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: t("community"),
          tabBarIcon: ({ color }) => <CommunityIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("menu"),
          tabBarIcon: ({ color }) => <MenuIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="books_category"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
    </Tabs>
  );
}
