// @ts-check
const Ship = require("../models/Ships");

const { ships, guns } = require("../db/templateES.json");
const { Gun } = require("../models/Gun");

/**
 *
 * @param {Ship} ship
 */
const shipAlive = (ship) => {
  if (ship.CurrentDurability > 0) return true;
  return false;
};

/**
 *
 * @param {Ship[]} team
 */
const teamAlive = (team) => {
  for (const ship of team) if (shipAlive(ship)) return true;
  return false;
};

/**
 *
 * @param {Ship[]} team
 */
// @ts-ignore
const pushBackDeadShip = (team) => team.push(team.shift());

/**
 *
 * @param {Ship[]} team
 * @param {number} damage
 */
const applyDamage = (team, damage) => {
  const deadShips = [];
  let result = team[0].doDamage(damage);
  while (result <= 0 && teamAlive(team)) {
    deadShips.push(team[0].name);
    pushBackDeadShip(team);
    result = team[0].doDamage(damage);
  }
  if (result <= 0 && !teamAlive(team) && team.length === 1)
    deadShips.push(team[0].name);
  return deadShips;
};

/**
 *
 * @param {Ship[]} team1
 * @param {Ship[]} team2
 */
const battleOfShips = (team1, team2) => {
  let countOfDamage1 = 0;
  let countOfDamage2 = 0;
  let round = 0;
  const generalLog = {
    team1: {
      totalDamage: 0,
      deadShips: [],
    },
    team2: {
      totalDamage: 0,
      deadShips: [],
    },
    logs: [],
  };
  while (teamAlive(team1) && teamAlive(team2)) {
    team1.forEach((item) => {
      if (item.guns) {
        Object.values(item.guns).forEach((jtem) => {
          countOfDamage1 += jtem.gun.damage * jtem.count;
        });
      }
    });
    team2.forEach((item) => {
      if (item.guns) {
        Object.values(item.guns).forEach((jtem) => {
          countOfDamage2 += jtem.gun.damage * jtem.count;
        });
      }
    });
    // doing damage to team 1
    const deadShips1 = applyDamage(team1, countOfDamage2);
    // doing damage to team 2
    const deadShips2 = applyDamage(team2, countOfDamage1);
    round += 1;
    const log = {
      round,
      team1: { damage: countOfDamage1, deadShips: deadShips1 },
      team2: { damage: countOfDamage2, deadShips: deadShips2 },
    };
    // @ts-ignore
    deadShips1.forEach((item) => generalLog.team1.deadShips.push(item));
    generalLog.team1.totalDamage += countOfDamage2;
    // @ts-ignore
    deadShips2.forEach((item) => generalLog.team2.deadShips.push(item));
    generalLog.team2.totalDamage += countOfDamage1;
    countOfDamage1 = 0;
    countOfDamage2 = 0;
    // @ts-ignore
    generalLog.logs.push(log);
  }
  return generalLog;
};

module.exports = {
  battleOfShips,
};
