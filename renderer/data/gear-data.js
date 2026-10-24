// Equipment from the 5.0 book (Ch.9, pp. 437–488), generated from the 5.0 Beta
// PDF. Weapons, gear, ammunition and consumables are store/inventory items in the
// same shape as BOOK_EQUIPMENT; GEAR_RULES holds the rules-text entries (weapon
// properties, enchantments, heroic gear, wondrous items, technology, vehicles).
// Prices are in Zeni; CP and SP are hundredths and tenths of a Zeni.

export const WEAPON_DATA = [
 {
  "catalogId": "book_w_battleaxe",
  "name": "Battleaxe",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d8",
  "damageType": "Slashing",
  "properties": "Versatile (1d10)",
  "mastery": "Topple",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_battle_buckler",
  "name": "Battle Buckler",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d6",
  "damageType": "Bludgeoning",
  "properties": "Defensive, Finesse, Fly-Through, Light, Thrown (20/60)",
  "mastery": "Push",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_chakram",
  "name": "Chakram",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 30,
  "damageDice": "1d10",
  "damageType": "Slashing",
  "properties": "Finesse, Thrown (10/30), Returning",
  "mastery": "Slow",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_combat_yo_yo",
  "name": "Combat Yo-Yo",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Finesse, Light, Reach (15 feet), Twisting",
  "mastery": "Topple",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_cutlass",
  "name": "Cutlass",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Finesse, Light, Riposting",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_fishing_rod",
  "name": "Fishing Rod",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Finesse, Light, Special",
  "mastery": "Sap",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_flail",
  "name": "Flail",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d8",
  "damageType": "Bludgeoning",
  "properties": "",
  "mastery": "Sap",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_glaive",
  "name": "Glaive",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d10",
  "damageType": "Slashing",
  "properties": "Heavy, Reach, Two-Handed",
  "mastery": "Graze",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_greataxe",
  "name": "Greataxe",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 30,
  "damageDice": "1d12",
  "damageType": "Slashing",
  "properties": "Heavy, Two-Handed",
  "mastery": "Cleave",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_greatsword",
  "name": "Greatsword",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 50,
  "damageDice": "2d6",
  "damageType": "Slashing",
  "properties": "Heavy, Two-Handed",
  "mastery": "Graze",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_gunbai",
  "name": "Gunbai",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 60,
  "damageDice": "1d8",
  "damageType": "Bludgeoning",
  "properties": "Defensive, Versatile (1d10)",
  "mastery": "Push",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_halberd",
  "name": "Halberd",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d10",
  "damageType": "Slashing",
  "properties": "Heavy, Reach, Two-Handed",
  "mastery": "Cleave",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_hooksword",
  "name": "Hooksword",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d8",
  "damageType": "Slashing",
  "properties": "Grappling, Special",
  "mastery": "Vex",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_kanab",
  "name": "Kanabō",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 25,
  "damageDice": "1d8",
  "damageType": "Bludgeoning",
  "properties": "Heavy, Versatile (1d10)",
  "mastery": "Graze",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_kusarigama",
  "name": "Kusarigama",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Finesse, Grappling, Light, Reach, Twisting, Two-Handed",
  "mastery": "Graze",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_lance",
  "name": "Lance",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d12",
  "damageType": "Piercing",
  "properties": "Reach, Special",
  "mastery": "Topple",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_light_chakram",
  "name": "Light Chakram",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 30,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Finesse, Light, Thrown (20/60), Returning",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_longsword",
  "name": "Longsword",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d8",
  "damageType": "Slashing",
  "properties": "Versatile (1d10)",
  "mastery": "Sap",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_maul",
  "name": "Maul",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "2d6",
  "damageType": "Bludgeoning",
  "properties": "Heavy, Two-Handed",
  "mastery": "Topple",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_morningstar",
  "name": "Morningstar",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d8",
  "damageType": "Piercing",
  "properties": "",
  "mastery": "Sap",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_parrying_knife",
  "name": "Parrying Knife",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d4",
  "damageType": "Piercing",
  "properties": "Finesse, Light, Riposting",
  "mastery": "Nick",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_pike",
  "name": "Pike",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 5,
  "damageDice": "1d10",
  "damageType": "Piercing",
  "properties": "Heavy, Reach, Two-Handed",
  "mastery": "Push",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_ninja_wire",
  "name": "Ninja Wire",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 5,
  "damageDice": "1d4",
  "damageType": "Slashing",
  "properties": "Finesse, Grappling, Reach (15 feet), Special",
  "mastery": "Sap",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_rapier",
  "name": "Rapier",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 25,
  "damageDice": "1d8",
  "damageType": "Piercing",
  "properties": "Finesse",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_sai",
  "name": "Sai",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d4",
  "damageType": "Piercing",
  "properties": "Defensive, Finesse, Light",
  "mastery": "Nick",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_scimitar",
  "name": "Scimitar",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 25,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Finesse, Light",
  "mastery": "Nick",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_shortsword",
  "name": "Shortsword",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d6",
  "damageType": "Piercing",
  "properties": "Finesse, Light",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_trident",
  "name": "Trident",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 5,
  "damageDice": "1d6",
  "damageType": "Piercing",
  "properties": "Thrown (range 20/60), Versatile (1d8)",
  "mastery": "Topple",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_warhammer",
  "name": "Warhammer",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d8",
  "damageType": "Bludgeoning",
  "properties": "Versatile (1d10)",
  "mastery": "Push",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_war_scythe",
  "name": "War Scythe",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 45,
  "damageDice": "1d8",
  "damageType": "Slashing",
  "properties": "Finesse, Reach, Twisting, Two-Handed",
  "mastery": "Cleave",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_war_shield",
  "name": "War Shield",
  "category": "Weapon",
  "weaponGroup": "Martial Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 30,
  "damageDice": "1d10",
  "damageType": "Bludgeoning",
  "properties": "Defensive, Finesse, Fly-Through, Thrown (10/30)",
  "mastery": "Slow",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_combat_bolas_clackers",
  "name": "Combat Bolas (Clackers)",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Finesse, Grappling, Light, Thrown (10/30), Twisting",
  "mastery": "Nick",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_combat_gauntlet",
  "name": "Combat Gauntlet",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d6",
  "damageType": "Bludgeoning",
  "properties": "Light, Special",
  "mastery": "Slow",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_falchion",
  "name": "Falchion",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Finesse, Versatile (1d8)",
  "mastery": "Sap",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_great_falchion",
  "name": "Great Falchion",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 50,
  "damageDice": "1d12",
  "damageType": "Slashing",
  "properties": "Finesse, Heavy, Two-Handed",
  "mastery": "Graze",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_kama",
  "name": "Kama",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d8",
  "damageType": "Slashing",
  "properties": "Light",
  "mastery": "Nick",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_meteor_hammer",
  "name": "Meteor Hammer",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Finesse, Light, Reach (15 feet), Twisting, Two-Handed",
  "mastery": "Sap",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_naginata",
  "name": "Naginata",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 80,
  "damageDice": "1d12",
  "damageType": "Slashing",
  "properties": "Heavy, Reach, Two-Handed",
  "mastery": "Cleave",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_nunchuck",
  "name": "Nunchuck",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d6",
  "damageType": "Bludgeoning",
  "properties": "Light, Twisting",
  "mastery": "Nick",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_ribbon_blade",
  "name": "Ribbon Blade",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 30,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Finesse, Light, Reach, Twisting, Versatile (1d8)",
  "mastery": "Nick",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_three_section_staff",
  "name": "Three-Section Staff",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 20,
  "damageDice": "1d8",
  "damageType": "Bludgeoning",
  "properties": "Reach, Twisting, Two-Handed",
  "mastery": "Topple",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_tonfa",
  "name": "Tonfa",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 15,
  "damageDice": "1d6",
  "damageType": "Bludgeoning",
  "properties": "Light, Twisting",
  "mastery": "Slow",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_twinblade",
  "name": "Twinblade",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 60,
  "damageDice": "1d10",
  "damageType": "Slashing",
  "properties": "Twisting, Two-Handed",
  "mastery": "Cleave",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_war_pick",
  "name": "War Pick",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 5,
  "damageDice": "1d8",
  "damageType": "Piercing",
  "properties": "",
  "mastery": "Sap",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_whip",
  "name": "Whip",
  "category": "Weapon",
  "weaponGroup": "Monastic Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 2,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Finesse, Grappling, Reach",
  "mastery": "Slow",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_club",
  "name": "Club",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 0.1,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Light",
  "mastery": "Slow",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_cross",
  "name": "Cross",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 10,
  "damageDice": "1d12",
  "damageType": "Bludgeoning",
  "properties": "Heavy, Two-Handed",
  "mastery": "Cleave",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_dagger",
  "name": "Dagger",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 2,
  "damageDice": "1d4",
  "damageType": "Piercing",
  "properties": "Finesse, light, thrown (range 20/60)",
  "mastery": "Nick",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_greatclub",
  "name": "Greatclub",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 2,
  "damageDice": "1d8",
  "damageType": "Bludgeoning",
  "properties": "Two-Handed",
  "mastery": "Push",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_handaxe",
  "name": "Handaxe",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 5,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Light, thrown (range 20/60)",
  "mastery": "Vex",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_javelin",
  "name": "Javelin",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 0.5,
  "damageDice": "1d6",
  "damageType": "Piercing",
  "properties": "Thrown (range 30/120)",
  "mastery": "Slow",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_light_hammer",
  "name": "Light Hammer",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 2,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Light, thrown (range 20/60)",
  "mastery": "Nick",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_mace",
  "name": "Mace",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 5,
  "damageDice": "1d6",
  "damageType": "Bludgeoning",
  "properties": "",
  "mastery": "Sap",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_quarterstaff",
  "name": "Quarterstaff",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 2,
  "damageDice": "1d6",
  "damageType": "Bludgeoning",
  "properties": "Versatile (1d8)",
  "mastery": "Topple",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_sickle",
  "name": "Sickle",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 1,
  "damageDice": "1d6",
  "damageType": "Slashing",
  "properties": "Light",
  "mastery": "Nick",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_spear",
  "name": "Spear",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 1,
  "damageDice": "1d6",
  "damageType": "Piercing",
  "properties": "Thrown (range 20/60), versatile (1d8)",
  "mastery": "Sap",
  "attackStat": "str"
 },
 {
  "catalogId": "book_w_war_fan",
  "name": "War Fan",
  "category": "Weapon",
  "weaponGroup": "Simple Melee",
  "slot": "held",
  "rarity": "common",
  "zeni": 5,
  "damageDice": "1d4",
  "damageType": "Slashing",
  "properties": "Finesse, Fly-Through, Light, Thrown (20/60)",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_blowgun",
  "name": "Blowgun",
  "category": "Weapon",
  "weaponGroup": "Martial Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 1,
  "damageDice": "1",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 25/100), Loading",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_hand_cannon",
  "name": "Hand Cannon",
  "category": "Weapon",
  "weaponGroup": "Martial Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 50,
  "damageDice": "2d6",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 20/60), Magazine (2)",
  "mastery": "Push",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_longbow",
  "name": "Longbow",
  "category": "Weapon",
  "weaponGroup": "Martial Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 50,
  "damageDice": "1d8",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 150/600), Heavy, Two-Handed",
  "mastery": "Slow",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_rifle",
  "name": "Rifle",
  "category": "Weapon",
  "weaponGroup": "Martial Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 50,
  "damageDice": "1d8",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 90/240), Magazine (20), Two-Handed",
  "mastery": "Slow",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_shotgun_combat",
  "name": "Shotgun (Combat)",
  "category": "Weapon",
  "weaponGroup": "Martial Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 75,
  "damageDice": "2d6",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 60), Heavy, Two-Handed, Magazine (8), Spread",
  "mastery": "Push",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_shotgun_double_barrel",
  "name": "Shotgun (Double Barrel)",
  "category": "Weapon",
  "weaponGroup": "Martial Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 50,
  "damageDice": "2d8",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 40), Heavy, Two-Handed, Magazine (2), Spread (Possible Sawed-Off)",
  "mastery": "Topple",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_sniper_rifle",
  "name": "Sniper Rifle",
  "category": "Weapon",
  "weaponGroup": "Martial Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 75,
  "damageDice": "1d12",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 200/800), Heavy, Two-Handed, Magazine (6)",
  "mastery": "Graze",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_dart",
  "name": "Dart",
  "category": "Weapon",
  "weaponGroup": "Simple Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 0.05,
  "damageDice": "1d4",
  "damageType": "Piercing",
  "properties": "Finesse, Thrown (Range 20/60)",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_fuma_shuriken",
  "name": "Fuma Shuriken",
  "category": "Weapon",
  "weaponGroup": "Simple Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 0.15,
  "damageDice": "1d8",
  "damageType": "Slashing",
  "properties": "Finesse, Thrown (Range 15/45)",
  "mastery": "Topple",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_pistol",
  "name": "Pistol",
  "category": "Weapon",
  "weaponGroup": "Simple Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 25,
  "damageDice": "1d6",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 80/180), Light, Magazine (15)",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_shortbow",
  "name": "Shortbow",
  "category": "Weapon",
  "weaponGroup": "Simple Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 25,
  "damageDice": "1d6",
  "damageType": "Piercing",
  "properties": "Ammunition (Range 80/320), Two-Handed",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_sling",
  "name": "Sling",
  "category": "Weapon",
  "weaponGroup": "Simple Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 0.1,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Ammunition (Range 30/120)",
  "mastery": "Slow",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_steel_ball",
  "name": "Steel Ball",
  "category": "Weapon",
  "weaponGroup": "Simple Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 0.05,
  "damageDice": "1d4",
  "damageType": "Bludgeoning",
  "properties": "Finesse, Thrown (Range 20/60)",
  "mastery": "Vex",
  "attackStat": "dex"
 },
 {
  "catalogId": "book_w_steel_card",
  "name": "Steel Card",
  "category": "Weapon",
  "weaponGroup": "Simple Ranged",
  "slot": "held",
  "rarity": "common",
  "zeni": 0.05,
  "damageDice": "1d4",
  "damageType": "Slashing",
  "properties": "Finesse, Thrown (Range 20/60)",
  "mastery": "Vex",
  "attackStat": "dex"
 }
];

