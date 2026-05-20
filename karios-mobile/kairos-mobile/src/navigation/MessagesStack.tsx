import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessagesHomeScreen } from '../features/messages/MessagesHomeScreen';
import { ChatScreen } from '../features/messages/ChatScreen';
import type { MessagesStackParamList } from './types';

const Stack = createNativeStackNavigator<MessagesStackParamList>();

export function MessagesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessagesHome" component={MessagesHomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
