import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TabButton from "../components/TabButton";
import AccountScreen from "../screens/AccontScreen";
import color from "../utils.js/colors";
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "red" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="font-awesome" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" type="font-awesome" color={color} size={size} />
          ),
          tabBarButton: () => (
            <TabButton onPress={() => navigation.navigate("Profile")} />
          ),
        })}
      />
      <Tab.Screen
        name="Cart"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="shopping-cart"
              type="font-awesome"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
