# 🌱 ReWear - Sustainable Fashion Exchange Platform

> **Transforming wardrobes, reducing waste, building community**

ReWear is a comprehensive web-based platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. Our mission is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.

![ReWear Platform](https://via.placeholder.com/800x400/2E7D32/FFFFFF?text=ReWear+Platform)

## ✨ Features

### 🔐 **User Authentication & Onboarding**
- Secure email/password signup and login
- User profile management with points tracking
- Role-based access control (User/Admin)

### 🏠 **Landing Page**
- Compelling platform introduction
- Interactive hero section with animations
- Featured items carousel
- Clear calls-to-action: "Start Swapping", "Browse Items", "List an Item"

### 👤 **User Dashboard**
- Comprehensive profile management
- Real-time points balance tracking
- Uploaded items overview and management
- Ongoing and completed swaps tracking
- Activity history and statistics

### 🛍️ **Item Management**
- **Browse Items**: Advanced filtering and search functionality
- **Item Detail Page**: 
  - High-quality image gallery
  - Detailed item descriptions
  - Uploader information
  - Swap request and point redemption options
  - Item availability status
- **Add New Item**: 
  - Multi-step form with image upload
  - Comprehensive item details (category, size, condition, tags)
  - Item submission and approval workflow

### 🔄 **Core Exchange Features**
- **Direct Swaps**: Person-to-person clothing exchanges
- **Point-Based System**: Earn points by listing items, redeem for items you want
- **Swap Management**: Request, approve, and track exchanges
- **Real-time Notifications**: Stay updated on swap requests and approvals

### 👑 **Admin Panel**
- **Content Moderation**: Approve/reject item listings
- **User Management**: Monitor and manage platform users
- **Analytics Dashboard**: Platform health and usage statistics
- **Spam Protection**: Remove inappropriate or spam items

### 📱 **Technical Excellence**
- **Mobile-Responsive Design**: Optimized for all devices
- **Modern UI/UX**: Beautiful interface with smooth animations
- **Real-Time Updates**: Live data synchronization
- **Error Handling**: Comprehensive error management and user feedback
- **Form Validation**: Client and server-side validation
- **Accessibility**: WCAG compliance for inclusive design

## 🏗️ Architecture

### **Frontend (React.js)**
```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   └── AdminRoute.js
│   ├── pages/            # Main application pages
│   │   ├── LandingPage.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Browse.js
│   │   ├── ItemDetail.js
│   │   ├── AddItem.js
│   │   ├── AdminPanel.js
│   │   └── Profile.js
│   ├── contexts/         # React Context for state management
│   │   └── AuthContext.js
│   ├── services/         # API and Firebase services
│   │   ├── firebase.js
│   │   └── api.js
│   ├── utils/           # Utilities and sample data
│   │   └── sampleData.js
│   └── App.js           # Main application component
```

### **Backend (Spring Boot)**
```
backend/
├── src/main/java/com/rewear/
│   ├── controller/      # REST API controllers
│   ├── service/         # Business logic services
│   ├── repository/      # Data access layer
│   ├── model/          # Entity models
│   ├── dto/            # Data transfer objects
│   ├── config/         # Configuration classes
│   └── security/       # Security and authentication
└── src/main/resources/
    └── application.yml  # Application configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Java** (v21 or higher)
- **Maven** (v3.6 or higher)
- **Git**

### 🎯 Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd rewear-platform
```

2. **Start the Backend**
```bash
cd backend
./mvnw spring-boot:run
```
Backend will be available at: http://localhost:8080

3. **Start the Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm start
```
Frontend will be available at: http://localhost:3000

### 🔧 Detailed Setup

#### Backend Setup
```bash
cd backend

# Install dependencies
./mvnw clean install

# Run the application
./mvnw spring-boot:run

# Or build and run JAR
./mvnw clean package
java -jar target/rewear-backend-1.0.0.jar
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### 🗄️ Database Configuration

**Development (H2 In-Memory)**
- Automatically configured
- Access H2 Console: http://localhost:8080/api/h2-console
- JDBC URL: `jdbc:h2:mem:rewear_db`
- Username: `sa`
- Password: `password`

**Production (PostgreSQL)**
Set environment variables:
```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/rewear_prod
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
```

## 🌟 Key Features Showcase

### **💫 Modern UI/UX**
- Material-UI design system
- Framer Motion animations
- Responsive grid layouts
- Intuitive navigation flow

### **🔄 Real-Time Features**
- Live swap notifications
- Real-time item updates
- Dynamic point tracking
- Instant messaging

### **📊 Data Visualization**
- User statistics dashboard
- Admin analytics panels
- Progress tracking
- Activity timelines

### **🛡️ Security**
- JWT authentication
- Firebase integration
- Role-based access control
- Input validation and sanitization

### **📱 Mobile Optimization**
- Responsive breakpoints
- Touch-friendly interfaces
- Mobile-first design
- Progressive Web App capabilities

## 🎨 Sample Data

The platform includes comprehensive sample data for demonstration:
- **6 Featured Items** with high-quality images
- **3 Sample Users** (including admin)
- **2 Sample Swaps** showing different statuses
- **Multiple Categories** and item types
- **Realistic Point Values** for redemption

## 🔧 Configuration

### Environment Variables
```bash
# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Email Configuration
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# Database (Production)
DATABASE_URL=your_database_url
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### Application Properties
Key configurations in `application.yml`:
- **CORS Settings**: Frontend URL allowlist
- **File Upload**: Maximum size and storage location
- **Points System**: Welcome bonus and reward amounts
- **Security**: JWT expiration and Firebase settings

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
./mvnw test
```

## 📈 Performance & Scalability

- **Optimized Bundle Size**: Code splitting and lazy loading
- **Database Indexing**: Optimized queries for large datasets
- **Caching Strategy**: Redis integration ready
- **CDN Support**: Image and asset optimization
- **Horizontal Scaling**: Stateless architecture

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Write comprehensive tests
- Update documentation
- Ensure mobile responsiveness

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Items Endpoints
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/{id}` - Get specific item
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

### Swaps Endpoints
- `GET /api/swaps` - Get user's swaps
- `POST /api/swaps` - Create swap request
- `PUT /api/swaps/{id}/accept` - Accept swap
- `PUT /api/swaps/{id}/reject` - Reject swap

### Admin Endpoints
- `GET /api/admin/items/pending` - Get pending items
- `PUT /api/admin/items/{id}/approve` - Approve item
- `PUT /api/admin/items/{id}/reject` - Reject item
- `GET /api/admin/stats` - Get platform statistics

## 🌍 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend Deployment (Heroku/AWS)
```bash
cd backend
./mvnw clean package
# Deploy target/rewear-backend-1.0.0.jar
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 📊 Monitoring & Analytics

- **Health Checks**: `/api/actuator/health`
- **Metrics**: `/api/actuator/metrics`
- **Logging**: Structured logging with different levels
- **Error Tracking**: Comprehensive error handling

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic swap functionality
- ✅ Point system implementation
- ✅ Admin panel
- ✅ Mobile responsiveness

### Phase 2 (Next)
- 🔄 Real-time messaging
- 🔄 Advanced search filters
- 🔄 Social features (reviews, ratings)
- 🔄 Integration with shipping APIs

### Phase 3 (Future)
- 📱 Mobile app (React Native)
- 🤖 AI-powered recommendations
- 🌍 Multi-language support
- 💳 Payment integration

## 📞 Support

For support and questions:
- 📧 Email: support@rewear.com
- 💬 Discord: ReWear Community
- 📖 Documentation: /docs
- 🐛 Issues: GitHub Issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Built with ❤️ for a sustainable future</strong>
  <br>
  <sub>Reducing textile waste, one swap at a time</sub>
</div>