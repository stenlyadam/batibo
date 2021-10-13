import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Cart,
  Checkout,
  HomeScreen,
  InCategory,
  Login,
  Register,
  RegisterAddress,
  Splash,
  OrderSuccess,
  Order,
  OnBoarding,
  OnDiscount,
  Detail,
  Payment,
  Profile,
  EditProfile,
  Address,
  AddAddress,
  EditAddress,
  OrderSummary,
} from '../pages';
import Page from '../pages/OnBoarding/Page';
import OrderItem from '../pages/Order/OrderItem';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconHome, IconCart, IconReceipt, IconProfile} from '../assets';
import {colors, fonts} from '../utils';
import { useSelector } from "react-redux";
import OnProcess from '../pages/Order/OnProcess';

const Tab = createBottomTabNavigator();


const MainApp = () => {
  const {cart} = useSelector(state => state.loginReducer);
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
          paddingTop: 15
          // maxHeight: 50
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
          tabBarBadge: cart.length == 0 ? null : cart.length,
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
      <Stack.Screen
        name="RegisterAddress"
        component={RegisterAddress}
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
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InCategory"
        component={InCategory}
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
        name="OnDiscount"
        component={OnDiscount}
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
        name="OnProcess"
        component={OnProcess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderItem"
        component={OrderItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
