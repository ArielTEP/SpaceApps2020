#!/bin/sh
export ENV="PROD"

# Crear el static build del frontend
cd frontend
yarn
yarn build

# Ejectuar el backend
cd ../Backend
# Instalar requerimientos
pip install -r requirements.txt
flask run
# Una opcion para servear con gunicorn:
# exec gunicorn -b 0.0.0.0:5000 app:app --preload