import {View,Text,TextInput} from 'react-native';
import { useState } from 'react';
const InputRow = ()=>{
    const[HighestQualification,setHighestQualification] = useState('');
    const[SSCPercentage,setSSCPercentage] = useState('');
    const[ HSCPercentage,setHSCPercentage] = useState('');
    const[ DiplomaPercentage,setDiplomaPercentage] = useState('');
    const[ GraduationCPI,setGraduationCPI] = useState('');
    const[ PostGraduationCPI,setPostGraduationCPI] = useState('');
   return(
    <View>
      <View className="flex-row justify-between my-1">
              <View className="flex-1 mr-2">
                <Text>Highest Qualification:</Text>
                <TextInput 
                  value={HighestQualification}
                  onChangeText={setHighestQualification}
                  className="border border-gray-300 rounded-md p-2 mt-1" />
              </View>
              <View className="flex-1">
                <Text>SSC Percentage:</Text>
                <TextInput 
                  value={SSCPercentage}
                  onChangeText={setSSCPercentage}
                  className="border border-gray-300 rounded-md p-2 mt-1" />
              </View>
            </View>
      
            
            <View className="flex-row justify-between my-1">
              <View className="flex-1 mr-2">
                <Text>HSC Percentage:</Text>
                <TextInput 
                  value={HSCPercentage}
                  onChangeText={setHSCPercentage}
                  className="border border-gray-300 rounded-md p-2 mt-1" />
              </View>
              <View className="flex-1">
                <Text>Diploma Percentage:</Text>
                <TextInput 
                  value={DiplomaPercentage}
                  onChangeText={setDiplomaPercentage}
                  className="border border-gray-300 rounded-md p-2 mt-1" />
              </View>
            </View>
           
           <View className="flex-row justify-between my-1">
              <View className="flex-1 mr-2">
                <Text>Graduation Latest CPI :</Text>
                <TextInput 
                  value={GraduationCPI}
                  onChangeText={setGraduationCPI}
                  className="border border-gray-300 rounded-md p-2 mt-1" />
              </View>
              <View className="flex-1">
                <Text>Post Graduation CPI:</Text>
                <TextInput 
                  value={PostGraduationCPI}
                  onChangeText={setPostGraduationCPI}
                  className="border border-gray-300 rounded-md p-2 mt-1" />
              </View>
            </View> 

      </View>
    );
}
export default InputRow;