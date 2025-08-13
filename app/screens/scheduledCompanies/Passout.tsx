import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../../../components/ui/Header';

const Index = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-10 pb-10 bg-white">
      <View>
        <Header title="Scheduled Companies" />
        {/* Error Box */}
        <View className="flex-row justify-between items-center border border-gray-300 p-3 rounded-xl bg-white mx-4">
          <Text className="text-lg text-gray-800 flex-1 mr-2">
            No Schedule Company Found For Passout Batch 2024-25
          </Text>
          <Image
            source={{ uri: 'https://img.icons8.com/emoji/48/warning-emoji.png' }}
            className="w-[30px] h-[30px]"
          />
        </View>

        {/* Instructions */}
        <Text className="text-3xl mt-5 text-blue-500 font-medium px-4">Instructions</Text>
        <Text className="text-base text-gray-700 mt-2 px-4">
          Here Are Step-by-Step Instructions You Should Follow If You Are Getting an Error Like{' '}
          <Text className="font-bold">No Schedule Company Found For Pass-out Batch 2024-25</Text>.
        </Text>

        {/* Steps */}
        <View className="mx-6">
          <Text className="font-bold text-lg mt-5">Here are the steps:</Text>

          <Text className="text-base font-semibold mt-4">
            Step 1 :{"\n"}Go To Personal Details Tab
          </Text>
          <Text className="text-sm text-gray-800 mt-1 leading-5">
            Click on the Avatar icon located at the Top-Right Corner of your portal. You will see the
            User Profile option in the popup menu — click on it. Alternatively, open the Navigation
            Menu, and you will find a tab named Fill Profile. Both options navigate to the same page.
            On that page, go to the Personal tab and click on it.
          </Text>

          <Text className="text-base font-semibold mt-4">
            Step 2 :{"\n"}Check That All Details Are Filled Properly, Especially the Year of Passing and Program/ Branch.
          </Text>
          <Text className="text-sm text-gray-800 mt-1 leading-5">
            Click on the Avatar icon located at the Top-Right Corner of your portal. You will see the
            User Profile option in the popup menu — click on it. Alternatively, open the Navigation
            Menu, and you will find a tab named Fill Profile. Both options navigate to the same page.
            On that page, go to the Personal tab and click on it.
          </Text>

          <Text className="text-base font-semibold mt-4">
            Step 3 :{"\n"}Go To TPO Registration Tab
          </Text>
          <Text className="text-sm text-gray-800 mt-1 leading-5">
            After Opening Personal Details, You Must Check That Your Year of Passing and Program/
            Branch Are Filled In Correctly. Also, Make Sure That After Filling In All Details, the Profile Is Saved and Freeze.
          </Text>

          <Text className="text-base font-semibold mt-4">
            Step 4 :{"\n"}Register for the Type of Placement Company You Would Like to Apply for in Your Current Academic Year (2025-26).
          </Text>
          <Text className="text-sm text-gray-800 mt-1 leading-5">
            To Register, You Have to Click on the Button Named + New TPO Registration. If the Button Is Not Visible to You, Check Your Year of Passing (Step 2). If It Is Still Not Visible,
            Then the TPO Registration Period Has Ended. After Clicking the Button, a Popup Will Open. You Will Then Need to Select the Academic Year and the Type of Placement You Are Interested In. 
            Afterwards, You Will Only See Companies
          </Text>
        </View>

        {/* Notes */}
        <View className="mt-5 py-2 mx-5 mb-3 bottom-6">
          <Text className="text-xl font-bold mb-2">● Notes</Text>
          <Text className="text-base mb-1 text-gray-800">
            1. Make sure all Profile Tabs Are filled.
          </Text>
          <Text className="text-base mb-1 text-gray-800">
            2. Register For All Placement Type For Current Academic Year.
          </Text>
          <Text className="text-base mb-1 text-gray-800">
            3. Sometimes, You Have Already Applied for the Company That You See
            in the Applied Company Tab.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

