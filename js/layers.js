function getEffectFromEndsProg(lower, higher, progress, exp = 1){
        let a = 1 / (1 + Math.pow(progress, exp))
        return higher - (higher - lower) * a
}

function getPEff(id){
        return layers.p.upgrades[id].effect()
}

function getExpEffForP(id){
        let eff = 1
        if (id < 14 && hasUpgrade("p", 14)) eff *= getPEff(14).toNumber()
        if (id < 21 && hasUpgrade("p", 21)) eff *= getPEff(21).toNumber()
        if (id < 22 && hasUpgrade("p", 22)) eff *= getPEff(22).toNumber()
        if (id < 23 && hasUpgrade("p", 23)) eff *= getPEff(23).toNumber()
        if (id < 24 && hasUpgrade("p", 24)) eff *= getPEff(24).toNumber()
        if (id == 21 && hasUpgrade("p", 31)) eff += getPEff(31).toNumber()
        if (id % 10 == 2 && id < 32 && hasUpgrade("p", 32)) eff += getPEff(32).toNumber()
        if (id % 10 == 3 && id < 33 && hasUpgrade("p", 33)) eff += getPEff(33).toNumber()
        if (id % 10 == 4 && id < 34 && hasUpgrade("p", 34)) eff += getPEff(34).toNumber()

        return eff - 1
}

//theme: math education
/*
layer: school levels (elem, middle, high, coll, grad etc)
professions: 


second layer unlocks with u34 and 1e9 pts
*/

