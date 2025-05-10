const common = require('creep.common')
const config = {role:'upgrader', desiredCount:10, body: [WORK, CARRY, MOVE]}

const upgradeController = (creep) => {
    const upgradePoint = creep.room.controller
     if (creep.store.getUsedCapacity() != 0) {
        creep.transfer(upgradePoint, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? creep.moveTo(upgradePoint) : null
     } else {
         creep.memory['emptying'] = false
     }
}

const run = (creep) => {
    creep.memory['emptying'] ? upgradeController(creep) : common.harvestFromClosestSourceToFull(creep)
}

module.exports = {
    config,
    run
};