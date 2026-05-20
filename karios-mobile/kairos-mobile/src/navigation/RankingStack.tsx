import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RankingHomeScreen } from '../features/ranking/RankingHomeScreen';
import { InstitutionDetailScreen } from '../features/ranking/InstitutionDetailScreen';
import { PastExamLibraryScreen } from '../features/ranking/PastExamLibraryScreen';
import { PastExamDetailScreen } from '../features/ranking/PastExamDetailScreen';
import type { RankingStackParamList } from './types';

const Stack = createNativeStackNavigator<RankingStackParamList>();

export function RankingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RankingHome" component={RankingHomeScreen} />
      <Stack.Screen name="InstitutionDetail" component={InstitutionDetailScreen} />
      <Stack.Screen name="PastExamLibrary" component={PastExamLibraryScreen} />
      <Stack.Screen name="PastExamDetail" component={PastExamDetailScreen} />
    </Stack.Navigator>
  );
}
