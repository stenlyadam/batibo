const listColors = {
  green1: '#00CC99',
  green2: '#07AD82',
  green3: '#009B77',
  green4: '#24AD65',
  white: 'white',
  orange1: '#FF8C21',
  grey1: '#1C2024',
  grey2: '#303030',
  grey3: '#D6CDCD',
  red1: '#FF3C21',
  black: 'black',
};

export const colors = {
  primary: listColors.green3,
  white: listColors.white,
  black: listColors.black,
  button: {
    primary: {
      backgroundColor: listColors.orange1,
      text: listColors.white,
    },
    red: listColors.red1,
    green: listColors.green4,
  },
  text: {
    primary: listColors.grey1,
    secondary: listColors.grey2,
    tertiary: listColors.orange1,
    quartenary: listColors.green4,
  },
  border: listColors.grey3,
};
