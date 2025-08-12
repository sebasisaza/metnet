# Task Manager Backend API

A Node.js Express backend API for managing tasks with MongoDB integration.

## Features

- ✅ **RESTful API** with Express.js
- 🗄️ **MongoDB** database with Mongoose ODM
- 🔒 **Input validation** using express-validator
- 🛡️ **Security** with Helmet middleware
- 📝 **Logging** with Morgan
- 🌐 **CORS** support for frontend integration
- ⚡ **ES6 modules** support

## API Endpoints

### Tasks

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/api/tasks` | Get all tasks | Query params: `status`, `sort`, `order` |
| `GET` | `/api/tasks/:id` | Get a single task | - |
| `POST` | `/api/tasks` | Create a new task | `{ title, description?, status? }` |
| `PUT` | `/api/tasks/:id` | Update a task | `{ title?, description?, status? }` |
| `DELETE` | `/api/tasks/:id` | Delete a task | - |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API health status |

## Task Properties

- **title** (required): String, 1-100 characters
- **description** (optional): String, max 500 characters  
- **status** (optional): Enum ['pending', 'completed'], defaults to 'pending'
- **createdAt**: Auto-generated timestamp
- **updatedAt**: Auto-generated timestamp

## Query Parameters

### GET /api/tasks

- `status`: Filter by status ('pending' or 'completed')
- `sort`: Sort field (default: 'createdAt')
- `order`: Sort order ('asc' or 'desc', default: 'desc')

### Examples

```bash
# Get all pending tasks
GET /api/tasks?status=pending

# Get all tasks sorted by title ascending
GET /api/tasks?sort=title&order=asc

# Get completed tasks sorted by creation date
GET /api/tasks?status=completed&sort=createdAt&order=desc
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation message",
  "data": { ... },
  "count": 1
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Setup

### Prerequisites

- Node.js 16+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp env.example .env
```

3. Configure your `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task-manager
CORS_ORIGIN=http://localhost:3000
```

4. Start MongoDB service

5. Run the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/task-manager |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |

## Project Structure

```
src/
├── config/          # Configuration files
│   └── database.js  # MongoDB connection
├── middleware/      # Custom middleware
│   ├── validation.js    # Input validation
│   └── errorHandler.js  # Error handling
├── models/          # Mongoose models
│   └── Task.js     # Task schema
├── routes/          # API routes
│   └── tasks.js    # Task endpoints
└── server.js        # Main application file
```

## Validation Rules

### Task Creation/Update
- **title**: Required, 1-100 characters
- **description**: Optional, max 500 characters
- **status**: Optional, must be 'pending' or 'completed'

### Task ID
- Must be a valid MongoDB ObjectId format

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- MongoDB connection issues
- Invalid ObjectId formats
- 404 Not Found routes
- General server errors

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input validation**: Prevents malicious input
- **Rate limiting**: Built-in Express protection

## Development

### Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm test`: Run tests (placeholder)

### Logging

The API uses Morgan for HTTP request logging, providing detailed information about:
- Request method and URL
- Response status and time
- Request size and user agent

## API Testing

You can test the API using tools like:
- **Postman**
- **Insomnia**
- **cURL**
- **Thunder Client** (VS Code extension)

### Example cURL Commands

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task", "description": "Test Description"}'

# Update a task
curl -X PUT http://localhost:5000/api/tasks/[TASK_ID] \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/[TASK_ID]
```

## License

This project is open source and available under the MIT License.
