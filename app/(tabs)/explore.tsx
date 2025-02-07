import { useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Rive, { RiveRef } from 'rive-react-native';

const RIVE_STAR_ANIMATION_NAME = 'bottomTabStar';
const RIVE_FILM_ANIMATION_NAME = 'bottomTabFilm';

export default function TabTwoScreen() {
  const riveStarRef = useRef<RiveRef>(null);
  const riveFilmRef = useRef<RiveRef>(null);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ height: 64, width: 64 }}>
        <Rive
          resourceName={RIVE_STAR_ANIMATION_NAME}
          ref={riveStarRef}
          style={{ width: 64, height: 64 }}
        />
      </View>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          height: 50,
          width: 120,
          padding: 12,
          backgroundColor: 'green',
        }}
        onPress={() => {
          riveStarRef.current?.setInputState(
            RIVE_STAR_ANIMATION_NAME,
            'status',
            true
          );
        }}
      >
        <Text>ON</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          height: 50,
          width: 120,
          padding: 12,
          backgroundColor: 'red',
        }}
        onPress={() => {
          riveStarRef.current?.setInputState(
            RIVE_STAR_ANIMATION_NAME,
            'status',
            false
          );
        }}
      >
        <Text>OFF</Text>
      </TouchableOpacity>
      <View style={{ height: 64, width: 64 }}>
        <Rive
          resourceName={RIVE_FILM_ANIMATION_NAME}
          ref={riveFilmRef}
          style={{ width: 64, height: 64 }}
        />
      </View>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          height: 50,
          width: 120,
          padding: 12,
          backgroundColor: 'green',
        }}
        onPress={() => {
          riveFilmRef.current?.setInputState(
            RIVE_FILM_ANIMATION_NAME,
            'status',
            true
          );
        }}
      >
        <Text>ON</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          height: 50,
          width: 120,
          padding: 12,
          backgroundColor: 'red',
        }}
        onPress={() => {
          riveFilmRef.current?.setInputState(
            RIVE_FILM_ANIMATION_NAME,
            'status',
            false
          );
        }}
      >
        <Text>OFF</Text>
      </TouchableOpacity>
    </View>
  );
}
