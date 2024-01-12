import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UsersListScreen from '../screens/UsersList';
import AlbumPhotosScreen from '../screens/AlbumPhotos';
import colors from '../constants/colors';

type MainStackParamList = {
  UserList: undefined;
  AlbumPhotos: {albumId: number; albumTitle: string};
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryColor,
        },
        headerTintColor: colors.white,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="UserList"
        component={UsersListScreen}
        options={{title: 'Users'}}
      />
      <Stack.Screen
        name="AlbumPhotos"
        component={AlbumPhotosScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
