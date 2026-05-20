import type { Post } from '../../api/types';
import { japanCommunityPosts } from '../../data/japan-community';
import { mapJapanPostToPost } from '../../data/postMapper';

export type ProfileContentTab =
  | 'posts'
  | 'favorites'
  | 'reviews'
  | 'treeholes'
  | 'resources';

export function getProfileContentByTab(tab: ProfileContentTab): Post[] {
  let slice: typeof japanCommunityPosts;
  switch (tab) {
    case 'posts':
      slice = japanCommunityPosts.slice(0, 8);
      break;
    case 'favorites':
      slice = japanCommunityPosts.slice(1, 9);
      break;
    case 'reviews':
      slice = japanCommunityPosts.filter(p => p.rating || p.helpful).slice(0, 6);
      break;
    case 'treeholes':
      slice = japanCommunityPosts.slice(3, 8);
      break;
    case 'resources':
      slice = japanCommunityPosts
        .filter(
          p =>
            p.tags.some(t => t.includes('资料') || t.includes('指南') || t.includes('办卡')),
        )
        .slice(0, 5);
      if (slice.length === 0) slice = japanCommunityPosts.slice(5, 10);
      break;
    default:
      slice = japanCommunityPosts.slice(0, 8);
  }
  return slice.map(mapJapanPostToPost);
}
