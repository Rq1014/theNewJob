export interface Post {
  id: string;
  image: {
    color: string;
    emoji: string;
    aspectRatio: number;
  };
  categoryTag: string;
  categoryColor: string;
  title: string;
  tags: string[];
  category: string;
  author: {
    name: string;
    avatar: string;
    university: string;
    isVerified: boolean;
  };
  likes: number;
  content: string;
  location: string;
  images: { color: string; emoji: string }[];
  audienceTag?: string;
  verificationBadge?: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    university: string;
    isVerified: boolean;
    isOP: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
}

export const postComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1-1",
      author: {
        name: "即将入学",
        avatar: "J",
        university: "东京大学",
        isVerified: true,
        isOP: false,
      },
      content: "太及时了！请问区役所办理国民健康保险需要带什么材料？在留卡和护照够吗？",
      timestamp: "2小时前",
      likes: 8,
    },
    {
      id: "c1-2",
      author: {
        name: "小明",
        avatar: "M",
        university: "东京工业大学",
        isVerified: true,
        isOP: true,
      },
      content: "在留卡和护照就够了，记得带印章！办理当天就能拿到保险证。建议一到日本第一周就去办，之后去医院看病能报销70%。",
      timestamp: "1.5小时前",
      likes: 12,
    },
    {
      id: "c1-3",
      author: {
        name: "阿华",
        avatar: "H",
        university: "早稻田大学",
        isVerified: true,
        isOP: false,
      },
      content: "补充：银行开户现在很多银行都要预约了，我上次去三菱UFJ没预约被拒了。建议用学校推荐的银行会比较快。",
      timestamp: "45分钟前",
      likes: 15,
    },
  ],
  "2": [
    {
      id: "c2-1",
      author: {
        name: "摄影爱好者",
        avatar: "S",
        university: "庆应义塾大学",
        isVerified: true,
        isOP: false,
      },
      content: "上野公园我去过！确实7-8点人少，但是光线有点背光。建议下午4-5点去，斜射光拍人像最美！",
      timestamp: "3小时前",
      likes: 6,
    },
    {
      id: "c2-2",
      author: {
        name: "阿华",
        avatar: "H",
        university: "早稻田大学",
        isVerified: true,
        isOP: true,
      },
      content: "谢谢建议！我主要是想避开人群，早上确实人少很多。下午拍照的话要提前占位，周末人太多了😂",
      timestamp: "2小时前",
      likes: 4,
    },
    {
      id: "c2-3",
      author: {
        name: "小红",
        avatar: "H",
        university: "上智大学",
        isVerified: false,
        isOP: false,
      },
      content: "请问不忍池那边可以带野餐垫吗？想周末去坐坐",
      timestamp: "1小时前",
      likes: 2,
    },
  ],
  "3": [
    {
      id: "c3-1",
      author: {
        name: "求职中",
        avatar: "Q",
        university: "东京大学",
        isVerified: true,
        isOP: false,
      },
      content: "恭喜内定！想问下索尼的技术面算法题难度大概什么水平？Leetcode medium够吗？",
      timestamp: "4小时前",
      likes: 18,
    },
    {
      id: "c3-2",
      author: {
        name: "李华",
        avatar: "L",
        university: "京都大学",
        isVerified: true,
        isOP: true,
      },
      content: "Medium够了！我面的那道是经典的LRU Cache，主要考察数据结构的理解。建议把常见的medium题型都刷一遍，特别是链表、树、哈希表相关的。",
      timestamp: "3小时前",
      likes: 25,
    },
    {
      id: "c3-3",
      author: {
        name: "CS菜鸡",
        avatar: "C",
        university: "筑波大学",
        isVerified: true,
        isOP: false,
      },
      content: "日语技术面试太难了...请问楼主有推荐的日语技术词汇资料吗？",
      timestamp: "2小时前",
      likes: 9,
    },
  ],
  "4": [
    {
      id: "c4-1",
      author: {
        name: "找房中",
        avatar: "Z",
        university: "明治大学",
        isVerified: false,
        isOP: false,
      },
      content: "我也踩过坑！想问下礼金是可以谈的吗？看到有些房源写着礼金2个月，太贵了...",
      timestamp: "5小时前",
      likes: 11,
    },
    {
      id: "c4-2",
      author: {
        name: "小红",
        avatar: "H",
        university: "一桥大学",
        isVerified: true,
        isOP: true,
      },
      content: "礼金理论上可以谈，但热门房源基本谈不下来。建议找礼金0或0.5的房源，现在很多新建公寓都是礼金0敷金1的条件。",
      timestamp: "4小时前",
      likes: 16,
    },
    {
      id: "c4-3",
      author: {
        name: "老留学生",
        avatar: "L",
        university: "东京大学",
        isVerified: true,
        isOP: false,
      },
      content: "补充：退房的时候一定要拍照留证！我之前退房被扣了5万日元清洁费，明明墙上的划痕是入住前就有的...",
      timestamp: "3小时前",
      likes: 23,
    },
  ],
  "5": [
    {
      id: "c5-1",
      author: {
        name: "吃货",
        avatar: "C",
        university: "早稻田大学",
        isVerified: true,
        isOP: false,
      },
      content: "一兰拉面新宿东口那家我去过！但是24小时那家好像搬了？现在还在吗？",
      timestamp: "6小时前",
      likes: 5,
    },
    {
      id: "c5-2",
      author: {
        name: "王芳",
        avatar: "W",
        university: "庆应义塾大学",
        isVerified: true,
        isOP: true,
      },
      content: "还在的！就在中央东口出来走2分钟，蓝色招牌很好认。周末晚上要排队，建议平日去。",
      timestamp: "5小时前",
      likes: 7,
    },
    {
      id: "c5-3",
      author: {
        name: "省钱达人",
        avatar: "S",
        university: "明治大学",
        isVerified: false,
        isOP: false,
      },
      content: "松屋500日元真的绝！我每次都点牛カルビ定食，米饭免费续，学生党福音！",
      timestamp: "4小时前",
      likes: 12,
    },
  ],
  "6": [
    {
      id: "c6-1",
      author: {
        name: "熬夜选手",
        avatar: "A",
        university: "早稻田大学",
        isVerified: true,
        isOP: false,
      },
      content: "理工图书馆地下那个自习室我常去！但是期末的时候真的要抢位置，建议早点去。",
      timestamp: "7小时前",
      likes: 14,
    },
    {
      id: "c6-2",
      author: {
        name: "张三",
        avatar: "Z",
        university: "早稻田大学",
        isVerified: true,
        isOP: true,
      },
      content: "对，期末真的很挤！我一般会提前把东西放在位置上，然后去吃饭。记得带学生证，晚上10点后进出都要刷卡。",
      timestamp: "6小时前",
      likes: 10,
    },
    {
      id: "c6-3",
      author: {
        name: "新生求助",
        avatar: "X",
        university: "早稻田大学",
        isVerified: false,
        isOP: false,
      },
      content: "请问可以在自习室吃东西吗？我想带点零食...",
      timestamp: "5小时前",
      likes: 3,
    },
  ],
  "7": [
    {
      id: "c7-1",
      author: {
        name: "N2备考中",
        avatar: "N",
        university: "大阪大学",
        isVerified: true,
        isOP: false,
      },
      content: "3个月太厉害了！我现在N2准备了半年还没信心...请问楼主每天学习多久？",
      timestamp: "8小时前",
      likes: 19,
    },
    {
      id: "c7-2",
      author: {
        name: "小李",
        avatar: "L",
        university: "大阪大学",
        isVerified: true,
        isOP: true,
      },
      content: "我每天大概学3-4小时，主要是早上背单词1小时，晚上做题2小时，睡前练听力1小时。关键是要每天坚持，不能断！",
      timestamp: "7小时前",
      likes: 28,
    },
    {
      id: "c7-3",
      author: {
        name: "日语苦手",
        avatar: "R",
        university: "京都大学",
        isVerified: true,
        isOP: false,
      },
      content: "听力推荐NHK新闻！我用NHK News Web Easy，有假名标注，适合N2-N1水平。",
      timestamp: "6小时前",
      likes: 15,
    },
  ],
  "8": [
    {
      id: "c8-1",
      author: {
        name: "户外爱好者",
        avatar: "H",
        university: "东京大学",
        isVerified: true,
        isOP: false,
      },
      content: "高尾山我上周刚去！缆车单程600日元，往返1000日元。建议买往返，下山的时候腿会很酸😅",
      timestamp: "9小时前",
      likes: 8,
    },
    {
      id: "c8-2",
      author: {
        name: "阿强",
        avatar: "Q",
        university: "东京大学",
        isVerified: true,
        isOP: true,
      },
      content: "对！我第一次去就是爬上去坐缆车下来的。现在体力好了可以往返都爬，大概2小时来回。",
      timestamp: "8小时前",
      likes: 6,
    },
    {
      id: "c8-3",
      author: {
        name: "登山新手",
        avatar: "D",
        university: "一桥大学",
        isVerified: false,
        isOP: false,
      },
      content: "请问筑波山难度大吗？我完全没有登山经验，能爬吗？",
      timestamp: "7小时前",
      likes: 4,
    },
  ],
};

