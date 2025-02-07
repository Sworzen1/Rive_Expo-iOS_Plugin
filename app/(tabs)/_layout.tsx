import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Rive, { RiveRef } from 'rive-react-native';
import { TabBar } from '@/components/TabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          //   tabBarIcon: ({ color }) => (
          //     <Pressable
          //       onPress={() => {
          //         riveStarRef.current?.setInputState(
          //           RIVE_STAR_ANIMATION_NAME,
          //           'status',
          //           true
          //         );
          //       }}
          //     >
          //       <View style={{ height: 28, width: 28 }}>
          //         <Rive
          //           resourceName={RIVE_STAR_ANIMATION_NAME}
          //           ref={riveStarRef}
          //           style={{ width: 28, height: 28 }}
          //         />
          //       </View>
          //     </Pressable>
          //   ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          // tabBarIcon: ({ color }) => (
          //   <Pressable>
          //     <View style={{ height: 28, width: 28 }}>
          //       <Rive
          //         resourceName={RIVE_FILM_ANIMATION_NAME}
          //         ref={riveFilmRef}
          //         style={{ width: 28, height: 28 }}
          //       />
          //     </View>
          //   </Pressable>
          // ),
        }}
      />
    </Tabs>
  );
}
