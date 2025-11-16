import { View, Text, Button, StyleSheet } from "react-native";

export default function ReflectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reflection placeholder</Text>
      <Button
        title="Start Chat"
        onPress={() => navigation.navigate("Conversation")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 20 },
});
