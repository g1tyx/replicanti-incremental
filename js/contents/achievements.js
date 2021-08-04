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
    rows: 3,

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
        36: "Challenge Boy",
        38: "Replicanti^2",
    },
    descs: {
        0: "Placeholder.",

        11: "Purchase Replicanti Multiplier.",
        12: "Reach format(1e6) Replicanti.",
        13: "Get Replicanti Galaxy.",
        14: "Gain two Replicanti Galaxy.",
        15: "Get Replicanti growth at least format(1e10)x.",
        16: "Perform to Prestige.",
        17: "Get 10 Replicanti Galaxies.",
        18: "Reach at least format(1.3407807929942597e154) Replicanti.",

        21: "Go Infinity.",
        22: "Get Infinity Compressor.",
        23: "Get at least 5 Infinity Compressors.",
        24: "Prestige without Replicanti Galaxy.",
        25: "Complete any Challenge.",
        26: "Go Infinity in under 10 minutes.",
        27: "Complete all of challenges.",
        28: "Get format(1e20) Prestige points without breaking Infinity.",

        31: "Reach format(6.9e420) Replicanti.",
        32: "Go Infinity in under 10 seconds.",
        33: "Go Infinity without Replicanti Galaxies.",
        34: "Unlock Infinity challenge.",
        36: "Get the sum of all of challenges times under 1 minute.",
        38: "Reach format(9.9999e999) Replicanti.",
    },
    rewards: {
        21: "Start with format(1e5) Replicanti.",
        22: "Replicanti Galaxy is 50% stronger.",
        24: "Replicanti Galaxy is 25% stronger.",
        26: "Start with format(1e10) Replicanti.",
        27: "Double Infinity points gain.",

        32: "Start with format(1e50) Replicanti.",
        34: "Replicanti Upgrades no longer spent Replicanti.",
        38: "Replicanti Growth is stronger based on Replicanti at a reduced rate.",
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
        38() { return player.replicanti.gte("9.9999e999") },
    }
}