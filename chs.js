/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "Options": "选项",
    "Prestige points.": "声望点。",
    "Reach": "抵达",
    "Repeated Replicanti": "重复复制品",
    "replicanti": "复制品",
    "Replicanti": "复制品",
    "Replicanti Galaxy": "复制品银河",
    "Replicanti Multiplier": "复制品乘数",
    "Replicanti Power": "复制品力量",
    "Replicanti Sacrifice": "复制品牺牲",
    "Replicanti Storage": "复制品存储",
    "Replicanti to unlock new Infinity Challenge": "Replicanti 解锁新的无限挑战",
    "replicanti, make replicanti penalty is raised by": "复制品，使复制品的惩罚被提高",
    "replicanti, make replicanti penalty/slowdown is raised by": "复制品，使复制品的惩罚/减速被提高",
    "replicanti, make their growth is rooted by": "复制品，让他们的成长开根",
    "replicator, which boosts Infinity Replicanti growth by ^": "复制品器，可将 无限复制品 增长 ^",
    "Reset previous features for": "重置以前的功能并获得",
    "Reset your Infinity Replicanti except thier upgrades, but adds": "重置您的 无限复制品，但升级除外，但添加",
    "Reset your Replicanti, but makes Replicanti upgrades is": "重置您的 复制品，但使 复制品 升级增强",
    "Sacrifice your Replicanti, but makes Replicanti growth is": "牺牲你的 复制品，但让 复制品 成长",
    "stonger.": "。",
    "stronger.": "。",
    "Unlock Replicator.": "解锁复制品器。",
    "x strength on replicanti upgrades.": "x 复制品升级强度。",
    "And Infinity Replicanti cap is increased by": "无限复制品 上限增加了",
    "Beyond": "超过",
    "Beyond Replicanti, Replicanti growth cannot go beyond Infinity...": "超越复制品，复制品的成长无法超越无限……",
    "Buy Max": "购买最大",
    "Complete Infinity Challenge...": "完成无限挑战...",
    "Enabled": "启用",
    "Exit Challenge": "退出挑战",
    "free base from Infinity Replicanti effect. Unfortunately, Infinity Replicanti growth is rooted by": "免费基数 来自 无限复制品 效果。不幸的是，无限复制品 的增长源于",
    "Gain": "获得",
    "Go Infinity, but resets all previous features except achievements for being Infinity.": "达到无限，但重置所有先前的功能，除了成就是 无限。",
    "Hard Reset": "硬重置",
    "Infinity Compressor": "无限压缩机",
    "Infinity Points": "无限点",
    "Infinity points.": "无限点。",
    "Infinity Replicanti. Translated to": "无限复制品。翻译成",
    "Multiply Infinity points gain.": "乘以无限点增益。",
    ", thier effect by": ", 其效果为",
    "Cost: {{ format(FORMS.inf.mult.cost(),0) }} Infinity points.": "成本: {{ format(FORMS.inf.mult.cost(),0) }} 无限点.",
    "Cost: {{ format(UPGS.replicanti[x].cost()) }} replicanti": "成本: {{ format(UPGS.replicanti[x].cost()) }} 复制品",
    "Cost: {{ format(UPGS.inf_rep[x].cost(),0) }} Infinity Points": "成本: {{ format(UPGS.inf_rep[x].cost(),0) }} 无限点",
    "Cost: {{ format(FORMS.replicator.gen.cost(x)) }} IP": "成本: {{ format(FORMS.replicator.gen.cost(x)) }} IP",
    "Require: Max of Infinity Replicanti": "要求：最大无限复制品",
    "You have Infinitied in {{ format(player.inf.times, 0) }} times.": "你无限了 {{ format(player.inf.times, 0) }} 次.",
    "You need to complete thier challenges, then unlock Break Infinity": "您需要完成他们的挑战，然后解锁 打破无限",
    "You played {{ format(player.time) }} seconds.": "你玩了 {{ format(player.time) }} 秒.",
    "Your best Replicanti is {{ format(player.stats.best_rep) }}": "你的最佳复制品是 {{ format(player.stats.best_rep) }}",
    "Goal: {{ CHALS.inf[x].goal }} Replicanti": "目标: {{ CHALS.inf[x].goal }} 复制品",
    "Infinity Challenge {{x}} best time - {{ format(player.stats.chals_best['inf'+x]) }} seconds": "无限挑战 {{x}} 最佳时间 - {{ format(player.stats.chals_best['inf'+x]) }} 秒",
    "Best total time of Infinity Challenges - {{ format(CHALS.sumTotal().inf) }} seconds": "无限挑战最佳总计时间 - {{ format(CHALS.sumTotal().inf) }} 秒",
    "Require: {{ format(1e64) }} Infinity points": "要求: {{ format(1e64) }} 无限点",
    "Require: {{ format(FORMS.replicanti.galaxy.req()) }} replicanti": "要求: {{ format(FORMS.replicanti.galaxy.req()) }} 复制品",
    "Need to reach {{ format(1.79e308) }} replicanti to Infinity.": "需要达到 {{ format(1.79e308) }} 复制品 到 无限.",
    "Need to reach {{ format(1.79e308) }} replicanti to unlock.": "需要达到 {{ format(1.79e308) }} 复制品 到 解锁.",
    "Your fastest Infinity in {{ format(player.inf.best) }} seconds.": "你最快达到无限的时间是 {{ format(player.inf.best) }} 秒.",
    "Your fastest Replicanti growth is x{{ format(player.stats.fast_grow) }}": "你最快的 复制品 增长是 x{{ format(player.stats.fast_grow) }}",
    "Your have spent {{ format(player.inf.time) }} seconds in this infinity.": "本次无限你用了 {{ format(player.inf.time) }} 秒.",
    "Main": "主要的",
    "Meta-Prestige": "元声望",
    "mmm, delicious": "嗯，好吃",
    "Need to reach {{ format(2**256) }} replicanti to unlock.": "需要达到 {{ format(2**256) }} 副本才能解锁。",
    "New Challenger": "新挑战者",
    "No Inflation": "没有通货膨胀",
    "NOICE": "诺斯",
    "Prestige capped?!": "声望封顶？！",
    "Replicanti Incremental Prototype v0.2.2.1 - made by MrRedShark77": "复制品增量 原型 v0.2.2.1 - 由 MrRedShark77 制作",
    "Replicanti^2": "复制品^2",
    "Replicator Tier {{ x }} ({{ format(player.replicator.gens[x].bought,0) }}) ^{{ format(FORMS.replicator.gen.power(x)) }}": "复制品层 {{ x }} ({{ format(player.replicator.gens[x].bought,0) }}) ^{{ format(FORMS.replicator.gen.power(x)) }}",
    "Rock isn't smarter than you think": "摇滚并没有你想象的那么聪明",
    "Sacrifice without galaxies?": "没有星系的牺牲？",
    "Taking longer": "花费更长的时间",
    "Timewall again?": "又是时光墙？",
    "Try Hard": "努力",
    "When sacrifice galaxies": "当牺牲星系",
    "Why i'm added cap?": "为什么我加了上限？",
    "Yes Inflation": "是的 通货膨胀",
    "You doesn't fit Infinity": "你不适合无限",
    "Anti-Galaxy": "反银河",
    "Best total time of Challenges - {{ format(CHALS.sumTotal().normal) }} seconds": "最佳挑战总时间 - {{ format(CHALS.sumTotal().normal) }} 秒",
    "Buffer Galaxy": "缓冲银河",
    "Challenge {{x}} best time - {{ format(player.stats.chals_best['normal'+x]) }} seconds": "挑战 {{x}} 最佳时间 - {{ format(player.stats.chals_best['normal'+x]) }} 秒",
    "Challenge Boy": "挑战男孩",
    "Challenged Master": "挑战大师",
    "Did get galaxy faster?": "获得星系更快了吗？",
    "Dimensional Sacrifice": "次元牺牲",
    "Double Galaxy": "双银河",
    "EXE.exe has stopped working": "EXE.exe 已停止工作",
    "Fastest life on life": "生命中最快的生命",
    "Get Started": "开始使用",
    "God Grief": "上帝的悲伤",
    "Got'em about happy?": "让他们开心吗？",
    "HA GO BRRR": "哈去BRRR",
    "Hardened Replicanti": "硬化复制品",
    "Hear about AD sound?": "听说过 AD 声音吗？",
    "Infinity go brrr": "无限到 brrr",
    "Infinity Halfway": "无限中途",
    "INFINITY PAGE": "无限页",
    "Inflation": "通货膨胀",
    "Infinity Replicanti": "无限复制品",
    "Prestige": "声望",
    "Prestige points boosts itself.": "声望点数会自我提升。",
    "Prestige upgrade 5 is raised by Replicanti Galaxy.": "复制品星系 提升了 声望升级5。",
    "Prestige upgrade 8 can boost Prestige upgrade 9.": "声望升级8 可以 提升 声望升级9。",
    "Repeated Replicanti is twice stronger.": "重复复制品 增强两倍。",
    "Replicanti Galaxy is 1.5% stronger for every OoM of Replicanti.": "复制品 的每个 OoM 都会使 复制品星系 增强 1.5%。",
    "Replicanti Galaxy is stronger based on unspent Prestige points.": "复制品星系 基于未使用的声望点数更强。",
    "Replicanti Galaxy no longer resets anything.": "复制品星系 不再重置任何东西。",
    "Replicanti Multiplier is twice effective.": "复制品乘数 效果翻倍。",
    "Replicanti Multiplier/Power is stronger based on unspent Prestige points.": "复制品乘数/力量 基于未使用的 声望 点数增强。",
    "Replicanti Slowdown starts later based on unspent Prestige points.": "复制品减速 会基于未使用的声望点数 之后开始。",
    "Replicanti Penalty is 25% weaker.": "复制品惩罚降低了 25%。",
    "Replicanti Slowdown starts ^1.15 later.": "复制品减速晚了 ^1.15 才开始。",
    "Replicanti Slowdown starts 1.15x later for every OoM of Replicanti.": "对于复制品的每个OoM, 复制品减速晚了 1.15x 才开始",
    "Replicanti Multiplier/Power scales stronger": "复制品 乘数/功率规模更强",
    "Replicanti Penalty is 50% stronger": "复制品惩罚 增强 50%",
    "Replicanti Power autobuyer": "复制品力量 自动购买者",
    "Replicanti Storage autobuyer": "复制品存储 自动购买者",
    "Running": "运行中",
    "You cannot buy Replicanti Multiplier, and Replicanti growth starts 2x": "您无法购买 复制品乘数，并且复制品成长 初始 2x",
    "Autobuyers": "自动购买者",
    "Challenges": "挑战",
    "Complete challenge 3 to unlock.": "完成挑战 3 即可解锁。",
    "Complete challenge 4 to unlock.": "完成挑战 4 即可解锁。",
    "Complete challenge 5 to unlock.": "完成挑战 5 即可解锁。",
    "Infinity": "无限",
    "Infinity Replicanti Multiplier": "无限复制乘数",
    "Prestige points gain are raised by 0.85": "声望点数增加 0.85",
    "Repeated Replicanti autobuyer": "重复的 Replicanti 自动购买者",
    "Repeated Replicanti boost Replicanti Multiplier/Power instead of Replicanti Storage, but Repeated Replicanti are 4x stronger": "重复复制品 提升 复制品乘数/力量 而不是 复制品存储，但重复复制品 增强 4 倍",
    "Replicanti Galaxy autobuyer": "复制品星系 自动购买者",
    "Replicanti Galaxy scales stronger": "复制品星系 缩放更强",
    "Replicanti Multiplier autobuyer": "复制品乘数 自动购买者",
    "奖励: Unlock Repeated Replicanti autobuyer": "奖励:解锁重复复制品自动购买者",
    "奖励: Unlock Replicanti Galaxy autobuyer": "奖励:解锁复制品星系自动购买者",
    "奖励: Unlock Replicanti Multiplier autobuyer": "奖励:解锁复制品乘数自动购买者",
    "奖励: Unlock Replicanti Power autobuyer": "奖励:解锁复制品力量自动购买者",
    "奖励: Unlock Replicanti Storage autobuyer": "奖励:解锁复制品存储自动购买者",
    "奖励: You gain 100% of your Prestige points gained on reset each second": "奖励:你每秒获得 100% 重置时获得的声望点数",
    "All previous challenges at once": "一次完成所有以前的挑战",
    "Break Infinity": "打破无限",
    "Challenge Records": "挑战记录",
    "Fix Infinity": "修复无穷大",
    "Infinity Challenges": "无限挑战",
    "Infinity Compressor autobuyer": "无限压缩机自动购买者",
    "Infinity Compressors adds free Infinity Replicanti Multipliers, and Infinity Compressor debuff is 50% weaker.": "无限压缩机 添加了免费的 无限复制乘数，无限压缩器减益 减弱了 50%。",
    "Infinity Compressors boosts Prestige points gain.": "无限压缩机 可提高声望点数。",
    "Infinity points is boosted by Prestige points.": "无限点数由声望点数提升。",
    "Infinity Replicanti effects are disabled": "无限复制品 效果被禁用",
    "Infinity Replicanti Multiplier cost scales weaker.": "无限复制品乘数 成本规模较弱。",
    "Infinity upgrade 11 be stronger by Replicator.": "无限升级 11 通过 复制器 变得更强大。",
    "Infinity upgrade 7 softcaps instead of hardcaps.": "无限 升级了 7 个 软上限 而不是 硬上限。",
    "Keep Prestige upgrades on reset. Infinity Replicanti Multiplier is stronger based on Replicanti.": "在重置时保持声望升级。 无限复制品乘数 基于 复制品 更强。",
    "Remove effect softcap from Infinity Replicanti.": "从 无限复制品 移除效果软上限。",
    "Remove Replicanti Slowdown limit softcap.": "移除 复制品 减速限制软上限。",
    "Replicant Galaxy is disabled, but you can sacrifice Replicanti": "复制品星系 被禁用，但你可以牺牲 复制品",
    "Replicanti galaxy formula is better.": "Replicanti 星系公式更好。",
    "Replicanti Growth hardcap starts later based on Replicanti.": "复制品成长硬上限 稍后基于 复制品 开始。",
    "Replicanti Penalty, Replicanti Slowdown is twice stronger": "复制品惩罚，复制品 减速效果加倍",
    "Replicanti Sacrifice autobuyer": "Replicanti Sacrifice 自动购买者",
    "Replicanti Sacrifice boost Infinity points gain.": "复制品牺牲 提升无限点增益。",
    "Replicanti Sacrifice is disabled": "复制品牺牲 已禁用",
    "Replicanti Slowdown is 15% weaker.": "复制品 减速减弱 15%。",
    "Replicanti Slowdown starts later based on unspent Infinity points.": "复制品 减速会根据未使用的 无限 点数稍后开始。",
    "Replicanti Slowdown^2 starts later based on unspent Prestige points.": "复制品 减速^2 会根据未使用的声望点数稍后开始。",
    "Replicator": "复制器",
    "Replicator boosts Infinity points gain.": "复制器提高了无限点增益。",
    "You cannot buy Prestige upgrades except 1 and 2 row": "除了 1 行和 2 行之外，您不能购买 声望 升级",
    "Prestige upgrade 10 formula is better.": "声望升级10公式更好。",
    "Replicanti Galaxy is cheaper based on Replicanti.": "复制品星系 基于 复制品 更便宜。",
    "Replicanti Sacrifice boost Prestige points gain.": "复制品牺牲 提升声望点增益。",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    '': '',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Currently: ": "当前: ",
    "Reward: ": "奖励: ",
    "Multiple Replicanti growth by ": "乘以 复制品 成长",
    "Multiple Infinity Replicanti growth by ": "批量无限复制品 增长 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\^([\d\.]+) \-\> \^([\d\.]+)$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^([\d\.]+)x.$/,
    /^([\d\.]+) OoMs$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^当前: ([\d\.]+)e([\d\.,]+)x$/,
    /^成本: ([\d\.]+)e([\d\.]+)e([\d\.,]+) 复制品$/,
    /^当前: \/([\d\.]+)e([\d\.,]+)$/,
    /^当前: \/([\d\.]+)e([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x.$/,
    /^([\d\.]+)e([\d\.,]+) OoMs$/,
    /^e([\d\.]+)e([\d\.,]+)x$/,
    /^e([\d\.]+)e([\d\.,]+) \/ e([\d\.]+)e([\d\.,]+)$/,
    /^xe([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^当前: (.+) stronger$/, '当前： 增强 $1'],
    [/^当前: (.+) later$/, '当前： x$1 随后'],
    [/^Make Replicanti penalty starts (.+)x later.$/, '使 复制品 的惩罚在 $1x 之后开始。'],
    [/^Make Replicanti Storage is (.+)x stronger based on replicanti.$/, '使 复制品 存储基于 复制品 增强 $1x。'],
    [/^Make Replicanti growth is (.+) stronger.$/, '使 复制品 成长增强 $1。'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) Prestige points$/, '成本：$1 声望点数'],
    [/^Cost: (.+) Infinity points$/, '成本：$1 无限点数'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) \/ (.+) elves$/, '成本：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);