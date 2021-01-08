import React, { useState, useEffect, useCallback } from 'react';
import { Text, Pressable, StyleSheet, ActivityIndicator, Animated, ScrollView, FlatList, View, Dimensions, RefreshControl } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

export default function Page(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, system } = useTheme();
  const { height } = Dimensions.get('window');
  const scrollY = new Animated.Value(0);
  const {
    children,
    type,
    title,
    subtitle,
    smallTitle,
    renderItem,
    data,
    noDataIcon,
    noDataMessage,
    columns,
    columnWrapperStyle,
    contentContainerStyle,
    refreshing,
    onRefresh,
    onEndReached,
    onEndReachedThreshold
  } = props;

  function onScrollListener({ nativeEvent }) {
    const activeTitle = smallTitle || title;
    const newTitle = nativeEvent.contentOffset.y >= 45 ? activeTitle : '';
    const inputRange = [0, 59, 85];
    const extrapolate = 'clamp';
    const bg = scrollY.interpolate({
      inputRange,
      outputRange: [colors.background, colors.background, system.background.secondary],
      extrapolate
    });
    const border = scrollY.interpolate({
      inputRange,
      outputRange: [colors.background, colors.background, system.separator.opaque],
      extrapolate
    });
    navigation.setOptions({
      title: newTitle,
      headerStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: border,
        backgroundColor: bg,
        // backgroundColor: colors.background,
      },
      // headerLeftContainerStyle: { backgroundColor: 'transparent' },
      // headerRightContainerStyle: { backgroundColor: 'transparent' }
    });
  };

  function Title({ title, subtitle }) {
    function getAnimatedTextStyle(fontSize, color) {
      return {
        color: color || undefined,
        lineHeight: fontSize * 1.2,
        fontSize: scrollY.interpolate({
          inputRange: [-height, 0],
          outputRange: [fontSize * 1.75, fontSize],
          extrapolate: 'clamp'
        }),
        opacity: scrollY.interpolate({
          inputRange: [0, 40, 50],
          outputRange: [1, 0.5, 0],
          extrapolate: 'clamp'
        })
      };
    }
    return (
      <View style={{marginBottom: 20}}>
        <Animated.Text style={[styles.title, getAnimatedTextStyle(34)]} numberOfLines={1}>
          {title}
        </Animated.Text>
        {subtitle && (
          <Animated.Text style={[styles.subtitle, getAnimatedTextStyle(20, system.label.secondary)]} numberOfLines={1}>
            {subtitle}
          </Animated.Text>
        )}
      </View>
    );
  }

  if (type === 'static') {
    return (
      <View>
        <Title title={title} subtitle={subtitle} />
        <View>
          {children}
        </View>
      </View>
    );
  }

  if (type === 'scroll') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={20}
        onScroll={Animated.event([{nativeEvent: { contentOffset: { y: scrollY } }}], {listener: onScrollListener, useNativeDriver: false})}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        // contentContainerStyle={scrollContainerStyle}
        // {...scrollViewProps}
      >
        <Title title={title} subtitle={subtitle} />
        <View>
          {children}
        </View>
      </ScrollView>
    );
  }

  if (type === 'list') {
    return (
      <FlatList
        columnWrapperStyle={columnWrapperStyle || undefined}
        contentContainerStyle={{ flexGrow: 1, ...contentContainerStyle}}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={() => <Title title={title} subtitle={subtitle}/>}
        ListEmptyComponent={() => (
          <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 16, marginBottom: 60}}>
            {noDataIcon && <FontAwesome name={noDataIcon} size={46} color={system.label.secondary} />}
            {noDataMessage && <Text style={{marginTop: 10, fontSize: 22, fontWeight: '100', color: system.label.secondary}}>{noDataMessage}</Text>}
          </View>
        )}
        numColumns={columns}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{nativeEvent: { contentOffset: { y: scrollY } }}], {listener: onScrollListener, useNativeDriver: false})}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={onEndReached || undefined}
        onEndReachedThreshold={onEndReachedThreshold || 0.3}
      />
    );
  }

  return (
    <View>
      <Text>The 'type' attribute must be defined. You can choose one of that: 'static', 'scroll' or 'list'</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginLeft: 16,
    marginTop: 10
  },
  subtitle: {
    letterSpacing: 0.09,
    fontWeight: '400',
    marginLeft: 16,
  },
});
