import React, { useState } from 'react';
import { useTheme, Text, Card, TextInput, Button } from 'react-native-paper';
import { KeyboardAvoidingView, Image, View } from 'react-native';
import i18n from '../../../i18n';
import getStyles from '../../styles/signUp';
import logo from '../../../assets/icon.png';

export default function SignUp({ navigation }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [userData, setUserData] = useState({
    givenName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

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
            label={i18n.t('login.name')}
            value={userData.givenName}
            onChangeText={(e) => setUserData({ ...userData, givenName: e })}
            style={styles.textInput}
          />
          <TextInput
            theme={theme}
            label={i18n.t('login.email')}
            textContentType='emailAddress'
            keyboardType='email-address'
            value={userData.email}
            onChangeText={(e) => setUserData({ ...userData, email: e })}
            style={styles.textInput}
          />
          <TextInput
            theme={theme}
            label={i18n.t('login.password')}
            secureTextEntry
            value={userData.password}
            onChangeText={(e) => setUserData({ ...userData, password: e })}
            style={styles.textInput}
          />
          <TextInput
            theme={theme}
            label={i18n.t('login.repeatPassword')}
            secureTextEntry
            value={userData.repeatPassword}
            onChangeText={(e) =>
              setUserData({ ...userData, repeatPassword: e })
            }
            style={styles.textInput}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode='contained'
            onPress={navigation.goBack}
            style={[styles.button, styles.signup]}
          >
            {i18n.t('login.signUp')}
          </Button>
        </Card.Actions>
      </Card>
      <Button
        mode='contained'
        onPress={navigation.goBack}
        style={[styles.button]}
      >
        {i18n.t('login.backToSignIn')}
      </Button>
    </KeyboardAvoidingView>
  );
}
