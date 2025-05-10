const roleHarvest = require('role.harvester')
const roleUpgrader = require('role.upgrader')

const DESCRIBEDROLES = [roleHarvest.config, roleUpgrader.config]

function removeDeadCreepsFromMemory() {
    for(const i in Memory.creeps) {
        console.log(i)
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}

function getLivecreeps() {
    let creepsByRole = { }
    for (let creep in Game.creeps) {
        const creepObj = Game.creeps[creep]
        const name = creepObj.name
        const role = creepObj.memory.role
        // console.log(`${name}: ${creepObj.ticksToLive}`)
        if (creepsByRole[role]) {
            creepsByRole[role].push({ name: name, id: creepsByRole[role].length })
        } else {
            creepsByRole[role] = [{ name: name, id: 0 }]
        }
        //TODO: As creeps die they are removed from memory, array length is not a good index for UUID's
    }

    return creepsByRole
}

function countCreepsWithRoleInRoleDict(role, creepsDict) {
    if (!creepsDict[role]) { return 0 }
    return creepsDict[role].length
}

module.exports.loop = function () {
    console.log("NEW TICK")
    removeDeadCreepsFromMemory()
    const LIVECREEPS = getLivecreeps()
    console.log(JSON.stringify(Memory.creeps.upgrader8))
    console.log(JSON.stringify(LIVECREEPS))
    DESCRIBEDROLES.forEach((describedRole) => {
        const creepsWithRole = countCreepsWithRoleInRoleDict(describedRole.role, LIVECREEPS)

        if (describedRole.desiredCount > creepsWithRole) {
            console.log('----')
            const screepName = `${describedRole.role}${creepsWithRole}`
            console.log(`Spawning: ${screepName}`)
            console.log(`with body: ${JSON.stringify(describedRole.body)}`)
            console.log(`and role: ${describedRole.role}`)
            console.log(Game.spawns.Spawn1.spawnCreep(
                describedRole.body, screepName, {
                memory: { role: describedRole.role },
                }))
        }
    })

    for (const creepName in Game.creeps) {
        const creep = Game.creeps[creepName]
        const role = creep.memory['role']

        switch (role) {
            case 'harvester':
                roleHarvest.run(creep)
                break
            case 'upgrader':
                roleUpgrader.run(creep)
                break
            default:
                console.log(`Role ${role} is not assigned an action yet.`)
                break
        }
    }
}