import type { InstitutionType, Review } from './institutions';

export const mockReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: '考上东大的学生',
    userAvatar: 'K',
    university: '东京大学',
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          '在名门上了半年课，老师非常负责，成功合格东大经济学部！一对一教学进度完全跟着我的情况走，面试辅导环节押题很准。',
        scores: {
          teaching: 5,
          faculty: 5,
          results: 5,
          curriculum: 5,
          feedback: 5,
          value: 4,
        },
        createdAt: '2026-03-15',
      },
    ],
    institutionId: 't1',
    institutionType: 'tutoring',
    likes: 45,
    helpfulCount: 38,
    createdAt: '2026-03-15',
    updatedAt: '2026-03-15',
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: '备考中',
    userAvatar: 'M',
    university: '早稻田大学',
    isVerified: false,
    isTransacted: false,
    contactStage: 'trial',
    abandonReasons: ['price_high'],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content: '试听了一节课，老师讲得不错，但价格偏高，还在对比其他私塾。',
        scores: {
          teaching: 4,
          faculty: 4,
          results: 4,
          curriculum: 4,
          feedback: 3,
          value: 3,
        },
        createdAt: '2026-02-10',
      },
    ],
    institutionId: 't1',
    institutionType: 'tutoring',
    likes: 12,
    helpfulCount: 8,
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: '语言学校毕业生',
    userAvatar: 'F',
    university: '一桥大学',
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content: '富士日本语学校签证很稳，升学辅导也很到位，顺利考入一桥。',
        scores: {
          teaching: 5,
          attendance: 4,
          advancement: 5,
          lifeSupport: 5,
          environment: 5,
          value: 4,
        },
        createdAt: '2025-11-20',
      },
    ],
    institutionId: 'l1',
    institutionType: 'language',
    likes: 28,
    helpfulCount: 22,
    createdAt: '2025-11-20',
    updatedAt: '2025-11-20',
  },
  {
    id: 'r4',
    userId: 'u4',
    userName: '留学申请者',
    userAvatar: 'S',
    university: '京都大学',
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content: '樱花留学中介很专业，流程透明，从选校到签证一条龙服务，顺利拿到京大offer。',
        scores: {
          expertise: 5,
          matching: 5,
          communication: 4,
          transparency: 5,
          efficiency: 5,
          afterSales: 5,
        },
        createdAt: '2025-10-05',
      },
    ],
    institutionId: 'a1',
    institutionType: 'agency',
    likes: 35,
    helpfulCount: 30,
    createdAt: '2025-10-05',
    updatedAt: '2025-10-05',
  },
];

export function getReviewsByInstitution(institutionId: string): Review[] {
  return mockReviews.filter(r => r.institutionId === institutionId);
}

export type ReviewFilter = 'all' | 'regular' | 'certified' | 'latest' | 'helpful';

export function filterReviews(reviews: Review[], filter: ReviewFilter): Review[] {
  switch (filter) {
    case 'regular':
      return reviews.filter(r => !r.isTransacted);
    case 'certified':
      return reviews.filter(r => r.isTransacted);
    case 'latest':
      return [...reviews].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    case 'helpful':
      return [...reviews].sort((a, b) => b.helpfulCount - a.helpfulCount);
    default:
      return reviews;
  }
}

export function getReviewAvgScore(review: Review): number {
  const v = review.versions.find(x => x.version === review.currentVersion);
  if (!v) return 0;
  const scores = Object.values(v.scores);
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}
