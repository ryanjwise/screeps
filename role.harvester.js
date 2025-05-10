const common = require('creep.common')
const config = {role:'harvester', desiredCount:3, body: [MOVE, WORK, CARRY]}

const returnToStockpile = (creep) => {
    if (creep.store.getUsedCapacity() != 0) {
        const home = creep.pos.findClosestByPath(FIND_MY_SPAWNS)
        creep.transfer(home, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? creep.moveTo(home) : null
    } else {
    creep.memory['emptying'] = false
    }
}

const run = (creep) => {
    creep.memory['emptying'] ? returnToStockpile(creep) : common.harvestFromClosestSourceToFull(creep)
}
module.exports = {
    config,
    run
};