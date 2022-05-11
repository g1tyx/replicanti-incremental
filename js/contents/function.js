const FORMS = {
    quarterINF: E(2).pow(256),
    INF: E(2).pow(1024),
    secretMessage(msg, seen=true) { return seen ? msg : "???" },
    calc_OoM(x) { return E(x).max(0).log10() },
    replicanti: {
        growth() {
            let gain = UPGS.replicanti[2].effect()
            if (CHALS.onChal("normal2") || CHALS.onChal("inf1")) gain = E(2)
            if (this.sacrifice.unl()) gain = gain.pow(player.rep_sacrifice)
            gain = gain.pow(UPGS.replicanti[3].effect())
            if (ACHS.has(38)) gain = gain.pow(player.replicanti.log10().add(1).log10().add(1))
            return gain.root(this.penalty()).min(this.cap())
        },
        cap() {
            let a = FORMS.INF
            if (player.inf.upgrades.includes(23)) a = a.mul(UPGS.post_inf[23].effect())
            return a
        },
        limit() {
            let limit = E(10).mul(UPGS.replicanti[1].effect())
            return limit
        },
        penalty(x = player.replicanti) {
            if (x.lt(this.limit())) return E(1)
            let a = x.logBase(this.limit())
            a = a.add(1).pow(a).pow(this.superPenalty()).pow(this.hyperPenalty())
            if (player.prestige.upgrades.includes(13)) a = a.pow(0.75)
            if (player.chals.comps.includes("inf3")) a = a.pow(0.75)
            if (CHALS.onChal("normal1") || CHALS.onChal("inf1")) a = a.pow(1.5)
            if (CHALS.onChal("inf3")) a = a.pow(2)
            return a.max(1)
        },
        superLimit() {
            let a = FORMS.quarterINF
            if (player.prestige.upgrades.includes(21)) a = a.mul(UPGS.prestige[21].effect())
            if (player.prestige.upgrades.includes(31)) a = a.mul(UPGS.prestige[31].effect())
            if (player.inf.upgrades.includes(11)) a = a.mul(UPGS.post_inf[11].effect())
            if (player.prestige.upgrades.includes(33)) a = a.pow(1.15)
            if (!player.inf.upgrades.includes(31)) a = a.softcap("e2000",0.5,0)
            return a.max(1)
        },
        superPenalty(x = player.replicanti) {
            if (x.lt(this.superLimit())) return E(1)
            let a = x.logBase(this.superLimit())
            if (a.lte(1)) return E(1)
            a = a.pow(2).mul(3).pow(a).pow(this.hyperPenalty())
            if (CHALS.onChal("inf3")) a = a.pow(2)
            if (player.inf.upgrades.includes(14)) a = a.pow(0.85)
            return a
        },
        hyperLimit() {
            let a = E(2).pow(E(2).pow(15))
            if (player.inf.upgrades.includes(33)) a = a.mul(UPGS.post_inf[33].effect())
            return a
        },
        hyperPenalty(x = player.replicanti) {
            if (x.lt(this.hyperLimit())) return E(1)
            let a = x.logBase(this.hyperLimit())
            a = a.pow(a.mul(2))
            return a.max(1)
        },

        galaxy: {
            req(x=player.rep_galaxy) { return E(1e6).pow(x.pow(1.25).pow(CHALS.onChal("normal5") || CHALS.onChal("inf1")?4/3:1)).mul(1e12)
            .div(player.prestige.upgrades.includes(43) ? UPGS.prestige[43].effect() : 1).max(1) },
            can() { return player.replicanti.gte(this.req()) && !CHALS.onChal("inf2") },
            reset(bulk=false) {
                if (this.can()) {
                    if (bulk && this.bulk().gt(player.rep_galaxy)) {
                        player.rep_galaxy = this.bulk()
                    } else player.rep_galaxy = player.rep_galaxy.add(1)
                    if (!player.prestige.upgrades.includes(14)) this.onReset()
                }
            },
            onReset(force=false) {
                player.replicanti = E(1)
                if (ACHS.has(21) && !force) player.replicanti = E(1e5)
                if (ACHS.has(26) && !force) player.replicanti = E(1e10)
                if (ACHS.has(32) && !force) player.replicanti = E(1e50)
                if (ACHS.has(43) && !force) player.replicanti = E(1e100)
                player.rep_sacrifice = E(1)
                for (let x = 1; x <= UPGS.replicanti.cols; x++) player.rep_upgs[x] = E(0)
            },
            effect(x=player.rep_galaxy) {
                let ret = x
                if (player.prestige.upgrades.includes(23)) ret = ret.mul(UPGS.prestige[23].effect())
                if (player.prestige.upgrades.includes(34)) ret = ret.mul(UPGS.prestige[34].effect())
                if (ACHS.has(22)) ret = ret.mul(1.5)
                if (ACHS.has(24)) ret = ret.mul(1.25)
                if (ACHS.has(52)) ret = ret.mul(1.5)
                if (player.inf.upgrades.includes(21)) return ret.add(1).root(2)
                return ret.add(1).root(3)
            },
            bulk(x=player.replicanti) {
                if (x.mul(player.prestige.upgrades.includes(43) ? UPGS.prestige[43].effect() : 1).lt(1e12)) return E(0)
                return x.mul(player.prestige.upgrades.includes(43) ? UPGS.prestige[43].effect() : 1).div(1e12).max(1).logBase(1e6).root(1.25).root(CHALS.onChal("normal5") || CHALS.onChal("inf1")?4/3:1).add(1).floor()
            },

        },

        sacrifice: {
            unl() { return CHALS.onChal("inf2") || player.chals.comps.includes("inf2") },
            before() {
                let a = player.replicanti.log10().add(1).pow(0.9).div(player.rep_sacrifice)
                if (ACHS.has(52)) a = a.mul(1.5)
                return a.max(1)
            },
            set() {
                return player.rep_sacrifice.mul(this.before())
            },
            can() { return this.before().gt(1) && !CHALS.onChal("inf5") },
            doSac() {
                if (this.can()) {
                    player.rep_sacrifice = this.set()
                    if (!ACHS.has(37)) player.replicanti = E(1)
                }
            },
        },
    },
    prestige: {
        seen() { return player.replicanti.gte(FORMS.quarterINF) || player.prestige.unl },
        gain() {
            let gain = player.replicanti.div(FORMS.quarterINF)
            if (gain.lt(1)) return E(0)
            gain = gain.root(5)
            if (player.prestige.upgrades.includes(32)) gain = gain.mul(UPGS.prestige[32].effect())
            if (player.prestige.upgrades.includes(44)) gain = gain.mul(UPGS.prestige[44].effect())
            if (player.inf.upgrades.includes(34)) gain = gain.mul(UPGS.post_inf[34].effect())
            if (CHALS.onChal("normal6") || CHALS.onChal("inf1")) gain = gain.pow(0.85)
            return gain.softcap(1e3,player.chals.comps.includes("inf6")?0.5:1/3,0).floor()
        },
        can() { return this.gain().gte(1) },
        reset() {
            if (this.can()) {
                player.prestige.unl = true
                player.prestige.points = player.prestige.points.add(this.gain())
                if (player.rep_galaxy.lte(0)) ACHS.unl(24)
                ACHS.unl(16)
                this.onReset()
            }
        },
        onReset(force=false) {
            player.rep_galaxy = E(0)
            FORMS.replicanti.galaxy.onReset(force)
        },
    },
    inf: {
        reached() { return player.replicanti.gte(FORMS.INF) && (player.chals.active.includes("normal") ? true : !player.breakInf) },
        seen() { return player.inf.times.gte(1) },
        gain() {
            let gain = E(1)
            if (player.breakInf) gain = player.replicanti.root(FORMS.INF.log10())
            if (gain.lt(10) && player.breakInf) return E(0)
            if (ACHS.has(28)) gain = gain.mul(2)
            if (player.inf.upgrades.includes(12)) gain = gain.mul(UPGS.post_inf[12].effect())
            if (player.inf.upgrades.includes(22)) gain = gain.mul(UPGS.post_inf[22].effect())
            if (player.inf.upgrades.includes(41)) gain = gain.mul(UPGS.post_inf[41].effect())
            if (player.chals.comps.includes("inf4")) gain = gain.mul(E(2).pow(player.chals.comps.length))
            gain = gain.mul(this.mult.effect())
            return gain.softcap(1e17,player.chals.comps.includes("inf5")?0.75:0.5,0).floor()
        },
        can() {
            if (player.chals.active.includes("inf")) return player.breakInf && CHALS.inf.canComplete()
            return player.breakInf && this.gain().gte(1)
        },
        reset() {
            if (this.reached() || this.can()) {
                if (player.rep_galaxy.lte(0)) ACHS.unl(33)
                if (player.inf.time < player.inf.best) player.inf.best = player.inf.time
                if (player.chals.active.includes("normal") || player.chals.active.includes("inf")) {
                    if (!player.chals.comps.includes(player.chals.active)) player.chals.comps.push(player.chals.active)
                    if (player.stats.chals_best[player.chals.active] === undefined) player.stats.chals_best[player.chals.active] = 999999999
                    if (player.inf.time < player.stats.chals_best[player.chals.active]) player.stats.chals_best[player.chals.active] = player.inf.time
                    if (player.chals.active.includes("normal")) ACHS.unl(25)
                    if (player.chals.active.includes("inf")) {
                        if (player.rep_sacrifice.lte(1)) ACHS.unl(44)
                        ACHS.unl(35)
                    }
                    CHALS.exit()
                }
                player.inf.points = player.inf.points.add(this.gain())
                player.inf.times = player.inf.times.add(1)
                ACHS.unl(21)
                this.onReset()
            }
        },
        onReset(force=false) {
            player.inf.time = 0
            player.prestige.points = E(0)
            if (!player.inf.upgrades.includes(13) || force) player.prestige.upgrades = []
            FORMS.prestige.onReset(force)
        },
        replicanti: {
            growth() {
                let ret = UPGS.inf_rep[1].effect().root(FORMS.inf.comp.effect().nerf).pow(player.chals.comps.includes('inf1')?player.chals.comps.length*0.5+1:1)
                if (player.replicator.unl) ret = ret.pow(FORMS.replicator.effect().ir1)
                if (ACHS.has(54)) ret = ret.pow(1.5)
                return ret
            },
            effect() {
                let ret = player.inf.replicanti.log10().div(this.cap().log10().max(1)).add(1).add(FORMS.inf.comp.effect().buff)
                if (player.replicator.unl) ret = ret.mul(FORMS.replicator.effect().ir2)
                if (!player.inf.upgrades.includes(24)) ret = ret.softcap(2,0.75,0)
                if (CHALS.onChal("inf4")) return E(1)
                return ret
            },
            cap() { return E(1e10).mul(FORMS.inf.comp.effect().cap) },
        },
        comp: {
            req() { return FORMS.inf.replicanti.cap() },
            can() { return player.inf.replicanti.gte(this.req()) },
            reset() {
                if (this.can()) {
                    player.inf.comp = player.inf.comp.add(1)
                    this.onReset()
                }
            },
            onReset() {
                player.inf.replicanti = E(1)
            },
            effect(x=player.inf.comp) {
                let ret = {}
                ret.buff = x
                ret.nerf = x.add(1).pow(1.5)
                if (ret.nerf.gte(25)) ret.nerf = ret.nerf.div(25).pow(2).mul(25)
                if (player.inf.upgrades.includes(32)) ret.nerf = ret.nerf.pow(0.5)
                ret.cap = E(10).pow(x.sub(9).max(0).pow(1.5))
                if (ret.cap.gte(1e200)) ret.cap = ret.cap.div(1e200).pow(x.div(10).max(2).pow(1.5)).mul(1e200)
                return ret
            },
        },
        break: {
            seen() { return player.chals.comps.includes("normal1") 
            && player.chals.comps.includes("normal2") 
            && player.chals.comps.includes("normal3") 
            && player.chals.comps.includes("normal4") 
            && player.chals.comps.includes("normal5") 
            && player.chals.comps.includes("normal6") },
            msg() { return player.breakInf ? "Fix Infinity" : "Break Infinity" },
        },
        mult: {
            cost(x=player.inf.mults) { return E(10).pow(x).mul(1e15) },
            bulk() { return player.inf.points.gte(1e15) ? player.inf.points.div(1e15).log10().add(1).floor() : E(0) },
            can() { return player.inf.points.gte(this.cost()) },
            buy() {
                if (this.can()) {
                    let bulk = this.bulk()
                    player.inf.points = player.inf.points.sub(this.cost(bulk.sub(1)))
                    player.inf.mults = bulk
                }
            },
            effect(x=player.inf.mults) { return E(2).pow(x) },
        },
    },
    replicator: {
        canUnl() { return player.inf.points.gte(1e64) && !player.replicator.unl },
        unl() {
            if (this.canUnl()) player.replicator.unl = true
        },
        growth() { return this.gen.growth(1) },
        effect() {
            let ret = {}
            ret.ir1 = player.replicator.amount.log10().add(1).pow(2/3).softcap(30,0.5,0).softcap(150,0.4,0).softcap(1000,0.3,0)
            ret.ir2 = player.replicator.amount.log10().add(1).pow(1/3)
            return ret
        },
        gen: {
            exps: [1, 3, 6, 10],
            growth(x) { return player.replicator.gens[x].amount.pow(this.power(x)) },
            power(x, y=player.replicator.gens[x].bought) {
                let ret = E(1.5).pow(y)
                return ret
            },
            cost(x, y=player.replicator.gens[x].bought) { return E(10).pow(this.exps[x-1]).pow(y.pow(1.25)).mul(E(10).pow(this.exps[x-1]-1)).mul(1e64) },
            can(x) { return player.inf.points.gte(this.cost(x)) },
            buy(x) {
                if (this.can(x)) {
                    player.inf.points = player.inf.points.sub(this.cost(x))
                    player.replicator.gens[x].bought = player.replicator.gens[x].bought.add(1)
                    player.replicator.gens[x].amount = player.replicator.gens[x].amount.mul(1.01)
                }
            },
        },
    },
}

function getDisplayShrink(x) { return x.gte(1e4) ? "1 / "+format(x) : format(x.pow(-1)) }