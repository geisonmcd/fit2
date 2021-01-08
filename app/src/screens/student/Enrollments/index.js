import React from 'react';
import { Text } from 'react-native';
import { translate } from '../../../translate';
import { Page } from '../../../components';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';

export default function Enrollments() {
  const {} = useAuthContext();
  const {} = useAppContext();
  return (
    <Page type="static" title={translate('Enrollments')}>
      <Text>...</Text>
    </Page>
  );
}
