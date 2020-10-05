# PROPULSION CRAFT - Space Apps Challenge 2020
 A fun and easy way to know what breakthrough propulsion systems can do
- **Category:** Create
- **Challenge:** Breakthrough

**Problem:** How do we get more people engaged in breakthrough propulsion systems? 
How do we develop more interest in future engineers?
There is a need for developing advanced propulsion applications and systems that will revolutionize how humans explore space.

**Goal:** Showcase both existing, as well as next generation/theoretical, breakthrough spacecraft propulsion in an engaging way.

Propulsion systems taken from the NASA challenge description:
1. Rocket engine 
2. Nuclear propulsion 
3. Solar sails
4. Ion engines 
5. Warp drives

## Minigaming concept

The application will be divided in 3 minigames that, together, will tell how a journey is starting from designing and making your own spacecraft from scratch to travelling accross the universe trying to survive. 

Some considerations:
* When the application loads, a random propulson system is automatically selected.
* That will be the system in which the next three minigames will be based on.

**Minigame 1. Sketch your propulsion system - Do it quickly!**
*The purpose here is to understan the componenet that make each propulsion system unique*

1. Display an image to the player so they can sketch it.
2. The higher the similiraty of your sketch to the presented part, the higher the score.
3. Once you are done with the sequence of sketches, the game will take you to Minigame 2.

*The pieces drawn in Minigame 1 will be used on Minigame 2*

**Minigame 2. Equip your spacecraft - 1 minute**
1. The player will pick the pieces drawn earlier from the a conveyor band (drag and drop).
2. Show what the player needs to pick 
3. The less time taken dragging and dropping the right pick, the higher the score.
4. Careful! If you pick wrong, 50pts are substracted from your score.
5. Additionaly, if you choose right, 50 pts added.

*The spacecraft equiped in this minigame will be used to play the last minigame!*

**Minigame 3. Survive in space by moving fast and dodging asteroids!**
1. TODO: Map background should be NASA real pictures taken from space.
2. Dodge asteroids in order to keep alive!
3. Shoot the asteroids to avoid colliding with them.
4. TODO: Based on the propulsion system assigned, an special ability should be added to the spacecraft. 
5. The score will increase as you impact with satellites and tear down space rocks!

### Ranking system for players based on score (tentative)
- Aerospace Artist - 500+ points
- Aerospace Engineer - 300+ points
- Aerospace Enthusiast - 100+ points
- Aerospace Hobbyst - 50+ points
- Aerospace Student - 20+ points

### Who wins?
- Everyone will be accumulating points and getting a degree/rank based on how they performed throughout the minigames.

### Ideas for new features
- Given that the minigames depend on time, we could alter the environment in terms of gravity and speed.
- Obstacles: Black hole, instant transmission and time contraction. 
- To dodge obstacles successfully, you will need to test your abilities to decide what can be
leveraged from the propulsion system equiped on your spacecraft.

## Installation

To install the backend:

```
$ cd Backend
$ pip install -r requirements.txt
```

To install the frontend:

```
$ cd frontend
$ yarn install
```

## Usage

To run in a PRODUCTION environment (compiling ui to static files to serve with python):

```
$ ./main.sh
```

**TODO:** ¿cómo se deployea en AWS? así como está ahorita, sólo compila el front y lo servea con el mismo flask. Hay una línea como comentario de cómo se servearía con otra cosa (i.e. con gunicorn).

To run both back and front in a DEVELOPMENT environment:

```
$ cd Backend
$ flask run
```

```
$ cd frontend
$ yarn start
```
