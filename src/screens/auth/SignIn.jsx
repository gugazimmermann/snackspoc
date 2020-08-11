import React, { useState } from 'react';
import { useTheme, Card, TextInput, Button, Text } from 'react-native-paper';
import {
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import i18n from '../../../i18n';
import getStyles from '../../styles/signIn';
import ErrorDialog from '../../components/ErrorDialog';
import logo from '../../../assets/icon.png';

export default function SignIn({ navigation, signIn }) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [loading, setLoading] = useState(false);
  const [ud, setUd] = useState({ e: '', p: '' });
  const [ude, setUde] = useState({ e: false, p: false });
  const [error, setError] = useState({ show: false, msg: '' });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function handleSignIn() {
    const { e, p } = ud;
    let de = { ...ude };
    if (!e) de = { ...de, e: true };
    if (!p) de = { ...de, p: true };
    setUde(de);
    if (!e || !e) return;
    setLoading(true);
    await delay(500);
    signIn();
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Snacks!</Text>
      </View>
      <Card>
        <Card.Content>
          <TextInput
            theme={theme}
            label={i18n.t('login.email')}
            textContentType='emailAddress'
            keyboardType='email-address'
            value={ud.e}
            onChangeText={(te) => setUd({ ...ud, e: te })}
            onFocus={() => setUde({ ...ude, e: false })}
            error={ude.e}
            style={styles.textInput}
          />
          <TextInput
            theme={theme}
            label={i18n.t('login.password')}
            secureTextEntry
            value={ud.p}
            onChangeText={(tp) => setUd({ ...ud, p: tp })}
            onFocus={() => setUde({ ...ude, p: false })}
            error={ude.p}
            style={styles.textInput}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode='contained'
            onPress={() => handleSignIn()}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            {i18n.t('login.signIn')}
          </Button>
        </Card.Actions>
        <Card.Actions>
          <TouchableOpacity onPress={() => {}}>
            <Text>{i18n.t('login.forgotPassword')}</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
      <View>
        <Button
          icon='facebook'
          mode='contained'
          onPress={() => {
            setUd({ e: 'josesilva@gmail.com', p: '123456' });
            handleSignIn();
          }}
          disabled={loading}
          style={[styles.button, styles.facebook]}
        >
          {i18n.t('login.signInFacebook')}
        </Button>
        <Button
          icon='google'
          mode='contained'
          onPress={() => {
            setUd({ e: 'josesilva@gmail.com', p: '123456' });
            handleSignIn();
          }}
          disabled={loading}
          style={[styles.button, styles.google]}
        >
          {i18n.t('login.signInGoogle')}
        </Button>
      </View>
      <Button
        icon='account-plus'
        mode='contained'
        onPress={() => navigation.navigate('SignUp')}
        disabled={loading}
        style={[styles.button, styles.signup]}
      >
        {i18n.t('login.signUp')}
      </Button>
      <ErrorDialog theme={theme} data={error} show={setError} />
    </KeyboardAvoidingView>
  );
}
