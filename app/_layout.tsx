import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from "@expo-google-fonts/dosis";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Dosis_400Regular, Dosis_500Medium,
    Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded]);

  return (
    loaded ?
    <>
      <StatusBar backgroundColor={Colors.background} barStyle={"dark-content"}/>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </>
    :
    <>
    </>
  );
}
