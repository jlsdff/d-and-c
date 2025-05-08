import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import { CategoriesProvider } from '@/components/categories';

export default function TabLayout() {

  return (

    <CategoriesProvider>

      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarStyle: Platform.select({
            ios: style.tabBar,
            android: style.tabBar,
            default: style.tabBar,
          }),
          headerStyle: style.header,
          headerTintColor: colors.neutral[100],
          tabBarActiveTintColor: colors.primary[700],
          tabBarHideOnKeyboard: true,
          tabBarItemStyle: style.tabBarItem,
        }}>

        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome6 name="bowl-food" size={18} color={color} />,
            headerTintColor: colors.primary[200],
            headerTitle: "Dine and Chill",
            headerShown: false
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
          }}
        />

        <Tabs.Screen
          name='settings'
          options={{
            title: 'Settings'
          }}
        />

        <Tabs.Screen
          name='meal/newMeal'
          options={{
            href: null,
            headerTitle: "New Meal",
            headerShown: false
          }}
        />

        <Tabs.Screen
          name='meal/[id]'
          options={{
            href: null
          }}
        />

      </Tabs>

    </CategoriesProvider>

  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: colors.neutral[950],
  },
  tabBar: {
    backgroundColor: colors.neutral[950],
  },
  tabBarItem: {
    width: 'auto'
  }
})
