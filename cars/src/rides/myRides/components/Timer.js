import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = ({ startTimer, executeWhenFinish, stopInTheMiddle = false }) => {
  const [time, setTime] = useState(startTimer);
  const timerId = useRef(null);

  // Start or stop the timer based on `stopInTheMiddle`
  useEffect(() => {
    // If requested to stop in the middle, clear the interval
    if (stopInTheMiddle && timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null; // Make sure to nullify the timerId reference
      return;
    }

    // Setup the timer only if it's not already running
    if (!timerId.current) {
      timerId.current = setInterval(() => {
        setTime((prevTime) => {
          const updatedTime = prevTime - 1;
          if (updatedTime <= 0) {
            clearInterval(timerId.current);
            timerId.current = null; // Nullify the timerId to indicate it's not running
            executeWhenFinish(); // Execute the callback
            return 0; // Stop the timer
          }
          return updatedTime;
        });
      }, 1000); // Decrease time every 1 second
    }

    // Cleanup function to clear interval when the component unmounts or stopInTheMiddle changes
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    };
  }, [stopInTheMiddle, startTimer, executeWhenFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  timerText: {
    fontSize: 24,
    color: "#333",
  },
});

export default Timer;
