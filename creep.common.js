const harvestFromClosestSourceToFull = (creep) => {
    const source = creep.pos.findClosestByPath(FIND_SOURCES)
    if (creep.store.getFreeCapacity() != 0) {
        creep.harvest(source) === ERR_NOT_IN_RANGE ? creep.moveTo(source) : null
    } else {
        creep.memory['emptying'] = true
    }
}

module.exports = {
    harvestFromClosestSourceToFull
};