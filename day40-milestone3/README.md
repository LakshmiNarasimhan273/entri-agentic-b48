# CRM App (React)

React version of the original HTML/CSS/JS CRM application. Same design, same pages, same CSS, same localStorage data.

## Run it

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

Other commands: `npm run build` (production build), `npm test` (run the tests).

## Using the app

1. Click **Sign Up** and create an account (accounts are stored in your browser's localStorage).
2. Use the sidebar to open **Dashboard**, **Contacts**, **Pipeline** and **Settings**.
3. **Contacts**: search, filter by tag, add, edit and delete contacts.
4. **Pipeline**: drag deal cards between *New / Contacted / Qualified / Won/Lost* (or reorder inside a column), and add, edit or delete deals.
5. **Settings**: update your profile and avatar, change your password, save notification preferences.

## Tech

React 18, Vite, react-router-dom, Redux Toolkit + react-redux, @hello-pangea/dnd (drag and drop).

## Project structure

```
src/
  main.jsx, App.jsx        entry point and routes
  components/              Layout, FormField, ProtectedRoute, DealCard, PipelineColumn, DealModal
  pages/                   Login, Register, Dashboard, Contacts, ContactForm, Pipeline, Settings
  store/                   Redux slices: auth, contacts, deals, preferences (+ localStorage saving)
  utils/                   storage.js (seed data + keys), helpers.js
  styles/                  original CSS files (pages.css now holds the per-page styles)
  __tests__/               integration tests
```

## Data

Data is saved to localStorage using the original keys (`crm_users`, `crm_contacts`, `crm_deals`, `crm_session`) plus `crm_preferences`. To reset the app, clear the site's localStorage in your browser's dev tools.
