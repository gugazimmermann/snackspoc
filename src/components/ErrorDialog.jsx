import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import i18n from '../../i18n';

export default function ErroDialog({ theme, data, show }) {
  return (
    <Portal>
      <Dialog
        visible={data.show}
        onDismiss={() => show({ show: false })}
        theme={theme}
      >
        <Dialog.Title style={{ color: theme.colors.error }}>
          {i18n.t('errorDialog.error')}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>{data.msg}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => show({ show: false })}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
