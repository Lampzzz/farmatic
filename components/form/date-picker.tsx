import DateTimePicker from "@react-native-community/datetimepicker";
import clsx from "clsx";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../icon";

export const DatePicker = ({
  handleChange,
  label,
  value,
  styles,
}: {
  handleChange: (date: Date | undefined) => void;
  label?: string;
  value: Date;
  styles?: string;
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");

    if (selectedDate) {
      handleChange(selectedDate);
    }
  };

  return (
    <View className={clsx(styles)}>
      {label && <Text className="font-medium mb-2">{label}</Text>}
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="bg-white border border-gray/20 rounded-xl px-4 py-1 flex-row items-center justify-between gap-2"
        style={{ height: 50 }}
      >
        <Icon name="Calendar" size={20} color="gray" />
        <Text className="flex-1">{value.toDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={onChange}
          style={{ backgroundColor: "white" }}
        />
      )}
    </View>
  );
};
