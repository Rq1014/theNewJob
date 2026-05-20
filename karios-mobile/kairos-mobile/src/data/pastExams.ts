export interface PastExamResource {
  id: string;
  school: string;
  major: string;
  year: number;
  examType: string;
  hasAnswers: boolean;
  hasSolutions: boolean;
  downloads: number;
  favorites: number;
  discussions?: number;
  verified: boolean;
  updateDate: string;
  tags: string[];
}

export const mockPastExams: PastExamResource[] = [
  {
    id: '1',
    school: '东京大学',
    major: '情报理工学',
    year: 2024,
    examType: '院试笔试',
    hasAnswers: true,
    hasSolutions: true,
    downloads: 1234,
    favorites: 567,
    discussions: 42,
    verified: true,
    updateDate: '2024-03-15',
    tags: ['数学', '算法', '含解析'],
  },
  {
    id: '2',
    school: '早稻田大学',
    major: '经济学研究科',
    year: 2024,
    examType: '院试笔试',
    hasAnswers: true,
    hasSolutions: false,
    downloads: 892,
    favorites: 423,
    discussions: 28,
    verified: true,
    updateDate: '2024-02-20',
    tags: ['经济学', '统计学'],
  },
  {
    id: '3',
    school: '京都大学',
    major: '工学研究科',
    year: 2023,
    examType: '面试题',
    hasAnswers: false,
    hasSolutions: true,
    downloads: 678,
    favorites: 312,
    discussions: 15,
    verified: true,
    updateDate: '2023-11-08',
    tags: ['面试经验', '研究计划'],
  },
  {
    id: '4',
    school: 'EJU',
    major: '理科综合',
    year: 2024,
    examType: 'EJU',
    hasAnswers: true,
    hasSolutions: true,
    downloads: 2341,
    favorites: 891,
    discussions: 67,
    verified: true,
    updateDate: '2024-06-25',
    tags: ['物理', '化学', '生物'],
  },
  {
    id: '5',
    school: 'JLPT',
    major: 'N1',
    year: 2024,
    examType: 'JLPT',
    hasAnswers: true,
    hasSolutions: true,
    downloads: 3456,
    favorites: 1234,
    discussions: 89,
    verified: true,
    updateDate: '2024-07-10',
    tags: ['词汇', '语法', '阅读'],
  },
];

export function getPastExamById(id: string): PastExamResource | undefined {
  return mockPastExams.find(e => e.id === id);
}
