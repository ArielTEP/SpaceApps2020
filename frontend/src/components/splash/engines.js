
const rocket_engine = {
  id: 1,
  name: "ROCKET ENGINE",
  description: "these guys have been around since the space-race began. They produce thrust via Newton's third law of motion by ejecting mass in the opposite direction of movement. This requires a lot of energy and is usually produced by combustion.",
  image: "/spacecrafts/sc5.png",
  minigame1 : {
    parts : [
      {
        base : "/minigame1/parts_sc5/sc5p0.png",
        target : "/minigame1/parts_sc5/sc5p0.target.png",
        targetWidth: 173,
        targetHeight: 631
      },
      {
        base : "/minigame1/parts_sc5/sc5p1.png",
        target : "/minigame1/parts_sc5/sc5p1.target.png",
        targetWidth: 95,
        targetHeight: 219
      },
      {
        base : "/minigame1/parts_sc5/sc5p2.png",
        target : "/minigame1/parts_sc5/sc5p2.target.png",
        targetWidth: 152,
        targetHeight: 370
      },
      {
        base : "/minigame1/parts_sc5/sc5p3.png",
        target : "/minigame1/parts_sc5/sc5p3.target.png",
        targetWidth: 139,
        targetHeight: 342
      },
      {
        base : "/minigame1/parts_sc5/sc5p4.png",
        target : "/minigame1/parts_sc5/sc5p4.target.png",
        targetWidth: 95,
        targetHeight: 219
      },
    ]
  }
}

const nuclear_propulsion = {
  id: 2,
  name: "NUCLEAR PROPULSION",
  "description": "Travelling through the universe requires a lot of energy and right now, one of our best source of usable energy is by nuclear reactors. These are particularly useful where the spacecraft is required to be autonomous for a long time without access to other sources of fuel. Energy is produced by the decay of radioactive materials which can be converted to electrical power.",
  image: "/spacecrafts/sc2.png",
  minigame1 : {
    parts : [
      {
        base : "/minigame1/parts_sc2/sc2p0.png",
        target : "/minigame1/parts_sc2/sc2p0.target.png",
        targetWidth: 116,
        targetHeight: 561
      },
      {
        base : "/minigame1/parts_sc2/sc2p1.png",
        target : "/minigame1/parts_sc2/sc2p1.target.png",
        targetWidth: 72,
        targetHeight: 281
      },
      {
        base : "/minigame1/parts_sc2/sc2p2.png",
        target : "/minigame1/parts_sc2/sc2p2.target.png",
        targetWidth: 116,
        targetHeight: 308
      },
      {
        base : "/minigame1/parts_sc2/sc2p3.png",
        target : "/minigame1/parts_sc2/sc2p3.target.png",
        targetWidth: 72,
        targetHeight: 281
      },
      {
        base : "/minigame1/parts_sc2/sc2p4.png",
        target : "/minigame1/parts_sc2/sc2p4.target.png",
        targetWidth: 176,
        targetHeight: 396
      }
    ]
  }
}

const solar_sails = {
  id: 3,
  name: "SOLAR SAILS",
  description: "In the Earth the atmosphere absorbs most of UV radiation from the Sun to protect us, but in the space that's not the case... which is a good thing! Radiation pressure exerted by sunlight on large mirrors can be used to create thrust the same way a boat uses wind and a sail no navigate in the ocean.",
  image: "/spacecrafts/sc3.png",
  minigame1 : {
    parts : [
      {
        base : "/minigame1/parts_sc3/sc3p0.png",
        target : "/minigame1/parts_sc3/sc3p0.target.png",
        targetWidth: 255,
        targetHeight: 612
      },
      {
        base : "/minigame1/parts_sc3/sc3p1.png",
        target : "/minigame1/parts_sc3/sc3p1.target.png",
        targetWidth: 311,
        targetHeight: 375
      },
      {
        base : "/minigame1/parts_sc3/sc3p2.png",
        target : "/minigame1/parts_sc3/sc3p2.target.png",
        targetWidth: 224,
        targetHeight: 616
      },
      {
        base : "/minigame1/parts_sc3/sc3p3.png",
        target : "/minigame1/parts_sc3/sc3p3.target.png",
        targetWidth: 325,
        targetHeight: 710
      },
      {
        base : "/minigame1/parts_sc3/sc3p4.png",
        target : "/minigame1/parts_sc3/sc3p4.target.png",
        targetWidth: 311,
        targetHeight: 375
      },
    ]
  }
}

