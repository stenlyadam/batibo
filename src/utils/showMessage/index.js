import {showMessage as showToast} from 'react-native-flash-message';
import {colors} from '../../utils';

// export const showError = message => {
//   showMessage({
//     message: message,
//     type: 'default',
//     backgroundColor: colors.error,
//     color: colors.white,
//   });
// };

// export const showSuccess = message => {
//   showMessage({
//     message: message,
//     type: 'default',
//     backgroundColor: colors.primary,
//     color: colors.white,
//   });
// };

export const showMessage = (message, type) => {
  showToast({
    message: message,
    type: type === 'success' ? 'success' : 'danger',
    backgroundColor: type === 'success' ? colors.primary : colors.error
  });
}
