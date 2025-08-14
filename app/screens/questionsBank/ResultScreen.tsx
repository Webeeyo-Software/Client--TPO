import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import ScoreCircle from 'components/questionsBank/ScoreCircle';
import ScoreStats from 'components/questionsBank/ScoreStats';
import PrimaryButton from 'components/ui/PrimaryButton';
import OutlineButton from 'components/questionsBank/OutlineButton';
import { router } from 'expo-router';

const ResultScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScoreCircle score={6} total={10} />

      <ScoreStats completion={100} totalQuestions={10} correct={6} incorrect={4} />

      <View className="mt-6 flex-row justify-center gap-4 px-6">
        <OutlineButton title="Review Answer" onPress={() => {}} />
                <OutlineButton title="Share Score" onPress={() => {}} />

      </View>

      <View className="mt-6 px-8">
        <PrimaryButton label="Done" onPress={() => {router.push("navigation/drawer")}} />
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;
