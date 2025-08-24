import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from 'components/ui/Header';
import { API_BASE_URL } from 'utils/api';

type Company = {
  id: string;
  companyId: string;
  position: string;
  location: string;
  eligibilityCriteria: string;
  jobDescription: string;
  minPack: number;
  maxPack: number;
  ctc: number;
  driveDate: string;
  applicationDeadline: string;
};

export default function CompanyDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (!id) throw new Error('No company ID provided');
        const res = await fetch(`${API_BASE_URL}/api/companies/${id}`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const json = await res.json();
        if (!json.success || !json.data) {
          throw new Error('Invalid API response');
        }
        setCompany(json.data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const formatDate = (isoDate: string) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-center text-red-600">{error}</Text>
      </View>
    );
  }

  if (!company) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Company not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Details" mode="normal" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-4"
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="mb-3 mt-6">
          <Text className="mb-2 text-lg font-semibold">Company Attachments</Text>
          <Text className="mb-1 text-blue-600 underline">Company Brochure</Text>
          <Text className="text-blue-600 underline">Company Presentation</Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold">Instructions</Text>
          <Text className="text-sm text-gray-700">
            Please note Online Assessment is on {formatDate(company.driveDate)} and Interview Drive
            on Friday, {formatDate(company.driveDate)}.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold">Company Criteria</Text>
          <View className="mt-1">
            <Text>Position: {company.position}</Text>
            <Text>Location: {company.location}</Text>
            <Text>Eligibility: {company.eligibilityCriteria}</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold">Company Selection Procedure</Text>
          <Text>Round 1: Online Test</Text>
          <Text>Round 2: Technical Interview</Text>
          <Text>Round 3: HR Interview</Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold">
            Questions answered by You while applying
          </Text>
          <View className="mb-2">
            <Text className="font-medium">Why do you want to join this company?</Text>
            <Text>I am passionate about technology and innovation.</Text>
          </View>
          <View className="mb-2">
            <Text className="font-medium">What are your strengths and weaknesses?</Text>
            <Text>I am a quick learner and a team player.</Text>
          </View>
          <View>
            <Text className="font-medium">What are your career goals?</Text>
            <Text>I want to grow as a software engineer.</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold">Company Information And Criteria</Text>
          <Text>Name: {company.position}</Text>
          <Text>Industry: N/A</Text>
          <Text>Location: {company.location}</Text>
          <Text>
            Salary: ₹{company.minPack.toLocaleString()} - ₹{company.maxPack.toLocaleString()}
          </Text>
          <Text>Job Role: {company.position}</Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-gray-200 bg-white p-4">
        <TouchableOpacity className="flex-1 rounded-lg border border-gray-300 p-3">
          <Text className="text-center font-medium text-gray-700">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 rounded-lg bg-blue-600 p-3">
          <Text className="text-center font-medium text-white">Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
