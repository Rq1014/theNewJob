import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommunityStack } from './CommunityStack';
import { RankingStack } from './RankingStack';
import { PublishStack } from './PublishStack';
import { MessagesStack } from './MessagesStack';
import { ProfileStack } from './ProfileStack';
import type { MainTabParamList } from './types';
import { MainTabBar } from '../components/navigation/MainTabBar';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MainTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="CommunityTab" component={CommunityStack} />
      <Tab.Screen name="RankingTab" component={RankingStack} />
      <Tab.Screen name="PublishTab" component={PublishStack} />
      <Tab.Screen name="MessagesTab" component={MessagesStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}