const ion_engine = {
  id: 4,
  name: "ION ENGINE",
  description: "Different charges attract and same charges repel each other. These engines take advantange of this fact to expell atoms of an ionized gas at very high speeds to provide thrust to the spacecraft according to Newton's third law of motion. This system is useful in some cases where sufficient chemical propellant cannot be carried on the spacecraft to accomplish the desired mission.",
  image: "/spacecrafts/sc4.png",
  minigame1 : {
    parts : [
      {
        base : "/minigame1/parts_sc4/sc4p0.png",
        target : "/minigame1/parts_sc4/sc4p0.target.png",
        targetWidth: 72,
        targetHeight: 232
      },
      {
        base : "/minigame1/parts_sc4/sc4p1.png",
        target : "/minigame1/parts_sc4/sc4p1.target.png",
        targetWidth: 64,
        targetHeight: 472
      },
      {
        base : "/minigame1/parts_sc4/sc4p2.png",
        target : "/minigame1/parts_sc4/sc4p2.target.png",
        targetWidth: 48,
        targetHeight: 176
      },
      {
        base : "/minigame1/parts_sc4/sc4p3.png",
        target : "/minigame1/parts_sc4/sc4p3.target.png",
        targetWidth: 40,
        targetHeight: 120
      },
      {
        base : "/minigame1/parts_sc4/sc4p4.png",
        target : "/minigame1/parts_sc4/sc4p4.target.png",
        targetWidth: 48,
        targetHeight: 176
      },
      {
        base : "/minigame1/parts_sc4/sc4p5.png",
        target : "/minigame1/parts_sc4/sc4p5.target.png",
        targetWidth: 40,
        targetHeight: 120
      }
    ]
  }
}

const warp_dive = {
  id: 6,
  name: "WARP DRIVE",
  description: "Remember Star Trek? Miguel Alcubierre theorised that it is possible to navigate through the universe by folding the space-time right behind you to create thrust. It should be possible to travel faster than the speed of light and, well, according to Einstein's equations... it should work!",
  image: "/spacecrafts/sc6.png",
  minigame1 : {
    parts : [
      {
        base : "/minigame1/parts_sc6/sc6p0.png",
        target : "/minigame1/parts_sc6/sc6p0.target.png",
        targetWidth: 500,
        targetHeight: 500
      },
      {
        base : "/minigame1/parts_sc6/sc6p1.png",
        target : "/minigame1/parts_sc6/sc6p1.target.png",
        targetWidth: 205,
        targetHeight: 625
      },
      {
        base : "/minigame1/parts_sc6/sc6p2.png",
        target : "/minigame1/parts_sc6/sc6p2.target.png",
        targetWidth: 220,
        targetHeight: 650
      },
      {
        base : "/minigame1/parts_sc6/sc6p3.png",
        target : "/minigame1/parts_sc6/sc6p3.target.png",
        targetWidth: 230,
        targetHeight: 650
      },
      {
        base : "/minigame1/parts_sc6/sc6p4.png",
        target : "/minigame1/parts_sc6/sc6p4.target.png",
        targetWidth: 500,
        targetHeight: 780
      },
    ]
  }
}

export const PROPULSION_SYSTEMS = [
  rocket_engine, nuclear_propulsion, solar_sails, ion_engine, warp_dive
]