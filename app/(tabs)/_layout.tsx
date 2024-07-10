import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { faHome, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function TabLayout() {

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.secondary,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarLabelStyle: {
          fontFamily: "Dosis_600SemiBold",
          paddingBottom: 5,
        },
        tabBarItemStyle: {
          borderTopWidth: 2,
          borderTopColor: Colors.darkenedBackground
        }
      }}
      
    >
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faHome} color={color} size={20}/>
        ),
      }}/>
      <Tabs.Screen name="quick-pom" options={{
        title: "Quick Pom",
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faStopwatch} color={color} size={20}/>
        ),
      }}/>
    </Tabs>
  );
}
