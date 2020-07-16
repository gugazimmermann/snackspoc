import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    drawerContent: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 16,
    },
    title: {
      marginTop: 16,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
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
