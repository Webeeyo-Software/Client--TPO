import React, { useEffect, useRef } from "react";
import { Text, View, Animated, Easing } from "react-native";

interface TitleProps {
  title1: string;
  title2: string;
}

const Title: React.FC<TitleProps> = ({ title1, title2 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  return (
    <View className="my-6 mx-5">
      <Animated.Text
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
        className="text-7xl font-bold text-black leading-tight"
      >
        {title1}
      </Animated.Text>

      <Animated.Text
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
        className="text-5xl font-bold text-[#1877F2] leading-tight"
      >
        {title2}
      </Animated.Text>
    </View>
  );
};

export default Title;
