import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 24,
      maxHeight: 50,
    },
    title: {
      justifyContent: 'flex-start',
      fontSize: 21,
      fontFamily: 'Ubuntu_700Bold',
    },
    value: {
      fontSize: 24,
      fontFamily: 'Ubuntu_700Bold',
      justifyContent: 'flex-end',
    },
    positive: {
      color: theme.colors.positive,
    },
    negative: {
      color: theme.colors.negative,
    },
  });

export default getStyles;
