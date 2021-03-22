import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Cart,
  Checkout,
  HomeScreen,
  Login,
  Register,
  Splash,
  OrderSuccess,
  Order,
  OnBoarding,
  Detail,
  Payment,
  Profile,
  EditProfile,
} from '../pages';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconHome, IconCart, IconReceipt, IconProfile} from '../assets';
import {Button} from '../components';
import {colors, fonts} from '../utils';

const Page = createBottomTabNavigator();

const Router = () => {
  return (
    <Page.Navigator
      tabBarOptions={{
        activeTintColor: colors.text.tertiary,
        labelStyle: {
          fontFamily: fonts.primary.normal,
          fontSize: 12,
          marginTop: 6,
        },
        tabStyle: {paddingTop: 15},
      }}>
      <Page.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => <IconHome color={color} size={size} />,
          tabBarOptions: {
            activeTintColor: 'blue',
          },
        }}
      />
      <Page.Screen
        name="Keranjang"
        component={Cart}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({color, size}) => <IconCart color={color} size={size} />,
        }}
      />
      <Page.Screen
        name="Order Saya"
        component={Payment}
        options={{
          tabBarLabel: 'Order Saya',
          tabBarIcon: ({color, size}) => (
            <IconReceipt color={color} size={size} />
          ),
        }}
      />
      <Page.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({color, size}) => (
            <IconProfile color={color} size={size} />
          ),
        }}
      />
    </Page.Navigator>
  );
};

// const Stack = createStackNavigator();

// const Router = () => {
//   return (
//     <Stack.Navigator initialRouteName="Payment">
//       <Stack.Screen
//         name="Splash"
//         component={Splash}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Register"
//         component={Register}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Cart"
//         component={Cart}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Checkout"
//         component={Checkout}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="OrderSuccess"
//         component={OrderSuccess}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Order"
//         component={Order}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="OnBoarding"
//         component={OnBoarding}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Detail"
//         component={Detail}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Payment"
//         component={Payment}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="EditProfile"
//         component={EditProfile}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

export default Router;
