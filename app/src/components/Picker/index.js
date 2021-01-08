import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

export default function Picker({ name, placeholder, placeholderTextColor, list, onChange, selected, styles, disabled, disabledStyles, visible, doneText, loading }) {
  const [visibility, setVisibility] = useState(visible);
  const [value, setValue] = useState(selected);

  const defaultStyles = {
    marginVertical: Platform.select({ ios: 3, android: 2 }),
    borderColor: '#b2b2b2',
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: Platform.select({ ios: 12, android: 8 }),
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#575757',
    // paddingRight: 6,
    ...styles
  };
  const pickerStyles = StyleSheet.create({
    inputIOS: defaultStyles,
    inputAndroid: defaultStyles
  });

  const defaultDisabledStyles = {
    ...defaultStyles,
    color: '#757575',
    backgroundColor: '#ddd',
    ...disabledStyles
  };
  const disabledPickerStyles = StyleSheet.create({
    inputIOS: defaultDisabledStyles,
    inputAndroid: defaultDisabledStyles
  });

  const style = disabled ? {
    ...disabledPickerStyles,
    placeholder: {
      color: '#a2a2a2'
    }
  } : {
    ...pickerStyles,
    // fontSize: Platform.select({ ios: 14, android: 14 }),
    placeholder: {
      color: '#a2a2a2',
    },
    textAlign: 'right'
  };

  useEffect(() => {
    // setVisibility(visible || !list.length || list.length > 1);
    setVisibility(true);
  }, []);

  // useEffect(() => {
  //   if (list.length === 1) {
  //     setValue(list[0].value);
  //     onChange(list[0].value);
  //   }
  // }, [list]);

  return (
    <View style={{display: !visibility ? 'none' : 'flex'}}>
      <RNPickerSelect
        placeholder={{label: placeholder, value: null, key: null}}
        items={list}
        // items={items}

        // itemKey={value}
        value={value}

        // itemKey={selected}
        // value={selected}

        // value={Platform.OS === "ios"
        //   ? value != null ? value : null
        //   : undefined
        // }
        // itemKey={Platform.OS === "android"
        //   ? value != null ? value : null
        //   : undefined
        // }
        useNativeAndroidPickerStyle={false}

        disabled={disabled}
        style={style}
        onValueChange={(newValue, index) => {
          if (newValue !== value) {
            // console.log(`\n[PICKER - ${name}] onValueChange()`, '\nfrom:', value, '\nto:', newValue, '\nindex:', index);
            setValue(newValue);
            onChange(newValue);
          }
        }}
        // onValueChange={onChange}
        doneText={doneText}
      />
    </View>
  );
};
