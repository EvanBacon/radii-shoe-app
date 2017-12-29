import List from './screens/List';
import Details from './screens/Details';
import { StackNavigator } from 'react-navigation';

export default StackNavigator({
  List: { screen: List },
  Details: { screen: Details },
});
