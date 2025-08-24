import React from 'react';
import { TouchableOpacity ,View} from 'react-native';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../../../components/drawer/customDrawerContent';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';

export default function DrawerLayout() {
  return (
   <Drawer
  drawerContent={(props) => <CustomDrawerContent {...props} />}
  screenOptions={({ navigation }: { navigation: DrawerNavigationProp<ParamListBase> }) => ({
    headerShown: true,
    headerTitle: '',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ marginLeft: 15, paddingVertical: 8, paddingHorizontal: 10 }}
        accessibilityLabel="Toggle drawer"
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {/* Hamburger icon made of 3 lines */}
        <View className="w-6 h-0.5 bg-black mb-1 rounded" />
        <View className="w-4 h-0.5 bg-black mb-1 rounded" />
        <View className="w-6 h-0.5 bg-black rounded" />
      </TouchableOpacity>
    ),
    headerRight:() =>(
    <TouchableOpacity className='mr-9'>
    <Ionicons name="sunny" size={24} color={"#999"} />
    </TouchableOpacity>
    )
  })}
>
      <Drawer.Screen name="home" options={{ title: 'Home' }} />
      <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
      <Drawer.Screen name="myDocuments" options={{ title: 'My Documents' }} />
      <Drawer.Screen name="offerLetters" options={{ title: 'Offer Letters' }} />
      <Drawer.Screen name="notifications" options={{ title: 'Notifications & Alerts' }} />
      <Drawer.Screen name="theme" options={{ title: 'Theme' }} />
      <Drawer.Screen name="helpSupport" options={{ title: 'Help Support' }} />
      <Drawer.Screen name="faqs" options={{ title: 'FAQ-s' }} />
      <Drawer.Screen name="aboutUs" options={{ title: 'About us' }} />
    </Drawer>
  );
}
