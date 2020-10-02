# Einstant - SpaceApps2020
 A fun and easy way to know what breakthrough propulsion systems can do
- **Category:** Create
- **Challenge:** Breakthrough

**Problem:** How do we get more people engaged in breakthrough propulsion systems? 
How do we develop more interest in future engineers?
There is a need for developing advanced propulsion applications and systems that will revolutionize how humans explore space.

**Goal:** Showcase both existing, as well as next generation/theoretical, breakthrough spacecraft propulsion in an engaging way.

The propulsion systems to be considered are:
1. rocket engine - ariel
2. nuclear propulsion - carlos
3. solar sails - leo
4. ion engines - ariel
5. warp drives - carlos
6. antimateria - leo

## Minigaming concept

The application will be divided in 3 minigames that, together, will tell how a journey is starting from designing and making your own spacecraft from scratch to travelling accross the universe trying to survive. Some considerations:
* Hacer cada minijuego modular en cuanto a los sistemas de propulsion. La idea es que cuando cada quien haga su minijuego, se enfoque en implementar sus 2 sistemas de propulsión pero que quede modular para que el sábado/domingo los otros puedan agregar sus sistemas de propulsión rápido en todos los minijuegos.
* El sistema de propulsión sobre el que se va a basar la historia será aleatorio y se determinará al inicio.

**Minigame 1. Sketch your propulsion system - 1 minute**

*Dar una explicacion de cada sistema.*

1. Mostrar imagenes al usuario para dibujar.
2. Medir que tan preciso fue su dibujo, si fue bueno, su puntaje sube.
3. Al enviar el dibujo al servidor, termina el juego y acumula puntos para el siguiente.

*Las piezas dibujadas en este minijuego seran utilizadas en el siguiente.*

**Minigame 2. Ensabla tu spacecraft - 1 minute**
1. El usuario elige las piezas de un contenedor (drag n drop).
2. Mostrar lo que tiene que "cocinar" el usuario con las piezas dadas en los contenedores.
3. Tendrá que crear su spacecraft en el menor tiempo posible.
4. A medida que pase el tiempo, el score va decrementando.
5. Mostrar a los usuarios las condiciones fisicas a las que se va a enfrentar su nave para que la diseñe a la medida o lo mejor posible.

*La nave construida en este minijuego sera utilizada en el siguiente y ultimo minijuego.*

**Minigame 3. Carrera espacial**
1. Backaground del mapa: Imagenes de la NASA.
2. Esquivar meteoritos
3. Disparar a los meteoritos
4. Habilidad especial disponible: Segun el tipo de spacecraft que construiste.
5. El score va aumentando entre mas asteroides destruyas y mas distancia recorras para acumular puntos.

### Ranking system (tentative)
- Aerospace Artist - 500+ points
- Aerospace Engineer - 300+ points
- Aerospace Enthusiast - 100+ points
- Aerospace Hobbyst - 50+ points
- Aerospace Student - 20+ points

### Who wins?
- Todos van acumulando puntos y obteniendo su respectivo rango segun el ranking system.

### Ideas por hilar
- Dado que los minijuegos dependen del tiempo, podemos alterarlo enterminos de gravedad y velocidad.
- Obstaculo: Agujeros negros, alteracion del tiempo a favor o en contra. Si caes en uno, la nave te succiona por completo.
    La clave para superar este obstaculo dependera, de que presiones tu habilidad especial en el momento preciso.

### Experiencia de usuario
- Pending details (probably designed by Erik)

### Future work
- Add levels depending on the propulsion system

### Nices to have
- Que el tercer juego fuera infinito y acabara en cuanto mueras. Debe ser "fácil" morir
- Efectos especiales, música. Erik tiene audios.

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
