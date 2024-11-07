import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { Button, Text, } from 'react-native-paper';
import React, { useState, useRef } from 'react';

export default function HomePage() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.moldura}>
        <View style={styles.moldura}>
          <Text
            variant="headlineLarge"
          >{formatTime(time)}</Text>
        </View>
        <View style={[styles.moldura, styles.botoes]}>
          <Button
            mode="contained"
            style={{ marginRight: 10 }}
            onPress={startTimer}
          >Iniciar</Button>
          <Button
            mode="contained"
            onPress={stopTimer}
          >Parar</Button>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moldura: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  botoes: {
    marginTop: 10,
    flexDirection: "row",
  }
});
