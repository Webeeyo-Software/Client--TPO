import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated, ImageSourcePropType } from 'react-native';

type MenuCardProps = {
  title: string;
  description: string;
  icon: ImageSourcePropType;
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
        className="h-30 flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5">
        <View className="flex-1 pr-4">
          <Text className="text-base font-bold text-black">{title}</Text>
          <Text className="mt-1 text-sm text-gray-700">{description}</Text>
        </View>
        <Image source={icon} style={{ width: 68, height: 68, resizeMode: 'contain' }} />
      </TouchableOpacity>
    );
  }

  const inputRange = [index * cardHeight, (index + 0.5) * cardHeight, (index + 1) * cardHeight];

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange: [0, -15, -50],
    extrapolate: 'clamp',
  });

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1.05, 1.1],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  });

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        transform: [{ translateY }, { scale }],
        opacity,
      }}
      className="h-30 flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5">
      <View className="flex-1 pr-4">
        <Text className="text-lg font-bold text-black">{title}</Text>
        <Text className="mt-1 text-sm text-gray-700">{description}</Text>
      </View>
      <Image source={icon} style={{ width: 68, height: 68, resizeMode: 'contain' }} />
    </AnimatedTouchableOpacity>
  );
};

export default MenuCard;
