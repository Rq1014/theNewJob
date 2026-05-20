import type { Post } from '../api/types';
import type { JapanCommunityPost } from './japan-community';

export function mapJapanPostToPost(j: JapanCommunityPost): Post {
  return {
    id: j.id,
    domain: j.domain,
    category: j.category,
    city: j.city,
    title: j.title,
    summary: j.summary,
    content: j.content,
    author: {
      id: j.author.id,
      name: j.author.name,
      avatar: j.author.avatar,
      university: j.author.university,
      verified: j.author.verified,
      badges: j.author.badges,
    },
    timestamp: j.timestamp,
    likes: j.likes,
    comments: j.comments,
    bookmarks: j.bookmarks,
    views: j.views,
    tags: j.tags,
    featured: j.featured,
    images: j.images,
    company: j.company,
    position: j.position,
    rating: j.rating,
    helpful: j.helpful,
  };
}
