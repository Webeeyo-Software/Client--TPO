import React from 'react';
import LogoutButton from './LogoutButton';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import SmartDrawerItem from '../../components/drawer/smartDrawerItem';
import ProfileHeader from './ProfileHeader';
import Divider from 'components/ui/Divider';
export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View className="p-4">
        <ProfileHeader
          name="Abhishek Lohot"
          email="lohotabhishek123@gmail.com"
          avatarUrl="https://i.pravatar.cc/150?img=3"
          verified
        />

        <Divider/>
        <SmartDrawerItem
          {...props}
          pageName="home"
          label="Home"
          icon={({ color, size }) => <MaterialIcons name="home" size={size} color={color} />}
        />

        <SmartDrawerItem
          {...props}
          pageName="settings"
          label="Settings"
          icon={({ color, size }) => <MaterialIcons name="settings" size={size} color={color} />}
        />

        <SmartDrawerItem
          {...props}
          pageName="myDocuments"
          label="My Documents"
          icon={({ color, size }) => <Ionicons name="documents" size={size} color={color} />}
        />

        <SmartDrawerItem
          {...props}
          pageName="offerLetters"
          label="Offer Letters"
          icon={({ color, size }) => <MaterialIcons name="mail" size={size} color={color} />}
        />

        <SmartDrawerItem
          {...props}
          pageName="notifications"
          label="Notifications & Alerts"
          icon={({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          )}
        />

        <SmartDrawerItem
          {...props}
          pageName="theme"
          label="Theme"
          icon={({ color, size }) => <Ionicons name="sunny" size={size} color={color} />}
        />

        <SmartDrawerItem
          {...props}
          pageName="helpSupport"
          label="Help & Support"
          icon={({ color, size }) => <Ionicons name="help-circle" size={size} color={color} />}
        />

        <SmartDrawerItem
          {...props}
          pageName="faqs"
          label="FAQ-s"
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="frequently-asked-questions" size={size} color={color} />
          )}
        />

        <SmartDrawerItem
          {...props}
          pageName="aboutUs"
          label="About us"
          icon={({ color, size }) => <Feather name="info" size={size} color={color} />}
        />

        
        <Divider/>

        <LogoutButton onLogout={() => {
          console.log("User logged out");
        }} />

      </View>
    </DrawerContentScrollView>
  );
}
