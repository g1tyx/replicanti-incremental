const CHALS = {
    types: ['normal','inf'],
    sumTotal() {
        let total = {}
        for (let x in this.types) {
            let total2 = 0
            for (let y = 1; y <= this[this.types[x]].length; y++) {
                if (player.stats.chals_best[this.types[x]+y] === undefined) {
                    total2 = 1e9
                    break
                }
                total2 += player.stats.chals_best[this.types[x]+y]
            }
            total[this.types[x]] = total2
        }
        return total
    },
    onChal(x) { return player.chals.active == x },
    enter(ch, id) {
        if (player.chals.active == "") {
            player.chals.active = ch + id
            this[ch].onEnter()
        }
    },
    exit() {
        if (player.chals.active != "") {
            let ch = ""
            for (let x = 0; x < this.types.length; x++) {
                if (player.chals.active.includes(this.types[x])) {
                    ch = this.types[x]
                    break
                }
            }
            this[ch].onEnter()
            player.chals.active = ""
        }
    },
    normal: {
        btnMsg(x) { return player.chals.active == "normal"+x ? "Running" : (player.chals.comps.includes("normal"+x) ? "Completed" : "Start") },
        onEnter() {
            FORMS.inf.onReset(true)
        },
        length: 6,
        1: {
            unl() { return true },
            desc: "Replicanti Penalty is 50% stronger",
            reward: "Unlock Replicanti Storage autobuyer",
        },
        2: {
            unl() { return true },
            desc: "You cannot buy Replicanti Multiplier, and Replicanti growth starts 2x",
            reward: "Unlock Replicanti Multiplier autobuyer",
        },
        3: {
            unl() { return true },
            desc: "Replicanti Multiplier/Power scales stronger",
            reward: "Unlock Replicanti Power autobuyer",
        },
        4: {
            unl() { return true },
            desc: "Repeated Replicanti boost Replicanti Multiplier/Power instead of Replicanti Storage, but Repeated Replicanti are 4x stronger",
            reward: "Unlock Repeated Replicanti autobuyer",
        },
        5: {
            unl() { return true },
            desc: "Replicanti Galaxy scales stronger",
            reward: "Unlock Replicanti Galaxy autobuyer",
        },
        6: {
            unl() { return true },
            desc: "Prestige points gain are raised by 0.85",
            reward: "You gain 100% of your Prestige points gained on reset each second",
        },
    },
    inf: {
        requires: [E('e1100'), E('e1350'), E('e2350'), E('e3800'), E('e10200'), E('e11300')],
        canComplete() { return player.replicanti.gte(this[player.chals.active.split("inf")[1]].goal) },
        canUnlock() { return player.replicanti.gte(this.requires[player.chals.inf_unls]) },
        unlock() { if (this.canUnlock()) player.chals.inf_unls++ },
        btnMsg(x) { return player.chals.active == "inf"+x ? "Running" : (player.chals.comps.includes("inf"+x) ? "Completed" : "Start") },
        onEnter() {
            FORMS.inf.onReset(true)
        },
        length: 6,
        1: {
            goal: E('e480'),
            desc: "All previous challenges at once",
            reward: "All of the challenges completed boost Infinity Replicanti growth",
        },
        2: {
            goal: E('e500'),
            desc: "Replicant Galaxy is disabled, but you can sacrifice Replicanti",
            reward: "Unlock Replicanti Sacrifice",
        },
        3: {
            goal: E('e640'),
            desc: "Replicanti Penalty, Replicanti Slowdown is twice stronger",
            reward: "Replicanti Penalty is 25% weaker",
        },
        4: {
            goal: E('e2300'),
            desc: "Infinity Replicanti effects are disabled",
            reward: "Infinity points gain is increased by 2x for every challenge completed, unlock Replicanti Sacrifice autobuyer",
        },
        5: {
            goal: E('e4400'),
            desc: "Replicanti Sacrifice is disabled",
            reward: "Infinity points gain softcap is 50% weaker",
        },
        6: {
            goal: E('e1400'),
            desc: "You cannot buy Prestige upgrades except 1 and 2 row",
            reward: "Prestige points gain softcap is sightly weaker",
        },
    },
}