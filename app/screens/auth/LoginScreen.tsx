import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Title from 'components/auth/Login/Title';
import InputField from 'components/ui/InputField';
import CheckboxWithLabel from 'components/auth/Login/CheckboxWithLabel';
import PrimaryButton from 'components/ui/PrimaryButton';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { API_BASE_URL } from 'utils/api';

interface SavedCredential {
  email: string;
  password: string; // Consider secure storage for passwords in real apps
}

interface LoginResponse {
  token: string;
}

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [savedCredentials, setSavedCredentials] = useState<SavedCredential[]>([]);
  const [pickerVisible, setPickerVisible] = useState(false);

  const router = useRouter();

  const showModal = useCallback((title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('savedCredentials');
        if (stored) {
          const creds: SavedCredential[] = JSON.parse(stored);
          if (creds.length > 0) {
            setSavedCredentials(creds);
            setPickerVisible(true);
          }
        }
      } catch (err) {
        console.error('Error loading credentials', err);
      }
    })();
  }, []);

  const selectSavedCredential = useCallback((cred: SavedCredential) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setRememberMe(true);
    setPickerVisible(false);
  }, []);

  const saveCredential = useCallback(
    async (emailToSave: string, passwordToSave: string) => {
      try {
        const updatedCreds = [...savedCredentials];
        const index = updatedCreds.findIndex(
          (c) => c.email.toLowerCase() === emailToSave.toLowerCase()
        );
        if (index >= 0) {
          updatedCreds[index] = { email: emailToSave, password: passwordToSave };
        } else {
          updatedCreds.push({ email: emailToSave, password: passwordToSave });
        }
        await AsyncStorage.setItem('savedCredentials', JSON.stringify(updatedCreds));
        setSavedCredentials(updatedCreds);
      } catch (e) {
        console.log('Error saving credentials:', e);
      }
    },
    [savedCredentials]
  );

  const deleteCredential = useCallback(
    (emailToDelete: string) => {
      Alert.alert(
        'Delete Saved Credential',
        `Are you sure you want to delete the saved credential for ${emailToDelete}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const filtered = savedCredentials.filter((c) => c.email !== emailToDelete);
                await AsyncStorage.setItem('savedCredentials', JSON.stringify(filtered));
                setSavedCredentials(filtered);
                if (filtered.length === 0) setPickerVisible(false);
              } catch (error) {
                console.error('Failed to delete credential', error);
              }
            },
          },
        ]
      );
    },
    [savedCredentials]
  );

  const handleLogin = useCallback(async () => {
    if (!email.trim()) {
      showModal('Validation Error', 'Email field is required');
      return;
    }
    if (!password.trim()) {
      showModal('Validation Error', 'Password field is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });
      const { token } = response.data;
      await AsyncStorage.setItem('authToken', token);
      if (rememberMe) {
        await saveCredential(email.trim().toLowerCase(), password.trim());
      }

      showModal('Login', 'Successful');
      setTimeout(() => {
        setModalVisible(false);
        router.replace('/navigation/drawer');
      }, 1000);
    } catch (error: any) {
      showModal('Login Failed', error.response?.data?.message || 'Incorrect email or password');
    } finally {
      setLoading(false);
    }
  }, [email, password, rememberMe, router, saveCredential, showModal]);

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Title title1={'Empower\nYour Skills'} title2={'Explore Top\nPlacements'} />

      <View className="mx-5 mt-2 space-y-4">
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          required
          frontIcon={<Feather name="user" size={24} color="#999" />}
          autoCapitalize="none"
          keyboardType="email-address"
          className="font-poppins-regular"
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChangeText={setPassword}
          required
          frontIcon={<MaterialIcons name="password" size={24} color="#999" />}
          className="font-poppins-regular"
        />
      </View>

      <View className="mx-6 mb-6 mt-4 flex-row items-center justify-between">
        <CheckboxWithLabel
          checked={rememberMe}
          onToggle={() => setRememberMe(!rememberMe)}
          label="Remember me"
        />
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: 'screens/auth/ForgotPasswordScreen',
              params: { email },
            })
          }
          activeOpacity={0.7}>
          <Text className="font-poppins-semibold text-sm text-[#1877F2]">Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton label="Login" onPress={handleLogin} />

      {/* Saved Credentials Picker Modal */}
      <Modal
        transparent
        visible={pickerVisible}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50 px-8">
          <View className="max-h-[80%] w-full rounded-lg bg-white p-6">
            <Text className="font-poppins-bold mb-4 text-center text-lg">Select saved account</Text>

            {savedCredentials.length === 0 ? (
              <Text className="font-poppins-regular my-4 text-center text-gray-500">
                No saved accounts
              </Text>
            ) : (
              <FlatList
                data={savedCredentials}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                  <View className="mb-2 flex-row items-center justify-between rounded border border-gray-300 p-3">
                    <Pressable
                      onPress={() => selectSavedCredential(item)}
                      className="flex-1"
                      android_ripple={{ color: '#ddd' }}>
                      <Text className="font-poppins-regular text-base text-gray-900">
                        {item.email}
                      </Text>
                    </Pressable>
                    <TouchableOpacity
                      onPress={() => deleteCredential(item.email)}
                      className="ml-4 p-1">
                      <Text className="font-poppins-semibold text-red-600">Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}

            <TouchableOpacity
              onPress={() => setPickerVisible(false)}
              className="mt-4 rounded bg-gray-200 py-2"
              activeOpacity={0.8}>
              <Text className="font-poppins-semibold text-center text-gray-700">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading Modal */}
      <Modal transparent visible={loading} animationType="fade">
        <View className="flex-1 items-center justify-center bg-white/80">
          <LottieView
            source={require('../../../assets/images/loader.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={{ color: 'black', fontSize: 16, marginTop: 8 }}
            className="font-poppins-regular">
            Logging in...
          </Text>
        </View>
      </Modal>

      {/* Simple Alert Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full items-center rounded-lg bg-white p-6">
            <Text className="font-poppins-semibold mb-2 text-base">{modalTitle}</Text>
            <Text className="font-poppins-regular mb-4 text-center text-gray-700">
              {modalMessage}
            </Text>
            <TouchableOpacity
              className="mt-2 rounded bg-[#1877F2] px-6 py-2"
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}>
              <Text className="font-poppins-bold text-base text-white">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
