import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import '../../../global.css';

type Slide = {
  id: number;
  animation: any;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    id: 1,
    animation: require('../../../assets/images/SlideA.json'),
    title: 'Step Into Your Future',
    subtitle:
      'Connect with recruiters, sharpen your skills, and unlock your dream job.',
  },
  {
    id: 2,
    animation: require('../../../assets/images/SlideB.json'),
    title: 'Train Today, Succeed Tomorrow',
    subtitle: ' Build skills, gain confidence, and land the opportunities you deserve.!',
  },
  {
    id: 3,
    animation: require('../../../assets/images/SlideC.json'),
    title: 'One Portal, Endless Opportunities',
    subtitle: 'Access training programs, internships, and placements — all in one place.',
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/screens/auth/LoginScreen');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const { animation, title, subtitle } = slides[currentSlide];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-[40%] w-full mt-60">
        <LottieView
          source={animation}
          autoPlay
          loop
        style={{ width: '100%', height: 300, alignSelf: 'center' }}
        />
      </View>

      <View
        key={currentSlide}
        className="flex-1 p-5 justify-start bg-white"
      >
        <Text className="text-black text-[20px] mb-2">
          {title}
        </Text>
        <Text className="text-gray-700 text-[14px] mb-6">
          {subtitle}
        </Text>

        <View className="flex-row items-center mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                currentSlide === index ? 'bg-[#1877F2]' : 'bg-[#A0A3BD]'
              }`}
            />
          ))}
        </View>

        <View className="flex-row justify-end items-center">
          {currentSlide > 0 && (
            <TouchableOpacity onPress={handleBack}>
              <Text className="text-gray-500 text-[14px]">
                Back
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#1877F2] rounded-lg px-5 py-3 ml-6"
          >
            <Text className="text-white text-[14px]">
              {currentSlide === slides.length - 1 ? 'Getting Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
