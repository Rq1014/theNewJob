import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublishHomeScreen } from '../features/publish/PublishHomeScreen';
import { SelectPostTypeScreen } from '../features/publish/SelectPostTypeScreen';
import { SelectTreeholeScreen } from '../features/publish/SelectTreeholeScreen';
import { PublishComposeScreen } from '../features/publish/PublishComposeScreen';
import { DraftsScreen } from '../features/publish/DraftsScreen';
import { PublishRulesScreen } from '../features/publish/PublishRulesScreen';
import type { PublishStackParamList } from './types';

const Stack = createNativeStackNavigator<PublishStackParamList>();

export function PublishStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="PublishHome">
      <Stack.Screen name="PublishHome" component={PublishHomeScreen} />
      <Stack.Screen name="SelectPostType" component={SelectPostTypeScreen} />
      <Stack.Screen name="SelectTreehole" component={SelectTreeholeScreen} />
      <Stack.Screen name="PublishCompose" component={PublishComposeScreen} />
      <Stack.Screen name="Drafts" component={DraftsScreen} />
      <Stack.Screen name="PublishRules" component={PublishRulesScreen} />
    </Stack.Navigator>
  );
}
