import List from './screens/List';
import Details from './screens/Details';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.22

export default StackNavigator({
  List: { screen: List },
  Details: { screen: Details },
});
