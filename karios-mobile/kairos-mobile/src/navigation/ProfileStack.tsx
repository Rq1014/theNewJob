import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileHomeScreen } from '../features/profile/ProfileHomeScreen';
import { EditProfileScreen } from '../features/profile/EditProfileScreen';
import { SettingsScreen } from '../features/profile/SettingsScreen';
import type { ProfileStackParamList } from './types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
