import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';

type MenuCardProps = {
  title: string;
  description: string;
  icon: any;
  highlighted?: boolean;
  onPress?: () => void;
  scrollY?: Animated.Value;
  index?: number;
  cardHeight?: number;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  description,
  icon,
  highlighted = false,
  onPress,
  scrollY,
  index = 0,
  cardHeight = 100,
}) => {
  if (!scrollY) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`flex-row justify-between items-center border border-gray-100 bg-white rounded-xl px-4 py-4 mb-4 shadow-md`}
      >
        <View className="flex-1 pr-4">
          <Text className="font-bold text-base text-black">{title}</Text>
          <Text className="text-sm text-gray-500 mt-1">{description}</Text>
        </View>
        <Image source={icon} style={{ width: 68, height: 68, resizeMode: 'contain' }} />
      </TouchableOpacity>
    );
  }

  const inputRange = [
    index * cardHeight,
    (index + 0.5) * cardHeight,
    (index + 1) * cardHeight,
  ];

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange: [0, -15, -50], // starts at 0, moves upward smoothly
    extrapolate: 'clamp',
  });

  const scaleX = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1.05, 1.1], // starts normal, scales wider gradually
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [1, 0.6, 0], // starts fully visible, fades out smoothly
    extrapolate: 'clamp',
  });

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        transform: [{ translateY }, { scaleX }],
        opacity,
      }}
      className={`flex-row justify-between items-center bg-white rounded-2xl px-4 py-4 mb-4 border border-gray-100`}
    >
      <View className="flex-1 pr-4">
        <Text className="font-bold text-x text-black">{title}</Text>
        <Text className="text-sm text-gray-500 mt-1">{description}</Text>
      </View>
      <Image source={icon} style={{ width: 68, height: 68, resizeMode: 'contain' }} />
    </AnimatedTouchableOpacity>
  );
};

export default MenuCard;
