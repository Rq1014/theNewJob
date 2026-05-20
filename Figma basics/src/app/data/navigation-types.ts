// 导航视图类型定义
export type ViewType =
  | "home" // 首页
  | "search" // 搜索页
  | "channel" // 频道页
  | "function-home" // 功能主页
  | "hot-topics" // 热议榜单
  | "post-detail" // 帖子详情
  | "tag-page" // 标签聚合页
  | "user-profile" // 用户主页
  | "school-page" // 学校聚合页
  | "company-detail" // 公司详情页
  | "hospital-detail" // 医院详情页
  | "restaurant-detail" // 餐厅详情页
  | "publish" // 发布页
  | "ranking" // 榜单页
  | "partner" // 找对象页
  | "profile"; // 我的页面

export type ChannelType = "interview" | "offer" | "question" | "life";

export type FunctionType =
  | "interview-exp"
  | "offer-exp"
  | "career-qa"
  | "life-guide"
  | "housing"
  | "medical"
  | "food"
  | "city-guide";

export type PublishType =
  | "interview" // 分享面经
  | "offer" // 发布内定
  | "question" // 提问求助
  | "life" // 生活分享
  | "housing" // 租房分享
  | "medical" // 医院推荐
  | "food"; // 美食推荐

export interface NavigationState {
  view: ViewType;
  postId?: string;
  channelType?: ChannelType;
  functionType?: FunctionType;
  tagId?: string;
  userId?: string;
  schoolId?: string;
  companyId?: string;
  hospitalId?: string;
  restaurantId?: string;
  publishType?: PublishType;
}
