// screens/HelpCenter.tsx
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { ChevronDown, ChevronUp, Search, BookOpen, FileText, ClipboardList } from "lucide-react-native";
import { JSX } from "react";

type FAQ = {
  question: string;
  answer: string;
  link?: string;
};

type Section = {
  title: string;
  color: string;
  icon: JSX.Element;
  faqs: FAQ[];
};

const HelpCenter = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const sections: Section[] = [
    {
      title: "Registration",
      color: "bg-blue-100",
      icon: <BookOpen size={20} color="#2563eb" />,
      faqs: [
        {
          question: "How do I register for placements?",
          answer:
            "Login → Go to Placement Registration → Fill in academic & personal details → Submit.",
          link: "Go to Registration",
        },
      ],
    },
    {
      title: "Application",
      color: "bg-orange-100",
      icon: <ClipboardList size={20} color="#ea580c" />,
      faqs: [
        {
          question: "Can I apply to multiple companies?",
          answer: "Yes, you may apply to multiple companies if you meet their eligibility.",
        },
        {
          question: "How can I check my application status?",
          answer: "Go to 'My Applications' in your dashboard to track status.",
        },
      ],
    },
    {
      title: "Resume",
      color: "bg-green-100",
      icon: <FileText size={20} color="#16a34a" />,
      faqs: [
        {
          question: "How do I upload/update my resume?",
          answer: "Go to 'Profile → Resume Upload' and upload the latest version of your CV.",
        },
        {
          question: "What happens if I reject an offer?",
          answer:
            "If you reject an offer, you may be restricted from applying to further companies depending on placement rules.",
        },
      ],
    },
  ];

  const toggleExpand = (q: string) => {
    setExpanded(expanded === q ? null : q);
  };

  const filteredSections = sections.map((section) => ({
    ...section,
    faqs: section.faqs.filter((faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <View className="flex-1 bg-white p-4">
      {/* Title */}
      <Text className="text-xl font-semibold text-center text-blue-600 mb-4">
        How can we help you?
      </Text>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mb-4">
        <Search size={18} color="#6b7280" />
        <TextInput
          placeholder="Describe your issue..."
          value={search}
          onChangeText={setSearch}
          className="flex-1 ml-2 text-gray-700"
        />
      </View>

      {/* Quick Filters */}
      <View className="flex-row justify-around mb-4">
        <TouchableOpacity className="bg-blue-50 px-3 py-2 rounded-xl">
          <Text className="text-blue-600 font-medium">Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-orange-50 px-3 py-2 rounded-xl">
          <Text className="text-orange-600 font-medium">Application</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-50 px-3 py-2 rounded-xl">
          <Text className="text-green-600 font-medium">Resume</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredSections.map((section, index) => (
          <View key={index} className="mb-4">
            {/* Section Header */}
            <View
              className={`flex-row items-center p-3 rounded-t-xl ${section.color}`}
            >
              {section.icon}
              <Text className="ml-2 font-semibold text-gray-800">
                {section.title}
              </Text>
            </View>

            {/* FAQs */}
            <View className="bg-white rounded-b-xl shadow">
              {section.faqs.length > 0 ? (
                section.faqs.map((faq, i) => (
                  <View key={i} className="border-b border-gray-200">
                    <TouchableOpacity
                      onPress={() => toggleExpand(faq.question)}
                      className="flex-row justify-between items-center px-4 py-3"
                    >
                      <Text className="text-gray-800">{faq.question}</Text>
                      {expanded === faq.question ? (
                        <ChevronUp size={18} color="#374151" />
                      ) : (
                        <ChevronDown size={18} color="#374151" />
                      )}
                    </TouchableOpacity>

                    {expanded === faq.question && (
                      <View className="px-4 pb-3">
                        <Text className="text-gray-600 mb-2">{faq.answer}</Text>
                        {faq.link && (
                          <TouchableOpacity className="bg-blue-100 px-3 py-2 rounded-lg self-start">
                            <Text className="text-blue-600 font-medium">{faq.link}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                ))
              ) : (
                <Text className="text-gray-400 p-3">No results found</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Support Footer */}
      <View className="mt-4 border-t border-gray-200 pt-3 mb-8">
        <Text className="text-center text-gray-500 mb-2">Still need help?</Text>
        <View className="flex-row justify-around">
          <TouchableOpacity className="bg-blue-50 px-3 py-2 rounded-xl">
            <Text className="text-blue-600 font-medium">📞 Call</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-50 px-3 py-2 rounded-xl">
            <Text className="text-green-600 font-medium">💬 Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-50 px-3 py-2 rounded-xl">
            <Text className="text-orange-600 font-medium">📧 Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HelpCenter;
