import { View, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Timer = ({ startTimer, executeWhenFinish, stopInTheMiddle = false }) => {
  const [time, setTime] = useState(startTimer);
  const timerId = useRef(null);
  const handleWhenTimeOver = useCallback(() => {
    setTime(0);
    clearInterval(timerId.current);
    executeWhenFinish();
  }, [executeWhenFinish]);
  const cutInTheMiddle = useCallback(() => {
    setTime("");
    clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      handleWhenTimeOver();
    }
    if (stopInTheMiddle) {
      cutInTheMiddle();
    }
    return () => {
      clearInterval(timerId.current);
    };
  }, [time, handleWhenTimeOver, stopInTheMiddle, cutInTheMiddle]);

  return (
    <View>
      <Text>{time}</Text>
    </View>
  );
};

export default Timer;
