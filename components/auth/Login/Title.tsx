import React, { useEffect, useRef } from "react";
import { Text, View, Animated, Easing } from "react-native";

const Title: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim, translateY]);

  return (
    <View className="my-6 mx-5">
      <Animated.Text
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
        className="text-6xl font-bold text-black leading-tight"
      >
        Empower{"\n"}Your Skills
      </Animated.Text>

      <Animated.Text
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
        className="text-6xl font-bold text-[#1877F2] leading-tight"
      >
        Explore Top{"\n"}Placements
      </Animated.Text>
    </View>
  );
};

export default Title;
