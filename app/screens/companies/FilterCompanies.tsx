import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/ui/Header';
import FilterSection from '../../../components/applications/filter/FilterSection';
import SelectableButton from '../../../components/applications/filter/SelectableButton';
import RangeInput from '../../../components/applications/filter/RangeInput';
import PrimaryButton from '../../../components/ui/PrimaryButton';
const programs = ['CO', 'IF', 'CE', 'ENTC', 'ME', 'AE', 'EE'];

const placementTypes = [
  'Placement',
  'Internship',
  'Placement And Internship',
  'Internship + Performance based PPO',
  'Industrial Training',
  'Apprenticeship',
];

export default function FilterScreen() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('1000000');

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Filter Companies" mode="close" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}>
        <FilterSection title="Placement Type">
          <View className="flex-row flex-wrap gap-2">
            {placementTypes.map((type) => (
              <SelectableButton
                key={type}
                label={type}
                isSelected={selectedTypes.includes(type)}
                onPress={() => toggleType(type)}
              />
            ))}
          </View>
        </FilterSection>
        <FilterSection title="Program">
          <View className="flex-row flex-wrap gap-2">
            {programs.map((type) => (
              <SelectableButton
                key={type}
                label={type}
                isSelected={selectedTypes.includes(type)}
                onPress={() => toggleType(type)}
              />
            ))}
          </View>
        </FilterSection>
        <FilterSection title="Package">
          <View className="flex-row gap-4">
            <RangeInput label="Min" value={min} onChangeText={setMin} />
            <RangeInput label="Max" value={max} onChangeText={setMax} />
          </View>
        </FilterSection>

        <PrimaryButton label="Apply Filters" onPress={() => {}} />
      </ScrollView>
    </View>
  );
}
