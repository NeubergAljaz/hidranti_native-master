import { Text } from "react-native-paper";
import { View } from "react-native";



export default function ModalScreenHidranti({ route }) {
  const { hidrant } = route.params;
  console.log(hidrant)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text >{hidrant.location}</Text>
      </View>
    );
  }