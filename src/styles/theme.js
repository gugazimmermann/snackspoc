import {
  DefaultTheme as reactDefaultTheme,
  DarkTheme as reactDarkTheme,
} from '@react-navigation/native';
import {
  Colors,
  configureFonts,
  DefaultTheme,
  DarkTheme,
} from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Ubuntu_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Ubuntu_500Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Ubuntu_300Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Ubuntu_300Light_Italic',
      fontWeight: 'normal',
    },
  },
};

export default function mainTheme(themeStyle) {
  const custom = {
    colors: {
      primary: Colors.teal400,
      accent: Colors.orange900,
      positive: Colors.tealA700,
      negative: Colors.redA700,
      tabs: {
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.teal100,
      },
    },
    fonts: configureFonts(fontConfig),
  };
  return themeStyle === 'light'
    ? {
        ...DefaultTheme,
        ...reactDefaultTheme,
        ...custom,
        colors: {
          ...DefaultTheme.colors,
          ...reactDefaultTheme.colors,
          ...custom.colors,
        },
      }
    : {
        ...DarkTheme,
        ...reactDarkTheme,
        ...custom,
        colors: {
          ...DarkTheme.colors,
          ...reactDarkTheme.colors,
          ...custom.colors,
        },
      };
}
