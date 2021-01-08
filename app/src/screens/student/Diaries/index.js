import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import { translate } from '../../../translate';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import { Page } from '../../../components';
import api from '../../../services/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons.loadFont();

export default function Diaries() {
  const navigation = useNavigation();
  const route = useRoute();
  const { system } = useTheme();
  const { token, user, signOut } = useAuthContext();
  const { idEnrollment, idPeriod, diaries } = useAppContext();

  function renderItem({ item, index }) {
    return (
      <Pressable onPress={() => navigation.navigate('Diary', { diary: item })}>
        <View style={styles.itemContainer}>
          <View style={[styles.item, { borderColor: system.separator.opaque, borderTopWidth: !index ? 0.5 : 0 }]}>
            <Text style={[styles.itemText, { color: system.label.primary }]}>{item.name}</Text>
            <MaterialIcons style={styles.itemIcon} name="chevron-right" size={23} color={system.separator.opaque} />
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Page
      type="list"
      title={translate('Diaries')}
      smallTitle={translate('Diaries')}
      noDataIcon="book"
      noDataMessage={translate('There\'s no diary')}
      data={diaries}
      renderItem={renderItem}
      // refreshing={refreshing}
      // onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    borderWidth: 0
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    paddingVertical: 12,
    marginLeft: 16,
    borderBottomWidth: 0.5,
  },
  itemText: {
    fontSize: 17,
    flexGrow: 1
  },
  itemIcon: {}
});