export const GEAR_DATA = [
 {
  "catalogId": "book_g_abacus",
  "name": "Abacus",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "2 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_parchment_one_sheet",
  "name": "Parchment (one sheet)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.1,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_acid_vial",
  "name": "Acid (vial)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "1 lb",
  "notes": "As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon. On a hit, the target takes 2d6 acid damage."
 },
 {
  "catalogId": "book_g_perfume_vial",
  "name": "Perfume (vial)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_antitoxin_vial",
  "name": "Antitoxin (vial)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 50,
  "weight": "",
  "notes": "A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs."
 },
 {
  "catalogId": "book_g_pick_miners",
  "name": "Pick, miner’s",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "10 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_arcane_focus",
  "name": "Arcane Focus",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "3 lb",
  "notes": "An object holding innate magic power. When you have an Arcan Focus, you gain a +1 Static Bonus to Spells from the Mysticism Class Feature. These can appear in a +1 +3 variation, granting an additional Static Bonus equal to that bonus."
 },
 {
  "catalogId": "book_g_poison_basic_vial",
  "name": "Poison, basic (vial)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 100,
  "weight": "",
  "notes": "You can use the poison in this vial to coat one slashing or piercing weapon or up to three pieces of ammunition. Applying the poison takes an action. A creature hit by the poisoned weapon or ammunition must make a DC 10 Constitution saving throw or take 1d4 poison damage. Once applied, the poison retains potency for 1 minute before drying."
 },
 {
  "catalogId": "book_g_backpack",
  "name": "Backpack",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_pole_10_foot",
  "name": "Pole (10-foot)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.05,
  "weight": "7 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_ball_bearings_bag_of_1_000",
  "name": "Ball Bearings (bag of 1,000)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "2 lb",
  "notes": "As an action, you can spill these tiny metal balls from their pouch to cover a level area 10 feet square. A creature moving across the covered area must succeed on a DC 10 Dexterity saving throw or fall prone. A creature moving through the area at half speed doesn’t need to make the saving throw."
 },
 {
  "catalogId": "book_g_pot_iron",
  "name": "Pot, Iron",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "10 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_barrel",
  "name": "Barrel",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "70 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_pouch",
  "name": "Pouch",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.5,
  "weight": "1 lb",
  "notes": "A cloth or leather pouch can hold up to 20 sling bullets or 50 blowgun needles, among other things. A compartmentalized pouch for holding spell components is called a component pouch (described earlier in this section)."
 },
 {
  "catalogId": "book_g_basket",
  "name": "Basket",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.4,
  "weight": "2 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_power_source",
  "name": "Power Source",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "3 lb",
  "notes": "A powersource is a special item—a battery, a special dial, an energy crystal, a fuel rod, or a similar item—designed to channel the power of abilities and spells. This item functions as an Arcane Focus for Spells cast through the Gadgets Class Feature."
 },
 {
  "catalogId": "book_g_bedroll",
  "name": "Bedroll",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "7 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_quiver",
  "name": "Quiver",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "1 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_bell",
  "name": "Bell",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_ram_portable",
  "name": "Ram, Portable",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 4,
  "weight": "35 lb",
  "notes": "You can use a portable ram to break down doors. When doing so, you gain a +4 bonus on the One other character can help you use the ram, giving you advantage on this check."
 },
 {
  "catalogId": "book_g_blanket",
  "name": "Blanket",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.5,
  "weight": "3 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_rations_1_day",
  "name": "Rations (1 day)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.5,
  "weight": "2 lb",
  "notes": "Rations consist of dry foods suitable for extended travel, including jerky, dried fruit, hardtack, and nuts."
 },
 {
  "catalogId": "book_g_block_and_tackle",
  "name": "Block and tackle",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "5 lb",
  "notes": "A set of pulleys with a cable threaded through them and a hook to attach to objects, a block and tackle allows you to hoist up to four times the weight you can normally lift."
 },
 {
  "catalogId": "book_g_robes",
  "name": "Robes",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "4 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_book",
  "name": "Book",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "5 lb",
  "notes": "A book might contain poetry, historical accounts, information pertaining to a particular field of lore, diagrams and notes on dial contraptions, or just about anything else that can be represented using text or pictures."
 },
 {
  "catalogId": "book_g_rope_hempen_50_feet",
  "name": "Rope, hempen (50 feet)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "10 lb",
  "notes": "Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check."
 },
 {
  "catalogId": "book_g_bottle_glass",
  "name": "Bottle, Glass",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "2 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_rope_silk_50_feet",
  "name": "Rope, silk (50 feet)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "5 lb",
  "notes": "Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check."
 },
 {
  "catalogId": "book_g_bucket",
  "name": "Bucket",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.05,
  "weight": "2 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_sack",
  "name": "Sack",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.01,
  "weight": "1/2 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_caltrops_bag_of_20",
  "name": "Caltrops (Bag of 20)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "2 lb",
  "notes": "As an action, you can spread a single bag of caltrops to cover a 5-foot-square area. Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving and take 1 piercing damage. Until the creature regains at least 1 hit point, its walking speed is reduced by 10 feet. A creature moving through the area at half speed doesn’t need to make the saving throw."
 },
 {
  "catalogId": "book_g_scale_merchants",
  "name": "Scale, Merchant’s",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "3 lb",
  "notes": "A scale includes a small balance, pans, and a suitable assortment of weights up to 2 pounds. With it, you can measure the exact weight of small objects, such as raw precious metals or trade goods, to help determine their worth."
 },
 {
  "catalogId": "book_g_candle",
  "name": "Candle",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.01,
  "weight": "",
  "notes": "For 1 hour, a candle sheds bright light in a 5foot radius and dim light for an additional 5 feet."
 },
 {
  "catalogId": "book_g_sealing_wax",
  "name": "Sealing wax",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_case_gun_bullets",
  "name": "Case, Gun Bullets",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "1 lb",
  "notes": "This wooden case can hold up to 5 Magazines."
 },
 {
  "catalogId": "book_g_shovel",
  "name": "Shovel",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_case_map_or_scroll",
  "name": "Case, map or scroll",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "2 lb",
  "notes": "This cylindrical leather case can hold up to ten rolled-up sheets of paper or five rolled-up sheets of parchment."
 },
 {
  "catalogId": "book_g_signet_ring",
  "name": "Signet Ring",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_chain_10_feet",
  "name": "Chain (10 feet)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "10 lb",
  "notes": "A chain has 10 hit points. It can be burst with a successful DC 20 Strength check"
 },
 {
  "catalogId": "book_g_soap",
  "name": "Soap",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.02,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_chalk_1_piece",
  "name": "Chalk (1 piece)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.01,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_spikes_iron_10",
  "name": "Spikes, iron (10)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_chest",
  "name": "Chest",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "25 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_spellcasting_focus",
  "name": "Spellcasting Focus",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "3 lb",
  "notes": "A spellcasting focus is an item that is held by some spellcasters to direct their magical energy through. These can be represented by different objects such as wands or staffs. Using a Spellcasting Focus grants you a static bonus +1 to spellcasting. These can be found in +1 to +3 variants that increase your Static Bonus by an additional +1 to +3 depending on the bonus."
 },
 {
  "catalogId": "book_g_climbers_kit",
  "name": "Climber’s kit",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "12 lb",
  "notes": "A climber’s kit includes special pitons, boot tips, gloves, and a harness. You can use the climber’s kit as an action to anchor yourself; when you do, you can’t fall more than 25 feet from the point where you anchored yourself, and you can’t climb more than 25 feet away from that point without undoing the anchor."
 },
 {
  "catalogId": "book_g_spyglass",
  "name": "Spyglass",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 100,
  "weight": "1 lb",
  "notes": "Objects viewed through a spyglass are magnified to twice their size."
 },
 {
  "catalogId": "book_g_clothes_common",
  "name": "Clothes, Common",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.5,
  "weight": "3 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_tent_two_person",
  "name": "Tent, two-person",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "20 lb",
  "notes": "A simple and portable canvas shelter, a tent sleeps two."
 },
 {
  "catalogId": "book_g_clothes_costume",
  "name": "Clothes, Costume",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "4 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_tinderbox",
  "name": "Tinderbox",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.5,
  "weight": "1 lb",
  "notes": "This small container holds flint, fire steel, and tinder (usually dry cloth soaked in light oil) used to kindle a fire. Using it to light a torch—or anything else with abundant, exposed fuel—takes an action. Lighting any other fire takes 1 minute."
 },
 {
  "catalogId": "book_g_clothes_fine",
  "name": "Clothes, Fine",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 15,
  "weight": "6 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_torch",
  "name": "Torch",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.01,
  "weight": "1 lb",
  "notes": "A torch burns for 1 hour, providing bright light in a 20-foot radius and dim light for an additional 20 feet. If you make a melee attack with a burning torch and hit, it deals 1 fire damage."
 },
 {
  "catalogId": "book_g_clothes_travelers",
  "name": "Clothes, Traveler’s",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "4 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_vial",
  "name": "Vial",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_crowbar",
  "name": "Crowbar",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "6 lb",
  "notes": "Using a crowbar grants advantage to Strength checks where the crow bar’s leverage can be applied."
 },
 {
  "catalogId": "book_g_waterskin",
  "name": "Waterskin",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.2,
  "weight": "5 lb(full)",
  "notes": ""
 },
 {
  "catalogId": "book_g_fire_explosive",
  "name": "Fire Explosive",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 50,
  "weight": "6 lb",
  "notes": "Explosives require a method of being lit using heat or fire, and then being thrown. As an action, you can throw this explosive up to 20 feet, letting it explode where it lands. Make a ranged attack against a creature or object, treating the explosive as an improvised weapon. On a hit, the target takes 1d4 fire damage at the start of each of its turns. If it hits a flammable material or object, it will begin to burn away a random 5-foot cube of the material each round. A creature can end this damage or fire spread by using its action to make a DC 10 Dexterity check to extinguish the flames or toss water on it."
 },
 {
  "catalogId": "book_g_whetstone",
  "name": "Whetstone",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.01,
  "weight": "1 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_fishing_tackle",
  "name": "Fishing Tackle",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "6 lb",
  "notes": "This kit includes a wooden rod, silken line, corkwood bobbers, steel hooks, lead sinkers, velvet lures, and narrow netting."
 },
 {
  "catalogId": "book_g_flask_or_tankard",
  "name": "Flask or tankard",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.02,
  "weight": "6 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_grappling_hook",
  "name": "Grappling Hook",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "6 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_hammer",
  "name": "Hammer",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "6 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_alchemists_supplies",
  "name": "Alchemist’s supplies",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 50,
  "weight": "8 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_hammer_sledge",
  "name": "Hammer, Sledge",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "10 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_brewers_supplies",
  "name": "Brewer’s supplies",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 20,
  "weight": "9 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_handcuffs",
  "name": "Handcuffs",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "6 lb",
  "notes": "These metal restraints can bind a Small or Medium creature. Escaping the handcuffs requires a successful DC 20 Dexterity check. Breaking them requires a successful DC 20 Strength check. Each set of handcuffs comes with one key. Without the key, a creature proficient with thieves’ tools can pick the handcuffs’ lock with a successful DC 15 Dexterity check. Handcuffs have 15 hit points."
 },
 {
  "catalogId": "book_g_caligraphers_supplies",
  "name": "Caligrapher’s supplies",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_healers_kit",
  "name": "Healers Kit",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "3 lb",
  "notes": "This kit is a leather pouch containing bandages, salves, and splints. The kit has ten uses. As an action, you can expend one use of the kit to stabilize a creature that has 0 hit points, without needing to make a Wisdom (Medicine) check."
 },
 {
  "catalogId": "book_g_carpenters_tools",
  "name": "Carpenter’s Tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 8,
  "weight": "6 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_holy_symbol",
  "name": "Holy Symbol",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "1 lb",
  "notes": "A holy symbol is a representation of a god or pantheon. A Priest can use a holy symbol as a spellcasting focus, as described in chapter 10 of the D&D 5th Edition Player’s Handbook. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield."
 },
 {
  "catalogId": "book_g_cartographers_tools",
  "name": "Cartographer’s Tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 15,
  "weight": "6 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_holy_water_flask",
  "name": "Holy water (flask)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "1 lb",
  "notes": "As an action, you can splash the contents of this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. In either case, make a ranged attack against a target creature, treating the holy water as an improvised weapon. If the target is a fiend or undead, it takes 2d6 radiant damage. A priest may create holy water by performing a special ritual. The ritual takes 1 hour to perform, uses 250,000 Zeni worth of powdered silver and special salts, and requires the caster to expend a 1st-level spell slot."
 },
 {
  "catalogId": "book_g_cobblers_tools",
  "name": "Cobbler’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_hourglass",
  "name": "Hourglass",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "1 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_cooks_utensils",
  "name": "Cook’s Utensils",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "8 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_hunting_trap",
  "name": "Hunting Trap",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "25 lb",
  "notes": "When you use your action to set it, this trap form s a saw-toothed steel ring that snaps shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground. A creature that steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 piercing damage and stop moving. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet long). A creature can use its action to make a DC 13 Strength check, freeing itself or another creature within its reach on a success. Each failed check deals 1 piercing damage to the trapped creature."
 },
 {
  "catalogId": "book_g_engineering_kit",
  "name": "Engineering kit",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "5 lb",
  "notes": "This kit includes a soldering gun, wires, clips, wire cutters and various diagnostic tools. Proficiency with this kit lets you add your proficiency bonus to any ability check you make to modify/repair electrical devices as well as create your own."
 },
 {
  "catalogId": "book_g_ink_1_ounce_bottle",
  "name": "Ink (1 ounce bottle)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_glassblowers_tools",
  "name": "Glassblower’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 30,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_ink_pen",
  "name": "Ink Pen",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.02,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_jewlers_tools",
  "name": "Jewler’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 250,
  "weight": "2 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_ladder_10_foot",
  "name": "Ladder (10-foot)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.1,
  "weight": "25 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_leatherworkers_tools",
  "name": "Leatherworker’s Tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_lamp",
  "name": "Lamp",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.5,
  "weight": "1 lb",
  "notes": "A lamp casts bright light in a 15-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil."
 },
 {
  "catalogId": "book_g_masons_tools",
  "name": "Mason’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "8 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_lanter_bullseye",
  "name": "Lanter, bullseye",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "2 lb",
  "notes": "A bullseye lantern casts bright light in a 60-foot cone and dim light for an additional 60 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil."
 },
 {
  "catalogId": "book_g_painters_supplies",
  "name": "Painter’s supplies",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_lantern_hooded",
  "name": "Lantern, hooded",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.1,
  "weight": "2 lb",
  "notes": "A hooded lantern casts bright light in a 30-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil. As an action, you can lower the hood, reducing the light to dim light in a 5-foot radius."
 },
 {
  "catalogId": "book_g_potters_tools",
  "name": "Potter’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "3 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_lock",
  "name": "Lock",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "1 lb",
  "notes": "A key is provided with the lock. Without the key, a creature proficient with thieves’ tools can pick this lock with a successful DC 15 Dexterity check. Your DM may decide that better locks are available for higher prices."
 },
 {
  "catalogId": "book_g_smiths_tools",
  "name": "Smith’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 20,
  "weight": "8 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_mess_kit",
  "name": "Mess Kit",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.2,
  "weight": "1 lb",
  "notes": "This tin box contains a cup and simple cutlery. The box clamps together, and one side can be used as a cooking pan and the other as a plate or shallow bowl."
 },
 {
  "catalogId": "book_g_tinkers_tools",
  "name": "Tinker’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 50,
  "weight": "10 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_mirror_steel",
  "name": "Mirror, steel",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "1/2 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_weavers_tools",
  "name": "Weaver’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_oil_flask",
  "name": "Oil (Flask)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.1,
  "weight": "1 lb",
  "notes": "Oil usually comes in a clay flask that holds 1 pint. As an action, you can splash the oil in this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. Make a ranged attack against a target creature or object, treating the oil as an improvised weapon. On a hit, the target is covered in oil. If the target takes any fire damage before the oil dries (after 1 minute), the target takes an additional 5 fire damage from the burning oil. You can also pour a flask of oil on the ground to cover a 5-foot-square area, provided that the surface is level. If lit, the oil burns for 2 rounds and deals 5 fire damage to any creature that enters the area or ends its turn in the area. A creature can take this damage only once per turn."
 },
 {
  "catalogId": "book_g_woodcarvers_tools",
  "name": "Woodcarver’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "5 lb",
  "notes": ""
 },
 {
  "catalogId": "book_g_paper_one_sheet",
  "name": "Paper (one sheet)",
  "category": "Gear",
  "slot": "",
  "rarity": "common",
  "zeni": 0.2,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_dice_set",
  "name": "Dice Set",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 0.1,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_playing_card_set",
  "name": "Playing Card Set",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 0.5,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_bagpipes",
  "name": "Bagpipes",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 30,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_drums",
  "name": "Drums",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 6,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_dulcimer",
  "name": "Dulcimer",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_ocarina",
  "name": "Ocarina",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_lute",
  "name": "Lute",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 35,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_lyre",
  "name": "Lyre",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 35,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_horn",
  "name": "Horn",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 3,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_pan_flute",
  "name": "Pan Flute",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 12,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_shawm",
  "name": "Shawm",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 2,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_viol",
  "name": "Viol",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 30,
  "weight": "",
  "notes": ""
 },
 {
  "catalogId": "book_g_navigators_tools",
  "name": "Navigator’s tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "",
  "notes": "This set of instruments is used for navigation at sea. Proficiency with navigator’s tools lets you chart a ship’s course and follow navigation charts. In addition, these tools allow you to add your proficiency bonus to any ability check you make to avoid getting lost at sea or in the stars."
 },
 {
  "catalogId": "book_g_thieves_tools",
  "name": "Thieves’ tools",
  "category": "Tool",
  "slot": "",
  "rarity": "common",
  "zeni": 25,
  "weight": "",
  "notes": "This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks."
 },
 {
  "catalogId": "book_g_scouter_tier_1",
  "name": "Scouter (Tier 1)",
  "category": "Scouter",
  "slot": "eyes",
  "rarity": "common",
  "zeni": 25,
  "weight": "",
  "notes": "Using this handheld Binocular like device you may search for ki without the feature as an action. If you scan someone with more than a +3 Power bonus or 5 levels in a class with Ki this device explodes.\nRank 1 has a range of your current Continent Rank 2 has a range of your current Planet Rank 3 has a range of your current Solar System Rank 4 has a range of your current Galaxy"
 },
 {
  "catalogId": "book_g_scouter_tier_2",
  "name": "Scouter (Tier 2)",
  "category": "Scouter",
  "slot": "eyes",
  "rarity": "common",
  "zeni": 75,
  "weight": "",
  "notes": "Using this headgear like device you may search for ki without the feature as an action. If you scan someone with more than a +5 Power bonus or 10 levels in a class with Ki this device explodes.\nRank 1 has a range of your current Continent Rank 2 has a range of your current Planet Rank 3 has a range of your current Solar System Rank 4 has a range of your current Galaxy"
 },
 {
  "catalogId": "book_g_scouter_tier_3",
  "name": "Scouter (Tier 3)",
  "category": "Scouter",
  "slot": "eyes",
  "rarity": "common",
  "zeni": 150,
  "weight": "",
  "notes": "Using this headgear like device you may search for ki without the feature as an action. If you scan someone with more than a +7 Power bonus or 15 levels in a class with Ki this device explodes.\nRank 1 has a range of your current Continent Rank 2 has a range of your current Planet Rank 3 has a range of your current Solar System Rank 4 has a range of your current Galaxy"
 },
 {
  "catalogId": "book_g_scouter_tier_4",
  "name": "Scouter (Tier 4)",
  "category": "Scouter",
  "slot": "eyes",
  "rarity": "common",
  "zeni": 350,
  "weight": "",
  "notes": "Using this headgear like device you may search for ki without the feature as an action. If you scan someone with more than a +9 Power bonus or 20 levels in a class with Ki this device explodes.\nRank 1 has a range of your current Continent Rank 2 has a range of your current Planet Rank 3 has a range of your current Solar System Rank 4 has a range of your current Galaxy"
 },
 {
  "catalogId": "book_a_arrows_20_count",
  "name": "Arrows (20 count)",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_hand_cannon_magazine",
  "name": "Hand Cannon Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_pistol_magazine",
  "name": "Pistol Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 5,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_rifle_magazine",
  "name": "Rifle Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 8,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_shotgun_combat_magazine",
  "name": "Shotgun (Combat) Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 8,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_shotgun_double_barrel_magazine",
  "name": "Shotgun (Double Barrel) Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 3,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_sniper_magazine",
  "name": "Sniper Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_laser_pistol_magazine",
  "name": "Laser Pistol Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_laser_rifle_magazine",
  "name": "Laser Rifle Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 16,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_laser_shotgun_combat_magazine",
  "name": "Laser Shotgun (Combat) Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 16,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_laser_shotgun_double_barrel_magazine",
  "name": "Laser Shotgun (Double Barrel) Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 6,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 },
 {
  "catalogId": "book_a_laser_sniper_magazine",
  "name": "Laser Sniper Magazine",
  "category": "Ammunition",
  "slot": "",
  "rarity": "common",
  "zeni": 20,
  "weight": "",
  "notes": "Reload with an attack or an Action (Magazine property)."
 }
];

export const CONSUMABLE_DATA = [
 {
  "catalogId": "book_c_lesser_hetap",
  "name": "Lesser Hetap",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 3,
  "restore": {
   "stamina": "2d4+1"
  },
  "exhaustionAfterFirst": 1,
  "notes": "™:\n“With Hercule Satan himself as the sponser you know nothing in this world quenches you like Hetap. This refressing energy drink is guaranteed to make you feel ready to fight 2 more tournaments or your money back. Hetap is not responsible for injury or failed tournaments in the pursuit of this goal.“\nEach time you drink a Hetap™ after the first per long rest you gain ranks of Exhaustion as listed in the table."
 },
 {
  "catalogId": "book_c_hetap",
  "name": "Hetap",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 30,
  "restore": {
   "stamina": "2d6+2"
  },
  "exhaustionAfterFirst": 2,
  "notes": "™:\n“With Hercule Satan himself as the sponser you know nothing in this world quenches you like Hetap. This refressing energy drink is guaranteed to make you feel ready to fight 2 more tournaments or your money back. Hetap is not responsible for injury or failed tournaments in the pursuit of this goal.“\nEach time you drink a Hetap™ after the first per long rest you gain ranks of Exhaustion as listed in the table."
 },
 {
  "catalogId": "book_c_greater_hetap",
  "name": "Greater Hetap",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 120,
  "restore": {
   "stamina": "2d8+3"
  },
  "exhaustionAfterFirst": 3,
  "notes": "™:\n“With Hercule Satan himself as the sponser you know nothing in this world quenches you like Hetap. This refressing energy drink is guaranteed to make you feel ready to fight 2 more tournaments or your money back. Hetap is not responsible for injury or failed tournaments in the pursuit of this goal.“\nEach time you drink a Hetap™ after the first per long rest you gain ranks of Exhaustion as listed in the table."
 },
 {
  "catalogId": "book_c_superior_hetap",
  "name": "Superior Hetap",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 1200,
  "restore": {
   "stamina": "2d10+4"
  },
  "exhaustionAfterFirst": 4,
  "notes": "™:\n“With Hercule Satan himself as the sponser you know nothing in this world quenches you like Hetap. This refressing energy drink is guaranteed to make you feel ready to fight 2 more tournaments or your money back. Hetap is not responsible for injury or failed tournaments in the pursuit of this goal.“\nEach time you drink a Hetap™ after the first per long rest you gain ranks of Exhaustion as listed in the table."
 },
 {
  "catalogId": "book_c_supreme_hetap",
  "name": "Supreme Hetap",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 12000,
  "restore": {
   "stamina": "2d12+5"
  },
  "exhaustionAfterFirst": 5,
  "notes": "™:\n“With Hercule Satan himself as the sponser you know nothing in this world quenches you like Hetap. This refressing energy drink is guaranteed to make you feel ready to fight 2 more tournaments or your money back. Hetap is not responsible for injury or failed tournaments in the pursuit of this goal.“\nEach time you drink a Hetap™ after the first per long rest you gain ranks of Exhaustion as listed in the table."
 },
 {
  "catalogId": "book_c_lesser_sage_water",
  "name": "Lesser Sage Water",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "restore": {
   "ki": "3d10+10"
  },
  "notes": "Sage Water is water pulled from the same spring that feeds the great Senzu Orchard. Drinking this water soothes the soul and restores your Ki points."
 },
 {
  "catalogId": "book_c_sage_water",
  "name": "Sage Water",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "restore": {
   "ki": "6d10+20"
  },
  "notes": "Sage Water is water pulled from the same spring that feeds the great Senzu Orchard. Drinking this water soothes the soul and restores your Ki points."
 },
 {
  "catalogId": "book_c_greater_sage_water",
  "name": "Greater Sage Water",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 40,
  "restore": {
   "ki": "9d10+30"
  },
  "notes": "Sage Water is water pulled from the same spring that feeds the great Senzu Orchard. Drinking this water soothes the soul and restores your Ki points."
 },
 {
  "catalogId": "book_c_superior_sage_water",
  "name": "Superior Sage Water",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 400,
  "restore": {
   "ki": "12d10+40"
  },
  "notes": "Sage Water is water pulled from the same spring that feeds the great Senzu Orchard. Drinking this water soothes the soul and restores your Ki points."
 },
 {
  "catalogId": "book_c_supreme_sage_water",
  "name": "Supreme Sage Water",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 4000,
  "restore": {
   "ki": "15d10+50"
  },
  "notes": "Sage Water is water pulled from the same spring that feeds the great Senzu Orchard. Drinking this water soothes the soul and restores your Ki points."
 },
 {
  "catalogId": "book_c_lesser_vitadrink",
  "name": "Lesser Vitadrink",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 1,
  "restore": {
   "hp": "1d6+2"
  },
  "notes": "Made from the extract of Senzu Beans this bitter green beverage heals minor wounds stabalizes the endangered."
 },
 {
  "catalogId": "book_c_vitadrink",
  "name": "Vitadrink",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 10,
  "restore": {
   "hp": "2d6+4"
  },
  "notes": "Made from the extract of Senzu Beans this bitter green beverage heals minor wounds stabalizes the endangered."
 },
 {
  "catalogId": "book_c_greater_vitadrink",
  "name": "Greater Vitadrink",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 40,
  "restore": {
   "hp": "4d6+6"
  },
  "notes": "Made from the extract of Senzu Beans this bitter green beverage heals minor wounds stabalizes the endangered."
 },
 {
  "catalogId": "book_c_superior_vitadrink",
  "name": "Superior Vitadrink",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 400,
  "restore": {
   "hp": "8d6+8"
  },
  "notes": "Made from the extract of Senzu Beans this bitter green beverage heals minor wounds stabalizes the endangered."
 },
 {
  "catalogId": "book_c_supreme_vitadrink",
  "name": "Supreme Vitadrink",
  "category": "Consumable",
  "slot": "",
  "rarity": "common",
  "zeni": 4000,
  "restore": {
   "hp": "10d6+10"
  },
  "notes": "Made from the extract of Senzu Beans this bitter green beverage heals minor wounds stabalizes the endangered."
 },
 {
  "catalogId": "book_c_premium_bento_box",
  "name": "Premium Bento Box",
  "category": "Consumable",
  "slot": "",
  "rarity": "uncommon",
  "zeni": 200,
  "restore": {
   "ki": "6d10+20",
   "hp": "2d6+4",
   "stamina": "1d4+1"
  },
  "oncePerLongRest": true,
  "notes": "A delicious home cooked meal, nice and packaged for a quick bite. Eating a Bento Box takes an Action and grants the consumer 6d10+20 Ki Points, 2d6+4 Hit Points, and 1d4+1 Stamina Points. This can not raise a creature above their Maximum for each Resource. A creature can only consume a single Premium Bento Box per Long Rest."
 },
 {
  "catalogId": "book_c_senzu_bean",
  "name": "Senzu Bean",
  "category": "Consumable",
  "slot": "",
  "rarity": "veryrare",
  "zeni": 40000,
  "restore": {
   "hp": "full",
   "ki": "full",
   "stamina": "full",
   "exhaustion": 7
  },
  "exhaustionAfterFirst": 1,
  "notes": "Senzu Beans are grown by Korin in Korin Tower. When eaten, a person’s physical condition is near-instantly restored to its natural peak. This property makes them immensely useful to carry in battle. As such, since Korin allied himself with Goku and his friends, Korin usually assists them by providing the Dragon Team with a bag of Senzu Beans. However, the supply is limited, as it takes a long time to grow even a single Senzu Bean. Their texture is said to be a cross between an uncooked (or under-ripe) bean and a celery stalk, and Yajirobe states that they taste like fish. After eating a Senzu Bean you gain the following benefits:\nYour HP is restored to full. The target’s severed body members (fingers, legs, tails, and so on), if any, are restored so long as they are not scarred over. Your Ki is restored to full. Your Stamina is restored to full. You are healed up to 7 ranks of exhaustion. You are fed for 7 days.\nEach Senzu Bean you eat after the first before a Long Rest will grant you 1 rank of Exhaustion that can only be cured from a Long Rest as your body has trouble withstanding the filling effects of the Senzu Bean"
 }
];

export const GEAR_RULES = [
 {
  "id": "gear_shifting_gear",
  "name": "Shifting Gear",
  "section": "Armor Rules",
  "text": "Occasionally armor has to be made for those that routinely c into Shifting Gear by spending an amount of Zeni equal to 2 grow and shrink to fit the wearer regardless of any change t Armor or Clothes.",
  "page": 439
 },
 {
  "id": "gear_weighted_gear",
  "name": "Weighted Gear",
  "section": "Armor Rules",
  "text": "Weighted Gear, whether it be a shirt, bracers, caps, capes, o over or as part of your clothing/armor and is designed to lim When you are wearing weighted gear you gain the Weight spending a long rest Attuning to your weighted gear you can removing and unattuning to the Weighted Gear on your turn for the next minute. Weighted Gear costs an additional 25% of the normal Zen Condition. or 25 Zeni per rank of the Weighted (Heavy) Con be worn without armor. Damage Reduction Strength Stealth oficiency Bonus 1 - Disadvantage oficiency Bonus 1 -\nss AC Damage Reduction Strength Stealth ) + Half Proficiency Bonus 2 - - ) + Half Proficiency Bonus 2 - -\nC Damage Reduction Strength Stealth Bonus 3 13 Disadvantage Bonus 4 15 Disadvantage\nss AC Strength Stealth - -\nchange their size. A set of Armor or Clothes can be made 2x the Armor or Clothes’ Base Zeni Cost. Shifting Gear will to their Size Category, so long as their new form can wear\nor any other article of clothing, are designed to be worn mit the body for explosive power later. ted (Heavy) Condition equal to the rank of the gear, by n acclimate your body to it. You may spend 1 Action n to gain the Weighted (Light) Condition of the same rank\nni cost of the item per rank of the Weighted (Heavy) ndition on items such as braclets and ankle weights that can",
  "page": 439
 },
 {
  "id": "gear_weapon_proficiency",
  "name": "Weapon Proficiency",
  "section": "Weapon Properties",
  "text": "Your species, class, and feats can grant you proficiency with certain weapons or categories of weapons. The two categories are simple and martial. Most people can use simple weapons with proficiency. These weapons include clubs, maces, and other weapons often found in the hands of commoners. Martial weapons, including swords, axes, and polearms, require more specialized training to use effectively. Most warriors use martial weapons because these weapons put their fighting style and training to best use. Proficiency with a weapon allows you to add your proficiency bonus to the attack roll for any attack you make with that weapon. If you make an attack roll using a weapon with which you lack proficiency, you do not add your proficiency bonus to the attack roll.",
  "page": 440
 },
 {
  "id": "gear_defensive",
  "name": "Defensive",
  "section": "Weapon Properties",
  "text": "Whenever you are wielding this Weapon, you gain a +1 bonus to your AC.",
  "page": 440
 },
 {
  "id": "gear_fly_through",
  "name": "Fly-Through",
  "section": "Weapon Properties",
  "text": "Whenever you make a Ranged Weapon Attack with this and miss the target, or reduce the target to 0 Hit Points, it continues its flight and returns to your hand.",
  "page": 440
 },
 {
  "id": "gear_grappling",
  "name": "Grappling",
  "section": "Weapon Properties",
  "text": "Whenever you make an attack roll with a grappling weapon as part of the Attack Action, you may grapple the target instead of dealing damage when you land the attack. You may not make Weapon Attacks with a weapon that is being used to Grapple.",
  "page": 440
 },
 {
  "id": "gear_laser_weapons",
  "name": "Laser Weapons",
  "section": "Weapon Properties",
  "text": "Laser Weapons are made to bypass resistances, making it perfect to fight against those who carry an innnate resistance against bludgeoning, piercing, and slashing. Laser Weapons function as the standard Weapon except they deal Energy Damage. All Laser Weapons counts as Martial Weapons for the purposes of proficiency and Armed Techniques. Getting a Laser Weapon created costs 2x the Weapon’s Standard Zeni Cost.\nIf a Laser Weapon also has the Grappling Property, creatures Grappled using those Weapons take an additional Weapon Damage Die when they become Grappled and each time they fail to escape the Grapple.",
  "page": 440
 },
 {
  "id": "gear_magazine",
  "name": "Magazine",
  "section": "Weapon Properties",
  "subtitle": "Inspired by Matt Mercer’s Reload mechanic",
  "text": "If a weapon has the magazine property, it can be fired a number of times equal to the number listed next to its Magazine property before you must spend 1 attack or 1 Action to reload it with another Magazine. You must either have one free hand to reload a firearm or firearms must be the only thing you are holding. When reloaded the empty Magazine can be discarded or kept, you select another Magazine in your inventory that is not empty and its count becomes the new number of shots that can be taken with this firearm before requiring another reload. You may always reload to replace Magazines even if you aren’t out of shots in the current Magazine.",
  "page": 440
 },
 {
  "id": "gear_returning",
  "name": "Returning",
  "section": "Weapon Properties",
  "text": "A Thrown Weapon with the Returning Property returns to the the Wielder’s hand after every throw.",
  "page": 440
 },
 {
  "id": "gear_riposting",
  "name": "Riposting",
  "section": "Weapon Properties",
  "text": "Riposting Weapons are designed to be quickly placed in the way of oncoming attacks. Whenever a Creature wielding a Riposting Weapon is targeted by an Attack Roll, they may use their Reaction to gain a +2 to their AC until the start of their next turn.",
  "page": 440
 },
 {
  "id": "gear_special",
  "name": "Special",
  "section": "Weapon Properties",
  "text": "A weapon with the special property has unusual rules governing its use, explained in the weapon’s description (see “Special Weapons” later in this section).",
  "page": 440
 },
 {
  "id": "gear_spread",
  "name": "Spread",
  "section": "Weapon Properties",
  "text": "Certain ranged weapons have an issue with Spread, the act of the ammunition spreading out the further away you are. Instead of Attack Rolls a Spread Weapon forces a Dexterity Saving Throw based on your Shot Technique Save DC, taking half on a success. Each 10 feet that your target is away from you, reduce the Damage Die by 1 step, minimum d4.\nSawed-Off: An alternative modification to a Spread Weapon involves cutting the barrel down to a smaller size. This increases the Damage Die by 2 steps and removes the Heavy and Two-Handed Properties, but they now decrease by a step for every 5 Feet past Melee Range that the target is, minimum d4.",
  "page": 440
 },
 {
  "id": "gear_thrown",
  "name": "Thrown",
  "section": "Weapon Properties",
  "text": "If a weapon has the thrown property, you can throw the weapon to make a ranged attack. If the weapon is a melee weapon, you use the same ability modifier for that attack roll and damage roll that you would use for a melee attack with the weapon. For example, if you throw a handaxe, you use your Strength, but if you throw a dagger, you can use either your Strength or your Dexterity, since the dagger has the finesse property. Regardless of modifier used, however, the attack is considered a Ranged Weapon Attack for interactions.",
  "page": 441
 },
 {
  "id": "gear_twisting",
  "name": "Twisting",
  "section": "Weapon Properties",
  "text": "Twisting Weapons are a rare variety of weapon that are meant to be in constant motion while in use. Once per Turn as part of the Attack Action, Weapons with the Twisting Property can target an additional creature with one Weapon Attack Roll as long as they are also within Range.",
  "page": 441
 },
 {
  "id": "gear_special_weapons",
  "name": "Special Weapons",
  "section": "Weapon Properties",
  "text": "Weapons with special rules are described here.\nCombat Gauntlet: When you are wielding this Weapon, you are still able to wield a Weapon in that hand so long as it is not another Combat Gauntlet.\nFishing Rod: As an Action on your turn, you may make a special Attack Roll against a a Creature within 30 + (10x this Weapon’s magical Bonus to Attack Rolls) Feet to catch them with your hook until you unhook them as a Bonus Action. A Creature that is hooked can not leave the range of this Property and must make a Strength Saving Throw againt your Armed Save DC as an Action on their turn to unhook themself. As a Bonus Action on your turn you may pull the hooked creature up to 5x your Strength Ability Score in a direction of your choice, so long as the location is within the range of this Property.\nHooksword: Whenever you are wielding two Hookswords, you may expend your Bonus Action to connect them together, turning them into a single Hooksword with the Reach Property until the end of your turn.\nLance: You have disadvantage when you use a lance to attack a target within 5 feet of you. Also, a lance requires two hands to wield when you aren’t mounted. Ninja Wire: Whenever a creature would be effected by this Weapon’s Grappling Property, you may choose to release the this Weapon and have it wrap around the target. A Target that has this happen to them is Restrained and makes attempts to free themself againt your Armed Save DC. Additionally, you may touch the creature as an Action on your turn to release them and reclaim the Ninja Wire.",
  "page": 441
 },
 {
  "id": "gear_ammunition",
  "name": "Ammunition",
  "section": "Weapon Properties",
  "text": "Ammunition Cost Arrows (20 count) 1 Zeni Hand Cannon Magazine 5 Zeni Pistol Magazine 5 Zeni Rifle Magazine 8 Zeni Shotgun (Combat) Magazine 8 Zeni Shotgun (Double Barrel) Magazine 3 Zeni Sniper Magazine 10 Zeni Laser Pistol Magazine 10 Zeni Laser Rifle Magazine 16 Zeni Shotgun (Combat) Magazine 16 Zeni Shotgun (Double Barrel) Magazine 6 Zeni Laser Sniper Magazine 20 Zeni",
  "page": 441
 },
 {
  "id": "gear_weapon_mastery_properties",
  "name": "Weapon Mastery Properties",
  "section": "Weapon Properties",
  "text": "When calculating the Save DC for effects imposed by a Weapon Mastery Property, you may use your Armed Technique Save DC for Melee Weapons or your Shot Technique Save DC for Ranged Weapons.",
  "page": 441
 },
 {
  "id": "gear_martial_weapons",
  "name": "Martial Weapons",
  "section": "Weapon Properties",
  "text": "Martial Weapons, including swords, axes, and polearms, require more specialized training to use effectively. Most warriors use martial weapons because these weapons put their fighting style and training to best use.",
  "page": 441
 },
 {
  "id": "gear_monastic",
  "name": "Monastic",
  "section": "Weapon Properties",
  "text": "Monastic Weapons are a small classification of Weapons once designed and used by monks and pilgrims for many years. While use in this manner is more complicated than casual Simple Weapon use, a Monastic Weapon can be used in place of an Unarmed Strike whilst still qualifying for any interactions that rely on Unarmed Strikes.",
  "page": 442
 },
 {
  "id": "gear_benefits_of_magical_gear",
  "name": "Benefits of Magical Gear",
  "section": "Magical Gear",
  "text": "Enchantments:\nEnchantments refer to a list of magical abilities that appear on Enchanted Gear and are detailed in the Enchantment List.\nHeroic Techniques:\nWhenever a creature wields or otherwise equips Heroic Gear they will gain access to that Equipment’s Heroic Techniques and can cast the as if they knew them.\nMagical Bonus:\nA Magical Bonus refers to a bonus to a creature’s statistics as listed below:\nA creature gains a bonus to Weapon Attack Rolls that use a this Item equal to its Magical Bonus. A creature gains a Static Bonus to Techniques that use a this Item equal to half of its Magical Bonus, rounded up. If the Item is Armor or a Shield, a creature using it gains a bonus to their Armor Class equal to its Magical Bonus.",
  "page": 450
 },
 {
  "id": "gear_types_of_magical_gear",
  "name": "Types of Magical Gear",
  "section": "Magical Gear",
  "text": "Enchanted Gear:\nEnhanted Gear refers to Armors and Weapons that only possess an Enchantment from the Enchantment List as well as a Magical Bonus.\nHeroic Gear:\nHeroic Gear refers to Armors and Weapons that that possess a Magical Bonus as well as abilities and Heroic Techniques that have been imprinted onto them by their previous legendary wielders. Heroic Gear can not be created in traditional ways, instead typically being found in places of great importance for the original possessers. Examples of Heroic Gear can be found in the Heroic Gear List.\nDivine Heroic Gear: Whenever Heroic Gear is used by a creature with Maximum God Ki of 1 or greater, increase its Magical Bonus by 1 and grant the Equipment its listed Divine Bonus.",
  "page": 450
 },
 {
  "id": "gear_aegis",
  "name": "Aegis",
  "section": "Enchantments",
  "subtitle": "Available to: All Armor and Shields",
  "text": "A shining aura of magic helps reinforce your own defensive capabilities.\nLevel 1:\nWhenever a creature wears this Equipment, the Casting Cost of the Block Snap Decision is reduced by 1 Stamina, to a minimum of 1 Stamina.\nLevel 2:\nWhenever a creature wears this Equipment, the Casting Cost of the Block, Intercept (Ally), and Intercept (Enemy) Snap Decisions are reduced by 1 Stamina, to a minimum of 1 Stamina.\nLevel 3:\nWhenever a creature wears this Equipment, the Casting Cost of the Block, Intercept (Ally), and Intercept (Enemy) Snap Decisions are reduced by 1 Stamina, to a minimum of 1 Stamina. Additionally, you gain 1 point of Damage Reduction that is not counted toward your Maximum Damage Reduction possible.",
  "page": 451
 },
 {
  "id": "gear_deadly",
  "name": "Deadly",
  "section": "Enchantments",
  "subtitle": "Available to: All Weapons",
  "text": "An edge of mystical energy flares across your weapon at critical moments.\nLevel 1:\nCritical Hits made with this Weapon deal an additional Damage Die of the Weapon’s Damage Type.\nLevel 2:\nCritical Hits made with this Weapon deal an additional 2 Damage Dice of the Weapon’s Damage Type.\nLevel 3:\nCritical Hits made with this Weapon deal an additional 3 Damage Dice of the Weapon’s Damage Type.",
  "page": 451
 },
 {
  "id": "gear_distant",
  "name": "Distant",
  "section": "Enchantments",
  "subtitle": "Available to: Ranged Weapons",
  "text": "By improving your firing mechanism with magic, you can super-charge your ranged weapons.\nLevel 1:\nThis Weapon has its Short and Long Range increased by 50%.\nLevel 2:\nThis Weapon has its Short and Long Range doubled.\nLevel 3:\nThis Weapon has its Short and Long Range doubled. Additionally, you suffer no penalties for targeting creatures in your Long Range.",
  "page": 451
 },
 {
  "id": "gear_eco_fueled",
  "name": "Eco Fueled",
  "section": "Enchantments",
  "subtitle": "Available to: All Armors",
  "text": "A special energy engine has been implanted into your Armor, granting you a versatile modifier to your abiities.\nLevel 1:\nWhenever a creature wearing this Armor casts a Technique, they may change the Damage Type to a new Damage Type of their choice that is not Destruction, Force, or Psychic Damage. This effect can be used three times per Long Rest.\nLevel 2:\nWhenever a creature wearing this Armor casts a Technique, they may change the Damage Type to a new Damage Type of their choice that is not Destruction, Force, or Psychic Damage. This effect can be used three times per Short or Long Rest.\nLevel 3:\nWhenever a creature wearing this Armor casts a Technique, they may change the Damage Type to a new Damage Type of their choice that is not Destruction or Psychic Damage. This effect can be used five times per Short or Long Rest.",
  "page": 451
 },
 {
  "id": "gear_enviromental_protection",
  "name": "Enviromental Protection",
  "section": "Enchantments",
  "subtitle": "Available to: All Armors",
  "text": "Through the use of extreme measures, your armor is capable of providing life support.\nLevel 1:\nYou gain 1 point of Damage Reduction against Cold, Fire, and Lightning Damage. This does not count towards your Maximum Damage Reduction Possible.\nLevel 2:\nYou gain 2 points of Damage Reduction against Cold, Fire, and Lightning Damage. This does not count towards your Maximum Damage Reduction Possible. Additionally, this Armor provides you with one hour of breatheable oxygen per day, recharging at dawn.\nLevel 3:\nYou gain 3 points of Damage Reduction against Cold, Fire, and Lightning Damage. This does not count towards your Maximum Damage Reduction Possible. Additionally, this Armor provides you with twelve hours of breatheable oxygen per day, recharging at dawn, as well as a Climb and Swim Speed equal to your Walk Speed.",
  "page": 452
 },
 {
  "id": "gear_elemental",
  "name": "Elemental",
  "section": "Enchantments",
  "subtitle": "Available to: All Weapons",
  "text": "The power of a force of nature is now surging through your weapon.\nLevel 1:\nWhenever a Weapon receives this Enchantment, choose one Damage Type that is not Destruction, Force, or Psychic Damage. You may replace the Damage Type of Weapon Attacks that use this Weapon with the chosen Damage Type.\nLevel 2:\nYou may replace the Damage Type of Weapon Attacks and Techniques that use this Weapon with the Damage Type chosen for Level 1.\nLevel 3:\nYou may replace the Damage Type of Weapon Attacks and Techniques that use this Weapon with the Damage Type chosen for Level 1. Additionally, this Damage ignores Resistances.",
  "page": 452
 },
 {
  "id": "gear_flickering",
  "name": "Flickering",
  "section": "Enchantments",
  "subtitle": "Available to: All Weapons",
  "text": "Your weapon now phases in and out of reality as it strikes, granting it the ability to pass through defenses.\nLevel 1:\nWeapon Attacks that use this Weapon ignore half of a creature’s Damage Reduction, rounded down.\nLevel 2:\nWeapon Attacks that use this Weapon ignore Damage Reduction.\nLevel 3:\nWeapon Attacks and Techniques that use this Weapon ignore Damage Reduction.",
  "page": 452
 },
 {
  "id": "gear_hovering",
  "name": "Hovering",
  "section": "Enchantments",
  "subtitle": "Available to: All Weapons and Shields",
  "text": "You have given your equipment a modicum of sentience that allows you to use them without your hands being needed.\nLevel 1:\nAs a Bonus Action on your turn, you may speak a command word of your own design and cause this piece of Equipment to begin floating around you for the next minute. During this time, you are always treated as if you are holding and using that piece of Equipment.\nLevel 2:\nAs a Bonus Action on your turn, you may speak a command word of your own design and cause this piece of Equipment to begin floating around you or a creature of your choice within 30 feet for the next minute. During this time, the creature that it is hovering around is always treated as if they are holding and using that piece of Equipment. You may change who the piece of equipment is hovering around as a Bonus Action on your turn, resetting its duration in the process.\nLevel 3:\nAs a Bonus Action on your turn or as a Reaction, you may speak a command word of your own design and cause this piece of Equipment to begin floating around you or a creature of your choice within 60 feet for the next minute. During this time, the creature that it is hovering around is always treated as if they are holding and using that piece of Equipment. You may change who the piece of equipment is hovering around as a Bonus Action on your turn or as a Reaction, resetting its duration in the process.",
  "page": 452
 },
 {
  "id": "gear_iconic",
  "name": "Iconic",
  "section": "Enchantments",
  "subtitle": "Available to: All Weapons and Shields",
  "text": "You have placed your own skills and mastery into your equipment.\nLevel 1:\nChoose one Iconic Mastery that you have access to and implant it into the piece of Equipment. Whenever a creature using it casts a Technique that uses it, they may grant it the chosen Iconic Mastery for that casting. This effect activates, even if the Technique would already benefit from an Iconic Mastery, unless it already possess the implanted Iconic Mastery. This ability can be used once per day.\nLevel 2:\nWhenever a creature using this piece of Equipment casts a Technique that uses it, they may grant it the Iconic Mastery chosen for Level 1 for that casting. This effect activates, even if the Technique would already benefit from an Iconic Mastery, unless it already possess the implanted Iconic Mastery. This ability can be used three times per day.\nLevel 3:\nWhenever a creature using this piece of Equipment casts a Technique that uses it, they may grant it the Iconic Mastery chosen for Level 1 for that casting. This effect activates, even if the Technique would already benefit from an Iconic Mastery, unless it already possess the implanted Iconic Mastery. This ability can be used five times per day.",
  "page": 453
 },
 {
  "id": "gear_imbued_deprecated",
  "name": "Imbued (Deprecated)",
  "section": "Enchantments",
  "subtitle": "Available to: All Weapons and Shields",
  "text": "You have placed a fragment of your power into your equipment to be used at a later time.\nLevel 1:\nChoose one Technique that you know that can be casted using this piece of Equipment, imbuing it into the piece of Equipment. Whenever a creature is holding this piece of Equipment, they may cast the chosen Technique at their highest possible Rank without expending its Casting Cost. This ability can be used once per day.\nLevel 2:\nWhenever a creature is holding this piece of Equipment, they may cast the Technique chosen for Level 1 at their highest possible Rank without expending its Casting Cost. This ability can be used three times per day.\nLevel 3:\nWhenever a creature is holding this piece of Equipment, they may cast the Technique chosen for Level 1 at their highest possible Rank without expending its Casting Cost. This ability can be used five times per day.",
  "page": 453
 },
 {
  "id": "gear_kinetic_absorption",
  "name": "Kinetic Absorption",
  "section": "Enchantments",
  "subtitle": "Available to: All Armor and Shields",
  "text": "Your equipment is capable of absorbing the impact of attacks and storing it to expended later.\nLevel 1:\nWhenever you are using this piece of Equipment and are hit with a Melee Attack, you gain a Kinetic Charge for one minute, to a maximum of three. Whenever a creature would come within 5 feet of you or you move within 5 feet of another creature, you may use your Reaction and expend any number of Kinetic Charges to release a pulse of energy in a 5 foot Emanation that is centered on you. All creatures within range must make a Strength Saving Throw based on your highest Technique Save DC or be Launched X feet in a straight line away from you, where X is 10x the number of expended Kinetic Charges. Creatures that pass are Launched half as far.\nLevel 2:\nWhenever you are using this piece of Equipment and are hit with a Melee Attack, you gain a Kinetic Charge for one minute, to a maximum of six. Whenever a creature would come within 5 feet of you, you may use your Reaction and expend any number of Kinetic Charges to release a pulse of energy in a 5 foot Emanation that is centered on you. All creatures within range must make a Strength Saving Throw based on your highest Technique Save DC or be Launched X feet in a straight line away from you, where X is 10x the number of expended Kinetic Charges. Creatures that pass are Launched half as far.\nLevel 3:\nWhenever you are using this piece of Equipment and are hit with a Melee Attack, you gain a Kinetic Charge for one minute, to a maximum of nine. Whenever a creature would come within 5 feet of you, you may use your Reaction and expend any number of Kinetic Charges to release a pulse of energy in a 5 foot Emanation that is centered on you. All creatures within range must make a Strength Saving Throw based on your highest Technique Save DC or be Launched X feet in a straight line away from you, where X is 10x the number of expended Kinetic Charges. Creatures that pass are Launched half as far.",
  "page": 453
 },
 {
  "id": "gear_magnificent",
  "name": "Magnificent",
  "section": "Enchantments",
  "subtitle": "Available to: All Weapons",
  "text": "Through careful enchantments, you have improved almost all aspects of this weapon’s craftsmanship.\nLevel 1:\nThis Weapon gains an additional +1 Magical Bonus.\nLevel 2:\nThis Weapon gains an additional +1 Magical Bonus. Additionally whenever you roll a 1 for Damage for a Weapon Attack using this Weapon, you deal an additional 1 point of Damage. This effect happens, even if Damage was rerolled.\nLevel 3:\nThis Weapon gains an additional +1 Magical Bonus. Additionally whenever you roll a 1 for Damage for a Weapon Attack or Technique that uses this Weapon, you deal an additional 1 point of Damage. This effect happens, even if Damage was rerolled.",
  "page": 454
 },
 {
  "id": "gear_majestic",
  "name": "Majestic",
  "section": "Enchantments",
  "subtitle": "Available to: All Armor and Shields",
  "text": "Through careful enchantments, you have improved almost all aspects of this equipments’s craftsmanship.\nLevel 1:\nThis piece of Equipment gains an additional +1 Magical Bonus.\nLevel 2:\nThis piece of Equipment gains an additional +1 Magical Bonus. Additionally, choose one Damage Type that is not Destruction, Force, or Psychic Damage. You gain 1 point of Damage Reduction against the chosen Damage Type that is not counted toward your Maximum Damage Reduction possible.\nLevel 3:\nThis piece of Equipment gains an additional +1 Magical Bonus. Additionally, you gain 3 points of Damage Reduction against the Damage Type chosen for Level 2 that is not counted toward your Maximum Damage Reduction possible.",
  "page": 454
 },
 {
  "id": "gear_producing",
  "name": "Producing",
  "section": "Enchantments",
  "subtitle": "Available to: Weapons with the Ammunition Property",
  "text": "Your weapon creates and fires ammunition of its own creation.\nLevel 1:\nThis Weapon now produces its own Ammunition and does not need to be loaded.\nLevel 2:\nThis Weapon now produces its own Ammunition and does not need to be loaded. Additionally, its Damage Type can be changed to Energy Damage.\nLevel 3:\nThis Weapon now produces its own Ammunition and does not need to be loaded. Additionally, its Damage Type can be changed to one of the following Damage Types:\nCold Damage Energy Damage Fire Damage Lightning Damage Psychic Damage Thunder Damage",
  "page": 454
 },
 {
  "id": "gear_resisting",
  "name": "Resisting",
  "section": "Enchantments",
  "subtitle": "Available to: All Armor",
  "text": "Your equipment is now supernaturally resistant to a particular type of punishment.\nLevel 1:\nChoose one Damage Type that is not Destruction Damage. Creatures that wear this piece of Equipment receive Resistance against the chosen Damage Type.\nLevel 2:\nChoose one Damage Type that is not Destruction Damage. Creatures that wear this piece of Equipment receive Resistance against the chosen Damage Type and the Damage Type chosen for Level 1.\nLevel 3:\nCreatures that wear this piece of Equipment receive Resistance against the Damage Type chosen for Level 1 and Level 2. Additionally, you gain 2 special points of Damage Reduction that triggers after these Resistances have been factored into how much Damage you would receive.",
  "page": 455
 },
 {
  "id": "gear_soaring",
  "name": "Soaring",
  "section": "Enchantments",
  "subtitle": "Available to: All Armors",
  "text": "Your armor can now propel itself through the air, augmenting your own aerial ability.\nLevel 1:\nCreatures that wear this Armor gain a Base Fly Speed of 30 feet, or increase a preexisting Fly Speed by that same amount.\nLevel 2:\nCreatures that wear this Armor gain a Base Fly Speed of 45 feet, or increase a preexisting Fly Speed by that same amount. Additionally whenever you are forced to make a Dexterity Saving Throw while benefiting from this Fly Speed, you gain a +1 Static Bonus.\nLevel 3:\nCreatures that wear this Armor gain a Base Fly Speed of 60 feet, or increase a preexisting Fly Speed by that same amount. Additionally whenever you are forced to make a Dexterity Saving Throw while benefiting from this Fly Speed, you gain a +2 Static Bonus.",
  "page": 455
 },
 {
  "id": "gear_summoning",
  "name": "Summoning",
  "section": "Enchantments",
  "subtitle": "Available to: All Armors, All Weapons, and Shields",
  "text": "You are able to call your equipment to you and use it in an instant.\nLevel 1:\nAs a Bonus Action on your turn, you may speak a command word of your design and cause this piece of Equipment to begin moving towards you at a pace of 60 feet per round. When this piece of Equipment reaches you it goes to your hand, or equips itself if it is Armor.\nLevel 2:\nAs a Bonus Action on your turn, you may speak a command word chosen at Level 1 and cause this piece of Equipment to teleport to you. When this piece of Equipment reaches you it goes to your hand, or equips itself if it is Armor.\nLevel 3:\nAs a Bonus Action on your turn, you may speak a command word chosen at Level 1 and cause this piece of Equipment to teleport to you. When this piece of Equipment reaches you it goes to your hand, or equips itself if it is Armor. Additionally as a Bonus Action on your turn while you hold or wear this piece of Equipment, you may store it in a pocket dimension that can only hold it until you summon it again.",
  "page": 455
 },
 {
  "id": "gear_turning",
  "name": "Turning",
  "section": "Enchantments",
  "subtitle": "Available to: All Melee Weapons",
  "text": "You have instilled fear itself into your weapon.\nLevel 1:\nChoose a Creature Type. Whenever you hit a creature of the chosen Creature Type with a Weapon Attack with this Weapon, they must succeed a Wisdom Saving Throw against your highest Armed Save DC or be Frightened of you for one minute. A creature can remake this Saving Throw at the start of each of their turns.\nLevel 2:\nChoose a Creature Type. Whenever you hit a creature of the chosen Creature Type or the Creature Type chosen with Level 1 with a Weapon Attack with this Weapon, they must succeed a Wisdom Saving Throw against your highest Armed Save DC or be Frightened of you for one minute. A creature can remake this Saving Throw at the start of each of their turns.\nLevel 3:\nWhenever you hit a creature of the chosen Creature Type or the Creature Type chosen with Level 1 and Level 2 with a Weapon Attack with this Weapon, they must succeed a Wisdom Saving Throw against your highest Armed Save DC or be Frightened of you for one minute and take 3d6 Psychic Damage. A creature that succeeds takes half Damage. A creature can remake this Saving Throw at the start of each of their turns.",
  "page": 456
 },
 {
  "id": "gear_tricks",
  "name": "Tricks",
  "section": "Enchantments",
  "subtitle": "Available to: All Armor",
  "text": "You have installed a number of minor effects into your armor.\nLevel 1:\nChoose 2 Cantrips. Whenever a creature wears this Armor, they gain access to those Cantrips. The Casting Modifier for these Cantrips is Charisma, or Intelligence if it is Scientific Gear.\nLevel 2:\nChoose 2 Cantrips. Whenever a creature wears this Armor, they gain access to those Cantrips and the ones chosen at Level 1. The Casting Modifier for these Cantrips is Charisma, or Intelligence if it is Scientific Gear.\nLevel 3:\nChoose 2 Cantrips. Whenever a creature wears this Armor, they gain access to those Cantrips and the ones chosen at Level 1 and Level 2. The Casting Modifier for these Cantrips is Charisma, or Intelligence if it is Scientific Gear.",
  "page": 456
 },
 {
  "id": "gear_unbreaking_deprecated",
  "name": "Unbreaking (Deprecated)",
  "section": "Enchantments",
  "subtitle": "Available to: All Armor",
  "text": "Your armor is designed to reinforce your form to protect you from the lose of body parts.\nLevel 1:\nEffects that would cause you to lose your arms or legs are negated for creatures wearing this Armor.\nLevel 2:\nEffects that would cause you to lose your arms, legs, or tail are negated for creatures wearing this Armor. Additionally you gain 2 points of Damage Reduction that are not counted towards your Maximum Damage Reduction possible. This Damage Reduction only applies to Bludgeoning, Piercing, and Slashing Damage.\nLevel 3:\nEffects that would cause you to lose any of your body parts are negated for creatures wearing this Armor. Additionally you gain 4 points of Damage Reduction that are not counted towards your Maximum Damage Reduction possible. This Damage Reduction only applies to Bludgeoning, Piercing, and Slashing Damage.",
  "page": 456
 },
 {
  "id": "gear_vorpal_deprecated",
  "name": "Vorpal (Deprecated)",
  "section": "Enchantments",
  "subtitle": "Available to: All Slashing Weapons",
  "text": "Your weapon is enhanced in a way to enable you to sever limbs with ease.\nLevel 1:\nWhenever you roll a Natural 20 with a Weapon Attack from this weapon, select an Arm or Leg of the target and sever it.\nLevel 2:\nWhenever you roll a Natural 20 with a Weapon Attack from this Weapon, select an Arm, Leg, or Tail of the target and sever it. Additionally, Weapon Attack from this Weapon ignores 2 points of Damage Reduction.\nLevel 3:\nWhenever you roll a Natural 20 with a Weapon Attack from this Weapon, select an Arm, Head, Leg, or Tail of the target and sever it. Additionally, Weapon Attack from this Weapon ignores 4 points of Damage Reduction.",
  "page": 456
 },
 {
  "id": "gear_heros_regalia",
  "name": "Hero’s Regalia",
  "section": "Heroic Gear",
  "subtitle": "Armor (Any), Rare",
  "rarity": "rare",
  "text": "A set of armor that bears the symbol of a great hero or group of heroes, capable of inspiring hope and bravery in others. This Magical Armor has a +2 Magical Bonus. Additionally, while you wear the Hero’s Regalia you gain access to the Secret Fighting Poses Technique. Divine Bonus: Creatures wearing this Armor can take the Hyper Mode Engage Action once per Long Rest without expending Stamina.\nSecret Fighting Poses:\nRank 1 Super Ki Technique Ki Cost: 6 Ki Iconic Mastery: Perfected Casting Requirement: Hero’s Regalia Casting Time: 1 Action Range: Self (30ft radius Emanation) Chargeable: No Duration: 1 Minute (Concentration) Type: Other\nYou begin to shift between various extraordinary poses, imbueing allies around you with hope and power. Choose a number of creatures within range equal to half of your Proficiency Bonus, rounded up, and grant them a variation of the Boosted Condition of their choice for the duration of this Technique. At Higher Ranks: For each Rank above the original that this Technique is cast, the attributes change as follows:\nRankCost Additional Property Range 2 10 N/A Self (45ft\nKi radius Emanation) 3 16 This Technique can now benefit a Self (60ft Ki number creatures within range up to radius your Proficiency Bonus. Emanation) 4 24 This Technique can now benefit a Self (90ft Ki number creatures within range up to radius your Proficiency Bonus. Additionally at Emanation) the start of each of your turns for the duration, creatures benefiting from this Technique may replace the variation of the Boosted Condition that they are benefiting from.",
  "page": 457
 },
 {
  "id": "gear_saiyaman_uniform",
  "name": "Saiyaman Uniform",
  "section": "Heroic Gear",
  "subtitle": "Armor (Any), Rare",
  "rarity": "rare",
  "text": "A custom-made uniform that denotes you as a Great Saiyaman, one of the honorable defenders of the weak. This Magical Armor has a +2 Magical Bonus. Additionally, while you wear the Saiyaman Uniform you gain access to the Saiyaman Kick Technique. Divine Bonus: This Armor grants an additional +1 AC for each each allied creature also equipped with a Saiyaman Uniform within 60 feet.\nSaiyaman Kick:\nRank 1 Super Strike Technique Ki Cost: 1 Ki Iconic Mastery: Incantation Casting Requirement: Saiyaman Uniform Casting Time: 1 Action Range: 30ft Chargeable: Yes Duration: Instantaneous Type: Unarmed\nPerform a series of dramatic and self encouraging poses, sometimes suplemented with an even more dramatic speech, and dash forward with an enhanced drop kick. Roll an Unarmed Attack Roll against a creature in range, dealing 1d4+6 Bludgeoning Damage on a hit. You end this Technique in an unoccupied location of your choice within 5 feet of the target. At Higher Ranks: For each Rank above the original that this Technique is cast, the attributes change as follows:\nRankCostDamage Additional Property Range 2 4 Ki 2d6+16 N/A 60ft 3 8 Ki 4d6+25 Creatures that take damage from 90ft this Technique must make a\nConstitution Saving Throw or be Dazed until the end of their next turn. 4 12 6d6+37 Creatures that take damage from 120ft Ki this Technique must make a\nConstitution Saving Throw or be Dazed until the end of your next turn.",
  "page": 457
 },
 {
  "id": "gear_azure_dragon_blade",
  "name": "Azure Dragon Blade",
  "section": "Heroic Gear",
  "subtitle": "Weapon (Any Sword), Rare",
  "rarity": "rare",
  "text": "You possess a blade that was created for the most ferocious of bandits. This Magical Sword has a +2 Magical Bonus. Additionally, while wielding the Azure Dragon Blade you have access to the Azure Dragon Charge Technique. Divine Bonus: Creatures who wield this Weapon have their base Walk Speed increased by 15 feet.\nAzure Dragon Charge:\nRank 1 Super Strike Technique Ki Cost: 6 Ki Iconic Mastery: Blitzing Casting Requirement: Azure Dragon Blade Casting Time: 1 Action Range: Self (30ft Line) Chargeable: Yes Duration: Instantaneous Type: Armed\nTake a stance similar to a great predator like a Wolf or Lion before rushing forward in a deadly rush of steel. All creatures within range must make a Dexterity Saving Throw or take 1d10+10 Slashing Damage, halved on a success. You end this Technique in the nearest unoccupied space at the end of the range. At Higher Ranks: For each Rank above the original that this Technique is cast, the attributes change as follows:\nRankCost Damage Range Extra Effect 2 14 2d10+24 Self (45ft N/A Ki Line) 3 24 3d10+38 Self (60ft Creatures that fail are also Ki Line) knocked Prone. 4 37 5d10+52 Self (90ft Creatures that fail are also Ki Line) knocked Prone.",
  "page": 458
 },
 {
  "id": "gear_bansho_fan",
  "name": "Bansho Fan",
  "section": "Heroic Gear",
  "subtitle": "Weapon (Gunbai or War Fan), Rare",
  "rarity": "rare",
  "text": "The Bansho Fan is a mystical Gunbai designed to stoke and control the flames of the magical furnace. This Magical Weapon has a +2 Magical Bonus. Additionally, while wielding the Bansho Fan you have access to the Bansho Gale Technique. Additionally, while wielding the Bansho Fan, you may replace the Damage Type of your Basic Ki Blast to be Thunder Damage. Divine Bonus: The Casting Cost for Bansho Gale is reduced by 50%, regardless of the Rank that it is cast at.\nBansho Gale:\nRank 1 Super Strike Technique Ki Cost: 10 Ki Iconic Mastery: Massive Casting Requirement: Bansho Fan Casting Time: 1 Action Range: Self (30ft Cone) Chargeable: Yes Duration: Instantaneous Type: Armed\nBy collecting energy into the Bansho Fan, you may send it forward to produce a magical gale. Choose of the following effects to perform per casting:\nBlast. All creatures within range must make a Strength Saving Throw or be pushed to the nearest unoccupied space at the end of this Technique’s range, or half as far on a success. This movement is ended early if the creature would hit a barrier.\nEngulf. You will all flames in range to flare in size. All creatures within 10 feet of an open flame in range must make a Dexterity Saving Throw or suffer 2d6+14 Fire Damage. halved on a success.\nSuffocate. All flames within range are put out as if they no longer had a fuel source.\nAt Higher Ranks: For each Rank above the original that this Technique is cast, the attributes change as follows:\nRankCost Damage Range Extra Effect 2 18 4d6+26 Self (60ft N/A Ki Cone) 3 25 8d6+46 Self (60ft You may now selective put out Ki Cone) flames when using Suffocate. 4 33 5d12+66 Self (90ft You may now selective put out Ki Cone) flames when using Suffocate.",
  "page": 458
 },
 {
  "id": "gear_brave_sword",
  "name": "Brave Sword",
  "section": "Heroic Gear",
  "subtitle": "Weapon (Any Sword), Rare",
  "rarity": "rare",
  "text": "This blade carries the hopes and dreams of ancient heroes. This Magical Sword has a +2 Magical Bonus. Additionally, while wielding the Brave Sword you have access to the Brave Weapon Attack Technique from the Brave Weapon Attack Super Technique Line. If you already possess the Brave Weapon Attack Technique, you may grant it an additional Iconic Mastery of your choice whenever you would cast it. Divine Bonus: Whenever a creature who wields this Weapon drops to zero Hit Points, they may drop to 1 Hit Point instead. This effect only happens once per Short or Long Rest.",
  "page": 459
 },
 {
  "id": "gear_demon_craft_sword",
  "name": "Demon-Craft Sword",
  "section": "Heroic Gear",
  "subtitle": "Weapon (Any Sword), Rare",
  "rarity": "rare",
  "text": "A blade created by the hand of the Demon King Piccolo (Jr.) to be used by his students during their struggle for survival. This Magical Sword has a +2 Magical Bonus. Additionally, while wielding the Demon-Craft Sword you have access to the Severing Slash Technique. Divine Bonus: Weapon Attacks made with this Weapon deal an extra 2 Damage against Beasts and Humanoids.\nSevering Slash:\nRank 1 Super Strike Technique Ki Cost: 2 Ki Iconic Mastery: Massive Casting Requirement: Demon-Craft Sword Casting Time: 1 Action Range: Weapon Range Chargeable: Yes Duration: Instantaneous Type: Armed\nYou perform a single, powerful slash designed to sever limbs from others. Roll an Armed Attack Roll against a target within range, dealing 1d6+6 Slashing Damage. Additionally if you a 20 for this Technique’s Attack Roll, the target must roll on the Lingering Injury Table. At Higher Ranks: For each Rank above the original that this Technique is cast, the attributes change as follows:\nRankCostDamage Range Extra Effect 2 5 Ki 2d6+16 Weapon N/A\nRange 3 11 3d6+26 Weapon If you roll a 19 or 20 for the Ki Range Attack Roll, the target must roll on the Lingering Injury Table. 4 20 5d6+41 Weapon If you roll an 18, 19, or 20 for the Ki Range Attack Roll, the target must roll on the Lingering Injury Table.",
  "page": 459
 },
 {
  "id": "gear_dragon_balls",
  "name": "Dragon Balls",
  "section": "Wondrous Items",
  "subtitle": "Wondrous Item, Legendary",
  "rarity": "legendary",
  "text": "Powerful wish granting orbs, first known as the creations of Zalama, variations of these orbs have been made throughout the millennium by various Namekians. Dragon balls can be used again after 1 year of time on their native planet, scattering across the planet under the disguise of rocks until the year is elapsed.\nUsing the Dragon Balls:\nOn your turn, so long as you are within 10 feet of a Set of Dragon Balls and can speak the Language of their creator; you may forgo your Action, Bonus Action, and Movement for the round to activate the Dragon Balls and make your available wish(s).\nDragon Ball Limitations:\nAll dragon balls share a few limitations:\nCan not bring someone back to life from a natural death Can not kill someone or force actions onto someone stronger than the balls’ creator Can not make someone a god\nAdditional Limitations can vary from set to set.\nDragon Ball Types:\nRed Star Balls: Red Star Dragon Balls are the most commonly found kind of Dragon Balls. A set of Red Star Dragon Balls can be used a number of times equal to their maker’s Proficiency Bonus before they become inert or create Shadow Dragons to expel the negative energy.\nBlack Star Balls: Black Star Dragon Balls are an extremely rare and powerful set that result in excessive amounts of Negative Energy but with seemingly no limitations. The Black Star Dragon Balls are fired around the universe and, if the Black Star Dragon Balls are not recollected on the Planet that the wish was made on before they recharge, the Planet that the wish was made on is destroyed.\nSuper Dragon Balls: The original set of planet sized dragon balls created by the dragon god Zalama. These orbs are scattered across the multiverse and are said to be able to grant any wish without limitation.\nDragon Spirit Types:\nA set of Dragon Balls can create one of two kinds of Wishing Dragons, decided upon creation of the Dragon Balls, listed below:\nDeal Dragon: Deal Dragons are much more rare, even among Wishing Dragons, allowing them to take something they view as an equal deal to perform greater wishes than Gift Dragons. Deal Dragons are crafty and almost never tell the user the complete truth in regards to the cost, such as telling the user what they are spending but neglecting to say how MUCH.\nGift Dragon: Gift are true wish granters and as such are heavily tied to the power of their creator, being unable to pull off feats beyond them. Gift Dragons will attempt to satisfy a wish to the best of their abilities have even been known to warn others of possible consequences to their wish.",
  "page": 460
 },
 {
  "id": "gear_kintoun_flying_nimbus",
  "name": "Kinto’un (Flying Nimbus)",
  "section": "Wondrous Items",
  "subtitle": "Wondrous Item, Very Rare, Requires Attunement",
  "rarity": "veryrare",
  "text": "This is a medium sized golden cloud passed on to those with pure hearts. Only those with a “Good” alignment can ride on this cloud, all others harmlessly pass through.\nThe Kinto’un has an AC of 15 and 10 HP. It is Immune to Nonmagical Slashing, Bludgeoning, and Piercing Damage. While being ridden it has a fly speed of 60 feet and while not being ridden it has a fly speed of 120 feet. The Kinto’un acts on your turn and benefits from your Dash, Disengage and Dodge Actions. Whenever you mount the Kinto’un you may choose to attune to it. While you are Attuned to it, as a Bonus Action on your turn, you may shout it’s name to the heavens and it appears, picking you up or waiting within 60 feet of you at a location you choose at it flys in as a streak of wind. Alternatively, you may give the Kinto’un a simple command such as: “Get Krillin out of the way” or “Pick up Goten from South City” and it will spend all of it’s movement each round to complete this task and return to you to the best of it’s ability. If you command it to pick someone up they must also be “Good” alignment or fall through it. If the Kinto’un is given an impossible task it will start it’s return the moment it fails.\nVery rarely a Nimbus is created by another creature, giving it a different Alignment or Prerequisite that you must match to be able to ride it.",
  "page": 461
 },
 {
  "id": "gear_potara_earrings",
  "name": "Potara Earrings",
  "section": "Wondrous Items",
  "subtitle": "Wondrous Item, Legendary",
  "rarity": "legendary",
  "text": "A set of matching spherical earrings capable of fusing together two creatures that wear them in opposite ears. Whenever two creatures who are correctly wearing a matching set of Potara Earrings are within 60 feet of eachother they are magically pulled towards each other, meeting in the center most location and Fusing into a Potara Fusion.\nDuration of a Potara Fusion:\nThe resulting Fusion is an entirely new creature and can act on each of the participants original Initiative. A Potara Fusion relies on it’s Fusion Points to remain put together. A Potara Fusion has 60 Fusion Points which are reduced by 1 + their Power Bonus at the start of the each of their Turns, ending the Fusion when it reaches 0. When the Fusion ends, the participants are split back into their original bodies and any resources remaining are split between them as evenly as possible. If a Potara Fusion ends, that set of Potara Earrings can not be used again for 1 hour.\nPotara Fusion Equipment:\nA Potara Fusion chooses what Equipment from the Participants that they want to carry into their new form, with all other Equipment harmlessly vanishing.\nPotara Fusion Statistics:\nA Potara Fusion has Resources as follows:\nAbility Scores. The Fusion chooses 3 Ability Scores from their Participants and uses it as their own.\nHit Points. The Fusion has Maximum Hit Points equal to the total of the Participants’ Maximum Hit Points.\nKi Points. The Fusion has Maximum Ki Points equal to the total of the Participants’ Maximum Ki Points.\nKi Rank. The Fusion has a Ki Rank that is 1 rank higher than the highest Ki Rank among the Participants.\nProficiency Bonus. The Fusion has a Proficiency Bonus equal to the highest Proficiency Bonus among the Participants.\nStamina. The Fusion has Maximum Stamina equal to the total of the Participant’s Maximum Stamina. Additionally, a Potara Fusion is a unique Creature that gains all of the following from their participants:\nClass Features:\nFeats:\nForms:\nHeroic Features:\nHit Die:\nRacial Features:\nTrained Features:\nRelationship Bonus:\nA Potara Fusion gains a Relationship Bonus as listed in the Fusion Dance Trained Feature.",
  "page": 462
 },
 {
  "id": "gear_battle_mecha_balanced",
  "name": "Battle Mecha, Balanced",
  "section": "Mechs",
  "zeni": 10000,
  "text": "Gargantuan Construct\nPrice: 10,000 Ƶeni\nArmor Class 18 (Natural AC) Hit Points 335 (35d12 + 90) Stamina 10 Speed 45 ft walk.\nSTR DEX CON INT WIS CHA 16 (+3) 16 (+3) 16 (+3) 3 (-4) 15 (+2) 17 (+3)\nDamage Immunities psychic Damage Resistances bludgeoning, piercing, and slashing from nonmagical attacks that aren’t Adamantine Condition Immunities Altered, Berserk, Charmed, Dazed, Enraged, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned Senses Darkvision 60 ft., Passive Perception (Same as Pilot’s) Languages None Proficiency Bonus Same as Pilot’s\nLarge Cockpit. The mecha is controlled by its pilot meaning the pilot is its mind, when in the mech the pilot shares the same turn with the mecha, when in the mecha the pilot is considered in total cover however this effect is reduced by 1/4 cover each time the mecha takes Destruction Damage. This Mecha can support a Pilot of Large Size or smaller. Combat Made The Mecha can only use its Stamina to make additional Attacks as part of the Attack Action or to use Stamina Manuevers.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nEnergy Conduit. This Mecha can use Stamina from it’s Pilot’s Battery Pack Class Feature as its own, if possible.\nEject Seat. As a Reaction to dropping to zero Hit Points, the Mecha can launch the Pilot to a location of its choice within 120 feet. The pilot lands safely at the chosen location.\nMechanical Power. The Mecha’s Unarmed Strikes, and Melee Weapon Attacks are treated as Unarmed Techniques or Armed Techniques.\nPowerful Cannons. The Mecha’s Energy Cannons attack and Ranged Weapon Attacks are considered a Ki Technique.\nActions:\nMulti-Attack. The Mecha can take the attack action as if it were the Pilot, replacing Basic Ki Blasts with the “Energy Cannons” Ranged Weapon Attack.\nUnarmed Strike. Melee Weapon Attack: reach 20 ft., one target. Hit 15 (3d6 + 3) Bludgeoning Damage\nEnergy Cannon. Ranged Weapon Attack: +4 to hit, reach 60/120ft., one target. Hit 12 (3d4 + 3) Energy Damage",
  "page": 463
 },
 {
  "id": "gear_battle_mecha_armored",
  "name": "Battle Mecha, Armored",
  "section": "Mechs",
  "zeni": 10000,
  "text": "Gargantuan Construct\nPrice: 10,000 Ƶeni\nArmor Class 18 (Natural AC) Hit Points 370 (35d12 + 125) Stamina 10 Speed 45 ft walk.\nSTR DEX CON INT WIS CHA 16 (+3) 14 (+2) 18 (+4) 3 (-4) 15 (+2) 17 (+3)\nDamage Immunities psychic Damage Resistances bludgeoning, piercing, and slashing from attacks that aren’t Adamantine Condition Immunities Altered, Berserk, Charmed, Dazed, Enraged, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned Senses darkvision 60 ft., passive Perception (Same as Pilot’s) Languages None Proficiency Bonus Same as Pilot’s\nLarge Cockpit. The mecha is controlled by its pilot meaning the pilot is its mind, when in the mech the pilot shares the same turn with the mecha, when in the mecha the pilot is considered in total cover however this effect is reduced by 1/4 cover each time the mecha takes Destruction Damage. This Mecha can support a Pilot of Large Size or smaller. Combat Made The Mecha can only use its Stamina to make additional Attacks as part of the Attack Action or to use Stamina Manuevers.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nEnergy Conduit. This Mecha can use Stamina from it’s Pilot’s Battery Pack Class Feature as its own, if possible.\nEject Seat. As a Reaction to dropping to zero Hit Points, the Mecha can launch the Pilot to a location of its choice within 120 feet. The pilot lands safely at the chosen location.\nMechanical Power. The Mecha’s Unarmed Strikes, and Melee Weapon Attacks are treated as Unarmed Techniques or Armed Techniques.\nPowerful Cannons. The Mecha’s Energy Cannons attack and Ranged Weapon Attacks are considered a Ki Technique.\nActions:\nMulti-Attack. The Mecha can take the attack action as if it were the Pilot, replacing Basic Ki Blasts with the “Energy Cannons” Ranged Weapon Attack.\nUnarmed Strike. Melee Weapon Attack: reach 20 ft., one target. Hit 12 (3d4 + 3) Bludgeoning Damage\nEnergy Cannon. Ranged Weapon Attack: +4 to hit, reach 60/120ft., one target. Hit 12 (3d4 + 3) Energy Damage",
  "page": 464
 },
 {
  "id": "gear_battle_mecha_titan",
  "name": "Battle Mecha, Titan",
  "section": "Mechs",
  "zeni": 10000,
  "text": "Gargantuan Construct\nPrice: 10,000 Ƶeni\nArmor Class 18 (Natural AC) Hit Points 370 (40d12 + 90) Stamina 10 Speed 60 ft walk.\nSTR DEX CON INT WIS CHA 16 (+3) 16 (+3) 16 (+3) 3 (-4) 15 (+2) 17 (+3)\nDamage Immunities psychic Damage Resistances bludgeoning, piercing, and slashing from nonmagical attacks that aren’t Adamantine Condition Immunities Altered, Berserk, Charmed, Dazed, Enraged, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned Senses darkvision 60 ft., passive Perception (Same as Pilot’s) Languages None Proficiency Bonus Same as Pilot’s\nLarge Cockpit. The mecha is controlled by its pilot meaning the pilot is its mind, when in the mech the pilot shares the same turn with the mecha, when in the mecha the pilot is considered in total cover however this effect is reduced by 1/4 cover each time the mecha takes Destruction Damage. This Mecha can support a Pilot of Large Size or smaller. Combat Made The Mecha can only use its Stamina to make additional Attacks as part of the Attack Action or to use Stamina Manuevers.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nEnergy Conduit. This Mecha can use Stamina from it’s Pilot’s Battery Pack Class Feature as its own, if possible.\nEject Seat. As a Reaction to dropping to zero Hit Points, the Mecha can launch the Pilot to a location of its choice within 120 feet. The pilot lands safely at the chosen location.\nMechanical Power. The Mecha’s Unarmed Strikes, and Melee Weapon Attacks are treated as Unarmed Techniques or Armed Techniques.\nPowerful Cannons. The Mecha’s Energy Cannons attack and Ranged Weapon Attacks are considered a Ki Technique.\nTitan Machine. This Battle Mecha’s Base Size Category is Gargantuan and it has one rank of Gigantification.\nActions:\nMulti-Attack. The Mecha can take the attack action as if it were the Pilot, replacing Basic Ki Blasts with the “Energy Cannons” Ranged Weapon Attack.\nUnarmed Strike. Melee Weapon Attack: reach 20 ft., one target. Hit 15 (3d6 + 3) Bludgeoning Damage\nEnergy Cannon. Ranged Weapon Attack: +4 to hit, reach 60/120ft., one target. Hit 12 (3d4 + 3) Energy Damage",
  "page": 465
 },
 {
  "id": "gear_tier_1_mech",
  "name": "Tier 1 Mech",
  "section": "Mechs",
  "zeni": 250,
  "text": "Large Construct\nPrice: 250 Ƶeni\nArmor Class 16 (Natural AC) Hit Points 70 (10d12 + 0) Speed 30 ft walk.\nSTR DEX CON INT WIS CHA 10 (+0) 10 (+0) 10 (+0) 3 (-4) 10 (+0) 10 (+0)\nDamage Immunities psychic Damage Resistances bludgeoning, piercing, and slashing from nonmagical attacks that aren’t Adamantine Condition Immunities Altered, Berserk, Charmed, Dazed, Enraged, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned Senses darkvision 30 ft., passive Perception (Same as Pilot’s) Languages None Proficiency Bonus Same as Pilot’s\nControlled. The mech is controlled by its pilot meaning the pilot is its mind, when in the mech the pilot shares the same turn with the mecha, when in the mech the pilot is considered in total cover however this effect is reduced by 1/4 cover each time the mech takes Destruction Damage.This Mech can support a Pilot of Medium Size or smaller.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nEject Seat. As a Reaction to dropping to zero Hit Points, the Mecha can launch the Pilot to a location of its choice within 120 feet. The pilot lands safely at the chosen location.\nMechanical Power. The Mecha’s Unarmed Strikes, and Melee Weapon Attacks are treated as Unarmed Techniques or Armed Techniques.\nMining Laser. The Mech’s Mining Laser attack is considered a Ki Technique.\nTier Up! Whenever you would perform the Crafting Downtime Activity, you may expend 25% of the Tier 2 Mech’s Zeni Cost to turn this into a Tier 2 Mech.\nActions:\nCommand-Action. The Mech can take make a single attack with one of the following:\nUnarmed Strike. Melee Weapon Attack: reach 10 ft., one target. Hit 5 (1d8 + 0) Bludgeoning Damage\nMining Laser. Ranged Weapon Attack: reach 20/60ft., one target. Hit 5 (1d8 + 0) Energy Damage",
  "page": 466
 },
 {
  "id": "gear_tier_2_mech",
  "name": "Tier 2 Mech",
  "section": "Mechs",
  "zeni": 2500,
  "text": "Huge Construct\nPrice: 2500 Ƶeni\nArmor Class 17 (Natural AC) Hit Points 160 (20d12 + 20) Speed 30 ft walk.\nSTR DEX CON INT WIS CHA 12 (+1) 12 (+1) 12 (+1) 3 (-4) 10 (+0) 10 (+0)\nDamage Immunities psychic Damage Resistances bludgeoning, piercing, and slashing from nonmagical attacks that aren’t Adamantine Condition Immunities Aged/De-aged, Berserk, Charmed, Dazed, Enraged, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned Senses darkvision 30 ft., passive Perception (Same as Pilot’s) Languages None Proficiency Bonus Same as Pilot’s\nControlled. The mech is controlled by its pilot meaning the pilot is its mind, when in the mech the pilot shares the same turn with the mecha, when in the mech the pilot is considered in total cover however this effect is reduced by 1/4 cover each time the mech takes Destruction Damage.This Mech can support a Pilot of Medium Size or smaller.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nEject Seat. As a Reaction to dropping to zero Hit Points, the Mecha can launch the Pilot to a location of its choice within 120 feet. The pilot lands safely at the chosen location.\nMechanical Power. The Mecha’s Unarmed Strikes, and Melee Weapon Attacks are treated as Unarmed Techniques or Armed Techniques.\nRockets! The Mech’s Rockets! attack is considered a Ki Technique.\nLink Up! This Mech can be turned into a Tier 3 Mech by combining with 2 Tier 1 Mechs or 1 Tier 2 Mech as an action on it’s turn.\nTier U z p e ! n Werh8e8never you would perform the Crafting Downtime Activity, you may expend 25% of the Tier 3 Mech’s Zeni Cost to turn this into a Tier 3 Mech.\nActions:\nCommand-Action. The Mech can take make a single attack with one of the following:\nUnarmed Strike. Melee Weapon Attack: reach 15 ft., one target. Hit 6 (1d10 + 1) Bludgeoning Damage\nRockets! Ranged Weapon Attack: reach 30/90ft., one target. Hit 8 (1d12 + 1) Fire Damage",
  "page": 467
 },
 {
  "id": "gear_tier_3_mech",
  "name": "Tier 3 Mech",
  "section": "Mechs",
  "zeni": 25000,
  "text": "Gargantuan Construct\nPrice: 25,000 Ƶeni\nArmor Class 18 (Natural AC) Hit Points 270 (30d12 + 60) Speed 45 ft walk.\nSTR DEX CON INT WIS CHA 14 (+2) 14 (+2) 14 (+2) 3 (-4) 10 (+0) 10 (+0)\nDamage Immunities psychic Damage Resistances bludgeoning, piercing, and slashing from nonmagical attacks that aren’t Adamantine Condition Immunities Altered, Berserk, Charmed, Dazed, Enraged, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned Senses darkvision 60 ft., passive Perception (Same as Pilot’s) Languages None Proficiency Bonus Same as Pilot’s\nControlled. The mech is controlled by its pilot meaning the pilot is its mind, when in the mech the pilot shares the same turn with the mecha, when in the mech the pilot is considered in total cover however this effect is reduced by 1/4 cover each time the mech takes Destruction Damage.This Mech can support a Pilot of Medium Size or smaller.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nEject Seat. As a Reaction to dropping to zero Hit Points, the Mecha can launch the Pilot to a location of its choice within 120 feet. The pilot lands safely at the chosen location.\nMechanical Power. The Mecha’s Unarmed Strikes, and Melee Weapon Attacks are treated as Unarmed Techniques or Armed Techniques.\nRockets! The Mech’s Rockets! attack is considered a Ki Technique.\nCommand-Action. The Mech can take make a single attack with one of the following:\nUnarmed Strike. Melee Weapon Attack: reach 20 ft., one target. Hit 9 (1d12 + 2) Bludgeoning Damage\nRockets! Ranged Weapon Attack: reach 30/90ft., one target. Hit 12 (2d8 + 2) Fire Damage",
  "page": 468
 },
 {
  "id": "gear_control_band",
  "name": "Control Band",
  "section": "Scientific Marvels",
  "subtitle": "Very Rare",
  "zeni": 1500,
  "rarity": "veryrare",
  "text": "An item specially crafted to suppress a creature’s ability to call on their energy or gain power. Control Bands are designed to be hyper durable and locked, only allowing the person who placed it to take it off. Whenever you wear a Control Band, you gain the following effects:\nYou are Immune to the Berserk Condition You suppress a total amount of Power Bonus from Forms and Form Modifications based on the Rank of the Control Band, listed below. You gain the Overload Action which allows you to make a Ki Control Check against the Band’s Overload DC to destroy it.\nRank 1:\nPrice: 1,500 Ƶeni:\nOverload DC: 16 Power Bonus suppressed: 2 For every 2 Power Bonus that are suppressed from a Form and its active Form Modifications you reduce the Form’s Ki Upkeep by 3, to a minimum of 3.\nRank 2:\nPrice: 15,000 Ƶeni:\nOverload DC: 22 Power Bonus suppressed: 4 For every 2 Power Bonus that are suppressed from a Form and its active Form Modifications you reduce the Form’s Ki Upkeep by 4, to a minimum of 3.\nRank 3:\nPrice: 150,000 Ƶeni:\nOverload DC: 30 Power Bonus suppressed: 6 For every 2 Power Bonus that are suppressed from a Form and its active Form Modifications you reduce the Form’s Ki Upkeep by 5, to a minimum of 3.",
  "page": 469
 },
 {
  "id": "gear_dragon_radar",
  "name": "Dragon Radar",
  "section": "Scientific Marvels",
  "subtitle": "Very Rare",
  "zeni": 20000,
  "rarity": "veryrare",
  "text": "Price: 20,000 Ƶeni:\nA small clock-like device made to find the mystical artifacts named the Dragon Balls. While the Dragon Radar is active, you know the rough location of the Dragon Balls and gain advantage on all Investigations Checks made to find the Dragon Balls.",
  "page": 469
 },
 {
  "id": "gear_ex_band",
  "name": "EX Band",
  "section": "Scientific Marvels",
  "subtitle": "Very Rare",
  "zeni": 10000,
  "rarity": "veryrare",
  "text": "Price: 10,000 Ƶeni: This small armband contains splicing technology made in an attempt to replicate the capabilities of the Metamorian Fusion Dance. You gain the following Actions:\nEX Fuuuusion. As an Action on your turn you may hold Concentration to take up the starting pose of the Fusion Dance. A creature within 10 feet of you that also has an EX Band can use their Reaction to become your Partner for the EX Fusion or Maxi Fusion. EX Ha!. As an Action on your turn whenever you are within 10 feet of a creature currently Concentrating on the EX Fuuuusion- Action you may choose to become their Partner for the Ex Fusion or Maxi Fusion.\nPrepare Maxi Fusion. As an Action on your turn whenever you are within 10 feet of a creature currently Concentrating on the EX Fuuuusion- Action you may choose to also hold Concentration to prepare a Maxi Fusion.\nDuration of an EX Fusion / Maxi Fusion The resulting Fusion is an entirely new creature and can act on each of the participants original Initiative. These Fusions relies on their Fusion Points to remain put together. They have 15 Fusion Points per creature which are reduced by the number of Participants - 1 at the start of the each of their Turns, ending the Fusion when it reaches 0. When the Fusion ends, the participants are split back into their original bodies and any resources remaining are split between them as evenly as possible.\nEX Fusion / Maxi Fusion Statistics: EX Fusions / Maxi Fusions are more durable than standard creatures. Before the results of the Fusion Check are factored, a Metamorian Fusion has base Resources as follows:\nAbility Scores. The Fusion chooses its Ability Scores from their Participants’ as evenly as possible and uses it as their own.\nHit Points. The Fusion has Maximum Hit Points equal to the total of the Participant’s Character Level.\nKi Points. The Fusion has Maximum Ki Points equal to the total of the Participant’s Character Level.\nProficiency Bonus. The Fusion has a Proficiency Bonus equal to the highest Proficiency Bonus among the Participants.\nStamina. The Fusion has Maximum Stamina equal to the total of the Participant’s Ki Rank. Additionally, regardless of the results of the Fusion Check, a EX Fusion / Maxi Fusion is a unique Creature that gains all of the following from their participants:\nClass Features:\nFeats:\nForms:\nHeroic Features:\nHit Die:\nSpecies Features:\nTrained Features:\nParticipant Bonus: The Ex Fusion or Maxi Fusion gains additional Maximum Hit Points, Maximum Ki Points, and Maximum Stamina equal to the total of all of the Participants’. Additionally, the Fusion’s Ki Rank is 1 rank higher than the highest Ki Rank of the Participants’. Additionally for every participant beyond 2, grant the Maxi Fusion 1 Rank of Enlarged.",
  "page": 470
 },
 {
  "id": "gear_energy_theft_device",
  "name": "Energy Theft Device",
  "section": "Scientific Marvels",
  "subtitle": "Very Rare",
  "zeni": 2500,
  "rarity": "veryrare",
  "text": "Price: 2,500 Ƶeni: A device meant to pierce a target and either steal or grant Kili to the injected target. As an Action on your turn you may force a target within your Melee Range to make a Dexterity Saving Throw based off of your Armed Save DC, a willing target may purposefully fail this Saving Throw. On a failure, you may trigger one of the following effects:\nDonate Power:\nThe Target is granted any amount of Ki Points from the Energy Theft Device as Temporary Ki Points. Additionally, so long as these Temporary Ki Points remain, you gain the Dark Ki Form and must have a Dark Energy Family Form active at all times.\nSteal:\nThe Target gains 1 Rank of Exhaustion as the Energy Theft Device gains an amount of Ki Points equal to 5x the target’s Character Level + Power Bonus. The Energy Theft Device can hold a up to 100 Maximum Ki Points.",
  "page": 471
 },
 {
  "id": "gear_healing_pod",
  "name": "Healing Pod",
  "section": "Scientific Marvels",
  "subtitle": "Very Rare",
  "zeni": 5000,
  "rarity": "veryrare",
  "text": "Price: 5,000 Ƶeni: This Large Sized device resembles a large tank that will fill with a special fluid that improves recovery to those that use it.\nQuick Dip: A creature that performs a Short Rest in a Healing Pod will complete that rest in half of the usual time. Additionally, any Hit Die that are expended to regain Hit Points regain the maximum amount possible.\nHealing Soak: A creature that performs a Long Rest in a Healing Pod will complete that rest in half of the usual time. Additionally, you lose an additional Rank of Exhaustion from this Long Rest.",
  "page": 471
 },
 {
  "id": "gear_heros_watch",
  "name": "Hero’s Watch",
  "section": "Scientific Marvels",
  "subtitle": "Uncommon",
  "zeni": 500,
  "rarity": "uncommon",
  "text": "Price: 500 Ƶeni: A small watch designed to break down as well as rebuild armor on the wearer through tweaked Poi Poi technology. During a Long Rest you may have the Hero’s Watch bond to an Armor of your choice. Until you replace this Armor during another Long Rest you may, as a Bonus Action on your turn, press the button on the watch to instantly Don/Doff the bonded Armor. Armor that is Doffed in this way is stored inside the Hero’s Watch until you Don it as a Bonus Action or replace it with another Armor.",
  "page": 471
 },
 {
  "id": "gear_micro_band",
  "name": "Micro Band",
  "section": "Scientific Marvels",
  "subtitle": "Rare",
  "zeni": 1000,
  "rarity": "rare",
  "text": "Price: 1,000 Ƶeni: A piece of “Miracle Technolgy” designed by Capsule Corp made to reduce the size of the user. As an Action on your turn you may give youself one Rank of Rescaled (Mini) for 1 Minute or two Ranks of Rescaled (Mini) for 30 seconds.",
  "page": 473
 },
 {
  "id": "gear_poi_capsule",
  "name": "Poi Capsule",
  "section": "Scientific Marvels",
  "subtitle": "Common",
  "rarity": "common",
  "text": "Poi Capsules or Dynamo Caps, are small devices that use small pocket spaces to store larger objects. On a long rest, you may designate an item that you have access to or a Structure, that is not attached to foundation, that you can touch and is not too large for the capsule. An item this way can transform into a Capsule as a Bonus Action. When it is a Capsule, the item cannot be used but it only weights 1 lb. As a Bonus Action on your turn, you may transform the Capsule into the Item inside of it or back into its Capsule Form. Poi Capsules are capable of coming in various sizes, capable of storing objects of that size category or below. The various sizes and prices are detailed below\nObject Size Ƶeni Cost Medium 10 Large 100 Huge 1,000 Gargantuan 10,000",
  "page": 473
 },
 {
  "id": "gear_car",
  "name": "Car",
  "section": "Vehicles",
  "category": "Automobiles",
  "zeni": 250,
  "text": "Large Vehicle\nPrice: 250 Zeni\nArmor Class 12 (Natural AC) Hit Points 40 (5d12 + 10)\nSpeed 120 ft. walk (1200ft. out of combat)\nSTR DEX CON INT WIS CHA 16 (+3) 12 (+1) 14 (+2) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 120 feet.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nHover Option. This Vehicle can come in a Hovering variant that costs twice as much Zeni. Hovering Vehicles can ignore Difficult Terrain and travel over bodies of liquid the same as they would solid ground.\nMax Occupancy. This Vehicle can fit 1 Pilot and 3 Passengers, gaining a -1 Static Bonus to Skill Checks and Saving Throws for each additional Passenger.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 1/2 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nActions:\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (2d6 + 3) Bludgeoning Damage. This Action deals 1/2 Damage back to the Vehicle unless the Attack Roll was a Critical Hit.\nA typical generic automobile, often used as a small family car. It can travel up to 400 miles on a full tank of gas, although it has a more realistic range of 300 miles or so taking traffic-related delays into account.",
  "page": 474
 },
 {
  "id": "gear_sports_car",
  "name": "Sports Car",
  "section": "Vehicles",
  "category": "Automobiles",
  "zeni": 500,
  "text": "Large Vehicle\nPrice: 500 Zeni\nArmor Class 13 (Natural AC) Hit Points 50 (6d12 + 12)\nSpeed 150 ft. walk (1500ft. out of combat)\nSTR DEX CON INT WIS CHA 18 (+4) 14 (+2) 16 (+3) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 150 feet.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nHover Option. This Vehicle can come in a Hovering variant that costs twice as much Zeni. Hovering Vehicles can ignore Difficult Terrain and travel over bodies of liquid the same as they would solid ground.\nMax Occupancy. This Vehicle can fit 1 Pilot and 1 Passenger, gaining a -1 Static Bonus to Skill Checks and Saving Throws for each additional Passenger.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 3/4 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nActions:\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 12 (2d6 + 4) Bludgeoning Damage. This Action deals 1/2 Damage back to the Vehicle unless the Attack Roll was a Critical Hit.",
  "page": 475
 },
 {
  "id": "gear_truck",
  "name": "Truck",
  "section": "Vehicles",
  "category": "Automobiles",
  "zeni": 250,
  "text": "Large Vehicle\nPrice: 250 Zeni\nArmor Class 12 (Reinforced Fram) Hit Points 60 (7d12 + 14)\nSpeed 90 ft. walk (900ft. out of combat)\nSTR DEX CON INT WIS CHA 20 (+5) 10 (+0) 16 (+3) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d6 Damage on a hit, to a maximum of 90 feet.\nCargo Capacity. The Truck can carry up to 1 ton of cargo in its bed. For every 500 lbs. of cargo carried, the Truck’s speed is reduced by 10 ft. and it gains a -1 Static Bonus to Skill Checks and Saving Throws.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nHover Option. This Vehicle can come in a Hovering variant that costs twice as much Zeni. Hovering Vehicles can ignore Difficult Terrain and travel over bodies of liquid the same as they would solid ground.\nMax Occupancy. This Vehicle can fit 1 Pilot and 5 Passengers, gaining a -1 Static Bonus to Skill Checks and Saving Throws for each additional Passenger.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 3/4 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nActions:\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (2d6 + 3) Bludgeoning Damage. This Action deals 1/2 Damage back to the Vehicle unless the Attack Roll was a Critical Hit.\n“Hovercrafts” are any amount of ridable personal flight machines. It can travel up to 300 miles on a full tank of gas, although it has a shortened range of 150 miles or so in rough conditions.",
  "page": 475
 },
 {
  "id": "gear_flying_disk",
  "name": "Flying Disk",
  "section": "Vehicles",
  "category": "Hovercrafts",
  "zeni": 250,
  "text": "Medium Vehicle\nPrice: 250 Zeni\nArmor Class 13 (Titanium Frame) Hit Points 35 (5d10+5)\nSpeed 50 ft. Fly (500ft. out of combat)\nSTR DEX CON INT WIS CHA 12 (+1) 14 (+2) 12 (+1) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 50 feet.\nDinged Up. Each time this unit of Technology loses 25% of their Maximum Hit Points, it acquires a Ding. To restore this unit of Technology to their Maximum Hit Points, you must spend an hour and 10% of this unit of Technology’s price per Ding that it has aquired.\nExposed Pilot. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle.\nMax Occupancy. This Vehicle can only fit 1 Pilot.\nActions:\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (1d10 + 2) Bludgeoning Damage. This Action deals 1/4 Damage back to the Vehicle and its Occupents unless the Attack Roll was a Critical Hit.",
  "page": 476
 },
 {
  "id": "gear_hoverboard_bonus",
  "name": "Hoverboard (Bonus)",
  "section": "Vehicles",
  "category": "Hovercrafts",
  "zeni": 600,
  "text": "Medium Vehicle\nPrice: 600 Zeni\nArmor Class 12 (Lightweight Polymer) Hit Points 28 (4d10 + 4)\nSpeed 80 ft. Hover (800ft. out of combat)\nSTR DEX CON INT WIS CHA 12 (+1) 14 (+2) 12 (+1) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 80 feet.\nExposed Pilot. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle.\nMax Occupancy. This Vehicle can only fit 1 Pilot.\nActions:\nEvade. When the Hoverboard is targeted by a ranged attack or forced to make a Dexterity Saving Throw, it can use its Reaction to gain a +2 bonus to its AC or Saving Throw against that attack. This ability can be used once per round.\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (1d10 + 2) Bludgeoning Damage. This Action deals 1/4 Damage back to the Vehicle and its Occupents unless the Attack Roll was a Critical Hit.",
  "page": 477
 },
 {
  "id": "gear_personal_pod",
  "name": "Personal Pod",
  "section": "Vehicles",
  "category": "Hovercrafts",
  "zeni": 500,
  "text": "Large Vehicle\nPrice: 500 Zeni\nArmor Class 13 (Titanium Frame) Hit Points 35 (5d10+5)\nSpeed 30 ft. Fly (300ft. out of combat)\nSTR DEX CON INT WIS CHA 12 (+1) 14 (+2) 12 (+1) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 30 feet.\nMax Occupancy. This Vehicle can only fit 1 Pilot.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 1/4 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nActions:\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (1d10 + 2) Bludgeoning Damage. This Action deals 1/4 Damage back to the Vehicle and its Occupents unless the Attack Roll was a Critical Hit.",
  "page": 477
 },
 {
  "id": "gear_solar_surfer_bonus",
  "name": "Solar Surfer (Bonus)",
  "section": "Vehicles",
  "category": "Hovercrafts",
  "zeni": 1250,
  "text": "Medium Vehicle\nPrice: 1,250 Zeni\nArmor Class 14 (Durable Alloy) Hit Points 54 (6d10 + 18)\nSpeed 120 ft. Fly (1200ft. out of combat)\nSTR DEX CON INT WIS CHA 14 (+2) 14 (+2) 16 (+3) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 120 feet.\nExposed Pilot. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. : Max Occupancy. This Vehicle can only fit 1 Pilot.\nSolar Powered. So long as the Solar Sailer is in direct sunlight, it does not consume fuel.\nActions:\nEvade. When the Hoverboard is targeted by a ranged attack or forced to make a Dexterity Saving Throw, it can use its Reaction to gain a +2 bonus to its AC or Saving THrow against that attack. This ability can be used once per round.\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (1d10 + 2) Bludgeoning Damage. This Action deals 1/4 Damage back to the Vehicle and its Occupents unless the Attack Roll was a Critical Hit.\nVehichles designed for specific tasks up such as combat, evacuation, and exploration. It can travel up to 600 miles on a full tank of gas, although it has a dismal range of 200 miles or so in rough conditions.",
  "page": 478
 },
 {
  "id": "gear_helicopter",
  "name": "Helicopter",
  "section": "Vehicles",
  "category": "Military Vehicles",
  "zeni": 12500,
  "text": "Large Vehicle\nPrice: 12,500 Zeni\nArmor Class 14 (Reinforced Frame) Hit Points 80 (9d12 + 18)\nSpeed 150 ft. fly (1500 ft. out of combat)\nSTR DEX CON INT WIS CHA 16 (+3) 14 (+2) 18 (+4) - - -\nCargo Capacity. The Helicopter can carry up to 500 lbs. of cargo in its storage compartments. For every 100 lbs. of cargo carried, the Helicopter’s speed is reduced by 10 ft., and it gains a -1 Static Bonus to Skill Checks and Saving Throws.\nDescent/Ascent. The Helicopter can move vertically without needing a run-up. When ascending, it moves at half its speed. When descending, it can move at its full speed.\nHover. The Helicopter can hover in place, allowing it to maintain its position in the air without moving forward.\nMax Occupancy. This Vehicle can fit 1 Pilot and 4 Passengers, gaining a -1 Static Bonus to Skill Checks and Saving Throws for each additional Passenger.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 3/4 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nActions:\nRotor Slash. Melee Weapon Attack: reach 10ft., one target. Hit 14 (2d8 + 3) Slashing Damage. This Action deals 1/2 Damage back to the Vehicle unless the Attack Roll was a Critical Hit.\nMissile Launch (Optional Upgrade). The Helicopter can be upgraded with a missile launcher for an additional 20,000 Zeni. This launcher allows it to fire a missile at a target within 120 ft. The target must make a Dexterity Saving Throw (DC = 10 + Pilot’s Dexterity Modifier). On a failed save, the target takes 28 (8d6) Fire Damage, or half as much on a successful one. The Helicopter can carry up to 4 missiles.",
  "page": 479
 },
 {
  "id": "gear_fighter_jet",
  "name": "Fighter Jet",
  "section": "Vehicles",
  "category": "Military Vehicles",
  "zeni": 25000,
  "text": "Huge Vehicle\nPrice: 25,000 Zeni\nArmor Class 16 (Reinforced Hull) Hit Points 120 (12d12 + 36)\nSpeed 300 ft. fly (3000 ft. out of combat)\nSTR DEX CON INT WIS CHA 18 (+4) 18 (+4) 20 (+5) - - -\nAgile Maneuvering. The Fighter Jet can make a 180-degree turn without losing the benefits of Supersonic Speed. It can also perform evasive maneuvers as a Reaction, imposing Disadvantage on one incoming Attack Roll per round.\nMax Occupancy. This Vehicle can fit 1 Pilot and 1 Co-Pilot. The Co-Pilot can assist with targeting and weapons systems, granting the Pilot Advantage on Attack Rolls or making one attack of their own using the Jet’s weaponry.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have full cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nStealth Mode (Optional Upgrade). The Fighter Jet can be equipped with a stealth mode for an additional 50,000 Zeni. When activated, the Jet gains advantage on Stealth checks and is considered lightly obscured at distances greater than 500 feet.\nSupersonic Speed. The Fighter Jet can travel at extreme speeds.\nFor every 50 ft. in a straight line that this Vehicle travels before landing its Missile Attack, it deals an additional 2d4 Damage on a hit, to a maximum of 300 feet.\nActions:\nMissile Launch. The Fighter Jet can fire a missile at a target within 300 ft. The target must make a Dexterity Saving Throw (DC = 10 + Pilot’s Dexterity Modifier). On a failed save, the target takes 40 (10d6) Fire damage, or half as much on a successful one. The Fighter Jet can carry up to 6 missiles.\nCannon Fire. Ranged Weapon Attack: range 200 ft., one target. Hit: 18 (3d8 + 4) Piercing Damage. This attack can be used as a Reaction when the Fighter Jet is targeted by a Ranged Attack. The Pilot can make this attack with Disadvantage to target the incoming projectile.\nAfterburner (Optional Upgrade). For an additional 30,000 Zeni, the Fighter Jet can be equipped with an Afterburner, allowing it to double its speed for one minute. This upgrade can be used once per hour, after which the Afterburner needs to cool down.",
  "page": 479
 },
 {
  "id": "gear_personel_carrier_vehicle",
  "name": "Personel Carrier Vehicle",
  "section": "Vehicles",
  "category": "Military Vehicles",
  "zeni": 5000,
  "text": "Large Vehicle\nPrice: 5,000 Zeni\nArmor Class 16 (Armored Plating) Hit Points 90 (10d10 + 30)\nSpeed 80 ft. walk (800 ft. out of combat)\nSTR DEX CON INT WIS CHA 18 (+4) 12 (+1) 18 (+4) - - -\nAll-Terrain. The PCV can traverse Difficult Terrain without penalty, including mud, snow, and rocky ground.\nMax Occupancy. This Vehicle can fit 1 Pilot and 10 Passengers. The passengers have three-quarters cover while inside. The APC has 2 firing ports on each side and 1 on the rear, allowing passengers to make Ranged Attacks while benefiting from this cover.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 1/2 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nSmoke Dispensers. The PCV can release a cloud of smoke in a 20-foot radius around it as an Action. The smoke heavily obscures the area, granting Advantage on Stealth Checks and making it difficult for enemies to target the APC and its occupants. The smoke lasts for 1 minute or until dispersed by a strong wind. This ability can be used 3 times before needing to be refilled.\nActions:\nDeploy Troops. The PCV can deploy or retrieve all its passengers that are within 5 feet as a Bonus Action, allowing them to quickly disembark or embark during combat or while moving.\nEmergency Repair. The PCV can perform an emergency repair as an action, regaining 20 Hit Points. This ability can only be used once per day.\nMinefield Detection. The PCV can detect and avoid landmines and other ground-based traps within a 10-foot radius. It grants Advantage on Perception and Investigation Checks to spot such hazards and allows the Pilot to safely navigate through dangerous areas.\nMounted Gun (Optional Upgrade). For an additional 30,000 Zeni, the PCV can be equipped with a mounted heavy machine gun or autocannon. The mounted gun has a range of 300 ft. and deals 24 (4d8) Piercing Damage on a hit. The gunner uses the Pilot’s Dexterity Modifier and Proficiency Bonus, if Proficient, for Attack Rolls.\nRam. Melee Weapon Attack: reach 5 ft., one target. Hit: 16 (3d8 + 4) Bludgeoning Damage. For every 10 ft. in a straight line that the PCV travels before landing its Ram Attack, it deals an additional 1d6 damage on a hit, to a maximum of 60 feet.",
  "page": 480
 },
 {
  "id": "gear_submarine",
  "name": "Submarine",
  "section": "Vehicles",
  "category": "Military Vehicles",
  "zeni": 12500,
  "text": "Large Vehicle\nPrice: 12,500 Zeni\nArmor Class 18 (Reinforced Hull) Hit Points 150 (15d12 + 45)\nSpeed 80 ft. swim (800 ft. out of combat)\nSTR DEX CON INT WIS CHA 20 (+5) 14 (+2) 20 (+5) - - -\nDeep Dive. The Submarine can descend to extreme depths. For every 100 ft. below sea level, the Submarine gains an additional +2 to its AC against Ranged Attacks that originate from outside the water.\nMax Occupancy. This Vehicle can fit 1 Pilot, 1 Co-Pilot, and 6 Passengers. The Co-Pilot can assist with navigation and sonar, granting the Pilot Advantage on Perception Checks and assisting with targeting for torpedoes or other weapons.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have full cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nPressure Resistant. The Submarine is built to withstand immense pressure. It has Resistance to Bludgeoning Damage from physical attacks while submerged below 500 ft.\nSilent Running. The Submarine can move silently for up to 30 minutes, gaining Advantage on Stealth Checks and making it difficult for enemies to detect its location with sonar. This ability can be used once per hour.\nActions:\nDepth Charge (Optional Upgrade). For an additional 40,000 Zeni, the Submarine can be equipped with depth charges. These can be deployed to target enemies at lower depths. All creatures within a 30-foot radius of the charge’s detonation must make a Constitution Saving Throw (DC = 10 + Pilot’s Dexterity Modifier) or take 35 (8d6) Thunder Damage, and half as much on a successful save. The Submarine can carry up to 4 depth charges.\nEmergency Surface. The Submarine can rapidly ascend to the surface as a Reaction, doubling its speed and allowing it to reach the surface in one round. This maneuver can be used to evade underwater hazards or attacks but imposes Disadvantage on Attack Rolls for the next round due to the rapid ascent.\nTorpedo Launch. The Submarine can fire a torpedo at a target within 500 ft. The target must make a Dexterity Saving Throw (DC = 10 + Pilot’s Dexterity Modifier). On a failed save, the target takes 45 (10d8) Fire Damage, or half as much on a successful one. The Submarine can carry up to 8 torpedoes.\nSonar Pulse. The Submarine can emit a sonar pulse to detect objects and creatures within 1,000 ft. of its location. This pulse reveals the locations of hidden or Invisible creatures and objects in the area for 1 minute. This ability can be used once per hour.\nBipod machines designed for military use or mercenary work. It can travel up to 400 miles on a full tank of gas, although it has a dismal range of 100 miles or so in rough conditions.",
  "page": 481
 },
 {
  "id": "gear_bipod_mech",
  "name": "Bipod Mech",
  "section": "Vehicles",
  "category": "Mini-Mechs",
  "zeni": 1250,
  "text": "Large Vehicle\nPrice: 1,250 Zeni\nArmor Class 18 (Reinforced Plating) Hit Points 80 (10d10 + 20)\nSpeed 60 ft. walk (600 ft. out of combat)\nSTR DEX CON INT WIS CHA 20 (+5) 16 (+3) 14 (+2) - - -\nAgile Frame. The Bipod Mech is built for speed and agility. It has Advantage on Dexterity Saving Throws to avoid area effects like explosions and can move through Difficult Terrain without any reduction in speed.\nEnhanced Jump Jets. The Mech is equipped with jump jets that allow it to make high, controlled jumps. It can leap up to 60 ft. vertically or horizontally as part of its movement.\nExposed Pilot. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle.\nMax Occupancy. This Vehicle can fit 1 Pilot comfortably and can have 1 Passenger, gaining Disadvantage to Skill Checks and Saving Throws when more then one person is on it.\nActions:\nKick. Melee Weapon Attack: reach 5ft., one target. Hit 17 (2d10 + 5) Bludgeoning Damage.\nLight Machine Gun. Ranged Weapon Attack: range 400 ft., one target. Hit: 36 (8d8) Piercing Damage.",
  "page": 482
 },
 {
  "id": "gear_combat_bipod_mech",
  "name": "Combat Bipod Mech",
  "section": "Vehicles",
  "category": "Mini-Mechs",
  "zeni": 3750,
  "text": "Large Vehicle\nPrice: 3,750 Zeni\nArmor Class 20 (Reinforced Plating) Hit Points 108 (12d12+24)\nSpeed 60 ft. walk (600 ft. out of combat)\nSTR DEX CON INT WIS CHA 20 (+5) 16 (+3) 14 (+2) - - -\nAgile Frame. The Bipod Mech is built for speed and agility. It has Advantage on Dexterity Saving Throws to avoid area effects like explosions and can move through Difficult Terrain without any reduction in speed.\nEnhanced Jump Jets. The Mech is equipped with jump jets that allow it to make high, controlled jumps. It can leap up to 60 ft. vertically or horizontally as part of its movement.\nMax Occupancy. This Vehicle can fit 1 Pilot and 1 Passenger. The cockpit is reinforced, providing three-quarters cover to the occupants.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus if Proficient in this Vehicle. The occupants have three-quarters cover and lose this benefit if the Mech takes Destruction Damage.\nActions:\nAutomatic Repair System. As a Bonus Action, the Mech can activate its Automatic Repair System, healing itself for 5d8 hit points. This system can be used once per short rest.\nEvade. When the Mech is targeted by a ranged attack, it can use its Reaction to gain a +2 bonus to its AC against that attack. This ability can be used once per round.\nKick. Melee Weapon Attack: reach 5ft., one target. Hit 17 (2d10 + 5) Bludgeoning Damage.\nLight Machine Gun. Ranged Weapon Attack: range 400 ft., one target. Hit: 36 (8d8) Piercing Damage.\nMissile Pod. Ranged Weapon Attack: range 600 ft., up to 3 targets within a 20 ft. radius. Hit: 27 (6d6) fire damage. The Mech fires a salvo of small missiles, dealing moderate damage to multiple targets. The Combat Bipod Mech has a total of 6 missiles.\nOverdrive Mode. As a Bonus Action, the Mech can enter Overdrive mode, doubling its movement speed and granting advantage on all attack rolls for 1 minute. After this duration, the Mech must make a DC 15 Constitution saving throw or become Overheated, reducing its speed by half and imposing disadvantage on all attack rolls until the end of the next short rest.\nNumerous styles of “bikes” exist throughout the world. THey can typically travel up to 400 miles on a full tank of gas, although it has a shortened range of 250 miles or so in rough conditions.",
  "page": 483
 },
 {
  "id": "gear_motorcycle",
  "name": "Motorcycle",
  "section": "Vehicles",
  "category": "Motorcycle",
  "zeni": 750,
  "text": "Medium Vehicle\nPrice: 750 Zeni\nArmor Class 12 (Natural AC) Hit Points 45 (5d12 + 10)\nSpeed 150 ft. walk (1500ft. out of combat)\nSTR DEX CON INT WIS CHA 14 (+2) 14 (+2) 14 (+2) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 120 feet.\nExposed Pilot. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle.\nHover Option. This Vehicle can come in a Hovering variant that costs twice as much Zeni. Hovering Vehicles can ignore Difficult Terrain and travel over bodies of liquid the same as they would solid ground.\nMax Occupancy. This Vehicle can fit 1 Pilot comfortably and can have 1 Passenger, gaining Disadvantage to Skill Checks and Saving Throws when more then one person is on it.\nActions:\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (1d10 + 2) Bludgeoning Damage. This Action deals 1/4 Damage back to the Vehicle and its Occupents unless the Attack Roll was a Critical Hit.",
  "page": 484
 },
 {
  "id": "gear_sport_motorcycle",
  "name": "Sport Motorcycle",
  "section": "Vehicles",
  "category": "Motorcycle",
  "zeni": 1500,
  "text": "Medium Vehicle\nPrice: 1,500 Zeni\nArmor Class 13 (Natural AC) Hit Points 40 (4d12 + 12)\nSpeed 200 ft. walk (2000ft. out of combat)\nSTR DEX CON INT WIS CHA 14 (+2) 16 (+3) 14 (+3) - - -\nAcceleration. For every 10 ft. in a straight line that this Vehicle travels before landing its Slam Attack, it deals an additional 1d4 Damage on a hit, to a maximum of 120 feet.\nExposed Pilot. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle.\nHover Option. This Vehicle can come in a Hovering variant that costs twice as much Zeni. Hovering Vehicles can ignore Difficult Terrain and travel over bodies of liquid the same as they would solid ground.\nMax Occupancy. This Vehicle can fit 1 Pilot comfortably and can have 1 Passenger, gaining Disadvantage to Skill Checks and Saving Throws when more then one person is on it.\nActions:\nSlam. Melee Weapon Attack: reach 5ft., one target. Hit 11 (1d10 + 2) Bludgeoning Damage. This Action deals 1/4 Damage back to the Vehicle and its Occupents unless the Attack Roll was a Critical Hit.\nSpacecraft are extremely expensive pieces of equipment capable of traveling the stars and are usually fueled as they are needed per trip.",
  "page": 485
 },
 {
  "id": "gear_small_space_fighter",
  "name": "Small Space Fighter",
  "section": "Vehicles",
  "category": "Spacecraft",
  "zeni": 5000,
  "text": "Large Vehicle\nPrice: 5000 Zeni\nArmor Class 14 (Reinforced Armor) Hit Points 80 (10d10 + 20)\nSpeed 120 ft. fly (1200 ft. out of combat)\nSTR DEX CON INT WIS CHA 14 (+2) 20 (+5) 12 (+1) - - -\nManeuverability. The Space Fighter is highly maneuverable, allowing it to perform complex aerial maneuvers and evade attacks. The Fighter has Advantage on Dexterity Saving Throws against effects that would force it to make a Saving Throw or move.\nMax Occupancy. This Vehicle can fit 1 Pilot and 1 Passenger. The Fighter includes basic facilities for its crew, including a small cockpit and minimal storage.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 1/2 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nThrusters. The Fighter’s thrusters grant it exceptional speed, allowing it to double its Fly Speed for 1 Minute. This ability recharges after a 1-Minute cooldown.\nActions:\nAfterburners. As a Bonus Action, the Fighter can activate its afterburners to move up to 60 ft. in a straight line. This movement does not provoke Opportunity Attacks and can be used to escape or close the distance with a target.\nDocking Mechanism. The Fighter has a docking mechanism that allows it to connect to larger ships or space stations for repairs or resupply. This docking can be performed in 1 minute.\nHyperjump. The Fighter can perform a short-range hyperjump to reposition itself up to 600 ft. to a location within line of sight. This ability can be used once per hour and requires a 5minute cooldown period.\nLaser Cannons. Ranged Weapon Attack: Range 600ft., one target. Hit 25 (5d8 + 2) Energy Damage. The Laser Cannons are designed for precision strikes, making them effective against both shields and armor.",
  "page": 486
 },
 {
  "id": "gear_small_space_pod",
  "name": "Small Space Pod",
  "section": "Vehicles",
  "category": "Spacecraft",
  "zeni": 7500,
  "text": "Medium Vehicle\nPrice: 7,500 Zeni\nArmor Class 15 (Reinforced Armor) Hit Points 90 (10d10 + 30)\nSpeed 160 ft. fly (1600 ft. out of combat)\nSTR DEX CON INT WIS CHA 14 (+2) 20 (+5) 14 (+2) - - -\nManeuverability. The Space Fighter is highly maneuverable, allowing it to perform complex aerial maneuvers and evade attacks. The Fighter has Advantage on Dexterity Saving Throws against effects that would force it to make a Saving Throw or move.\nMax Occupancy. This Vehicle can fit 1 Pilot and places the Pilot into a Auto-Pilot and Life-Support assisted statis where they do not need to eat unless the pod is Damaged.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have Full Cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nThrusters. The Fighter’s thrusters grant it exceptional speed, allowing it to double its Fly Speed for 1 Minute. This ability recharges after a 1-Minute cooldown.\nActions:\nAfterburners. As a Bonus Action, the Fighter can activate its afterburners to move up to 60 ft. in a straight line. This movement does not provoke Opportunity Attacks and can be used to escape or close the distance with a target.\nDocking Mechanism. The Fighter has a docking mechanism that allows it to connect to larger ships or space stations for repairs or resupply. This docking can be performed as an Action.\nHyperjump. The Fighter can perform a short-range hyperjump to reposition itself up to 600 ft. to a location within line of sight. This ability can be used once per hour and requires a 5minute cooldown period.",
  "page": 486
 },
 {
  "id": "gear_personal_spacecraft",
  "name": "Personal Spacecraft",
  "section": "Vehicles",
  "category": "Spacecraft",
  "zeni": 25000,
  "text": "Huge Vehicle\nPrice: 25,000 Zeni\nArmor Class 16 (Reinforced Hull) Hit Points 250 (15d12 + 90)\nSpeed 80 ft. fly (800 ft. out of combat)\nSTR DEX CON INT WIS CHA 14 (+2) 20 (+5) 12 (+1) - - -\nCommand Center. The Space Frigate has a command center for a Captain, Co-Pilot, and up to 2 guests. It provides enhanced navigational capabilities and improved command control over the vessel.\nMax Occupancy. This Vehicle can fit 1 Pilot, 1 Co-Pilot, and 7 Passengers. It includes essential facilities such as quarters, a medical bay, and a small armory.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have 1/2 cover and lose this benefit, until repaired, should the Vehicle take Destruction Damage.\nThrusters. This Vehicle’s thrusters grant it exceptional speed, allowing it to double its Fly Speed for 1 Minute. This ability recharges after a 1-Minute cooldown.\nActions:\nAfterburners. As a Bonus Action, the Vehicle can activate its afterburners to move up to 60 ft. in a straight line. This movement does not provoke Opportunity Attacks and can be used to escape or close the distance with a target.\nDocking Mechanism. This Vehicle has a docking mechanism that allows it to connect to larger ships or space stations for repairs or resupply. This docking can be performed in 1 minute.\nHyperjump. This Vehicle can perform a short-range hyperjump to reposition itself up to 600 ft. to a location within line of sight. This ability can be used once per hour and requires a 5-minute cooldown period.\nLaser Cannons. Ranged Weapon Attack: Range 600ft., one target. Hit 25 (5d8 + 2) Energy Damage. The Laser Cannons are designed for precision strikes, making them effective against both shields and armor.\nRepair Drones. This Vehicle has repair drones that can restore 2d12 Hit Points to the ship as an action. These drones can repair hull breaches, restore shields, or fix critical systems. The repair system can be used twice per encounter before requiring maintenance.\nSensor Array. The Frigate’s advanced sensor array grants advantage on Wisdom (Perception) and Intelligence (Investigation) checks to detect hidden or cloaked ships and to navigate through space anomalies.",
  "page": 487
 },
 {
  "id": "gear_warship",
  "name": "Warship",
  "section": "Vehicles",
  "category": "Spacecraft",
  "zeni": 250000,
  "text": "Gargantuan Vehicle\nPrice: 250,000 Zeni\nArmor Class 20 (Heavy Reinforced Plating) Hit Points 500 (30d12 + 180)\nSpeed 60 ft. fly (600 ft. out of combat)\nSTR DEX CON INT WIS CHA 24 (+7) 10 (+0) 22 (+6) - - -\nCommand Center. This Vehicle has a command center for a Captain, Co-Pilot, and up to 6 guests. It provides enhanced navigational capabilities and improved command control over the vessel.\nMax Occupancy. This Vehicle can fit 1 Pilot, 1 Co-Pilot, and 30 Passengers. It includes essential facilities such as quarters, a medical bay, and a small armory.\nPiloted. This Vehicle must have an intelligent creature controlling it, using the Pilot’s initiative, action economy, and Proficiency Bonus, if Proficient in this Vehicle. The occupants of this Vehicle have Full Cover and is lowered to 1/2 Cover, until repaired, should the Vehicle take Destruction Damage.\nThrusters. This Vehicle’s thrusters grant it exceptional speed, allowing it to double its Fly Speed for 1 Minute. This ability recharges after a 1-Minute cooldown.\nActions:\nAfterburners. As a Bonus Action, the Vehicle can activate its afterburners to move up to 60 ft. in a straight line. This movement does not provoke Opportunity Attacks and can be used to escape or close the distance with a target.\nDocking Mechanism. This Vehicle has a docking mechanism that allows it to connect to larger ships or space stations for repairs or resupply. This docking can be performed in 1 minute.\nHyperjump. This Vehicle can perform a short-range hyperjump to reposition itself up to 600 ft. to a location within line of sight. This ability can be used once per hour and requires a 5-minute cooldown period.\nLaser Cannons. Ranged Weapon Attack: Range 600ft., one target. Hit 25 (5d8 + 2) Energy Damage. The Laser Cannons are designed for precision strikes, making them effective against both shields and armor.\nRepair Drones. This Vehicle has repair drones that can restore 2d12 Hit Points to the ship as an action. These drones can repair hull breaches, restore shields, or fix critical systems. The repair system can be used twice per encounter before requiring maintenance.\nSensor Array. The Frigate’s advanced sensor array grants advantage on Wisdom (Perception) and Intelligence (Investigation) checks to detect hidden or cloaked ships and to navigate through space anomalies.",
  "page": 488
 }
];
