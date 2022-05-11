const UPGS = {
    replicanti: {
        cols: 4,
        can(x) { return player.replicanti.gte(this[x].cost()) && (x == 2 ? !(CHALS.onChal("normal2") || CHALS.onChal("inf1")) : true) },
        buy(x) {
            if (this.can(x)) {
                if (!ACHS.has(34)) player.replicanti = player.replicanti.sub(this[x].cost()).max(1)
                player.rep_upgs[x] = player.rep_upgs[x].add(1)
            }
        },
        buyMax() {
            for (let x = 1; x <= this.cols; x++) this.max(x)
        },
        max(x) {
            if (this.can(x)) {
                let bulk = this[x].bulk()
                if (bulk.gt(player.rep_upgs[x])) {
                    if (!ACHS.has(34)) player.replicanti = player.replicanti.sub(this[x].cost(bulk.sub(1))).max(1)
                    player.rep_upgs[x] = bulk
                }
            }
        },
        1: {
            id: 1,
            title: "Replicanti Storage",
            cost(x=player.rep_upgs[this.id]) { return E(2).pow(x.pow(1.5)).mul(10) },
            effect(x=player.rep_upgs[this.id]) {
                let ret = E(2).mul(FORMS.replicanti.galaxy.effect()).mul(FORMS.inf.replicanti.effect()).softcap(10,1/2,0).mul(CHALS.onChal("normal4") || CHALS.onChal("inf1") ? 1 : UPGS.replicanti[4].effect()).pow(x)
                return ret
            },
            desc(eff=this.effect()) { return `Make Replicanti penalty starts ${format(eff)}x later.` },
            bulk(x=player.replicanti) {
                if (x.div(10).lt(1)) return E(0)
                let bulk = x.div(10).logBase(2).root(1.5).add(1).floor()
                return bulk
            },
        },
        2: {
            id: 2,
            title: "Replicanti Multiplier",
            cost(x=player.rep_upgs[this.id]) { return E(10).pow(x.pow(1.5).pow(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1)) },
            effect(x=player.rep_upgs[this.id]) {
                let lvl = x.mul(FORMS.replicanti.galaxy.effect()).mul(FORMS.inf.replicanti.effect()).mul(CHALS.onChal("normal4") || CHALS.onChal("inf1") ? UPGS.replicanti[4].effect() : 1)
                if (player.prestige.upgrades.includes(11)) lvl = lvl.mul(2)
                if (player.prestige.upgrades.includes(12)) lvl = lvl.pow(UPGS.prestige[12].effect())
                return lvl.div(5).add(1)
            },
            desc(eff=this.effect()) { return `Multiple Replicanti growth by ${format(eff)}x.` },
            bulk(x=player.replicanti) {
                let bulk = x.logBase(10).root(1.5).root(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1).add(1).floor()
                return bulk
            },
        },
        3: {
            id: 3,
            title: "Replicanti Power",
            cost(x=player.rep_upgs[this.id]) { return E(10).pow(x.pow(2).pow(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1)).mul(1000) },
            effect(x=player.rep_upgs[this.id]) {
                let lvl = x.mul(FORMS.inf.replicanti.effect()).mul(CHALS.onChal("normal4") || CHALS.onChal("inf1") ? UPGS.replicanti[4].effect() : 1)
                if (player.prestige.upgrades.includes(12)) lvl = lvl.pow(UPGS.prestige[12].effect())
                return lvl.div(5).mul(FORMS.replicanti.galaxy.effect()).add(1).softcap(100,1/3,0).softcap(1000,1/3,0)
            },
            desc(eff=this.effect()) { return `Make Replicanti growth is ^${format(eff)} stronger.` },
            bulk(x=player.replicanti) {
                if (x.div(1000).lt(1)) return E(0)
                let bulk = x.div(1000).logBase(10).root(2).root(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1).add(1).floor()
                return bulk
            },
        },
        4: {
            id: 4,
            title: "Repeated Replicanti",
            cost(x=player.rep_upgs[this.id]) { return E(10).pow(x.pow(2)).mul(1e16) },
            effect(x=player.rep_upgs[this.id]) {
                let ret = player.replicanti.log10().mul(x).mul(FORMS.replicanti.galaxy.effect()).mul(FORMS.inf.replicanti.effect()).add(1).root(10)
                if (player.prestige.upgrades.includes(22)) ret = ret.pow(2)
                if (CHALS.onChal("normal4") || CHALS.onChal("inf1")) ret = ret.pow(4)
                return ret
            },
            desc(eff=this.effect()) { return `Make Replicanti Storage is ${format(eff)}x stronger based on replicanti.` },
            bulk(x=player.replicanti) {
                if (x.div(1e16).lt(1)) return E(0)
                let bulk = x.div(1e16).logBase(10).root(2).add(1).floor()
                return bulk
            },
        },
    },
    prestige: {
        cols: 4,
        rows: 4,
        can(x) { return player.prestige.points.gte(this[x].cost) && !player.prestige.upgrades.includes(x)
        && (CHALS.onChal("inf6") ? x <= 24 : true) },
        buy(x) {
            if (this.can(x)) {
                player.prestige.points = player.prestige.points.sub(this[x].cost)
                player.prestige.upgrades.push(x)
            }
        },
        11: {
            unl() { return true },
            desc: "Replicanti Multiplier is twice effective.",
            cost: E(1),
        },
        12: {
            unl() { return true },
            desc: "Replicanti Multiplier/Power is stronger based on unspent Prestige points.",
            cost: E(3),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1).root(2)
                return ret
            },
            effDesc(eff=this.effect()) { return "^"+format(eff) },
        },
        13: {
            unl() { return true },
            desc: "Replicanti Penalty is 25% weaker.",
            cost: E(10),
        },
        14: {
            unl() { return true },
            desc: "Replicanti Galaxy no longer resets anything.",
            cost: E(25),
        },
        21: {
            unl() { return true },
            desc: "Replicanti Slowdown starts later based on unspent Prestige points.",
            cost: E(100),
            effect() {
                let ret = player.prestige.points.add(1).pow(2)
                if (player.prestige.upgrades.includes(24)) ret = ret.pow(UPGS.prestige[24].effect())
                return ret.softcap(1e40,1/3,0).softcap('ee4',1/3,0).softcap('e1.6e4',0.8,0,true)
            },
            effDesc(eff=this.effect()) { return "x"+format(eff)+" later" },
        },
        22: {
            unl() { return true },
            desc: "Repeated Replicanti is twice stronger.",
            cost: E(2.5e3),
        },
        23: {
            unl() { return true },
            desc: "Replicanti Galaxy is stronger based on unspent Prestige points.",
            cost: E(2.5e4),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1).pow(0.6)
                return ret.softcap(11,0.5,0)
            },
            effDesc(eff=this.effect()) { return format(eff.sub(1).mul(100))+"% stronger" },
        },
        24: {
            unl() { return true },
            desc: "Prestige upgrade 5 is raised by Replicanti Galaxy.",
            cost: E(5e5),
            effect() {
                let ret = player.rep_galaxy.add(1).root(3)
                return ret
            },
            effDesc(eff=this.effect()) { return "^"+format(eff) },
        },
        31: {
            unl() { return true },
            desc: "Replicanti Slowdown starts 1.15x later for every OoM of Replicanti.",
            cost: E(1e7),
            effect() {
                let ret = E(1.15).pow(player.replicanti.log10().softcap(FORMS.INF.log10(), 1/2, 0))
                if (player.prestige.upgrades.includes(41) && player.prestige.upgrades.includes(24)) ret = ret.pow(UPGS.prestige[24].effect())
                return ret
            },
            effDesc(eff=this.effect()) { return "x"+format(eff)+" later" },
        },
        32: {
            unl() { return true },
            desc: "Prestige points boosts itself.",
            cost: E(1e9),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1).pow(2)
                if (player.prestige.upgrades.includes(42)) ret = player.prestige.points.add(1).root(4)
                return ret
            },
            effDesc(eff=this.effect()) { return "x"+format(eff) },
        },
        33: {
            unl() { return true },
            desc: "Replicanti Slowdown starts ^1.15 later.",
            cost: E(1e10),
        },
        34: {
            unl() { return true },
            desc: "Replicanti Galaxy is 1.5% stronger for every OoM of Replicanti.",
            cost: E(5e12),
            effect() {
                let ret = E(0.015).mul(player.replicanti.log10()).add(1)
                return ret.softcap(11,0.5,0)
            },
            effDesc(eff=this.effect()) { return format(eff.sub(1).mul(100))+"% stronger" },
        },
        41: {
            unl() { return true },
            desc: "Prestige upgrade 8 can boost Prestige upgrade 9.",
            cost: E(1e14),
        },
        42: {
            unl() { return player.breakInf },
            desc: "Prestige upgrade 10 formula is better.",
            cost: E(1e36),
        },
        43: {
            unl() { return player.breakInf },
            desc: "Replicanti Galaxy is cheaper based on Replicanti.",
            cost: E(1e54),
            effect() {
                let ret = player.replicanti.root(4)
                return ret.softcap("e1500",0.5,0)
            },
            effDesc(eff=this.effect()) { return "/"+format(eff) },
        },
        44: {
            unl() { return player.breakInf && FORMS.replicanti.sacrifice.unl() },
            desc: "Replicanti Sacrifice boost Prestige points gain.",
            cost: E(1e120),
            effect() {
                let ret = E(2).pow(player.rep_sacrifice.pow(0.625))
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
    },
    inf_rep: {
        cols: 1,
        can(x) { return player.inf.points.gte(this[x].cost()) },
        buy(x) {
            if (this.can(x)) {
                player.inf.points = player.inf.points.sub(this[x].cost())
                player.inf_rep_upgs[x] = player.inf_rep_upgs[x].add(1)
            }
        },
        buyMax() {
            for (let x = 1; x <= this.cols; x++) if (this.can(x)) {
                let bulk = this[x].bulk()
                if (bulk.gt(player.rep_upgs[x])) {
                    player.replicanti = player.replicanti.sub(this[x].cost(bulk.sub(1)))
                    player.rep_upgs[x] = bulk
                }
            }
        },
        1: {
            id: 1,
            title: "Infinity Replicanti Multiplier",
            cost(x=player.inf_rep_upgs[this.id]) { return E(1.5).pow(x.pow(player.inf.upgrades.includes(42)?1.25:1.5)).floor() },
            effect(x=player.inf_rep_upgs[this.id]) {
                let lvl = x
                if (player.inf.upgrades.includes(32)) lvl = lvl.add(UPGS.post_inf[32].effect())
                if (player.inf.upgrades.includes(13)) lvl = lvl.mul(UPGS.post_inf[13].effect())
                return lvl.mul(0.01).add(1)
            },
            desc(eff=this.effect()) { return `Multiple Infinity Replicanti growth by ${format(eff)}x.` },
            bulk(x=player.replicanti) {
                if (x.lt(1)) return E(0)
                let bulk = x.logBase(1.5).root(player.inf.upgrades.includes(42)?1.25:1.5).add(1).floor()
                return bulk
            },
        },
    },
    post_inf: {
        cols: 4,
        rows: 4,
        can(x) { return player.inf.points.gte(this[x].cost) && !player.inf.upgrades.includes(x) },
        buy(x) {
            if (this.can(x)) {
                player.inf.points = player.inf.points.sub(this[x].cost)
                player.inf.upgrades.push(x)
            }
        },
        11: {
            unl() { return true },
            desc: "Replicanti Slowdown starts later based on unspent Infinity points.",
            cost: E(100),
            effect() {
                let ret = player.inf.points.add(1).pow(20)
                return ret.softcap(1e100,1/3,0)
            },
            effDesc(eff=this.effect()) { return "x"+format(eff)+" later" },
        },
        12: {
            unl() { return true },
            desc: "Infinity points is boosted by Prestige points.",
            cost: E(500),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1)
                return ret
            },
            effDesc(eff=this.effect()) { return "x"+format(eff) },
        },
        13: {
            unl() { return true },
            desc: "Keep Prestige upgrades on reset. Infinity Replicanti Multiplier is stronger based on Replicanti.",
            cost: E(2.5e4),
            effect() {
                let ret = player.replicanti.log10().add(1).log10().add(1)
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x stronger" },
        },
        14: {
            unl() { return true },
            desc: "Replicanti Slowdown is 15% weaker.",
            cost: E(2.5e5),
        },
        21: {
            unl() { return true },
            desc: "Replicanti galaxy formula is better.",
            cost: E(1e7),
        },
        22: {
            unl() { return FORMS.replicanti.sacrifice.unl() },
            desc: "Replicanti Sacrifice boost Infinity points gain.",
            cost: E(5e9),
            effect() {
                let ret = E(2).pow(player.rep_sacrifice.pow(0.3))
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
        23: {
            unl() { return true },
            desc: "Replicanti Growth hardcap starts later based on Replicanti.",
            cost: E(1e13),
            effect() {
                let ret = player.replicanti
                if (!player.inf.upgrades.includes(44)) ret = ret.min("e5000")
                else ret = ret.softcap('e5000',1/5,0)
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x later" },
        },
        24: {
            unl() { return true },
            desc: "Remove effect softcap from Infinity Replicanti.",
            cost: E(1e18),
        },
        31: {
            unl() { return true },
            desc: "Remove Replicanti Slowdown limit softcap.",
            cost: E(1e20),
        },
        32: {
            unl() { return true },
            desc: "Infinity Compressors adds free Infinity Replicanti Multipliers, and Infinity Compressor debuff is 50% weaker.",
            cost: E(1e33),
            effect() {
                let ret = player.inf.comp
                return ret
            },
            effDesc(eff=this.effect()) { return "+"+format(eff,0) },
        },
        33: {
            unl() { return true },
            desc: "Replicanti Slowdown^2 starts later based on unspent Prestige points.",
            cost: E(1e44),
            effect() {
                let ret = player.prestige.points.add(1)
                if (player.inf.upgrades.includes(43)) ret = ret.pow(UPGS.post_inf[43].effect())
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x later" },
        },
        34: {
            unl() { return true },
            desc: "Infinity Compressors boosts Prestige points gain.",
            cost: E(1e63),
            effect() {
                let ret = E(10).pow(player.inf.comp.pow(1.5).mul(2).softcap(1e3,0.5,0))
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
        41: {
            unl() { return player.replicator.unl },
            desc: "Replicator boosts Infinity points gain.",
            cost: E(5e64),
            effect() {
                let ret = player.replicator.amount.log10().mul(2).add(1)
                return ret.softcap(1e10,0.5,0)
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
        42: {
            unl() { return player.replicator.unl },
            desc: "Infinity Replicanti Multiplier cost scales weaker.",
            cost: E(1e83),
        },
        43: {
            unl() { return player.replicator.unl },
            desc: "Infinity upgrade 11 be stronger by Replicator.",
            cost: E(1e86),
            effect() {
                let ret = player.replicator.amount.log10().add(1).log10().add(1).root(3)
                return ret
            },
            effDesc(eff=this.effect()) { return "^"+format(eff) },
        },
        44: {
            unl() { return player.replicator.unl },
            desc: "Infinity upgrade 7 softcaps instead of hardcaps.",
            cost: E(1e120),
        },
    },
}