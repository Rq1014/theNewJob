import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  AuthWelcome: undefined;
  OtpLogin: { channel?: 'email' | 'phone' };
  LegalDocument: { doc: 'terms' | 'privacy' };
  ProfileSetup: undefined;
};

export type CommunityStackParamList = {
  CommunityHome: undefined;
  PostDetail: { postId: string };
  Search: undefined;
  UserProfile: { userId: string };
  TagFeed: { tag: string };
};

export type PublishStackParamList = {
  PublishHome: undefined;
  SelectPostType: undefined;
  SelectTreehole: undefined;
  PublishCompose: {
    publishType: 'post' | 'treehole';
    postTypeId?: string;
    postTypeLabel?: string;
    treeholeId?: string;
    treeholeName?: string;
    treeholeIcon?: string;
    draftId?: string;
  };
  Drafts: undefined;
  PublishRules: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

export type RankingStackParamList = {
  RankingHome: undefined;
  InstitutionDetail: { institutionId: string };
  PastExamLibrary: undefined;
  PastExamDetail: { examId: string };
};

export type MessagesStackParamList = {
  MessagesHome: undefined;
  Chat: { conversationId: string };
};

export type MainTabParamList = {
  CommunityTab: NavigatorScreenParams<CommunityStackParamList>;
  RankingTab: NavigatorScreenParams<RankingStackParamList>;
  PublishTab: NavigatorScreenParams<PublishStackParamList>;
  MessagesTab: NavigatorScreenParams<MessagesStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};
