import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, ReactNode } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Header from 'components/ui/Header';
import api from 'utils/authApi';
import PrimaryButton from 'components/ui/PrimaryButton';
import Divider from 'components/ui/Divider';

/** -------------------
 * Company Model
 * ------------------- */
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

function useCompanyDetails(id?: string) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No company ID provided');
      setCompany(null);
      return;
    }

    const fetchCompany = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: json } = await api.get<{
          success: boolean;
          company?: Partial<Company>;
        }>(`/api/companies/${id}`);

        if (!json.success || !json.company) {
          throw new Error('Company not found');
        }

        setCompany(json.company as Company);
      } catch (err: any) {
        setError(err.message ?? 'Unknown error');
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  return { company, loading, error };
}

/** -------------------
 * Pluggable UI Props
 * ------------------- */
type CompanyDetailsProps = {
  id?: string;
  header?: ReactNode;
  footer?: ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error: string) => ReactNode;
  renderCard?: (company: Company) => ReactNode; // Pluggable card UI
};

export default function CompanyDetails({
  id: propId,
  header,
  footer,
  renderLoading,
  renderError,
  renderCard,
}: CompanyDetailsProps) {
  const { id: paramId } = useLocalSearchParams<{ id?: string }>();
  const finalId = propId ?? paramId;
  const { company, loading, error } = useCompanyDetails(finalId);

  // Default Loading
  if (loading) {
    return (
      (renderLoading && renderLoading()) || (
        <View className="flex-1 items-center justify-center bg-white">
          <LottieView
            source={require('../../../../assets/images/loader.json')}
            autoPlay
            loop
            style={{ width: 180, height: 180 }}
          />
        </View>
      )
    );
  }

  // Default Error
  if (error) {
    return (
      (renderError && renderError(error)) || (
        <View className="flex-1 items-center justify-center bg-white p-6">
          <Text className="text-center text-lg font-semibold text-red-500">{error}</Text>
        </View>
      )
    );
  }

  if (!company) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-medium text-gray-600">Company not found.</Text>
      </View>
    );
  }

  const handleLinkPress = (url?: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open link.'));
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {header || <Header title="Company Details" mode="normal" />}

      <ScrollView
        className="flex-1 px-2 pt-6"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}>
        {/* If pluggable card provided */}
        {renderCard ? (
          renderCard(company)
        ) : (
          <>
            <View className="mb-6 items-center rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
              {company.logoUrl ? (
                <Image
                  source={{ uri: company.logoUrl }}
                  className="mb-4 h-40 w-40 rounded-2xl"
                  resizeMode="contain"
                />
              ) : (
                <View className="mb-4 h-28 w-28 rounded-2xl bg-gray-200" />
              )}

              <Text className="text-center text-2xl font-extrabold text-gray-900">
                {company.name}
              </Text>

              {company.location && (
                <View className="mt-2 flex-row items-center">
                  <Ionicons name="location-sharp" size={18} color="#4B5563" />
                  <Text className="ml-1 text-sm text-gray-600">{company.location}</Text>
                </View>
              )}
            </View>

            {/* Description */}
            {company.description && (
              <View className="mb-6 items-start rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
                <Text className="mb-3 text-lg font-semibold text-gray-800">About Us</Text>
                <Text className="text-base leading-relaxed text-gray-700">
                  {company.description}
                </Text>
              </View>
            )}

            {/* Contact Info */}
            {(company.website || company.email || company.contactNumber) && (
              <View className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
                <Text className="mb-4 text-lg font-semibold text-gray-800">
                  Contact Information
                </Text>

                {company.website && (
                  <TouchableOpacity
                    className="mb-3 flex-row items-center"
                    onPress={() => handleLinkPress(company.website)}
                    activeOpacity={0.7}>
                    <MaterialIcons name="public" size={20} color="#2563EB" />
                    <Text className="ml-2 text-base text-blue-600 underline">
                      {company.website}
                    </Text>
                  </TouchableOpacity>
                )}

                {company.email && (
                  <TouchableOpacity
                    className="mb-3 flex-row items-center"
                    onPress={() => handleLinkPress(`mailto:${company.email}`)}
                    activeOpacity={0.7}>
                    <MaterialIcons name="email" size={20} color="#374151" />
                    <Text className="ml-2 text-base text-gray-800">{company.email}</Text>
                  </TouchableOpacity>
                )}

                {company.contactNumber && (
                  <View className="flex-row items-center">
                    <MaterialIcons name="phone" size={20} color="#374151" />
                    <Text className="ml-2 text-base text-gray-800">{company.contactNumber}</Text>
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <Divider/>
      <View className='m-5'>
        <PrimaryButton
          label="Check for Placements"
          onPress={() => {
            router.push('screens/notices');
          }}
        />
      </View>

      {footer}
    </View>
  );
}
