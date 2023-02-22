# Project Description

This project is a Todo-app based on CRDT data structure which sync over a websocket connection. The user can add, update, delete the tasks such that other clients can see the changes in real-time.

## Installation

- Clone this repo 
- Create .env.local file inside the client directory and add the following environment variables:
  ```bash
    NEXT_PUBLIC_SUPABASE_URL=<supabase-url-from-dashboard>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key-from-dashboard>
    NEXT_PUBLIC_ROOT_URL=<root-url>
    NEXT_PUBLIC_WEBSOCKET_URL=<websocket-url>
  ```
- Open terminal inside client directory
- Install dependencies 
  ```bash
    npm install
  ```
- Start the frontend server 
  ```bash
    npm run dev
  ```
- Open terminal inside server directory 
- Install dependencies 
  ```bash
    npm install
  ```
- Start the websocket server 
  ```bash
   node server.js
  ```


## Stack

- TypeScript
- React
- Yjs
- Tailwind
- Supabase

## How does it work?

- The authentication flow is implemented using Supabase and Next.js serverless functions.
- Once the user is authenticated, they are asked to set a username.
- This username gets used while assigning the tasks.
- The task has following properties which could be changed in realtime
  - Priority - High, Medium, Low
  - Status - Todo, Pending, Completed
  - Assignee - The list of all the users are fetched and the current user can choose the assignee from that list
  - Date
- The frontend uses the yjs framework based on the CRDT data structure, which provides the app a shared state.
- The state of the application sync over a websocket connection.
- When a client goes offline, the changes are stored locally by Yjs which uses indexedDB APIs. When they are back the changes are synced again.
- The task list also has an ability of the keyboard navigation for easiernavigation. 

## Problems i faced

- the major poblem that i faced was understanding how yjs works. 
- setting up yjs with react hooks was challenging since there was very limited material available. 

