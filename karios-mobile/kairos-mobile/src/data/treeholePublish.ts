import { JOINED_TREEHOLE_IDS } from './publishConstants';
import { bigTreeholes, smallTreeholes, type BigTreehole, type SmallTreehole } from './treehole';

export function getJoinedBigTreeholes(): BigTreehole[] {
  return bigTreeholes.filter(th => JOINED_TREEHOLE_IDS.includes(th.id));
}

export function getJoinedSmallTreeholes(): SmallTreehole[] {
  return smallTreeholes.filter(th => JOINED_TREEHOLE_IDS.includes(th.id));
}

export function getSmallTreeholeIcon(treehole: SmallTreehole): string {
  return treehole.mode === 'confession' ? '💭' : '🤝';
}

export function getBigTreeholeCategoryLabel(type: BigTreehole['type']): string {
  return type === 'school' ? '学校树洞' : '地区树洞';
}

export function getSmallTreeholeTags(treehole: SmallTreehole): string[] {
  const tags: string[] = [];
  if (treehole.isAnonymous) tags.push('匿名');
  if (treehole.mode === 'confession') tags.push('倾诉');
  else if (treehole.mode === 'social') tags.push('搭子');
  if (treehole.validUntil === '长期有效') tags.push('长期有效');
  return tags;
}
