import React, { useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import { translate } from '../../../translate';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import { Page } from '../../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

export default function Diary({ navigation }) {
  const {} = useAuthContext();
  const {} = useAppContext();
  const { system } = useTheme();
  const route = useRoute();
  const { diary } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const resources = [
    { name: 'Contents', path: 'DiaryContents', icon: 'tasks' },
    { name: 'Attendances', path: 'DiaryAttendances', icon: 'check-circle' },
    { name: 'Grades', path: 'DiaryGrades', icon: 'star' },
    { name: 'Free\nAssessments', path: 'DiaryFreeAssessments', icon: 'child' },
    { name: 'Reports', path: 'DiaryReports', icon: 'file-text' }
  ];

  function onRefresh() {
    setRefreshing(true);
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item, index }) {
    return (
      <Pressable key={item.path} onPress={() => navigation.navigate(item.path)} style={[styles.card, {
        marginLeft: index % 2 ? 16 : 0,
        backgroundColor: system.groupedBackground.primary
      }]}>
        <FontAwesome name={item.icon} size={48} color={system.label.tertiary} />
        <Text style={[styles.cardTitle, {
          color: system.label.secondary
        }]} numberOfLines={2}>{translate(item.name)}</Text>
      </Pressable>
    );
  }

  return (
    <Page
      type="list"
      title={translate('Diary')}
      subtitle={diary.name}
      smallTitle={diary.name}
      noDataIcon="check"
      noDataMessage={translate('There are no items to show')}
      columns={2}
      columnWrapperStyle={{marginHorizontal: 16, marginBottom: 16}}
      contentContainerStyle={{paddingBottom: 20}}
      data={resources}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10
  }
});
