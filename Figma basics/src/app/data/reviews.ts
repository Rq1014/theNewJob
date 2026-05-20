import { Review, ContactStage, AbandonReason } from "./institutions";

// 接触阶段文本映射
export const contactStageLabels: Record<ContactStage, string> = {
  consulted: "已咨询",
  trial: "已试听",
  interviewed: "已面谈",
  compared: "对比后放弃",
};

// 放弃原因文本映射
export const abandonReasonLabels: Record<AbandonReason, string> = {
  price_high: "价格偏高",
  unprofessional: "顾问不专业",
  curriculum_mismatch: "课程不匹配",
  location_time: "时间地点不合适",
  pushy_sales: "推销感强",
  better_option: "找到更好选择",
  policy_issue: "政策规定问题",
};

export const mockReviews: Review[] = [
  // 名门升学私塾的评论
  {
    id: "r1",
    userId: "u1",
    userName: "考上东大的学生",
    userAvatar: "K",
    university: "东京大学",
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 3,
    versions: [
      {
        version: 1,
        content:
          "刚报名名门私塾，准备冲刺东大经济学部。初次见面老师分析了我的学习情况，制定了详细的学习计划。目前刚开始上课，老师讲解很细致，期待后续效果。\n\n初步印象：\n- 教室环境不错，安静整洁\n- 老师是东大毕业的，专业性有保证\n- 学习计划很详细，到每周的复习内容都规划好了\n\n暂时给个4分，等学习一段时间后再来更新！",
        scores: {
          teaching: 4,
          faculty: 4,
          results: 4,
          curriculum: 4,
          feedback: 4,
          value: 4,
        },
        createdAt: "2025-09-15 14:30:00",
      },
      {
        version: 2,
        content:
          "上课3个月了，来更新一下评价。\n\n学习进展：\n- 每周2次一对一课程，每次2小时\n- 小论文写作能力明显提升\n- 老师会针对我的薄弱环节重点讲解\n- 每周都有作业，批改很认真，会标注每个问题\n\n面试辅导：\n- 开始了面试训练，模拟了3次面试\n- 老师会录像回放，指出我的问题\n- 准备了很多针对经济学部的专业问题\n\n小建议：\n- 作业量确实比较大，需要投入很多时间\n- 价格不便宜，但目前看效果还不错\n\n目前感觉很有信心，希望能顺利合格！",
        scores: {
          teaching: 5,
          faculty: 5,
          results: 4,
          curriculum: 5,
          feedback: 5,
          value: 4,
        },
        createdAt: "2025-12-20 16:15:00",
      },
      {
        version: 3,
        content:
          "最终合格东大经济学部了！！！回来更新最终评价。\n\n在名门上了半年课，真的非常值得！老师非常负责，每周都会根据我的学习进度调整教学内容。特别是面试辅导环节，老师帮我准备了很多针对性的问题，考试的时候真的被问到了好几个！\n\n详细总结：\n\n✅ 教学质量：\n- 一对一教学，进度完全跟着我的情况走\n- 老师讲解深入浅出，能把复杂的经济学概念讲清楚\n- 重点突出，不会浪费时间在基础内容上\n\n✅ 师资水平：\n- 我的主讲老师是东大经济学部毕业的\n- 对入试题目非常熟悉，押题很准\n- 面试技巧指导很到位\n\n✅ 升学效果：\n- 成功合格东大！\n- 班里还有好几个同学考上早大、一桥\n- 升学率确实很高\n\n✅ 课程体系：\n- 从基础到进阶都有完整的教材\n- 每个阶段都有明确的目标和测试\n- 模拟考试很有用，让我提前适应了考试节奏\n\n✅ 作业反馈：\n- 每次作业批改都很详细\n- 会用不同颜色标注不同类型的问题\n- 还会给改进建议\n\n❌ 性价比：\n- 半年60万日元确实不便宜\n- 但考虑到最后的合格结果，还是值得的\n- 可以按月付费，减轻了经济压力\n\n其他优点：\n- 定期和家长沟通学习进度\n- 提供了很多历年真题和内部资料\n- 学习氛围很好，同学之间会互相鼓励\n\n小建议：\n- 作业真的很多，要做好心理准备\n- 建议提前半年以上开始准备\n- 要积极和老师沟通，有问题及时问\n\n总体来说非常推荐给想考名校的同学！虽然价格贵，但老师真的很负责，效果也确实好。感谢名门，让我实现了东大梦想！",
        scores: {
          teaching: 5,
          faculty: 5,
          results: 5,
          curriculum: 5,
          feedback: 5,
          value: 4,
        },
        createdAt: "2026-03-15 14:30:00",
      },
    ],
    institutionId: "t1",
    institutionType: "tutoring",
    likes: 45,
    helpfulCount: 89,
    createdAt: "2025-09-15 14:30:00",
    updatedAt: "2026-03-15 14:30:00",
  },
  {
    id: "r2",
    userId: "u2",
    userName: "早大合格者",
    userAvatar: "Z",
    university: "早稻田大学",
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 3,
    versions: [
      {
        version: 1,
        content:
          "刚报名名门私塾，准备考早大商学部。老师看起来很专业，教材也很系统。今天上了第一节课，讲了学习规划和目标设定。期待后续的效果！",
        scores: {
          teaching: 4,
          faculty: 4,
          results: 4,
          curriculum: 4,
          feedback: 4,
          value: 4,
        },
        createdAt: "2025-10-20 10:15:00",
      },
      {
        version: 2,
        content:
          "上了2个月课了，来更新一下。\n\n学习情况：\n- 主要在练习小论文写作和时事分析\n- 老师会给我推荐一些经济类的书籍和文章\n- 每周的作业都有详细批改\n- 开始准备面试了，进行了第一次模拟面试\n\n感受：\n- 学习强度确实比较大\n- 但能明显感觉到自己在进步\n- 特别是写作能力提升很明显\n\n继续加油，希望能顺利合格！",
        scores: {
          teaching: 5,
          faculty: 5,
          results: 4,
          curriculum: 5,
          feedback: 5,
          value: 4,
        },
        createdAt: "2025-12-25 11:30:00",
      },
      {
        version: 3,
        content:
          "最终合格早大商学部了！回来更新最终评价。\n\n上了4个月的课，成功合格！老师真的很负责，每次课后都会发详细的反馈报告，指出我需要改进的地方。小论文批改特别仔细，标注了很多细节问题。\n\n印象最深的几点：\n\n1. 个性化教学：\n   - 老师会根据我的学习情况调整教学内容\n   - 我中途因为打工太忙想放弃，老师主动联系我，帮我调整了学习计划，才坚持下来\n   - 这种人性化的服务真的很暖心\n\n2. 面试辅导：\n   - 进行了5次模拟面试\n   - 每次都会录像回放分析\n   - 准备了很多针对商学部的专业问题\n   - 真正考试时遇到的问题基本都练习过\n\n3. 学习资料：\n   - 提供了大量历年真题\n   - 还有内部整理的答题模板\n   - 时事热点分析资料很有用\n\n4. 学习氛围：\n   - 定期有学习交流会\n   - 可以认识其他备考生\n   - 互相鼓励很重要\n\n性价比方面：\n- 4个月大概花了40万日元\n- 虽然不便宜，但考虑到最后的合格结果，还是值得的\n- 比起考不上浪费一年时间，这个投资是值得的\n\n强烈推荐给想考早大的同学！老师专业、负责，教学体系完善，值得信赖！",
        scores: {
          teaching: 5,
          faculty: 5,
          results: 5,
          curriculum: 5,
          feedback: 5,
          value: 4,
        },
        createdAt: "2026-02-28 16:45:00",
      },
    ],
    institutionId: "t1",
    institutionType: "tutoring",
    likes: 38,
    helpfulCount: 72,
    createdAt: "2025-10-20 10:15:00",
    updatedAt: "2026-02-28 16:45:00",
  },
  {
    id: "r3",
    userId: "u3",
    userName: "纠结的考生",
    userAvatar: "J",
    university: "语言学校在读",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "trial",
    abandonReasons: ["price_high", "better_option"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "试听了名门的课程，分享一下真实感受。\n\n试听体验：\n- 试听了一节2小时的一对一课程\n- 老师确实很专业，东大毕业的\n- 讲课思路清晰，能针对我的问题给出具体建议\n- 教室环境很好，学习氛围不错\n\n为什么最后没选择：\n\n1. 价格因素：\n   - 半年课程要60万日元\n   - 对我这种打工党来说压力确实大\n   - 虽然可以分期，但每个月还是要10万日元\n\n2. 找到了性价比更高的选择：\n   - 后来找到了另一家私塾\n   - 小班授课（4-6人），价格只要35万日元半年\n   - 虽然不是一对一，但老师资质也不错\n   - 对我来说更合适\n\n客观评价：\n- 名门确实很专业，教学质量有保证\n- 如果预算充足，一对一的效果肯定更好\n- 但对于预算有限的同学，可以考虑其他选择\n- 不过据说他们的升学率确实很高\n\n给其他同学的建议：\n- 建议先试听，看看是否适合自己\n- 要根据自己的经济情况理性选择\n- 贵不一定就是最好的，适合自己最重要",
        scores: {
          teaching: 5,
          faculty: 5,
          results: 4,
          curriculum: 5,
          feedback: 4,
          value: 3,
        },
        createdAt: "2026-04-05 11:20:00",
      },
    ],
    institutionId: "t1",
    institutionType: "tutoring",
    likes: 12,
    helpfulCount: 28,
    createdAt: "2026-04-05 11:20:00",
    updatedAt: "2026-04-05 11:20:00",
  },
  {
    id: "r4",
    userId: "u4",
    userName: "慎重的学生",
    userAvatar: "S",
    university: "语言学校在读",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "interviewed",
    abandonReasons: ["pushy_sales", "curriculum_mismatch"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "去名门咨询过，最后没报名，说说原因。\n\n咨询过程：\n- 预约了面谈，顾问很热情\n- 详细介绍了课程体系和教学方式\n- 带我参观了教室和学习环境\n\n没报名的原因：\n\n1. 推销感比较强：\n   - 顾问一直强调他们的升学率多高\n   - 不停说名额有限要尽快报名\n   - 这种感觉让我有点不舒服\n   - 我更希望能冷静地了解课程内容\n\n2. 课程设置问题：\n   - 我的目标是考庆应大学\n   - 但他们的课程主要针对东大、早大\n   - 对庆应的针对性辅导相对少一些\n   - 觉得可能不太适合我\n\n3. 时间安排：\n   - 他们要求每周至少2次课\n   - 我还要打工，时间上比较紧张\n   - 希望能更灵活一些\n\n客观评价：\n- 教学质量应该是不错的，看评价都挺好\n- 只是对我个人来说不太合适\n- 推荐给那些目标明确是东大早大的同学\n- 如果你时间充裕、预算充足，可以考虑\n\n后来选择：\n- 找了一家可以线上授课的私塾\n- 时间更灵活，价格也便宜一些\n- 更适合我的情况",
        scores: {
          teaching: 4,
          faculty: 4,
          results: 4,
          curriculum: 3,
          feedback: 4,
          value: 3,
        },
        createdAt: "2026-03-28 15:30:00",
      },
    ],
    institutionId: "t1",
    institutionType: "tutoring",
    likes: 8,
    helpfulCount: 19,
    createdAt: "2026-03-28 15:30:00",
    updatedAt: "2026-03-28 15:30:00",
  },
  {
    id: "r5",
    userId: "u5",
    userName: "理性消费者",
    userAvatar: "L",
    university: "语言学校在读",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "consulted",
    abandonReasons: ["price_high", "location_time"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "在网上咨询过名门私塾，分享一下咨询情况。\n\n线上咨询：\n- 填写了咨询表单，很快就有顾问联系我\n- 微信沟通，回复很及时\n- 介绍了课程内容和收费标准\n\n了解到的信息：\n- 一对一课程，半年60万日元\n- 包含20次课程，每次2小时\n- 还有4次模拟面试\n- 提供学习资料和历年真题\n\n没继续的原因：\n\n1. 价格超预算：\n   - 我的预算是30-40万日元\n   - 60万确实超了不少\n   - 虽然可以分期，但还是压力大\n\n2. 地理位置：\n   - 他们在目黑区\n   - 我住在埼玉，过去要1个多小时\n   - 每周2次往返太费时间和交通费了\n   - 问了可不可以线上上课，说效果会打折扣\n\n3. 时间安排：\n   - 上课时间比较固定\n   - 和我的打工时间有冲突\n   - 调整比较困难\n\n客观看法：\n- 从评价来看，教学质量应该很不错\n- 适合住得近、预算充足的同学\n- 对于我这种情况就不太适合了\n\n给大家的建议：\n- 选私塾一定要考虑地理位置\n- 计算好通勤时间和交通费\n- 根据自己的实际情况理性选择",
        scores: {
          teaching: 4,
          faculty: 4,
          results: 4,
          curriculum: 4,
          feedback: 4,
          value: 3,
        },
        createdAt: "2026-04-10 09:15:00",
      },
    ],
    institutionId: "t1",
    institutionType: "tutoring",
    likes: 5,
    helpfulCount: 15,
    createdAt: "2026-04-10 09:15:00",
    updatedAt: "2026-04-10 09:15:00",
  },
  {
    id: "r6",
    userId: "u6",
    userName: "对比党",
    userAvatar: "D",
    university: "语言学校在读",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "compared",
    abandonReasons: ["better_option"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "对比了3家私塾后的总结，最后没选名门，说说原因。\n\n对比的私塾：\n1. 名门升学私塾（一对一）\n2. 东京精英私塾（小班）\n3. 早稻田进学塾（小班）\n\n名门的优势：\n- 一对一教学，针对性最强\n- 老师都是名校毕业\n- 升学率数据最好（92%）\n- 教材体系很完善\n\n为什么选了其他家：\n\n最后选择了早稻田进学塾，主要考虑：\n\n1. 性价比：\n   - 名门：60万日元/半年\n   - 早稻田进学塾：35万日元/半年\n   - 差了快一倍的价格\n\n2. 学习氛围：\n   - 小班授课（4-6人）反而让我更有动力\n   - 可以和同学交流学习方法\n   - 看到别人的进步会激励自己\n\n3. 目标匹配：\n   - 我的目标就是早大\n   - 早稻田进学塾主打早大专项\n   - 对我来说更有针对性\n\n4. 地理位置：\n   - 早稻田进学塾就在早大附近\n   - 可以顺便熟悉校园环境\n   - 交通也更方便\n\n客观评价名门：\n- 如果预算充足，追求一对一教学，名门确实是很好的选择\n- 升学率高是有道理的，教学质量确实好\n- 但不是每个人都需要这么高端的服务\n- 要根据自己的目标和预算选择\n\n给大家的建议：\n- 不要被高升学率数字迷惑\n- 要看清楚那些考上的人的基础怎么样\n- 选适合自己的，不是选最贵的\n- 多对比几家再决定",
        scores: {
          teaching: 5,
          faculty: 5,
          results: 5,
          curriculum: 5,
          feedback: 4,
          value: 3,
        },
        createdAt: "2026-03-20 14:40:00",
      },
    ],
    institutionId: "t1",
    institutionType: "tutoring",
    likes: 23,
    helpfulCount: 45,
    createdAt: "2026-03-20 14:40:00",
    updatedAt: "2026-03-20 14:40:00",
  },
  {
    id: "r7",
    userId: "u7",
    userName: "一桥合格生",
    userAvatar: "Y",
    university: "一桥大学",
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 2,
    versions: [
      {
        version: 1,
        content:
          "刚在名门报名，准备考一桥大学商学部。第一印象不错，老师很专业，给我制定了详细的学习计划。教室环境也很好，同学们都很认真。期待后面的学习效果！",
        scores: {
          teaching: 4,
          faculty: 4,
          results: 4,
          curriculum: 4,
          feedback: 4,
          value: 4,
        },
        createdAt: "2025-11-10 13:20:00",
      },
      {
        version: 2,
        content:
          "合格一桥大学商学部！回来更新评价。\n\n学习了5个月，虽然过程很辛苦，但结果很满意。名门的教学确实有一套，特别是对一桥的研究很深入。\n\n具体体验：\n\n教学质量：\n- 老师对一桥的出题风格很了解\n- 重点讲解了经济学基础和数学应用\n- 小论文训练很有针对性\n\n学习过程：\n- 前2个月打基础，学习理论知识\n- 中间2个月专项训练，大量做题\n- 最后1个月冲刺，模拟考试和面试准备\n\n面试辅导：\n- 一桥很重视面试，老师帮我准备得很充分\n- 模拟了各种可能的问题\n- 教了很多面试技巧\n\n作业反馈：\n- 每次作业都有详细批改\n- 会指出思维逻辑的问题\n- 不只是改错字，更注重培养思考方式\n\n值得一提的是：\n- 老师会定期测试，及时发现问题\n- 根据我的进度调整教学内容\n- 这种个性化教学确实有效\n\n费用方面：\n- 5个月花了50万日元\n- 相比收获来说，觉得值得\n\n推荐给目标是名校的同学，特别是考一桥、东大这种难度大的学校，专业的辅导真的很重要！",
        scores: {
          teaching: 5,
          faculty: 5,
          results: 5,
          curriculum: 5,
          feedback: 5,
          value: 4,
        },
        createdAt: "2026-04-08 17:25:00",
      },
    ],
    institutionId: "t1",
    institutionType: "tutoring",
    likes: 31,
    helpfulCount: 58,
    createdAt: "2025-11-10 13:20:00",
    updatedAt: "2026-04-08 17:25:00",
  },

  // 富士日本语学校的评论
  {
    id: "r8",
    userId: "u8",
    userName: "已升学学生",
    userAvatar: "Y",
    university: "明治大学",
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 2,
    versions: [
      {
        version: 1,
        content:
          "刚到富士日本语学校1个月，分享一下初步感受。\n\n学校环境：\n- 教室很新，设施齐全\n- 地理位置不错，池袋交通方便\n- 周边生活设施完善\n\n教学方面：\n- 分班考试后进入中级班\n- 老师讲课很认真，语法讲解清晰\n- 课堂氛围不错\n\n生活支持：\n- 入学时老师帮忙办理了很多手续\n- 银行卡、手机卡都有协助\n- 宿舍离学校走路10分钟\n\n初步印象很好，期待之后的学习生活！",
        scores: {
          teaching: 4,
          attendance: 4,
          advancement: 4,
          lifeSupport: 5,
          environment: 5,
          value: 4,
        },
        createdAt: "2024-10-15 09:30:00",
      },
      {
        version: 2,
        content:
          "在富士读了1年半，现在已经升学到明治大学了！回来更新最终评价。\n\n学校整体感受：\n\n✅ 优点：\n\n1. 签证办理：\n   - 非常靠谱，材料准备很详细\n   - 同期的同学基本都通过了\n   - 续签也很顺利\n\n2. 教学质量：\n   - 老师很负责，特别是升学指导老师\n   - 从N4到N2的提升很稳\n   - 每周都有小测试，及时发现问题\n\n3. 升学支持：\n   - 有专门的升学辅导课程\n   - 帮忙准备志愿理由书\n   - 面试练习很有用\n\n4. 学习环境：\n   - 教室明亮干净\n   - 图书室有很多学习资料\n   - 自习室可以免费使用\n\n5. 生活方便：\n   - 宿舍离学校近\n   - 池袋生活很方便\n   - 打工机会也多\n\n❌ 缺点：\n\n1. 出勤管理严格：\n   - 迟到会被警告\n   - 请假手续比较麻烦\n   - 但这样也确保了签证不出问题\n\n2. 学费偏贵：\n   - 比其他学校稍贵一点\n   - 一年学费80万日元\n   - 但服务确实好\n\n3. 中国学生多：\n   - 大概60%是中国人\n   - 想练日语可能要主动找日本人交流\n   - 不过也方便互相帮助\n\n升学结果：\n- 成功考上明治大学经营学部\n- 班里很多同学都升学成功了\n- 升学率确实挺高的\n\n总体来说是一所比较靠谱的学校，推荐给想好好学习升学的同学！如果你的目标是升学，富士是个不错的选择。",
        scores: {
          teaching: 5,
          attendance: 4,
          advancement: 5,
          lifeSupport: 5,
          environment: 5,
          value: 4,
        },
        createdAt: "2026-04-10 09:30:00",
      },
    ],
    institutionId: "l1",
    institutionType: "language",
    likes: 52,
    helpfulCount: 98,
    createdAt: "2024-10-15 09:30:00",
    updatedAt: "2026-04-10 09:30:00",
  },
  {
    id: "r9",
    userId: "u9",
    userName: "在读生小王",
    userAvatar: "W",
    university: "富士日本语学校",
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "目前在富士读了半年，分享一下真实感受。\n\n教学方面：\n- 老师教得挺好的，语法讲解很清楚\n- 每周都有小测试，能及时发现自己的弱点\n- N3到N2的过渡做得不错\n- 听力和口语练习比较多\n\n生活支持：\n- 学校有专门的生活指导老师\n- 帮忙办理了银行卡、手机卡\n- 宿舍离学校走路10分钟\n- 有什么问题都可以问老师\n\n出勤管理：\n- 真的很严！迟到3次会被叫去谈话\n- 但这样也好，能保证签证不出问题\n- 大家都很守时\n\n环境：\n- 池袋交通很方便\n- 学校周边有很多便利店和餐厅\n- 打工机会也多\n- 周末可以到处逛逛\n\n性价比：\n- 学费+宿舍费一年大概160万日元\n- 和其他学校比不算最便宜\n- 但服务确实好，物有所值\n\n班级氛围：\n- 同学们都很友好\n- 大家一起学习互相帮助\n- 经常组织课外活动\n\n推荐给想认真学日语的同学！学校管理规范，老师负责，升学支持也很到位。",
        scores: {
          teaching: 5,
          attendance: 4,
          advancement: 4,
          lifeSupport: 5,
          environment: 5,
          value: 4,
        },
        createdAt: "2026-03-28 15:20:00",
      },
    ],
    institutionId: "l1",
    institutionType: "language",
    likes: 29,
    helpfulCount: 56,
    createdAt: "2026-03-28 15:20:00",
    updatedAt: "2026-03-28 15:20:00",
  },
  {
    id: "r10",
    userId: "u10",
    userName: "准备赴日学生",
    userAvatar: "Z",
    university: "国内大学",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "consulted",
    abandonReasons: ["better_option"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "咨询了富士日本语学校，最后选了其他学校，说说原因。\n\n咨询过程：\n- 在官网填写了咨询表单\n- 很快收到了详细的资料\n- 微信上和招生老师沟通\n\n了解到的信息：\n- 学费：一年80万日元\n- 入学时间：1月、4月、7月、10月都有\n- 宿舍：月租6万日元左右\n- 升学率：85%左右\n\n为什么没选：\n\n1. 找到了更便宜的学校：\n   - 后来发现另一所学校学费只要65万日元\n   - 虽然名气没富士大\n   - 但评价也还不错\n   - 对我这种预算有限的人更合适\n\n2. 宿舍费用：\n   - 富士的宿舍一年要72万日元\n   - 加上学费就152万了\n   - 我找到了更便宜的房子\n   - 自己租房能省不少钱\n\n3. 地理位置：\n   - 池袋虽然方便但物价贵\n   - 我选的学校在埼玉\n   - 生活成本更低\n\n客观评价：\n- 富士确实是好学校\n- 口碑不错，升学率也高\n- 如果预算充足，是个很好的选择\n- 但不是每个人都需要去最好的学校\n\n给大家的建议：\n- 选学校不要只看名气\n- 要综合考虑学费、生活费、地理位置\n- 预算有限的话，可以考虑性价比更高的学校",
        scores: {
          teaching: 4,
          attendance: 4,
          advancement: 4,
          lifeSupport: 4,
          environment: 4,
          value: 3,
        },
        createdAt: "2026-04-12 10:45:00",
      },
    ],
    institutionId: "l1",
    institutionType: "language",
    likes: 7,
    helpfulCount: 18,
    createdAt: "2026-04-12 10:45:00",
    updatedAt: "2026-04-12 10:45:00",
  },
  {
    id: "r11",
    userId: "u11",
    userName: "对比后放弃",
    userAvatar: "D",
    university: "国内大学",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "compared",
    abandonReasons: ["price_high", "policy_issue"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "对比了东京的几所语言学校，最后没选富士，说说原因。\n\n对比的学校：\n1. 富士日本语学校（池袋）\n2. 优尼塔斯日本语学校（新宿）\n3. 美都里慕日本语学校（新大久保）\n\n富士的优势：\n- 口碑好，升学率高\n- 地理位置方便\n- 教学质量有保证\n- 升学支持完善\n\n为什么没选：\n\n1. 学费问题：\n   - 富士：80万日元/年\n   - 优尼塔斯：75万日元/年\n   - 美都里慕：70万日元/年\n   - 虽然差别不是特别大，但一年下来也能省不少\n\n2. 宿舍政策：\n   - 富士要求第一年必须住学校宿舍\n   - 不能自己在外面租房\n   - 而我已经有亲戚在东京了\n   - 本来打算住亲戚家省钱\n   - 这个政策对我来说不太方便\n\n3. 出勤管理：\n   - 富士的出勤管理确实严格\n   - 对守规矩的学生是好事\n   - 但我可能需要经常回国处理家里的事\n   - 担心请假比较麻烦\n\n最终选择：\n- 选了优尼塔斯\n- 虽然升学率稍低一点（80%）\n- 但可以自己租房\n- 请假也相对灵活\n- 学费也便宜5万日元\n\n客观评价富士：\n- 如果你的目标就是好好学习升学\n- 不需要经常请假\n- 也不介意住宿舍\n- 富士绝对是好选择\n- 但要根据自己的实际情况选择\n\n给大家的建议：\n- 选学校要看清楚各种政策\n- 特别是宿舍要求、请假制度\n- 这些小细节可能会影响你的留学生活\n- 不要只看升学率，要看是否适合自己",
        scores: {
          teaching: 5,
          attendance: 3,
          advancement: 5,
          lifeSupport: 4,
          environment: 5,
          value: 3,
        },
        createdAt: "2026-03-15 16:20:00",
      },
    ],
    institutionId: "l1",
    institutionType: "language",
    likes: 15,
    helpfulCount: 32,
    createdAt: "2026-03-15 16:20:00",
    updatedAt: "2026-03-15 16:20:00",
  },

  // 樱花留学中介的评论
  {
    id: "r12",
    userId: "u12",
    userName: "成功赴日学生",
    userAvatar: "C",
    university: "早稻田大学",
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 2,
    versions: [
      {
        version: 1,
        content:
          "刚签约樱花留学，准备申请早大研究生（修士预科）。初次见面顾问很专业，详细分析了我的背景，给出了初步的申请方案。感觉靠谱，期待后续服务。",
        scores: {
          expertise: 5,
          matching: 5,
          communication: 5,
          transparency: 5,
          efficiency: 4,
          afterSales: 4,
        },
        createdAt: "2025-09-20 13:45:00",
      },
      {
        version: 2,
        content:
          "拿到早大内诺了！回来更新评价。\n\n通过樱花留学成功申请到早大研究生（修士预科）！整个过程很顺利，分享一下经验。\n\n📋 服务流程：\n\n1. 初次咨询（2025.09）：\n   - 顾问很专业，详细分析了我的背景\n   - 本科是国内985，日语N1，托福95分\n   - 目标是经济学相关专业\n\n2. 定制方案（2025.10）：\n   - 根据我的情况推荐了5所大学\n   - 早稻田、一桥、庆应、上智、明治\n   - 分析了每所学校的特点和申请难度\n   - 给出了申请时间表\n\n3. 材料准备（2025.10-11）：\n   - 每一步都有清晰的checklist\n   - 需要准备的材料都列得很详细\n   - 顾问会检查每一份材料\n\n4. 文书修改（2025.11-12）：\n   - 研究计划书改了5稿\n   - 每次修改都有详细的批注\n   - 指出逻辑问题和表达不当的地方\n   - 最终版本质量很高\n\n5. 联系教授（2025.12-2026.01）：\n   - 顾问帮忙联系了目标教授\n   - 指导怎么写邮件\n   - 教授回复后怎么应对\n\n6. 面试辅导（2026.02）：\n   - 模拟面试3次\n   - 准备了各种可能的问题\n   - 教了很多面试技巧\n   - 考试的时候真的被问到了好几个准备过的问题\n\n7. 后续跟进（2026.03）：\n   - 拿到内诺后帮忙办理在留手续\n   - 解答了很多关于赴日的问题\n   - 还在持续提供帮助\n\n💰 费用：\n- 申请5所大学，总费用15万日元\n- 价格透明，没有隐藏收费\n- 可以分期付款\n- 签约时付50%，拿到内诺付剩余50%\n\n👍 特别满意的地方：\n\n1. 顾问专业度高：\n   - 对日本大学和教授很了解\n   - 给的建议都很中肯\n   - 不会乱承诺\n\n2. 响应速度快：\n   - 微信基本秒回\n   - 有问题随时可以问\n   - 不会让你等很久\n\n3. 流程透明：\n   - 每个阶段都会更新进度\n   - 所有材料都会给我确认\n   - 不会私自做决定\n\n4. 文书质量高：\n   - 研究计划书写得很专业\n   - 教授面试时特别夸了我的研究计划\n   - 这是申请成功的关键\n\n5. 售后服务好：\n   - 拿到offer后还帮忙解答各种问题\n   - 比如住宿、选课等\n   - 不是拿钱就不管了\n\n👎 小问题：\n- 有时候顾问太忙，需要预约才能深入沟通\n- 不过这也说明他们生意好\n- 总体不影响服务质量\n\n申请结果：\n- 早稻田：拿到内诺 ✅\n- 一桥：面试后被拒 ❌\n- 庆应：没回复 ❌\n- 上智：拿到内诺 ✅\n- 明治：拿到内诺 ✅\n\n最终选择了早大，实现了目标！\n\n总体非常满意，强烈推荐给想申请日本研究生的同学！樱花留学确实专业可靠，服务态度好，值得信赖。",
        scores: {
          expertise: 5,
          matching: 5,
          communication: 5,
          transparency: 5,
          efficiency: 5,
          afterSales: 5,
        },
        createdAt: "2026-03-05 13:45:00",
      },
    ],
    institutionId: "a1",
    institutionType: "agency",
    likes: 67,
    helpfulCount: 124,
    createdAt: "2025-09-20 13:45:00",
    updatedAt: "2026-03-05 13:45:00",
  },
  {
    id: "r13",
    userId: "u13",
    userName: "语言学校申请者",
    userAvatar: "Y",
    university: "富士日���语学校",
    isVerified: true,
    isTransacted: true,
    proofVerified: true,
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "找樱花留学帮我申请的语言学校，整体体验不错。\n\n我的情况：\n- 本科刚毕业，日语零基础\n- 目标是去语言学校过渡，之后考修士\n- 预算有限，一年总费用希望控制在200万日元以内\n\n服务过程：\n\n1. 学校选择：\n   - 顾问帮我分析了东京几所性价比高的语言学校\n   - 讲解了每所学校的特点\n   - 最后推荐了3所：富士、优尼塔斯、美都里慕\n   - 综合考虑后选择了富士日本语学校\n\n2. 材料准备：\n   - 提供了详细的材料清单\n   - 银行流水、存款证明等都有模板\n   - 志愿理由书帮忙修改了3稿\n   - 推荐信也给了很好的建议\n\n3. 签证申请：\n   - 在留申请一次过！\n   - 材料准备很充分\n   - 顾问经验丰富，知道入管局的要求\n\n4. 后续服务：\n   - 拿到在留后指导怎么办签证\n   - 给了一份详细的赴日准备清单\n   - 还介绍了接机服务\n\n收费：\n- 语言学校申请费用8万日元\n- 包含所有材料翻译和邮寄\n- 性价比还不错\n\n满意的地方：\n- 办事效率高，材料提交很及时\n- 顾问会主动跟进进度\n- 给的学校建议很中肯，没有乱推荐\n- 不会因为你是语言学校申请就不重视\n\n建议改进：\n- 希望能有更多关于日本生活的指导\n- 比如打工、租房等方面的信息\n\n总体推荐！对语言学校申请者来说，樱花留学是个靠谱的选择。",
        scores: {
          expertise: 5,
          matching: 5,
          communication: 4,
          transparency: 5,
          efficiency: 5,
          afterSales: 4,
        },
        createdAt: "2026-02-18 10:30:00",
      },
    ],
    institutionId: "a1",
    institutionType: "agency",
    likes: 34,
    helpfulCount: 67,
    createdAt: "2026-02-18 10:30:00",
    updatedAt: "2026-02-18 10:30:00",
  },
  {
    id: "r14",
    userId: "u14",
    userName: "咨询后放弃",
    userAvatar: "Z",
    university: "国内大学",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "interviewed",
    abandonReasons: ["unprofessional", "better_option"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "咨询了樱花留学，最后没签约，说说原因。\n\n咨询过程：\n- 预约了线下见面\n- 顾问态度还不错\n- 详细介绍了服务内容\n\n为什么没签约：\n\n1. 顾问专业度存疑：\n   - 我问了一些关于我专业（计算机）的问题\n   - 顾问回答得比较模糊\n   - 感觉对理工科专业不太了解\n   - 主要做文科申请？\n\n2. 案例问题：\n   - 我要求看一些计算机专业的成功案例\n   - 给我看的案例大多是文科\n   - 理工科案例很少\n   - 让我有点担心\n\n3. 找到更专业的：\n   - 后来找了一家专门做理工科申请的中介\n   - 顾问本身就是理工科背景\n   - 对我的专业很了解\n   - 给的建议更有针对性\n\n客观评价：\n- 樱花留学可能更擅长文科申请\n- 如果你是文科生，应该没问题\n- 但理工科学生可能需要找更专业的\n- 不过服务态度确实不错\n\n给大家的建议：\n- 选中介要看专业匹配度\n- 要求看你所学专业的成功案例\n- 测试一下顾问的专业知识\n- 不要只看整体口碑，要看在你的领域是否专业",
        scores: {
          expertise: 3,
          matching: 3,
          communication: 4,
          transparency: 4,
          efficiency: 4,
          afterSales: 3,
        },
        createdAt: "2026-04-08 14:25:00",
      },
    ],
    institutionId: "a1",
    institutionType: "agency",
    likes: 9,
    helpfulCount: 22,
    createdAt: "2026-04-08 14:25:00",
    updatedAt: "2026-04-08 14:25:00",
  },
  {
    id: "r15",
    userId: "u15",
    userName: "价格敏感者",
    userAvatar: "J",
    university: "国内大学",
    isVerified: false,
    isTransacted: false,
    proofVerified: false,
    contactStage: "consulted",
    abandonReasons: ["price_high"],
    currentVersion: 1,
    versions: [
      {
        version: 1,
        content:
          "在线咨询了樱花留学，最后因为价格没签约。\n\n咨询情况：\n- 在官网填写了咨询表单\n- 顾问很快联系我\n- 微信上沟通，态度不错\n\n了解到的收费：\n- 研究生申请（5所大学）：15万日元\n- 修士直考（3所大学）：18万日元\n- 语言学校申请：8万日元\n- SGU英文项目（5所大学）：20万日元\n\n没签约的原因：\n\n价格超出预算：\n- 我申请研究生，预算是10万日元左右\n- 樱花要15万日元\n- 超出了50%\n- 对学生党来说压力还是有点大\n\n对比了其他中介：\n- 有些中介收费只要10-12万日元\n- 虽然可能服务稍差一点\n- 但对我来说性价比更高\n\n客观评价：\n- 樱花留学的口碑确实好\n- 服务应该是值这个价格的\n- 但不是每个人都能负担\n- 要根据自己的预算选择\n\n给大家的建议：\n- 多对比几家中介的价格\n- 不要只看最贵的或最便宜的\n- 要综合考虑性价比\n- 看看服务内容是否值这个价格\n- 问清楚是否有隐藏收费\n\n虽然我没选樱花，但还是觉得他们比较靠谱的，推荐给预算充足的同学。",
        scores: {
          expertise: 4,
          matching: 4,
          communication: 5,
          transparency: 5,
          efficiency: 4,
          afterSales: 4,
        },
        createdAt: "2026-03-25 11:40:00",
      },
    ],
    institutionId: "a1",
    institutionType: "agency",
    likes: 6,
    helpfulCount: 14,
    createdAt: "2026-03-25 11:40:00",
    updatedAt: "2026-03-25 11:40:00",
  },
];

// 根据机构ID获取评论
export function getReviewsByInstitution(institutionId: string): Review[] {
  return mockReviews.filter((review) => review.institutionId === institutionId);
}

// 获取成交评论
export function getTransactedReviews(institutionId: string): Review[] {
  return mockReviews.filter(
    (review) => review.institutionId === institutionId && review.isTransacted
  );
}

// 获取非成交评论
export function getNonTransactedReviews(institutionId: string): Review[] {
  return mockReviews.filter(
    (review) => review.institutionId === institutionId && !review.isTransacted
  );
}

// 获取有历史版本的评论
export function getReviewsWithHistory(institutionId: string): Review[] {
  return mockReviews.filter(
    (review) => review.institutionId === institutionId && review.versions.length > 1
  );
}

// 按有帮助数排序
export function getMostHelpfulReviews(institutionId: string): Review[] {
  return mockReviews
    .filter((review) => review.institutionId === institutionId)
    .sort((a, b) => b.helpfulCount - a.helpfulCount);
}

// 按时间排序（最新）
export function getLatestReviews(institutionId: string): Review[] {
  return mockReviews
    .filter((review) => review.institutionId === institutionId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}
