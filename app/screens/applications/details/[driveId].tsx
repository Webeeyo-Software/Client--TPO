// screens/applications/drives/details/[driveId].tsx

import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Header from 'components/ui/Header';
import PrimaryButton from 'components/ui/PrimaryButton';
import Divider from 'components/ui/Divider';
import api from 'utils/authApi';
import { useLocalSearchParams, useRouter } from 'expo-router';

export type Company = {
  id?: string;
  companyId?: string;
  name: string;
  description?: string;
  website?: string;
  email?: string;
  contactNumber?: string;
  logoUrl?: string;
  location?: string;
};

function usePlacementDriveDetails(id?: string) {
  const [placementDrive, setPlacementDrive] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Drive ID is missing');
      setPlacementDrive(null);
      return;
    }

    const fetchDrive = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: json } = await api.get<{
          success: boolean;
          placementDrive?: Partial<Company>;
        }>(`/api/companies/placement-drive/${id}`);

        if (!json.success || !json.placementDrive) {
          throw new Error('Placement drive not found');
        }

        setPlacementDrive(json.placementDrive as Company);
      } catch (err: any) {
        setError(err.message ?? 'Unknown error');
        setPlacementDrive(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDrive();
  }, [id]);

  return { placementDrive, loading, error };
}

export default function DrivesDetailsScreen() {
  const router = useRouter();
  const { driveId } = useLocalSearchParams<{ driveId?: string }>();
  const { placementDrive, loading, error } = usePlacementDriveDetails(driveId);

  const handleLinkPress = (url?: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open link.'));
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Placement Drive Details" mode="normal" />
      {loading && (
        <View className="flex-1 items-center justify-center bg-white">
          <LottieView
            source={require('../../../../assets/images/loader.json')}
            autoPlay
            loop
            style={{ width: 180, height: 180 }}
          />
          <Text className="mt-4 text-gray-700">Loading placement drive details...</Text>
        </View>
      )}

      {error && !loading && (
        <View className="flex-1 items-center justify-center bg-white p-6">
          <Text className="text-center text-lg font-semibold text-red-500">{error}</Text>
        </View>
      )}

      {!loading && !error && !placementDrive && (
        <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-lg font-medium text-gray-600">Placement drive not found.</Text>
        </View>
      )}

      {!loading && placementDrive && (
        <ScrollView
          className="flex-1 px-2 pt-6"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-6 items-center rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
            {placementDrive.logoUrl ? (
              <Image
                source={{ uri: placementDrive.logoUrl }}
                className="mb-4 h-40 w-40 rounded-2xl"
                resizeMode="contain"
              />
            ) : (
              <View className="mb-4 h-28 w-28 rounded-2xl bg-gray-200" />
            )}

            <Text className="text-center text-2xl font-extrabold text-gray-900">
              {placementDrive.name}
            </Text>

            {placementDrive.location && (
              <View className="mt-2 flex-row items-center">
                <Ionicons name="location-sharp" size={18} color="#4B5563" />
                <Text className="ml-1 text-sm text-gray-600">{placementDrive.location}</Text>
              </View>
            )}
          </View>

          {placementDrive.description && (
            <View className="mb-6 items-start rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
              <Text className="mb-3 text-lg font-semibold text-gray-800">About Us</Text>
              <Text className="text-base leading-relaxed text-gray-700">{placementDrive.description}</Text>
            </View>
          )}

          {(placementDrive.website || placementDrive.email || placementDrive.contactNumber) && (
            <View className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
              <Text className="mb-4 text-lg font-semibold text-gray-800">Contact Information</Text>
              {placementDrive.website && (
                <TouchableOpacity
                  className="mb-3 flex-row items-center"
                  onPress={() => handleLinkPress(placementDrive.website)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="public" size={20} color="#2563EB" />
                  <Text className="ml-2 text-base text-blue-600 underline">{placementDrive.website}</Text>
                </TouchableOpacity>
              )}
              {placementDrive.email && (
                <TouchableOpacity
                  className="mb-3 flex-row items-center"
                  onPress={() => handleLinkPress(`mailto:${placementDrive.email}`)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="email" size={20} color="#374151" />
                  <Text className="ml-2 text-base text-gray-800">{placementDrive.email}</Text>
                </TouchableOpacity>
              )}
              {placementDrive.contactNumber && (
                <View className="flex-row items-center">
                  <MaterialIcons name="phone" size={20} color="#374151" />
                  <Text className="ml-2 text-base text-gray-800">{placementDrive.contactNumber}</Text>
                </View>
              )}
            </View>
          )}

          <Divider />
          <View className="m-5">
            <PrimaryButton label="Check for Placements" onPress={() => router.push('screens/notices')} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
