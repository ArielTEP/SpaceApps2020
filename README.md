# SpaceApps2020

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

## Collective exploration robot swarm / Robot swarm visualizer

**Problema:** Exploracion de lugares inalcanzables para el humano y para la vision de los satelites. 
*Asumiendo que son terrenos planos o transitables por el robot*

**Objetivos:** 
- Crear una herramienta de visualización que ayude a los científicos o cualquier interesado
en el terreno a investigar, poder explorar o descubrir zonas donde no haya alcance.
- Para demostrar la funcionalidad de la herramienta visual, se propone un algortimos de reparticion de 
tareas entre robots exploradores para reducir costos de sensores muy especializados. 
- También, se propone visualizar la forma en como los robots adquieren conocimiento del resto. De esta manera, se facilitaría el troubleshooting, habría mayor transparencia de lo que está sucediendo.

### Parte I - Inteligencia colectiva basada en reglas comunes 
    - Comunicacion entre robots (Lista de objetos o Threads)
    - Exploracion de forma cooperativa de tal forma que compartan informacion sobre el mapa (Algoritmo)
    - Repartir tareas (asignar una 'profesion' a cada robot y tareas) (Algoritmo)
    - Sensor o mecanismo para saber cuando un robot del grupo falla. (ping continuamente)
### Parte II - Visualizar los resultados recolectados por el robot
    - Mapa 2D - Estado incial: obscuro. Estado final: la foto del terreno en piezas. Cada pieza del terreno tendria la informacion de ese pedazo.
    - Considerar el alcance espacial de cada medicion/sensor. (delimitación del pedazo medido)
    - Ir iluminando el mapa de 2D conforme los robots vayan explorando. Cada tarea con diferente color.
    - Colocar la textura de la fotografia tomada como el "piso" del robot.
    - Logging de actividades (texto y grafico de snapshot de actividades).

### Experiencia de usuario
- Cada pieza del mapa tendrá que ser clickeable.
- Al dar click se deberían visualizar las propiedades de ese pedazo del terreno.
- Propiedades: Filtrar log por nombre de robot y id del pedazo, resultados de mediciones.
- En otro lado, mostrar el log de actividades en forma de texto y de forma gráfica en "tiempo real".

### Definición de conceptos

Tareas:
Es el proceso o trabajo que realizará cada robot.
- Existirá una lista de tareas por cada profesion.
- Sensores especificos para cada profesión.

Profesiones:
- Biologo/Químico
    - Detector de fosfeno, metano, co2, oxigeno.
- Geólogo
    - Humedad de suelo
    - Campo magnetico
- Fisico/Luz
    - Intensidad luminosa
    - Campo magnetico
- Meteorologo
    - Temperatura
    - Presion

Robot general:
- Sensores tradicionales
    - Giroscopio
    - Acelerometro
    - Sonar
    - Microfono

Algortimos de reparticion de tareas / algoritmos distribuidos:
- Pendiente

Equipo:
- Erik - server-side setup / AWS - Lambda (Serverless) / Python - Flask / API / Dev server por ahora 
- Leo - visualizacion, algoritmos, AI
- Carlos - server-side, visualizacion
- Ariel - server-side, algoritmos
- Luis - Couch

Server-side work:
- Generar datos de sensores
- Ejecución de los algoritmos
- Precesamiento de datos y generación de resultados.
- Enviar resultados en respuesta a peticiones del frontend.
- Almacenamiento de logs en archivos y base de datos: swarm.log, DynamoDB (NoSQL - JSON data)

Visualización:
- Mapa 2D
- Mapa de actividades (ej. influence mapping)
- Visualizacion de logs en texto para el usuario

### Tareas realizadas
- Backend de inicio, disponible en https://bzolpdnx2e.execute-api.us-east-2.amazonaws.com/dev/api/v1/
- Frontend views: https://drive.google.com/file/d/1l335JZExSv__7DqXB2kcp-LEtKdGRA9-/view?usp=sharing
