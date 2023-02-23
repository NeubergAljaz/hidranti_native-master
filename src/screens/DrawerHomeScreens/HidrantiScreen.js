import { View } from 'react-native'; 
// redux hooks
import { useSelector} from 'react-redux'; 

import GetHidranti from '../../components/GetHidranti';


export default function HidrantiScreen() {

  const theme = useSelector(state => state.theme);
  
  return (
    <View style={theme.style.container}>
      <GetHidranti/>
    </View>
  );
}
