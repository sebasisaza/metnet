# 📋 Task Management Application

A full-stack task management application built with Vue 3 (frontend) and Node.js/Express (backend) with MongoDB integration.

## 🚀 Features

### Frontend (Vue 3)
- **Modern UI**: Built with Vue 3 Composition API and TypeScript
- **Task Management**: Create, read, update, and delete tasks
- **Real-time Filtering**: Filter tasks by status (All, Pending, Completed)
- **Responsive Design**: Mobile-friendly interface
- **State Management**: Pinia store for reactive state management
- **Type Safety**: Full TypeScript support

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for tasks
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Input Validation**: Comprehensive field validation using express-validator
- **Error Handling**: Global error handling and validation error responses
- **Security**: CORS, Helmet, and Morgan middleware

## 🏗️ Project Structure

```
metnet/
├── frontend/                 # Vue 3 Frontend Application
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── stores/          # Pinia stores
│   │   ├── views/           # Page components
│   │   ├── types/           # TypeScript interfaces
│   │   └── services/        # API service layer
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Node.js Backend API
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Pinia** - State management for Vue
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📋 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with optional status filter)
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Query Parameters
- `GET /api/tasks?status=pending` - Get pending tasks
- `GET /api/tasks?status=completed` - Get completed tasks
- `GET /api/tasks` - Get all tasks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment configuration:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment configuration:**
   ```bash
   cp .env.example .env
   ```
   
   The frontend environment is already configured for local development.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

## 🎯 Usage

### Creating Tasks
1. Click the "Agregar Nueva Tarea" button
2. Fill in the task title and description
3. Click "Crear Tarea" to save

### Managing Tasks
- **View Tasks**: All tasks are displayed on the main page
- **Filter Tasks**: Use the filter buttons to view specific task statuses
- **Mark Complete**: Click the ✅ button to mark a task as completed
- **Mark Pending**: Click the ⏪ button to mark a completed task as pending
- **Delete Task**: Click the 🗑️ button to remove a task

### Task Status
- **Pending**: Tasks that need to be completed
- **Completed**: Tasks that have been finished

## 🔧 Development

### Available Scripts

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run API tests

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure

#### Frontend Components
- **TaskList.vue** - Main task listing and filtering
- **CreateTask.vue** - Task creation form
- **TaskCard.vue** - Individual task display and actions

#### Backend Structure
- **server.js** - Main Express server setup
- **routes/tasks.js** - Task-related API endpoints
- **models/Task.js** - Mongoose task schema
- **middleware/validation.js** - Input validation rules
- **middleware/errorHandler.js** - Global error handling

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network access if using cloud MongoDB

2. **Port Already in Use**
   - Change PORT in backend `.env` file
   - Update frontend API URL accordingly

3. **CORS Issues**
   - Verify CORS_ORIGIN in backend `.env`
   - Ensure frontend and backend ports match

4. **Task Status Not Updating**
   - Check browser console for errors
   - Verify backend server is running
   - Check network tab for API responses

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB team for the flexible database solution

---

**Happy Task Managing! 🎉**
