import { StyleSheet } from 'react-native';

const getStyles = () =>
  StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
    },
    title: {
      width: 64,
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      textAlign: 'center',
      marginRight: 8,
    },
    content: {
      flex: 1,
      alignSelf: 'flex-start',
    },
    text: {
      justifyContent: 'flex-start',
    },
    logo: {
      width: 56,
      alignItems: 'flex-end',
    },
    dist: {
      width: 64,
      fontSize: 16,
      fontFamily: 'Ubuntu_700Bold',
    },
  });

export default getStyles;
