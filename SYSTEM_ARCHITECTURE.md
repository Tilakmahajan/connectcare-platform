# TeleMed Platform - System Architecture & Development Guide

## 🏗️ System Architecture Overview

### Frontend Architecture (React + Vite)
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components (DashboardLayout)
│   ├── search/          # DoctorSearch component
│   ├── video/           # VideoConsultation component
│   ├── appointments/    # AppointmentBooking component
│   └── dashboard/       # Dashboard-specific components
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── hooks/               # Custom React hooks
├── pages/              # Page components
│   ├── auth/           # Login/Signup pages
│   └── dashboard/      # Role-based dashboards
├── lib/                # Utility functions
└── assets/             # Static assets
```

### Backend Architecture (Recommended)
```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   │   ├── auth.js      # Authentication
│   │   ├── appointments.js
│   │   ├── users.js
│   │   └── video.js     # Video call management
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js      # JWT verification
│   │   └── roles.js     # Role-based access
│   ├── models/          # Database models
│   │   ├── User.js
│   │   ├── Appointment.js
│   │   └── Prescription.js
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   │   ├── emailService.js
│   │   ├── videoService.js
│   │   └── paymentService.js
│   └── utils/           # Utility functions
├── config/              # Configuration files
└── uploads/             # File uploads
```

## 🛠️ Recommended Tech Stack

### Frontend (Current Implementation)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context + useState/useReducer
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **HTTP Client**: Fetch API or Axios
- **Form Handling**: React Hook Form + Zod validation

### Backend Options

#### Option 1: Node.js + Express (Recommended)
```javascript
// Example server structure
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
```

#### Option 2: Firebase Backend
- Firebase Authentication
- Firestore Database
- Cloud Functions
- Firebase Storage
- Firebase Hosting

### Database Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String, // hashed
  role: 'patient' | 'doctor' | 'admin',
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,
    dateOfBirth: Date,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  // Doctor-specific fields
  doctorInfo: {
    specialization: String,
    licenseNumber: String,
    experience: Number,
    education: String,
    bio: String,
    consultationFee: Number,
    availableHours: [String],
    isApproved: Boolean,
    rating: Number,
    totalReviews: Number
  },
  // Patient-specific fields
  patientInfo: {
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    medicalHistory: [String],
    allergies: [String],
    currentMedications: [String]
  },
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean
}
```

#### Appointments Collection
```javascript
{
  _id: ObjectId,
  patient: ObjectId, // ref to Users
  doctor: ObjectId,  // ref to Users
  appointmentDate: Date,
  appointmentTime: String,
  duration: Number, // in minutes
  type: 'video' | 'chat' | 'phone',
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  symptoms: String,
  urgency: 'normal' | 'urgent' | 'emergency',
  patientNotes: String,
  doctorNotes: String,
  prescription: {
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }],
    diagnosis: String,
    nextAppointment: Date
  },
  payment: {
    amount: Number,
    status: 'pending' | 'completed' | 'failed',
    transactionId: String,
    paymentMethod: String
  },
  videoCall: {
    roomId: String,
    startTime: Date,
    endTime: Date,
    recording: String // URL if recorded
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Prescriptions Collection
```javascript
{
  _id: ObjectId,
  appointment: ObjectId, // ref to Appointments
  patient: ObjectId,
  doctor: ObjectId,
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String,
    quantity: Number
  }],
  diagnosis: String,
  notes: String,
  status: 'active' | 'completed' | 'discontinued',
  issuedDate: Date,
  expiryDate: Date,
  createdAt: Date
}
```

## 🎥 Video Consultation Integration

### Option 1: WebRTC (Most Control)
```javascript
// Example WebRTC implementation
const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
});

// Get user media
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});

// Add stream to peer connection
stream.getTracks().forEach(track => {
  peerConnection.addTrack(track, stream);
});
```

### Option 2: Twilio Video (Recommended)
```javascript
import { connect } from 'twilio-video';

const room = await connect('access-token', {
  name: 'appointment-room-123',
  audio: true,
  video: true
});

