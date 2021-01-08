import React, { useState } from 'react';
import { Text } from 'react-native';
import { Page } from '../../../components';
import { translate } from '../../../translate';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';

export default function DiaryGrades() {
  const {} = useAuthContext();
  const {} = useAppContext();

  const [refreshing, setRefreshing] = useState(false);

  function mock() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(`Item ${i + 1}`);
    }
    return data;
  }

  const data = mock();

  return (
    // <Page type="static" title={translate('Grades')}>
    //   {data.map((item, key) => <Text key={key} style={{ fontSize: 40 }}>{item}</Text>)}
    // </Page>

    // <Page type="scroll" title={translate('Grades')}>
    //   {data.map((item, key) => <Text key={key} style={{ fontSize: 40 }}>{item}</Text>)}
    // </Page>

    <Page
      type="list"
      title={translate('Grades')}
      data={data}
      noData="There are no items to show"
      renderItem={({ item, index }) => (
        <Text style={{ fontSize: 18 }}>{item}</Text>
      )}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        return new Promise(resolve => {
          console.log('refreshing...');
          setTimeout(resolve, 5000);
        }).then(() => {
          console.log('new data loaded...')
          setRefreshing(false);
        });
      }}
    />
  );
}
