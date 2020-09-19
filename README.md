## Collective exploration robot swarm

Problema: Exploracion de lugares inalcanzables para el humano y para la vision de los satelites. 


Parte I - Inteligencia colectiva basada en reglas comunes 
(recoleccion de datos)    (propuesta de un algoritmo)
    -- Comunicacion entre robots
    -- Exploracion de forma cooperativa de tal forma que compartan informacion
        sobre el mapa.
    -- Repartir tareas (asignar una 'profesion' a cada robot y tareas)
    -- Sensor o mecanismo para saber cuando un robot del grupo falla.
Parte II - Visualizar los resultados recolectados por el robot
    -- Mapa 2D - estado incial obscuro. Estado final: la foto del terreno en piezas. Cada pieza del terreno tendria la informacion de ese pedazo.
    -- Considerar el alcance espacial de cada medicion/sensor.
    -- Ir iluminando el mapa de 2D conforme los robots vayan explorando
    -- Logging de actividades (texto y grafica con reloj)
    -- Cada tarea con diferente color.
    -- Colocar la textura de la fotografia tomada como el "piso" del robot.

Tareas:
- Lista de tareas por cada profesion.
- Sensores especificos.

Profesiones:
- Biologo/Quimico
    -- Detector de fosfeno, metano, co2, oxigeno.
- Geologo
    -- Humedad de suelo
    -- Campo magnetico
- Fisico/Luz
    -- Intensidad luminosa
    -- Campo magnetico
- Meteorologo
    -- Temperatura
    -- Presion

Robot general:
- Sensores tradicionales
    -- Giroscopio
    -- Acelerometro
    -- Sonar
    -- Microfono

Algortimos de reparticion de tareas / algoritmos distribuidos:
- Pendiente

Equipo:
Erick - 
Leo - visualizacion, algoritmos, AI
Carlos - server-side, visualizacion
Ariel - server-side, algoritmos
Luis

Server-side:
- Generar datos de sensores
- Algoritmos
- Analisis de datos
- Envio de resultados a la visualizacion (frontend)
- Almacenamiento de logs

Visualizacion:
- Mapa 2D
- Mapa de actividades (influence mapping)
- Visualizacion de logs