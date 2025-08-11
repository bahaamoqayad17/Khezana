import { Image, StyleSheet, View } from "react-native";

export default function SplashScreenComponent() {
  return (
    <View style={styles.splashContainer}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#65382C",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
