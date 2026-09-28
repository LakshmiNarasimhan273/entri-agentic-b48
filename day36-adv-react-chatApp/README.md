# Chat App

A simple, responsive chat application built with React, Vite, React Bootstrap and Bootstrap Icons.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## What it demonstrates

- `useState` for conversations, selected conversation and message input
- Props for passing data and event handlers down the component tree
- Event handling (click, input change, Enter key)
- Conditional rendering (empty state, active item, sent vs received bubbles)
- List rendering with `.map()`
- Immutable state updates when sending a message

## Structure

```text
App
 ├── Sidebar
 │     └── ConversationList
 │            └── ConversationItem
 └── ChatWindow
       ├── ChatHeader
       ├── MessageList
       │     └── MessageBubble
       └── MessageInput
```

Data is static and lives in `src/data/conversations.js`. Messages are not saved after a page refresh (no backend, by design).
