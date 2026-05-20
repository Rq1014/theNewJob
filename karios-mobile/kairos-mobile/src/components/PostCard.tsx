import React from 'react';
import type { Post } from '../api/types';
import { JapanPostRow } from './community/JapanPostRow';

interface PostCardProps {
  post: Post;
  onPress: () => void;
  onUserPress?: () => void;
}

/** @deprecated Prefer JapanPostRow in community screens */
export function PostCard({ post, onPress, onUserPress }: PostCardProps) {
  return <JapanPostRow post={post} onPress={onPress} onUserPress={onUserPress} />;
}
