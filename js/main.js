var diff = 0;
var date = Date.now();
var player

const ST_NAMES = [
    ["","U","D","T","Qa","Qt","Sx","Sp","Oc","No"],
    ["","Dc","Vg","Tg","Qag","Qtg","Sxg","Spg","Ocg","Nog"],
    ["","Ce","De","Te","Qae","Qte","Sxe","Spe","Oce","Noe"],
    ["","Mi","Mc","Na","Pc"],
]



function format(ex, acc=4, style="sc") {
    ex = E(ex)
    if (ex.isInfinite() || (ex.gte(FORMS.INF) && !player.breakInf)) return 'Infinity'
    neg = ex.isNegative()?"-":""
    if (ex.isNegative()) ex = ex.mul(-1)
    let e = ex.log10().floor()
    switch (style) {
        case "sc":
            if (e.lt(4)) {
                return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
            } else {
                let m = ex.div(E(10).pow(e))
                return neg+(e.log10().gte(9)?'':m.toFixed(4))+'e'+format(e, 0, "sc")
            }
        case "st":
            if (e.lt(3)) {
                return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
            } else {
                if (e.gte(3e15+3)) return "e"+format(e, acc, "st")
                let str = e.div(3).floor().sub(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').split(" ")
                let final = ""
                let m = ex.div(E(10).pow(e.div(3).floor().mul(3)))
                str.forEach((arr, i) => {
                    let ret = ""
                    arr.split('').forEach((v, j) => {
                        if (i == str.length - 1) ret = (Number(arr) < 3 ? ["K", "M", "B"][v] : ST_NAMES[arr.length-j-1][v]) + ret 
                        else if (Number(arr) > 1) ret = ST_NAMES[arr.length-j-1][v] + ret
                    })
                    final += (i > 0 && Number(arr) > 0 ? "-" : "") + ret + (i < str.length - 1 && Number(arr) > 0 ? ST_NAMES[3][str.length-i-1] : "")
                });
                return neg+(e.log10().gte(9)?'':(m.toFixed(E(3).sub(e.sub(e.div(3).floor().mul(3))).add(1).toNumber())+" "))+final
            }
    }
}

/*
function format(ex, acc=3) {
    ex = E(ex)
    if (ex.isInfinite()) return 'Infinity'
    let e = ex.log10().floor()
    if (e.lt(9)) {
        if (e.lt(3)) {
            return ex.toFixed(acc)
        }
        return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } else {
        if (ex.gte("eeee9")) {
            let slog = ex.slog()
            return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(3)) + "F" + format(slog.floor(), 0)
        }
        let m = ex.div(E(10).pow(e))
        return (e.log10().gte(9)?'':m.toFixed(3))+'e'+format(e,0)
    }
}
*/

function loop() {
    diff = Date.now()-date;
    calc(diff/1000);
    date = Date.now();
}

setInterval(loop, 50)