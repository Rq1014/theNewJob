import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CommunityStackParamList,
  MainTabParamList,
  ProfileStackParamList,
  PublishStackParamList,
} from './types';

export type ProfileHomeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList, 'ProfileHome'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type PublishComposeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PublishStackParamList, 'PublishCompose'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type PublishStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PublishStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type CommunityHomeNavigationProp = NativeStackNavigationProp<
  CommunityStackParamList,
  'CommunityHome'
>;
