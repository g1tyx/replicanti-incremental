const TABS = {
    choose(x, stab=false) {
        if (!stab && player.tab[0] != x) player.tab[1] = 0
        player.tab[stab?1:0] = x
    },
    1: [
        { id: "Replicanti" },
        { id: "Options" },
        { id: "Statistics" },
        { id: "Achievements" },
        { id: "Autobuyers", unl() { return FORMS.inf.seen() } },
        { id: "Challenges", unl() { return FORMS.inf.seen() }, notify() { return CHALS.inf.canUnlock() } },
        { id: "Infinity", seen() { return FORMS.inf.seen() }, style: "inf", notify() { return FORMS.inf.comp.can() } },
        { id: "Eternity", unl() { return FORMS.inf.seen() }, seen() { return false }, style: "eter" },
        { id: "Galactic", unl() { return false }, seen() { return false }, style: "gal" },
    ],
    2: {
        0: [
            { id: "Replicanti" },
            { id: "Prestige", seen() { return FORMS.prestige.seen() }, style: "prestige" },
        ],
        2: [
            { id: "Main" },
            { id: "Challenge Records", unl() { return FORMS.inf.seen() } },
        ],
        5: [
            { id: "Challenges" },
            { id: "Infinity Challenges", unl() { return player.breakInf }, style: "inf", notify() { return CHALS.inf.canUnlock() } },
        ],
        6: [
            { id: "Infinity Replicanti", notify() { return FORMS.inf.comp.can() } },
            { id: "Break Infinity", unl() { return FORMS.inf.break.seen() } },
            { id: "Replicator", unl() { return FORMS.inf.break.seen() } },
        ],
    },
}