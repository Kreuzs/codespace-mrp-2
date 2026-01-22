# MRP II System - Enterprise Manufacturing Resource Planning

A modern, full-stack MRP II (Manufacturing Resource Planning) system built with a clean layered architecture, featuring a RESTful API and a responsive, aesthetic UI.

## 🏗️ Architecture

This system follows a **Domain-Driven Design (DDD)** approach with clear separation of concerns:

### Backend (Node.js + TypeScript + Express + PostgreSQL)

```
backend/
├── src/
│   ├── domain/              # Business logic & entities
│   │   ├── entities/        # Domain models (Product, WorkOrder, Inventory, etc.)
│   │   ├── repositories/    # Repository interfaces
│   │   └── services/        # Domain services
│   ├── application/         # Application logic
│   │   ├── dtos/           # Data Transfer Objects
│   │   └── services/       # Use cases & application services
│   ├── infrastructure/      # External concerns
│   │   ├── database/       # Database configuration & migrations
│   │   └── repositories/   # Repository implementations (TypeORM)
│   └── presentation/        # API layer
│       ├── controllers/    # Request handlers
│       ├── routes/         # Route definitions
│       └── middleware/     # Error handling, validation, etc.
```

### Frontend (React + TypeScript + Tailwind CSS)

```
frontend/
├── src/
│   ├── api/          # API client & service calls
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components (Dashboard, Products, etc.)
│   └── types/        # TypeScript type definitions
```

## ✨ Features

### Core MRP II Functionality

- **Product Management**: Complete product catalog with BOMs (Bill of Materials)
- **Work Order Management**: Production scheduling and tracking
- **Inventory Management**: Real-time stock tracking across multiple locations
- **Dashboard**: Key metrics and system overview

### Technical Features

- ✅ **Layered Architecture**: Clean separation between domain, application, infrastructure, and presentation layers
- ✅ **RESTful API**: Well-designed endpoints following REST principles
- ✅ **Strong Consistency**: PostgreSQL with TypeORM for reliable data transactions
- ✅ **Type Safety**: Full TypeScript coverage on both frontend and backend
- ✅ **Modern UI**: Responsive design with Tailwind CSS, smooth animations, and intuitive interactions
- ✅ **Enterprise-Ready**: Scalable architecture suitable for production use

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+

### Database Setup

1. Install and start PostgreSQL:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql
sudo service postgresql start

# macOS (with Homebrew)
brew install postgresql
brew services start postgresql
```

2. Create the database:
```bash
psql -U postgres
CREATE DATABASE mrp_system;
\q
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Work Orders
- `GET /api/work-orders` - List all work orders (with optional status filter)
- `GET /api/work-orders/:id` - Get work order by ID
- `POST /api/work-orders` - Create new work order
- `PUT /api/work-orders/:id` - Update work order
- `DELETE /api/work-orders/:id` - Delete work order

### Inventory
- `GET /api/inventory` - List all inventory items (with optional filters)
- `GET /api/inventory/:id` - Get inventory item by ID
- `POST /api/inventory` - Create new inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item

## 🗄️ Database Schema

### Core Entities

- **Products**: Product catalog with specifications and costing
- **Bill of Materials (BOM)**: Component relationships for manufactured products
- **Work Orders**: Production orders with scheduling and status tracking
- **Work Order Operations**: Detailed operation steps for work orders
- **Inventory Items**: Stock levels by product and location

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Aesthetic**: Clean, professional interface with smooth animations
- **Intuitive Navigation**: Sidebar navigation with clear visual feedback
- **Dashboard**: Real-time metrics and system overview
- **Data Tables**: Sortable, filterable tables with hover effects
- **Form Handling**: User-friendly forms with validation

## 🔒 Security Considerations

- Environment-based configuration (credentials not in code)
- Input validation on API endpoints
- CORS configuration for cross-origin requests
- TypeORM parameterized queries (SQL injection prevention)

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework
- **TypeORM** - ORM with TypeScript support
- **PostgreSQL** - Relational database
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## 📈 Scaling & Production

This foundation is designed to scale:

1. **Horizontal Scaling**: Stateless API design allows multiple backend instances
2. **Database**: PostgreSQL supports read replicas and connection pooling
3. **Caching**: Easy to add Redis for session/data caching
4. **Monitoring**: Add logging and metrics as needed
5. **CI/CD**: Structure supports Docker containerization

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev      # Start with hot reload
npm run build    # Build for production
npm start        # Run production build
```

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📝 Future Enhancements

Potential additions for production use:
- Authentication & authorization (JWT, OAuth)
- Advanced MRP calculations (capacity planning, demand forecasting)
- Reporting & analytics
- Export functionality (CSV, PDF)
- Real-time notifications (WebSockets)
- Audit logging
- Multi-language support
- Advanced search & filtering
- Role-based access control

## 📄 License

ISC

## 👥 Contributing

This is an enterprise-grade foundation designed to be extended. When contributing:
1. Maintain the layered architecture
2. Follow TypeScript best practices
3. Write clean, documented code
4. Ensure database migrations are reversible
5. Keep the UI consistent and accessible

---

Built with ❤️ for modern manufacturing
