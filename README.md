# Full-Stack Todo Application

A modern full-stack Todo application built with React.js frontend and ASP.NET Core Web API (.NET 8.0) backend.

## 🚀 Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with responsive design

### Backend
- **ASP.NET Core Web API** - .NET 8.0 web framework
- **Entity Framework Core** - Object-relational mapping (ORM)
- **SQLite** - Lightweight database for development
- **Swagger/OpenAPI** - API documentation and testing

## 📁 Project Structure

```
todo/
├── backend/           # ASP.NET Core Web API
│   └── TodoApi/      # Main API project
├── frontend/         # React.js application
├── README.md         # Project documentation
└── package.json      # Root package.json for development scripts
```

## 🛠️ Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd todo
```

### 2. Install dependencies
```bash
# Install root dependencies for development scripts
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Restore backend dependencies
cd backend/TodoApi
dotnet restore
cd ../..
```

### 3. Run the application
```bash
# Run both frontend and backend concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend API (runs on https://localhost:7001)
cd backend/TodoApi
dotnet run

# Terminal 2 - Frontend (runs on http://localhost:5173)
cd frontend
npm run dev
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: https://localhost:7001/swagger
- **API Base URL**: https://localhost:7001/api

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/todos` | Get all todos |
| GET    | `/api/todos/{id}` | Get todo by ID |
| POST   | `/api/todos` | Create new todo |
| PUT    | `/api/todos/{id}` | Update todo |
| DELETE | `/api/todos/{id}` | Delete todo |

## 🎯 Features

- ✅ Create new todos
- ✅ View all todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Error handling
- ✅ Loading states

## 🧪 Development

### Backend Development
```bash
cd backend/TodoApi
dotnet watch run  # Hot reload enabled
```

### Frontend Development
```bash
cd frontend
npm run dev  # Hot reload enabled
```

### Database Migrations
```bash
cd backend/TodoApi
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## 🚀 Deployment

### Backend
- Can be deployed to Azure App Service, IIS, or any .NET hosting provider
- Configure connection string for production database

### Frontend
- Can be deployed to Netlify, Vercel, or any static hosting provider
- Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