// Handle participant events
room.on('participantConnected', participant => {
  console.log(`${participant.identity} connected`);
});
```

### Option 3: Agora.io
- Easy integration
- Good documentation
- Built-in recording
- Screen sharing support

## 📱 Step-by-Step Development Plan

### Phase 1: Core Setup (Week 1-2)
1. **Environment Setup**
   - Set up React + Vite project ✅
   - Configure Tailwind CSS + shadcn/ui ✅
   - Set up routing with React Router ✅

2. **Authentication System**
   - Implement login/signup UI ✅
   - Add Firebase Authentication or JWT
   - Create protected routes ✅
   - Implement role-based access ✅

### Phase 2: User Management (Week 3-4)
3. **User Profiles**
   - Patient profile management ✅
   - Doctor profile with specialization ✅
   - Admin user management ✅

4. **Database Integration**
   - Set up MongoDB/Firestore
   - Create user models
   - Implement CRUD operations

### Phase 3: Core Features (Week 5-8)
5. **Doctor Discovery**
   - Doctor search and filtering ✅
   - Specialization categorization ✅
   - Rating and review system

6. **Appointment System**
   - Appointment booking flow ✅
   - Calendar integration
   - Appointment management ✅
   - Email/SMS notifications

### Phase 4: Communication (Week 9-12)
7. **Video Consultation**
   - WebRTC/Twilio integration ✅ (UI ready)
   - Screen sharing capability
   - Chat during video calls ✅
   - Call recording (optional)

8. **Real-time Chat**
   - Socket.io integration
   - Message history
   - File sharing

### Phase 5: Medical Records (Week 13-16)
9. **Prescription Management**
   - Digital prescription creation ✅
   - Prescription history ✅
   - PDF generation
   - Pharmacy integration

10. **Medical Records**
    - Patient history tracking
    - Document upload/storage
    - Medical imaging support

### Phase 6: Advanced Features (Week 17-20)
11. **Payment Integration**
    - Stripe/PayPal integration ✅ (UI ready)
    - Consultation fee management
    - Billing and invoicing

12. **Analytics & Reporting**
    - Admin dashboard analytics ✅
    - Doctor performance metrics
    - Patient engagement tracking

## 🔧 Implementation Tips

### 1. Authentication Flow
```javascript
// Example auth context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    // Implement login logic
  };

  const signup = async (userData) => {
    // Implement signup logic
  };

  const logout = () => {
    // Implement logout logic
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. API Integration
```javascript
// API service example
class APIService {
  constructor() {
    this.baseURL = 'http://localhost:3001/api';
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
```

### 3. Real-time Updates
```javascript
// Socket.io integration
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

// Listen for appointment updates
socket.on('appointmentUpdate', (data) => {
  // Update UI accordingly
  setAppointments(prev => 
    prev.map(apt => apt.id === data.id ? data : apt)
  );
});

// Emit appointment booking
socket.emit('bookAppointment', appointmentData);
```

## 🚀 Deployment Strategy

### Frontend Deployment
- **Vercel** (Recommended): Easy deployment, automatic previews
- **Netlify**: Great for static sites, form handling
- **AWS S3 + CloudFront**: Scalable, cost-effective

### Backend Deployment
- **Railway**: Simple, modern deployment
- **Render**: Easy to use, good free tier
- **Heroku**: Traditional choice, many addons
- **AWS EC2/ECS**: Full control, scalable

### Database Hosting
- **MongoDB Atlas**: Managed MongoDB
- **Firebase Firestore**: Serverless, real-time
- **PlanetScale**: Modern MySQL platform

## 🔒 Security Considerations

1. **Authentication & Authorization**
   - JWT token management
   - Role-based access control
   - Password hashing (bcrypt)

2. **Data Protection**
   - HIPAA compliance considerations
   - End-to-end encryption for video calls
   - Secure file storage

3. **API Security**
   - Rate limiting
   - Input validation
   - CORS configuration
   - SQL injection prevention

## 📊 Performance Optimization

1. **Frontend**
   - Code splitting with React.lazy()
   - Image optimization
   - Caching strategies

2. **Backend**
   - Database indexing
   - Connection pooling
   - Response compression

This architecture provides a solid foundation for your telemedicine platform while being scalable and maintainable. Start with the core features and gradually add more complex functionality as you progress!