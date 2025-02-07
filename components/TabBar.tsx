import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Rive, { RiveRef } from 'rive-react-native';

const machines = {
  index: 'bottomTabStar',
  explore: 'bottomTabFilm',
};

export const TabBar = ({ state, descriptors, navigation }) => {
  const indexRef = useRef<RiveRef>(null);
  const exploreRef = useRef<RiveRef>(null);

  useEffect(() => {
    indexRef.current?.setInputState(machines.index, 'status', true);
  }, []);

  return (
    <View style={style.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          indexRef.current?.setInputState(
            machines['index'],
            'status',
            route.name === 'index'
          );
          exploreRef.current?.setInputState(
            machines['explore'],
            'status',
            route.name === 'explore'
          );

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[style.tab, style.box]}
          >
            <Rive
              ref={route.name === 'index' ? indexRef : exploreRef}
              resourceName={machines[route.name as 'index' | 'explore']}
              stateMachineName={machines[route.name as 'index' | 'explore']}
              style={{ ...style.box, ...style.riveTab }}
            />
            <View style={[style.box, { width: 34 }]} />
            <Text style={{ color: isFocused ? 'blue' : 'gray' }}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  box: {
    height: 34,
    zIndex: 10,
  },
  container: {
    backgroundColor: '#e1e1e1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 50,
    paddingTop: 10,
  },
  riveTab: {
    position: 'absolute',
    width: 34,
  },
  tab: {
    alignItems: 'center',
    width: 'auto',
  },
});
