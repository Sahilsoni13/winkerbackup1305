import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context"; // 🔥 Added SafeAreaProvider
import AppNavigator from "./src/navigator/AppNavigator";
import SafeAreaWrapper from "@/component/SafeAreaWrapper";

const App: React.FC = () => {
  // Ignore specific log notifications by message
  LogBox.ignoreLogs(["Warning: ..."]);

  // Ignore all log notifications
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider> {/* 🔥 Wrap everything with SafeAreaProvider */}
      <SafeAreaWrapper>
        <NavigationContainer>
          <GestureHandlerRootView> {/* Added flex: 1 for proper layout */}
            <AppNavigator />
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaWrapper>
    </SafeAreaProvider>
  );
};

export default App;