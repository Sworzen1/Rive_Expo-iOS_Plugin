import { useCallback, useRef } from 'react';
import { PanResponder, StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rive, { RiveRef } from 'rive-react-native';

const keyExtractor = (item: number) => item.toString();
const ItemSeparatorComponent = () => <View style={styles.separator} />;

const { width } = Dimensions.get('screen');
const MAX_DISTANCE = 150;
const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const STATE_MACHINE = 'CanRefreshControl';
const RIVE_ANIMATION_NAME = 'canRefreshControl';

export default function HomeScreen() {
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);

  const riveRef = useRef<RiveRef>(null);

  const onRefresh = (done: () => void) => {
    riveRef.current?.setInputState(STATE_MACHINE, 'isLoading', true);

    setTimeout(() => {
      done();
    }, 3000);
  };

  const renderItem = useCallback(() => {
    return <View style={styles.item} />;
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const pullDownStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: pullDownPosition.value,
        },
      ],
    };
  });

  const onRefreshComplete = () => {
    riveRef.current?.stop();
    pullDownPosition.value = withTiming(0, { duration: 180 });
  };

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 120 : 0, {
      duration: 180,
    });

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;

      onRefresh(onRefreshComplete);
    }
  };

  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy >= 0,
      onPanResponderMove: (_, gestureState) => {
        pullDownPosition.value = Math.max(
          Math.min(MAX_DISTANCE, gestureState.dy),
          0
        );

        if (
          pullDownPosition.value >= MAX_DISTANCE / 2 &&
          isReadyToRefresh.value === false
        ) {
          riveRef.current?.setInputState(STATE_MACHINE, 'start', true);
          isReadyToRefresh.value = true;
        }

        if (
          pullDownPosition.value < MAX_DISTANCE / 2 &&
          isReadyToRefresh.value === true
        ) {
          isReadyToRefresh.value = false;
        }
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    })
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View style={{ width, height: 140, position: 'absolute', top: 40 }}>
        <Rive
          resourceName={RIVE_ANIMATION_NAME}
          ref={riveRef}
          style={{ width }}
        />
      </View>
      <Animated.View
        {...panResponderRef.current.panHandlers}
        style={[styles.container, pullDownStyles]}
      >
        <Animated.FlatList
          {...{ keyExtractor, renderItem, ItemSeparatorComponent }}
          data={DATA}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.listContainer}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: {
    backgroundColor: 'cornflowerblue',
    flexGrow: 1,
    padding: 24,
  },
  item: {
    backgroundColor: 'linen',
    borderColor: 'black',
    borderRadius: 12,
    borderWidth: 2,
    height: 180,
  },
  separator: { height: 12 },
});
