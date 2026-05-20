import type { FeedChannel } from '../../api/types';
import {
  communityTags,
  tagKeywords,
  type CommunityTag,
} from '../../data/communityConstants';
import type { JapanCommunityPost } from '../../data/japan-community';
import { japanCommunityPosts } from '../../data/japan-community';
import { hotDiscussionsJapan } from '../../data/japan-community';

function matchPostToTag(post: JapanCommunityPost, tag: CommunityTag): boolean {
  const keywords = tagKeywords[tag.id] || [tag.label];
  const matchInTags = post.tags.some(postTag =>
    keywords.some(keyword => postTag.includes(keyword)),
  );
  const matchInTitle = keywords.some(keyword => post.title.includes(keyword));
  const matchInSummary = keywords.some(keyword => post.summary?.includes(keyword));
  const matchInCategory =
    (tag.category === 'career' && post.domain === 'career') ||
    (tag.category === 'life' &&
      (post.domain === 'life' ||
        post.category === 'housing' ||
        post.category === 'food' ||
        post.category === 'medical' ||
        post.category === 'finance')) ||
    (tag.category === 'campus' &&
      (post.category === 'guide' ||
        post.tags.some(t => t.includes('学校') || t.includes('大学') || t.includes('留学'))));

  return matchInTags || matchInTitle || matchInSummary || matchInCategory;
}

export function calculatePostScore(post: JapanCommunityPost, selectedTags: string[]): number {
  if (selectedTags.length === 0) return 0;

  let matchedTagsCount = 0;
  let totalMatchStrength = 0;

  selectedTags.forEach(tagId => {
    const tag = communityTags.find(t => t.id === tagId);
    if (!tag) return;

    const keywords = tagKeywords[tagId] || [tag.label];
    let tagMatchStrength = 0;

    if (post.tags.some(postTag => keywords.some(k => postTag.includes(k)))) {
      tagMatchStrength += 3;
    }
    if (keywords.some(k => post.title.includes(k))) tagMatchStrength += 2;
    if (
      (tag.category === 'career' && post.domain === 'career') ||
      (tag.category === 'life' && post.domain === 'life') ||
      (tag.category === 'campus' && post.domain === 'life')
    ) {
      tagMatchStrength += 1;
    }

    if (tagMatchStrength > 0) {
      matchedTagsCount++;
      totalMatchStrength += tagMatchStrength;
    }
  });

  const tagScore = matchedTagsCount * 1000 + totalMatchStrength * 100;
  const engagementScore =
    post.likes + post.comments * 2 + post.bookmarks * 1.5 + post.views / 10;
  const timeBoost =
    post.timestamp.includes('分钟') ||
    post.timestamp.includes('刚刚') ||
    post.timestamp.includes('小时')
      ? 50
      : 0;
  const featuredBoost = post.featured ? 100 : 0;

  return tagScore + engagementScore + timeBoost + featuredBoost;
}

export function filterCommunityPosts(
  channel: FeedChannel,
  selectedTags: string[],
): JapanCommunityPost[] {
  const posts = japanCommunityPosts.filter(post => {
    if (channel === 'follow') return true;
    if (channel === 'local') return post.city !== undefined;
    if (channel === 'discover') {
      if (selectedTags.length === 0) return true;
      return selectedTags.some(tagId => {
        const tag = communityTags.find(t => t.id === tagId);
        return tag ? matchPostToTag(post, tag) : false;
      });
    }
    return true;
  });

  if (channel === 'discover' && selectedTags.length > 0 && posts.length === 0) {
    const selectedTag = communityTags.find(t => t.id === selectedTags[0]);
    if (selectedTag) {
      return japanCommunityPosts
        .filter(post => {
          if (selectedTag.category === 'career') return post.domain === 'career';
          if (selectedTag.category === 'life') return post.domain === 'life';
          if (selectedTag.category === 'campus') {
            return (
              post.tags.some(t => t.includes('学校') || t.includes('大学')) ||
              post.author.university !== undefined
            );
          }
          return true;
        })
        .slice(0, 10);
    }
  }

  if (channel === 'discover' && selectedTags.length > 0) {
    return [...posts].sort(
      (a, b) => calculatePostScore(b, selectedTags) - calculatePostScore(a, selectedTags),
    );
  }

  return posts;
}

export function filterHotDiscussions(selectedTags: string[]) {
  if (selectedTags.length === 0) return hotDiscussionsJapan.slice(0, 3);

  const matched = hotDiscussionsJapan.filter(topic =>
    selectedTags.some(tagId => {
      const tag = communityTags.find(t => t.id === tagId);
      if (!tag) return false;
      const keywords = tagKeywords[tagId] || [tag.label];
      const matchInTitle = keywords.some(keyword => topic.title.includes(keyword));
      const matchInCategory =
        (tag.category === 'career' && topic.domain === 'career') ||
        (tag.category === 'life' && topic.domain === 'life') ||
        (tag.category === 'campus' && topic.domain === 'life');
      return matchInTitle || matchInCategory;
    }),
  );

  if (matched.length === 0) {
    const selectedTag = communityTags.find(t => t.id === selectedTags[0]);
    if (selectedTag) {
      return hotDiscussionsJapan
        .filter(topic => {
          if (selectedTag.category === 'career') return topic.domain === 'career';
          if (selectedTag.category === 'life') return topic.domain === 'life';
          return topic.domain === 'life';
        })
        .slice(0, 3);
    }
  }

  return matched.length > 0 ? matched.slice(0, 3) : hotDiscussionsJapan.slice(0, 3);
}

export function getFeedSectionTitle(channel: FeedChannel): string {
  if (channel === 'follow') return '你关注的内容';
  if (channel === 'local') return '同城动态';
  return '为你推荐';
}
