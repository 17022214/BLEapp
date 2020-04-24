import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import AccountScreen from './screens/AccountScreen';
import SearchScreen from './screens/SearchScreen';

//Create bottom tabs to navigate through the app easily
const AppTabNav = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Search: {screen: SearchScreen},
  List: {screen: ListScreen},
  Account: {screen: AccountScreen},
});
const AppContainer = createAppContainer(AppTabNav);

export default AppContainer;
