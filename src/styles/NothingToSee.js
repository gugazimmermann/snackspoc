import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    surface: {
      padding: 16,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
    },
    text: {
      color: theme.colors.accent,
    },
  });

export default getStyles;
