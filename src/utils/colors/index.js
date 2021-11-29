import { MarkerUnits } from "react-native-svg";

const listColors = {
  green1: '#00CC99',
  green2: '#07AD82',
  green3: '#009B77',
  green4: '#24AD65',
  green5: 'rgba(40, 190, 100, 0.7)',
  white: 'white',
  white2: 'rgba(242, 244, 242, 0.95)',
  orange1: '#FF8C21',
  grey1: '#1C2024',
  grey2: '#303030',
  grey3: '#D6CDCD',
  grey4: '#C4C4C4',
  grey5: 'rgba(49,49,49, 0.35)',
  grey6: '#F2F2F2',
  red1: '#FF3C21',
  black: 'black',
  black2: 'rgba(0,0,0, 0.5)',
  blue: '#0045A3',
  blue2: 'rgba(28, 128, 255, 0.7)',
  red: '#ff1818',
  red2: 'rgba(255, 40, 40, 0.7)',
  yellow: '#F9E000',
  yellow2: 'rgba(255, 224, 40, 0.7)'
};

export const colors = {
  primary: listColors.green3,
  white: listColors.white,
  black: listColors.black,
  grey: listColors.grey4,
  border: listColors.grey3,
  lightGrey: listColors.grey6,
  yellow: listColors.yellow,
  button: {
    primary: {
      backgroundColor: listColors.orange1,
      text: listColors.white,
    },
    secondary: {
      backgroundColor: listColors.white,
      borderColor: listColors.orange1,
      text: listColors.orange1,
    },
    tertiary: {
      backgroundColor: listColors.white,
      borderColor: listColors.grey5,
      text: listColors.grey5,
    },
    red: listColors.red1,
    green: listColors.green4,
  },
  text: {
    primary: listColors.grey1,
    secondary: listColors.grey2,
    tertiary: listColors.orange1,
    quartenary: listColors.green4,
    grey: listColors.grey5,
    blue: listColors.blue,
    red: listColors.red,
  },
  status: {
    pending: listColors.yellow2,
    on_delivery: listColors.green5,
    cancelled: listColors.red2,
    delivered: listColors.blue2,
  },
  loading: {
    backgroundColor: listColors.black2,
    containerColor: listColors.white2
  },
  error: listColors.red1,
};
