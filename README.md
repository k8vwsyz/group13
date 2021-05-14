# kandidat-web

## Docker
Projektet kräver att docker är installerat och körs i bakgrunden (går att köra utan docker men enklare med, förutom på mac för prestandan är hemsk då)  
Generell information om docker: https://docs.docker.com/get-started/overview/  

Installations instruktioner:
* Linux: https://docs.docker.com/engine/install/
* Mac: https://docs.docker.com/docker-for-mac/install/
* Windows: https://docs.docker.com/docker-for-windows/install/
Node https://nodejs.org/en/download/

Projektet har två servrar en [next.js](https://nextjs.org/) server för frontenden och en [node](https://nodejs.org) server med [express](https://expressjs.com/) och [socket.io](https://socket.io/) för backenden.

## Installations instruktioner

* next.js
  1. följ insruktioner `1` och `2` från `Start instruktioner`, `next.js`
  2. `npm install`

* node med express och socket.io servern
  1. följ insruktioner `1` och `2` från `Start instruktioner`, `node med express och socket.io servern`
  2. `npm install`

## Start instruktioner

* next.js 
  1. `./run.sh` i terminalen på linux ~~(och förhoppningsvis mac)~~ och mac (kan kräva root om ni inte [satt upp docker](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) för att fungera utan det på linux/mac) (windows kör en .bat fil som jag inte skrivit än)
  2. `cd kandidat`
  3. `npm run dev`

* node med express och socket.io servern
  1. `./run_5000.sh` (samma sak gäller som för next.js)
  2. `cd kandidat-websocket-server`
  3. `npm run dev`

Detta startar två servrar på din dator en på port 4000 och en på port 5000. Gå till `localhost:4000` i webbläsaren för att gå in i webbappen. Klienter går sen till `localhost:4000/client/[room_name]` för att gå till rum som styrs av en admin.


