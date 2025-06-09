# 🗣️ React-Forum — A Modern Forum Platform Built with React

💬 **React Forum** is a lightweight and modular forum platform built with **React + Redux Toolkit + Axios + CRACO**, supporting rich-text publishing, user login, article management, and route-based modular layout.

---

## 🚀 Highlights

🧩 **Modular Architecture** — Clear separation of components, pages, hooks, and utilities  
📦 **State Management** — Powered by Redux Toolkit for scalable and centralized state handling  
🔗 **Reusable API Modules** — Organized Axios-based API layers for articles and users  
🖼️ **Rich Content Editor** — Integrated editor for publishing articles with media support  
📱 **Responsive Layout** — Adaptive UI for desktops and mobile screens  
⚙️ **Configurable Build** — Extended CRA via CRACO for flexible customization  
🧪 **Developer Friendly** — Well-structured code, helpful comments, and easily extendable

---

## 📁 Project Structure
```bash
📦 root
├── 🏞️ public
├── 💻 src
│ ├── 🔗 apis # API calls
│ │ ├── 📄 article # Article-related API
│ │ └── 👤 user # User-related API
│ ├── 🖼️ assets # Static resources (images, icons, etc.)
│ ├── 🧩 components # Reusable UI components
│ ├── 🪝 hooks # Custom React hooks (e.g., channel list fetch)
│ ├── 📄 pages # Page components
│ │ ├── 📑 Article # Article list and management
│ │ ├── 🏠 Home # Dashboard
│ │ ├── 🧱 Layout # Common layout (header, sidebar, content)
│ │ ├── 🔐 Login # User login page
│ │ └── 📝 Publish # Article creation/editing with rich-text and image upload
│ ├── 🚦 router # Route configuration
│ ├── 🗃️ store # Redux store setup
│ │ └── 👤 user.js # User slice (auth & info)
│ ├── 🎨 styles # Global styles
│ ├── 🧰 utils # Axios instance and shared utilities
│ ├── 🚀 App.js # Root app component
│ └── 🧾 index.js # Entry point
├── 📄 .gitignore # Git ignored files
├── ⚙️ craco.config.js # CRA customization config (via CRACO)
├── 🧭 jsconfig.json # Path alias config
└── 📦 package.json # Project dependencies & scripts

```



---

## 🚀 Features

### 🧾 Article Management
- Create, edit, delete, and list forum posts  
- Rich text editing with **React Quill**  
- Cover image upload (single, multiple, or none)  
- Article filtering by status and channel  

### 🔐 User Authentication
- Secure login system with token management  
- Persistent login sessions using `localStorage`  
- Role-based access control (**admin/user**)  

### 🖼️ Rich Text Editor
- Integrated **React Quill** editor  
- Support for text formatting, links, and media  
- Image upload integration  

### 📦 State Management
- **Redux Toolkit** for centralized state  
- User authentication slice (token & user info)  
- Async actions for API calls  

### 🧩 Modular Codebase
- Clearly organized components and pages  
- Custom hooks for reusable logic 
- API modules for encapsulated HTTP requests  

---

## 🛠 Tech Stack

### ⚛️ Frontend
- **React 18**
- **Redux Toolkit**
- **React Router v6**
- **Ant Design 5.x**

### 🌐 HTTP Client
- **Axios** with request interceptors

### 🎨 Styling
- **SCSS Modules**
- **Less** (via Ant Design)
- **Global styles**

### 🛠️ Build Tooling
- **CRA (Create React App)** with **CRACO**
- **Babel** for transpilation


---

## 📦 Getting Started


```bash

# Install dependencies
npm install

# Start development server
npm run start
```

## 📌 Notes
The API logic is modularized in src/apis/ for better maintainability.

craco.config.js allows you to extend or override CRA's Webpack config without ejecting.

Authentication state (token & user info) is globally managed using Redux Toolkit.
