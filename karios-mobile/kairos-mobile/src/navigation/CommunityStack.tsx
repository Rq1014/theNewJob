import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommunityHomeScreen } from '../features/community/CommunityHomeScreen';
import { PostDetailScreen } from '../features/community/PostDetailScreen';
import { SearchScreen } from '../features/community/SearchScreen';
import { UserProfileScreen } from '../features/community/UserProfileScreen';
import { TagFeedScreen } from '../features/community/TagFeedScreen';
import type { CommunityStackParamList } from './types';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityHome" component={CommunityHomeScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="TagFeed" component={TagFeedScreen} />
    </Stack.Navigator>
  );
}