addLayer("p", {
        name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#4BDC13",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "prestige points", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
                mult = new Decimal(1)
                return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "p", description: "Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
                rows: 4,
                cols: 4,
                11: {
                        title: "Addition",
                        description: "Gain one point per second",
                        cost: new Decimal(1),
                        unlocked: () => true,
                },
                12: {
                        title: "Multiplication",
                        description: "Logarithimically multiply points gained based on points",
                        cost: new Decimal(1),
                        effect() {
                                let eff = getExpEffForP(12)
                                let exp = getEffectFromEndsProg(1, 5, eff)
                                return player.points.plus(10).log10().pow(exp).plus(1).times(eff + 1)
                        },
                        unlocked(){
                                return hasUpgrade("p", 11)
                        },
                },
                13: {
                        title: "Exponentiation",
                        description: "Double Logarithimically multiply points gained based on points",
                        cost: new Decimal(2),
                        effect() {
                                let eff = getExpEffForP(13)
                                let exp = getEffectFromEndsProg(1, 7, eff)
                                return player.points.plus(10).log10().plus(10).log10().pow(exp).plus(1).times(eff + 1)
                        },
                        unlocked(){
                                return hasUpgrade("p", 12)
                        },
                },
                14: {
                        title: "Tetration",
                        description: "Buff all previous upgrade exponents based on points",
                        cost: new Decimal(5),
                        effect() {
                                let eff = getExpEffForP(14)
                                let exp = getEffectFromEndsProg(.1, .3, eff)
                                return player.points.plus(10).log10().pow(exp).div(5).plus(1)
                        },
                        effectDisplay() {
                                return "*" +format(getPEff(14)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 13)
                        },
                },
                21: {
                        title: "Subtraction",
                        description: "Buff all previous upgrade exponents based on points",
                        cost: new Decimal(9),
                        effect() {
                                let eff = getExpEffForP(21)
                                let exp = getEffectFromEndsProg(.1, .3, eff)
                                return player.points.plus(10).log10().plus(10).log10().pow(exp).div(3).plus(1)
                        },
                        effectDisplay() {
                                return "*" +format(getPEff(21)) + " to the exponent formula"
                        },
                        unlocked() {
                                return hasUpgrade("p", 14)
                        },
                },
                22: {
                        title: "Division",
                        description: "Buff all previous upgrade exponents based on points",
                        cost: new Decimal(30),
                        effect() {
                                let eff = getExpEffForP(22)
                                let exp = getEffectFromEndsProg(.1, .25, eff)
                                return player.points.plus(2).slog(2).pow(exp).div(2).plus(1)
                        },
                        effectDisplay() {
                                return "*" +format(getPEff(22)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 21)
                        },
                },
                23: {
                        title: "Logarithim",
                        description: "Buff all previous upgrade exponents based on points",
                        cost: new Decimal(100),
                        effect() {
                                let eff = getExpEffForP(23)
                                let exp = getEffectFromEndsProg(.1, 1, eff)
                                return player.points.plus(2).slog(2).pow(exp).div(3).plus(1)
                        },
                        effectDisplay() {
                                return "*" +format(getPEff(23)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 22)
                        },
                },
                24: {
                        title: "Slog",
                        description: "Buff all previous upgrade exponents based on points",
                        cost: new Decimal(400),
                        effect() {
                                let eff = getExpEffForP(24)
                                let exp = getEffectFromEndsProg(.1, 2, eff)
                                return player.points.plus(2).slog(2).pow(exp).div(10).plus(1)
                        },
                        effectDisplay() {
                                return "*" +format(getPEff(24)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 23)
                        },
                },
                31: {
                        title: "Associativity",
                        description: "Buff the above upgrade based on prestige points",
                        cost: new Decimal(2000),
                        effect() {
                                let eff = getExpEffForP(31)
                                return player.p.points.plus(eff).times(eff + 1).plus(9).log10().pow(.3).minus(1).times(4)
                        },
                        effectDisplay() {
                                return "+" +format(getPEff(31)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 24)
                        },
                },
                32: {
                        title: "Identity",
                        description: "Buff the above upgrades based on prestige points",
                        cost: new Decimal(4000),
                        effect() {
                                let eff = getExpEffForP(32)
                                return player.p.points.plus(eff).plus(10).log10().pow(.2)
                        },
                        effectDisplay() {
                                return "+" +format(getPEff(32)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 24)
                        },
                },
                33: {
                        title: "Inverses",
                        description: "Buff the above upgrades based on prestige points",
                        cost: new Decimal(1e4),
                        effect() {
                                let eff = getExpEffForP(33)
                                return player.p.points.plus(10).log10().pow(.8).minus(1).plus(eff / 10)
                        },
                        effectDisplay() {
                                return "+" +format(getPEff(33)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 24)
                        },
                },
                34: {
                        title: "Commutativity",
                        description: "Buff the above upgrades based on prestige points",
                        cost: new Decimal(2e4),
                        effect() {
                                let eff = getExpEffForP(34) + 1
                                return player.p.points.plus(10).times(eff).log10().pow(Math.min(eff, 8) / 10).minus(1)
                        },
                        effectDisplay() {
                                return "+" +format(getPEff(34)) + " to the exponent formula"
                        },
                        unlocked(){
                                return hasUpgrade("p", 24)
                        },
                },
                41: {
                        title: "Distributive",
                        description: "Buff the above upgrade based on [next layer]",
                        cost: new Decimal(25e5),
                },
                42: {
                        title: "Group",
                        description: "Buff the above upgrades based on [next layer]",
                        cost: new Decimal(50e5),
                },
                43: {
                        title: "Ring",
                        description: "Buff the above upgrades based on [next layer]",
                        cost: new Decimal(100e5),
                },
                44: {
                        title: "Field",
                        description: "Buff the above upgrades based on [next layer]",
                        cost: new Decimal(200e5),
                },
        },
})

addLayer("e", {
        name: "Elementary School", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
                        unlocked: true,
			points: new Decimal(0),
        }},
        color: "#4BDC13",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "Elementary Students", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: .3, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
                mult = new Decimal(1e-9).pow(.3)
                return mult
        },
        branches: ["p"],
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 1, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "e", description: "Press E for Elementary School Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return player.p.upgrades.length >= 12},
})







