# Mediapipe Herkansing

## Inhoudsopgave
1. [Overzicht](#overzicht)
2. [Installatie](#vereisten)(#installatie stappen)
3. [API Endpoints](#api-endpoints)

## 1. Overzicht
Het project Mediapipe is een webapplicatie die gebruik maakt van MediaPipe voor handtracking en machine learning modellen om pose data te analyseren en voorspellingen te doen. De applicatie is gebouwd met React voor de frontend en Node.js met Express en Mongoose voor de backend. Ook gebruikt de applicatie brain.js voor het trainen van de dataset.

## 2. Installatie

### Vereisten

- Node.js
- npm (Node Package Manager)
- MongoDB
- Visual Studio (brain.js)
- Python 2.7 (brain.js)

### Installatie Stappen
1. Clone de repository:
   git clone https://github.com/Rayel2002/mediapipe_herkansing
   cd mediapipe_herkansing

   Serverside
   cd server
   npm i
   rename EXAMPLE.env into .env
   fill example.env in

   Clientside
   cd frontend
   npm i
   rename EXAMPLE.env into .env
   fill example.env in

### 3. API Endpoinds
POST /poseData/save: Sla pose data op in de database.
GET /poseData/: Haal alle pose data op uit de database.
POST /poseData/train: Train een machine learning model met de opgeslagen pose data.
POST /poseData/predict: Doe een voorspelling op basis van nieuwe pose data.
GET /poseData/accuracy: Bereken de nauwkeurigheid van het model.
GET /poseData/confusion-matrix: Haal de verwarringsmatrix van het model op.