export const mockPosts: Post[] = [
  // 推荐 - 入学流程类
  {
    id: "1",
    image: { color: "#EBF5FF", emoji: "📋", aspectRatio: 1 },
    categoryTag: "新生攻略",
    categoryColor: "bg-blue-500",
    title: "东工大入学手续完整流程，附避坑清单",
    tags: ["入学手续", "区役所"],
    category: "推荐",
    author: {
      name: "小明",
      avatar: "M",
      university: "东京工业大学",
      isVerified: true,
    },
    likes: 234,
    content:
      "刚刚完成了东工大的入学手续，整理了一份详细的流程清单分享给大家...\n\n📌 第一步：区役所办理（抵日后14天内）\n1. 住民登录（带在留卡+护照+印章）\n2. 国民健康保险加入（当场拿保险证）\n3. 银行开户预约（推荐学校合作的瑞穗银行）\n\n📌 第二步：学校手续（开学前一周）\n1. 学生证领取\n2. 通学证明申请\n3. 图书馆卡办理\n\n📌 第三步：生活类\n1. 手机卡（推荐Rakuten Mobile，便宜且有积分）\n2. 银行卡（瑞穗/三菱UFJ/邮储都可以）\n\n⚠️ 特别注意的坑：\n- 银行开户一定要预约！walk-in基本会被拒\n- 国民健康保险当天就办，不然看病超贵\n- 印章提前准备好，日本很多地方要用",
    location: "东京·目黑区",
    images: [
      { color: "#EBF5FF", emoji: "📋" },
      { color: "#FEF3C7", emoji: "🏛️" },
      { color: "#D1FAE5", emoji: "✅" },
    ],
    audienceTag: "新生",
    verificationBadge: "2026最新",
  },

  // 推荐 - 租房类
  {
    id: "4",
    image: { color: "#FFF7ED", emoji: "🏠", aspectRatio: 1.2 },
    categoryTag: "租房攻略",
    categoryColor: "bg-orange-500",
    title: "东京租房避坑指南，礼金敷金全解析",
    tags: ["租房", "初期费用"],
    category: "推荐",
    author: {
      name: "小红",
      avatar: "H",
      university: "一桥大学",
      isVerified: true,
    },
    likes: 567,
    content:
      "租房踩了太多坑，总结一份完整攻略！\n\n💰 初期费用构成：\n- 敷金（押金）：通常1个月，退房时返还\n- 礼金（给房东的钱）：0-2个月，不退\n- 仲介手数料（中介费）：0.5-1个月\n- 首月房租：按日计算\n- 火灾保险：1-2万日元/年\n- 保证会社：房租的30-50%/年\n\n⚠️ 避坑Tips：\n1. 优先找「礼金0」「敷金1」的房源\n2. 大手中介相对靠谱（エイブル、アパマンショップ）\n3. 退房前一定要拍照留证，记录所有划痕\n4. 合同里的「原状回復」条款要仔细看\n5. 保证会社推荐日本セーフティー，通过率高\n\n❌ 这些中介要避开：\n- XX不动产：退房时乱扣钱\n- △△房屋：房源照片严重P图\n- ○○中介：合同有猫腻，服务态度差",
    location: "东京·新宿区",
    images: [
      { color: "#FFF7ED", emoji: "🏠" },
      { color: "#FEE2E2", emoji: "⚠️" },
    ],
    audienceTag: "新生",
    verificationBadge: "亲测",
  },

  // 推荐 - 手机卡类
  {
    id: "9",
    image: { color: "#F0FDF4", emoji: "📱", aspectRatio: 0.9 },
    categoryTag: "生活必备",
    categoryColor: "bg-green-500",
    title: "日本手机卡选购攻略，留学生性价比方案",
    tags: ["手机卡", "通信"],
    category: "推荐",
    author: {
      name: "数码达人",
      avatar: "S",
      university: "东京大学",
      isVerified: true,
    },
    likes: 445,
    content:
      "用过5家运营商，总结最适合留学生的方案！\n\n🏆 最推荐：Rakuten Mobile\n- 月费：0-3GB免费，3-20GB 1980円，20GB+ 2980円\n- 优点：便宜、有积分回馈、可以申请信用卡\n- 缺点：地下和偏远地区信号差\n\n💡 备选方案：\n1. ahamo（docomo子品牌）\n  - 20GB 2970円，信号好\n  - 适合常去郊外的同学\n\n2. povo 2.0（au）\n  - 基础费0円，流量按需购买\n  - 适合用量不稳定的\n\n3. 日本通信（格安SIM）\n  - 10GB 1390円，最便宜\n  - 但客服差，不推荐新手\n\n📌 办理注意：\n- 需要在留卡+银行卡/信用卡\n- 实名认证eKYC可以线上完成\n- 不要在机场办！贵且套餐差",
    location: "全日本适用",
    images: [
      { color: "#F0FDF4", emoji: "📱" },
      { color: "#DBEAFE", emoji: "💳" },
    ],
    audienceTag: "新生",
    verificationBadge: "2026更新",
  },

  // 推荐 - 奖学金类
  {
    id: "10",
    image: { color: "#FEF3C7", emoji: "💴", aspectRatio: 1.1 },
    categoryTag: "奖学金",
    categoryColor: "bg-yellow-500",
    title: "私费留学生可申请的奖学金汇总（2026版）",
    tags: ["奖学金", "经济支援"],
    category: "推荐",
    author: {
      name: "奖学金猎人",
      avatar: "J",
      university: "东京大学",
      isVerified: true,
    },
    likes: 789,
    content:
      "整理了所有私费留学生能申请的奖学金！\n\n💰 高额奖学金（月10万以上）：\n1. 文部科学省国费奖学金（私费转国费）\n  - 修士14.5万/月，博士14.5万/月\n  - 难度：⭐⭐⭐⭐⭐\n\n2. 平和中島財団\n  - 10万/月，一次性支援\n  - 要求GPA3.5+，需要推荐信\n\n3. ロータリー米山記念奨学金\n  - 修士14万/月，博士14万/月\n  - 需要Rotary Club推荐\n\n💡 容易申请的（月5-8万）：\n1. JASSO学習奨励費\n  - 4.8万/月，学校推荐制\n  - 每学期可以申请\n\n2. 共立国際交流奨学財団\n  - 6万/月或10万/月\n  - 重视研究计划\n\n📌 申请Tips：\n- 研究计划书是关键！\n- GPA至少要3.0以上\n- 早申请早拿钱",
    location: "全日本适用",
    images: [{ color: "#FEF3C7", emoji: "💴" }],
    audienceTag: "修士/博士",
    verificationBadge: "2026最新",
  },

  // 同城 - 池袋
  {
    id: "11",
    image: { color: "#F3E8FF", emoji: "🍜", aspectRatio: 1 },
    categoryTag: "探店",
    categoryColor: "bg-purple-500",
    title: "池袋中华料理TOP5，人均1500円吃到撑",
    tags: ["中华料理", "池袋"],
    category: "同城",
    author: {
      name: "美食家",
      avatar: "M",
      university: "立教大学",
      isVerified: true,
    },
    likes: 623,
    content:
      "池袋中华街不输横滨！推荐5家必吃：\n\n🥟 1. 餃子の王将 池袋東口店\n- 地址：池袋駅东口步行3分\n- 推荐：餃子定食 690円\n- 特点：24小时营业，深夜食堂\n\n🍜 2. 天下一品 池袋本店\n- 地址：池袋駅西口步行5分\n- 推荐：こってりラーメン 850円\n- 特点：浓厚汤底，加面免费\n\n🥘 3. 小肥羊火锅\n- 地址：池袋駅北口步行7分\n- 人均：1800円（午餐便宜）\n- 特点：最正宗的中式火锅\n\n🍱 4. 桂林米粉\n- 地址：池袋西一番街\n- 推荐：桂林米粉 980円\n- 特点：老板是中国人，口味很正\n\n🥢 5. 陈麻婆豆腐\n- 地址：東武百貨店12F\n- 推荐：麻婆豆腐定食 1200円\n- 特点：够麻够辣\n\n💡 省钱Tips：平日午餐都有特价套餐！",
    location: "东京·池袋",
    images: [
      { color: "#F3E8FF", emoji: "🍜" },
      { color: "#FEE2E2", emoji: "🔥" },
    ],
    audienceTag: "全体",
    verificationBadge: "亲测",
  },

  // 同城 - 新宿二手交易
  {
    id: "12",
    image: { color: "#E0F2FE", emoji: "📦", aspectRatio: 1.2 },
    categoryTag: "二手交易",
    categoryColor: "bg-sky-500",
    title: "新宿回国甩卖：自行车/家电/家具，全部半价",
    tags: ["二手", "回国甩卖"],
    category: "同城",
    author: {
      name: "即将归国",
      avatar: "G",
      university: "早稻田大学",
      isVerified: true,
    },
    likes: 234,
    content:
      "6月回国，新宿自取！全部半价处理：\n\n🚲 自行车（变速）\n- 原价：2万円\n- 现价：8000円\n- 状态：9成新，刚换新轮胎\n- 自取地点：西早稻田駅步行5分\n\n📺 电视（32寸）\n- 原价：3.5万円\n- 现价：1.5万円\n- 品牌：SHARP\n- 配遥控器+HDMI线\n\n🪑 电脑椅\n- 原价：1.5万円\n- 现价：5000円\n- 品牌：ニトリ\n- 可调节高度，腰部支撑\n\n❄️ 小冰箱\n- 原价：2万円\n- 现价：8000円\n- 容量：100L，一人住够用\n\n📚 教材书籍\n- 工科教材若干\n- 日语参考书（N1-N3）\n- 全部500円/本\n\n📍 自取地点：新宿区西早稻田\n⏰ 可约时间：周末下午\n💬 微信：xxxxx（站内私信）",
    location: "东京·新宿区",
    images: [{ color: "#E0F2FE", emoji: "📦" }],
    audienceTag: "全体",
    verificationBadge: "东京适用",
  },

  // 同城 - 本乡打印
  {
    id: "13",
    image: { color: "#FEF3C7", emoji: "🖨️", aspectRatio: 0.9 },
    categoryTag: "打印",
    categoryColor: "bg-amber-500",
    title: "本乡三丁目24小时打印店，论文打印装订全攻略",
    tags: ["打印", "本乡"],
    category: "同城",
    author: {
      name: "论文苦手",
      avatar: "L",
      university: "东京大学",
      isVerified: true,
    },
    likes: 445,
    content:
      "东大周边打印店完全指南！\n\n🏆 最推荐：キンコーズ本郷店\n- 地址：本郷三丁目駅出口1分钟\n- 营业：24小时！\n- 价格：\n  · 黑白 10円/张\n  · 彩色 50円/张\n  · 装订 200-500円\n- 优点：可以自助操作，有Mac可用\n- 设备：高速复印机、彩色打印机、扫描仪\n\n📍 备选方案：\n1. セブンイレブン本郷店\n  - 地址：本郷三丁目駅步行3分\n  - 价格：黑白10円，彩色50円\n  - 优点：24小时，用网络打印app很方便\n  - 缺点：不能装订\n\n2. 東大生協\n  - 地址：赤門旁边\n  - 价格：黑白5円！\n  - 缺点：只有平日营业，需要学生证\n\n💡 省钱Tips：\n- 大量打印去生协最便宜\n- 急需半夜打印去便利店\n- 需要装订去キンコーズ\n- 记得自带U盘或用网络打印",
    location: "东京·本乡",
    images: [{ color: "#FEF3C7", emoji: "🖨️" }],
    audienceTag: "全体",
    verificationBadge: "东大适用",
  },

  // 同城 - 涉谷探店
  {
    id: "14",
    image: { color: "#FCE7F3", emoji: "☕", aspectRatio: 1.1 },
    categoryTag: "探店",
    categoryColor: "bg-pink-500",
    title: "涉谷5家宝藏咖啡店，人均1000円带插座WiFi",
    tags: ["咖啡", "涉谷"],
    category: "同城",
    author: {
      name: "咖啡控",
      avatar: "K",
      university: "青山学院大学",
      isVerified: true,
    },
    likes: 512,
    content:
      "涉谷适合学习的咖啡店推荐！\n\n☕ 1. Streamer Coffee Company\n- 地址：涉谷駅步行8分（代官山方向）\n- 价格：手冲咖啡 600-800円\n- 环境：超安静，有大桌子\n- 插座：✅ 充足\n- WiFi：✅ 免费\n- 停留：建议2小时内\n\n📚 2. Wired Cafe\n- 地址：涉谷MODI 4F\n- 价格：套餐 900円起\n- 环境：工业风，座位多\n- 插座：✅\n- 特点：可以待很久不赶人\n\n🌿 3. THE DECK COFFEE & PIE\n- 地址：宮下公園4F\n- 价格：咖啡 500-700円\n- 环境：露天座位超赞\n- 缺点：周末人多\n\n💻 4. PRONTO涉谷店\n- 地址：涉谷駅直结\n- 价格：咖啡 280円起\n- 特点：最便宜，座位多\n- 适合：赶时间或预算紧\n\n🎨 5. % Arabica\n- 地址：道玄坂\n- 价格：拿铁 600円\n- 特点：网红店，拍照好看\n\n💡 Tips：\n- 早上10点前人少\n- 带Mac充电器，有些店只有日本插座",
    location: "东京·涉谷区",
    images: [
      { color: "#FCE7F3", emoji: "☕" },
      { color: "#E0E7FF", emoji: "💻" },
    ],
    audienceTag: "全体",
    verificationBadge: "亲测",
  },

  // 同城 - 横滨活动
  {
    id: "15",
    image: { color: "#DBEAFE", emoji: "🎉", aspectRatio: 1 },
    categoryTag: "活动",
    categoryColor: "bg-blue-500",
    title: "横滨中华街春节活动，2月10日舞龙舞狮+灯会",
    tags: ["活动", "横滨"],
    category: "同城",
    author: {
      name: "活动达人",
      avatar: "H",
      university: "横滨国立大学",
      isVerified: true,
    },
    likes: 678,
    content:
      "横滨中华街春节活动来了！\n\n🎊 活动信息：\n- 时间：2月10日（周六）10:00-18:00\n- 地点：横滨中華街（元町·中華街駅）\n- 门票：免费！\n\n🏮 活动内容：\n1. 舞龙舞狮表演\n  - 时间：11:00, 14:00, 16:00\n  - 地点：关帝廟前广场\n\n2. 传统灯会\n  - 时间：全天\n  - 几百个红灯笼，超美！\n\n3. 美食摊位\n  - 小笼包、煎饼果子、糖葫芦\n  - 价格：300-800円\n\n4. 抽奖活动\n  - 消费满3000円可抽奖\n  - 奖品：餐券、吉祥物\n\n🚇 交通：\n- みなとみらい线「元町·中華街駅」直达\n- 从涉谷坐东横线40分钟\n\n⚠️ 注意：\n- 下午2点后超级挤，建议早上去\n- 记得提前换好零钱\n- 有些店不能用信用卡",
    location: "神奈川·横滨",
    images: [
      { color: "#DBEAFE", emoji: "🎉" },
      { color: "#FEE2E2", emoji: "🏮" },
    ],
    audienceTag: "全体",
    verificationBadge: "官方活动",
  },

  // 同城 - 找搭子
  {
    id: "16",
    image: { color: "#D1FAE5", emoji: "🏋️", aspectRatio: 1.2 },
    categoryTag: "找搭子",
    categoryColor: "bg-emerald-500",
    title: "新宿健身房组队，晚上7点Anytime一起练",
    tags: ["健身", "新宿"],
    category: "同城",
    author: {
      name: "健身达人",
      avatar: "J",
      university: "早稻田大学",
      isVerified: true,
    },
    likes: 189,
    content:
      "找几个小伙伴一起健身！\n\n💪 基本信息：\n- 地点：Anytime Fitness 新宿三丁目店\n- 时间：周一三五晚上19:00-20:30\n- 现在：3个人（2男1女）\n- 再找：2-3人\n\n🎯 训练内容：\n- 主要练力量（深蹲、卧推、硬拉）\n- 可以互相帮忙spotting\n- 有人会教新手\n\n👤 希望你是：\n- 有一定基础或愿意学习\n- 能坚持每周至少2次\n- 最好住在新宿附近\n- 性格开朗好相处\n\n💰 费用：\n- 会员费自理（月8000円左右）\n- 可以一起办团体优惠\n\n📍 具体位置：\n新宿三丁目駅 C7出口步行1分钟\n\n💬 联系方式：\n站内私信或加微信：xxxxx\n\n⚠️ 注意：\n- 请自觉遵守健身房规则\n- 器械用完要归位\n- 互相监督不要偷懒😂",
    location: "东京·新宿区",
    images: [{ color: "#D1FAE5", emoji: "🏋️" }],
    audienceTag: "全体",
  },

  // 就活类
  {
    id: "3",
    image: { color: "#E0E7FF", emoji: "💼", aspectRatio: 0.8 },
    categoryTag: "面经",
    categoryColor: "bg-indigo-500",
    title: "索尼2026秋招面试全程分享，3轮日语面经",
    tags: ["索尼", "IT"],
    category: "就活",
    author: {
      name: "李华",
      avatar: "L",
      university: "京都大学",
      isVerified: true,
    },
    likes: 178,
    content:
      "终于拿到索尼的内定了！分享一下三轮面试的经验。\n\n📅 时间线：\n- ES提交：2025年12月\n- 网测：2026年1月\n- 一面：2026年2月\n- 二面：2026年3月初\n- 三面：2026年3月底\n- 内定：2026年4月初\n\n💻 一面（技术面1小时）：\n- LeetCode Medium难度算法题\n- 系统设计题：设计一个URL短链服务\n- 项目深挖：毕设和实习项目\n- 全程日语！建议提前准备技术日语\n\n👔 二面（综合面1.5小时）：\n- 自我介绍（1分钟版）\n- 志望動機（为什么选索尼）\n- 学生時代頑張ったこと\n- 逆质问环节\n\n🎯 三面（高管面45分钟）：\n- 职业规划（5年、10年）\n- 对索尼产品的看法\n- 压力面：如果同时拿到Google offer怎么办\n\n💡 准备建议：\n- 技术日语词汇必须背熟\n- ES里的每个字都要能展开讲\n- 压力面保持calm，不要慌",
    location: "东京·品川区",
    images: [
      { color: "#E0E7FF", emoji: "💼" },
      { color: "#DBEAFE", emoji: "📱" },
      { color: "#D1FAE5", emoji: "✨" },
      { color: "#FEF3C7", emoji: "🎯" },
    ],
    audienceTag: "就活生",
    verificationBadge: "2026最新",
  },

  // 生活类
  {
    id: "5",
    image: { color: "#FED7AA", emoji: "🍜", aspectRatio: 1 },
    categoryTag: "美食",
    categoryColor: "bg-orange-500",
    title: "新宿车站周边美食探店，留学生必吃",
    tags: ["美食", "新宿"],
    category: "生活",
    author: {
      name: "王芳",
      avatar: "W",
      university: "庆应义塾大学",
      isVerified: true,
    },
    likes: 389,
    content:
      "新宿站周边藏着很多性价比超高的美食！\n\n🍜 一兰拉面（新宿中央东口店）：\n- 24小时营业\n- 夜猫子福音\n\n🍛 CoCo壱番屋：\n- 咖喱专门店\n- 可以自选辣度\n\n🍱 松屋：\n- 牛肉饭性价比之王\n- 500日元吃饱\n\n都是学生党友好价格！",
    location: "东京·新宿区",
    images: [
      { color: "#FED7AA", emoji: "🍜" },
      { color: "#FEF3C7", emoji: "🍛" },
    ],
    audienceTag: "全体",
  },

  // 关注 - 学术类
  {
    id: "6",
    image: { color: "#F3E8FF", emoji: "📚", aspectRatio: 1.3 },
    categoryTag: "学术分享",
    categoryColor: "bg-purple-500",
    title: "早大图书馆自习攻略，24小时开放区域",
    tags: ["学习"],
    category: "关注",
    author: {
      name: "张三",
      avatar: "Z",
      university: "早稻田大学",
      isVerified: true,
    },
    likes: 245,
    content:
      "早大有几个24小时开放的自习区域，期末复习必备！\n\n中央图书馆：\n- 2楼自习室24小时开放\n- 有单人隔间\n- WiFi信号好\n\n理工图书馆：\n- 地下一层深夜自习室\n- 插座充足\n- 适合理工科学生\n\n注意事项：\n- 记得带学生证\n- 深夜有门禁需要刷卡\n- 不要占座！",
    location: "东京·新宿区",
    images: [{ color: "#F3E8FF", emoji: "📚" }],
    audienceTag: "早大生",
  },

  // 生活类
  {
    id: "7",
    image: { color: "#FEE2E2", emoji: "🎌", aspectRatio: 0.9 },
    categoryTag: "语言学习",
    categoryColor: "bg-red-500",
    title: "日语能力考N1备考经验，3个月速成",
    tags: ["日语", "JLPT"],
    category: "生活",
    author: {
      name: "小李",
      avatar: "L",
      university: "大阪大学",
      isVerified: true,
    },
    likes: 678,
    content:
      "3个月从N2到N1一次过！分享我的备考经验：\n\n第一个月：\n- 刷完红蓝宝书词汇\n- 每天背100个单词\n\n第二个月：\n- 真题刷起来\n- 重点攻克阅读和听力\n\n第三个月：\n- 模拟考试\n- 查漏补缺\n\n重点：听力一定要每天练！推荐NHK新闻和日剧练听力。",
    location: "大阪·吹田市",
    images: [
      { color: "#FEE2E2", emoji: "🎌" },
      { color: "#E0E7FF", emoji: "📖" },
      { color: "#D1FAE5", emoji: "✅" },
    ],
    audienceTag: "全体",
  },

  // 生活类
  {
    id: "8",
    image: { color: "#CCFBF1", emoji: "🏃", aspectRatio: 1.1 },
    categoryTag: "户外",
    categoryColor: "bg-teal-500",
    title: "东京周边登山路线推荐，新手友好",
    tags: ["户外"],
    category: "生活",
    author: {
      name: "阿强",
      avatar: "Q",
      university: "东京大学",
      isVerified: true,
    },
    likes: 156,
    content:
      "周末去爬山啦！推荐几条新手友好的登山路线：\n\n高尾山：\n- 难度：⭐\n- 时间：2-3小时\n- 有缆车可以偷懒\n\n筑波山：\n- 难度：⭐⭐\n- 时间：3-4小时\n- 山顶风景绝美\n\n御岳山：\n- 难度：⭐⭐⭐\n- 时间：4-5小时\n- 适合有一定经验的\n\n记得带足够的水和零食！",
    location: "东京·八王子市",
    images: [{ color: "#CCFBF1", emoji: "🏃" }],
    audienceTag: "全体",
  },

  // 同城 - 上野
  {
    id: "2",
    image: { color: "#FCE7F3", emoji: "🌸", aspectRatio: 1.4 },
    categoryTag: "赏樱",
    categoryColor: "bg-pink-500",
    title: "上野公园赏樱攻略，人少好拍点推荐",
    tags: ["赏樱", "上野"],
    category: "同城",
    author: {
      name: "阿华",
      avatar: "H",
      university: "早稻田大学",
      isVerified: true,
    },
    likes: 412,
    content:
      "上野公园的樱花季虽然人很多，但我发现了几个人少又好拍的机位！\n\n推荐时间段：早上7-8点，这时候人最少，光线也很柔和。\n\n最佳拍摄点：\n1. 不忍池北侧的小路\n2. 五条天神社附近\n3. 清水观音堂后面的小径\n\n记得带上野餐垫，可以在樱花树下坐着慢慢欣赏~",
    location: "东京·台东区",
    images: [
      { color: "#FCE7F3", emoji: "🌸" },
      { color: "#FEE2E2", emoji: "📷" },
    ],
    audienceTag: "全体",
  },
];
