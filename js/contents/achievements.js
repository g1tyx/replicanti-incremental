const ACHS = {
    unl(id) {
        if (!player.achs.includes(id)) {
            player.achs.push(id)
            $.notify(this.names[id], 'success')
        }
    },
    has(id) { return player.achs.includes(id) },
    getText(id) {
        let txt = this.descs[id]+(this.rewards[id] !== undefined ? " Reward: "+this.rewards[id] : "")
        if (txt.indexOf("format") != -1) {
			let txt2 = txt.split("format")[1];
			return txt.split("format")[0] + format(txt2.slice(1, txt2.indexOf(")"))) + txt2.split(")")[1];
		}
        return txt
    },
    checkACHS() {
        for (let r = 1; r <= this.rows; r++) for (let c = 1; c <= this.cols; c++) if (this.checks[r*10+c] !== undefined ? this.checks[r*10+c]() : false) this.unl(r*10+c)
    },
    cols: 8,
    rows: 5,

    names: {
        0: "Placeholder",

        11: "Get Started",
        12: "You doesn't fit Infinity",
        13: "Did get galaxy faster?",
        14: "Double Galaxy",
        15: "Inflation",
        16: "When sacrifice galaxies",
        17: "Buffer Galaxy",
        18: "Infinity Halfway",

        21: "INFINITY PAGE",
        22: "Why i'm added cap?",
        23: "Taking longer",
        24: "Sacrifice without galaxies?",
        25: "Rock isn't smarter than you think",
        26: "Infinity go brrr",
        27: "Try Hard",
        28: "Prestige capped?!",

        31: "NOICE",
        32: "HA GO BRRR",
        33: "Anti-Galaxy",
        34: "New Challenger",
        35: "Timewall again?",
        36: "Challenge Boy",
        37: "Got'em about happy?",
        38: "Replicanti^2",

        41: "Challenged Master",
        42: "Meta-Prestige",
        43: "Fastest life on life",
        44: "Dimensional Sacrifice",
        45: "Hear about AD sound?",
        46: "God Grief",
        47: "No Inflation",
        48: "Yes Inflation",

        51: "mmm, delicious",
        52: "EXE.exe has stopped working",
        54: "Hardened Replicanti",
    },
    descs: {
        0: "Placeholder.",

        11: "购买复制品乘数.",
        12: "达到 format(1e6) 复制.",
        13: "获得银河复制品.",
        14: "获得两个银河复制品.",
        15: "至少获得 format(1e10)x 复制品 成长.",
        16: "执行声望.",
        17: "获得 10 个复制品星系.",
        18: "达到至少 format(1.3407807929942597e154) 复制品.",

        21: "达到无限.",
        22: "获得无限压缩机.",
        23: "获得至少 5 个 无限压缩机.",
        24: "在没有复制品星系的情况下声望.",
        25: "完成任意挑战.",
        26: "10分钟内 达到无限.",
        27: "完成全部挑战.",
        28: "获得 format(1e20) 声望点，在没有打破无限的情况下.",

        31: "达到 format(6.9e420) 复制品.",
        32: "10秒内 达到无限.",
        33: "达到无限 在没有复制品星系的情况下.",
        34: "解锁无限挑战.",
        35: "完成任意无限挑战.",
        36: "在 1 分钟内获得所有挑战时间的总和.",
        37: "获得 ^format(1000) 复制品牺牲.",
        38: "达到 format(9.9999e999) 复制品.",

        41: "完成全部无限挑战.",
        42: "获得 format(1.798e308) 声望点.",
        43: "1秒内 达到无限.",
        44: "完成 无限挑战2 在没有牺牲复制品的情况下.",
        45: "购买 复制器 层 1.",
        46: "达到至少 format(e2000) 复制品，在没有复制品星系，牺牲的情况下.",
        47: "达到 format(ee4) 复制品.",
        48: "达到 format(ee6) 复制器.",

        51: "购买 复制器 层 4.",
        52: "达到至少 format(e4200) 在没有复制品星系，牺牲的情况下，在无限挑战 1 的时候.",
        54: "达到至少 format(ee4) 无限复制品.",
    },
    rewards: {
        21: "开局就有 format(1e5) 复制品.",
        22: "复制品星系 is 50%.",
        24: "复制品星系增强 is 25%.",
        26: "开局就有 format(1e10) 复制品.",
        27: "双倍无限点增益.",

        32: "开局就有 format(1e50) 复制品.",
        34: "复制品 升级不再花费 复制品。",
        37: "复制品牺牲不再重置复制品.",
        38: "复制品 增长增强基于 复制品 以降低的速率.",

        43: "开局就有 format(1e100) 复制品.",
        47: "你为什么想看到通货膨胀？ 不...",
        48: "解锁无限压缩器自动购买者.",

        52: "复制品星系 & 牺牲增强 50%.",
        54: "无限复制品 的成长增强了 50%。",
    },
    checks: {
        11() { return player.rep_upgs[2].gte(1) },
        12() { return player.replicanti.gte(1e6) },
        13() { return player.rep_galaxy.gte(1) },
        14() { return player.rep_galaxy.gte(2) },
        15() { return player.stats.fast_grow.gte(1e10) },
        17() { return player.rep_galaxy.gte(10) },
        18() { return player.replicanti.gte(2**512) },

        22() { return player.inf.comp.gte(1) },
        23() { return player.inf.comp.gte(5) },
        26() { return player.inf.best < 600 },
        27() { return player.chals.comps.includes("normal1") 
        && player.chals.comps.includes("normal2") 
        && player.chals.comps.includes("normal3") 
        && player.chals.comps.includes("normal4") 
        && player.chals.comps.includes("normal5") 
        && player.chals.comps.includes("normal6") },
        28() { return player.prestige.points.gte(1e20) },

        31() { return player.replicanti.gte("6.9e420") },
        32() { return player.inf.best < 10 },
        34() { return player.chals.inf_unls > 0 },
        36() { return CHALS.sumTotal().normal <= 60 },
        37() { return player.rep_sacrifice.gte(1e3) },
        38() { return player.replicanti.gte("9.9999e999") },

        41() { return player.chals.comps.includes("inf1") 
        && player.chals.comps.includes("inf2") 
        && player.chals.comps.includes("inf3") 
        && player.chals.comps.includes("inf4") 
        && player.chals.comps.includes("inf5") 
        && player.chals.comps.includes("inf6") },
        42() { return player.prestige.points.gte(FORMS.INF) },
        43() { return player.inf.best < 1 },
        45() { return player.replicator.gens[1].bought.gte(1) },
        46() { return player.replicanti.gte('e2000') && player.rep_galaxy.lte(0) && player.rep_sacrifice.lte(1) },
        47() { return player.replicanti.gte("ee4") },
        48() { return player.replicator.amount.gte("ee6") },

        51() { return player.replicator.gens[4].bought.gte(1) },
        52() { return player.replicanti.gte('e4200') && player.rep_galaxy.lte(0) && player.rep_sacrifice.lte(1) && CHALS.onChal('inf1') },
        54() { return player.inf.replicanti.gte('ee4') },
    }
}