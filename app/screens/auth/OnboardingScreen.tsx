import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
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
    subtitle: 'Connect with recruiters, sharpen your skills, and unlock your dream job.',
  },
  {
    id: 2,
    animation: require('../../../assets/images/SlideB.json'),
    title: 'Train Today, Succeed Tomorrow',
    subtitle: 'Build skills, gain confidence, and land the opportunities you deserve!',
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

  // Get device window width and height for responsive sizing
  const { width, height } = Dimensions.get('window');
  // Define animation size as a percentage of screen dimensions for responsiveness
  const animationWidth = width * 1; // 85% of device width
  const animationHeight = height * 0.5; // 45% of device height

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-start px-6 pt-10 pb-8">
        {/* Animation near top */}
        <View className="items-center">
          <LottieView
            source={animation}
            autoPlay
            loop
            style={{ width: animationWidth, height: animationHeight }}
          />
        </View>

        {/* Text and Pagination and Buttons aligned downward */}
        <View className='pt-20'>
          <Text className="text-black text-[20px] mb-3 font-bold text-center">
            {title}
          </Text>
          <Text className="text-gray-700 text-[14px] mb-8 font-sans text-center leading-relaxed">
            {subtitle}
          </Text>

          <View className="flex-row justify-center items-center mb-8">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-2 ${
                  currentSlide === index ? 'bg-[#1877F2]' : 'bg-[#A0A3BD]'
                }`}
              />
            ))}
          </View>

          <View className="flex-row justify-between items-center">
            {currentSlide > 0 ? (
              <TouchableOpacity onPress={handleBack} className="px-4 py-2">
                <Text className="text-gray-600 text-[14px] font-poppins-semibold">
                  Back
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            <TouchableOpacity
              onPress={handleNext}
              className="bg-[#1877F2] rounded-lg px-6 py-3"
            >
              <Text className="text-white text-[14px] font-poppins-semibold">
                {currentSlide === slides.length - 1 ? 'Getting Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
