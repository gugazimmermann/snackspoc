import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
    },
    logo: {
      width: 48,
      alignItems: 'flex-start',
      marginLeft: 8,
      marginRight: 16,
    },
    content: {
      flex: 1,
      alignSelf: 'flex-start',
    },
    title: {
      justifyContent: 'flex-start',
      fontSize: 16,
      fontFamily: 'Ubuntu_700Bold',
    },
    text: {
      justifyContent: 'flex-start',
    },
    value: {
      width: 64,
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      textAlign: 'center',
      marginRight: 8,
    },
    positive: {
      color: theme.colors.positive,
    },
    negative: {
      color: theme.colors.negative,
    },
  });

export default getStyles;
