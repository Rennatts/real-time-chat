# SpeakSpot

A project for real-time messaging, users can create rooms, invite other users to join the room, and leave the room.

## Front-end React Typescript
## Back-end: Nestjs with WebSocket

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them:

- Docker
- Docker Compose
- Firebase variables, see in .env.example the variables needed

You can download Docker Desktop for Windows and Mac from [Docker Hub](https://hub.docker.com/?overlay=onboarding). If you're using Linux, follow the instructions for your distribution from the [Docker documentation](https://docs.docker.com/engine/install/).


### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:Rennatts/real-time-chat.git
   cd real-time-chat

2. Build and run the containers using Docker Compose:
   ```bash
    docker-compose up --build


###OPEN http://localhost:3050

3. Another method to run the project is:
   ```
   //In one terminal
   cd server
    yarn run start
   //In another terminal
    cd web
    yarn run start

e
### How to Test
Login as User X:

Open a web browser and navigate to http://localhost:3050.
Login using a test account or create a new account for User X.
Login as User Y:

Open a different web browser or an incognito/private window in the same browser and navigate to http://localhost:3050.
Login using a different test account or create a new account for User Y.

Create a Chat Room (User X):

As User X, create a new chat room.
Note down the room's ID or name for inviting User Y.
Invite Another User (User X -> User Y):

Invite User Y to the chat room using the room's ID or name.
Verify that User Y receives the invitation in real-time.
Accept Invitation and Join Chat Room (User Y):

As User Y, accept the invitation.
Verify that User Y can join the chat room and both users can see each other as participants.
