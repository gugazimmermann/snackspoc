import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    drawerSection: {
      flexGrow: 1,
      marginTop: 8,
    },
    userInfoSection: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      marginBottom: 8,
    },
    name: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    email: {
      textAlign: 'center',
      fontSize: 14,
    },
    row: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    buttonView: {
      margin: 16,
    },
    button: {
      width: '100%',
      backgroundColor: theme.colors.accent,
    },
  });

export default getStyles;
