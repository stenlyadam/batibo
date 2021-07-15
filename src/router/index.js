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
  Address,
  AddAddress,
  EditAddress
} from '../pages';
import Page from '../pages/OnBoarding/Page';
import OrderItem from '../pages/Order/OrderItem';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconHome, IconCart, IconReceipt, IconProfile} from '../assets';
import {colors, fonts} from '../utils';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.text.tertiary,
        labelStyle: {
          fontFamily: fonts.primary.normal,
          fontSize: 12,
          marginTop: 6,
        },
        tabStyle: {
          paddingTop: 15,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => <IconHome color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          unmountOnBlur:true,
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({color, size}) => <IconCart color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          unmountOnBlur:true,
          tabBarLabel: 'Order Saya',
          tabBarIcon: ({color, size}) => (
            <IconReceipt color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => 
            <IconProfile color={color} size={size} />
          ,
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="BottomNavigator">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Page"
        component={Page}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderItem"
        component={OrderItem}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
