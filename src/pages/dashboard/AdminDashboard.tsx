import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus,
  Settings,
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  Activity,
  TrendingUp,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const mockStats = {
  totalPatients: 1250,
  totalDoctors: 89,
  pendingDoctors: 5,
  totalAppointments: 3421,
  monthlyGrowth: 12.5,
  activeConsultations: 23
};

const mockPendingDoctors = [
  {
    id: '1',
    name: 'Dr. Michael Johnson',
    email: 'michael.johnson@example.com',
    specialization: 'Orthopedics',
    licenseNumber: 'MD67890',
    experience: '12 years',
    applicationDate: '2024-01-10',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Dr. Lisa Chen',
    email: 'lisa.chen@example.com',
    specialization: 'Pediatrics',
    licenseNumber: 'MD54321',
    experience: '8 years',
    applicationDate: '2024-01-12',
    status: 'pending'
  }
];

const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@example.com',
    specialization: 'Cardiology',
    licenseNumber: 'MD12345',
    status: 'active',
    patients: 156,
    rating: 4.9,
    joinDate: '2023-06-15'
  },
  {
    id: '2',
    name: 'Dr. Robert Davis',
    email: 'robert.davis@example.com',
    specialization: 'Dermatology',
    licenseNumber: 'MD98765',
    status: 'active',
    patients: 203,
    rating: 4.7,
    joinDate: '2023-08-22'
  }
];

const mockPatients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1234567890',
    joinDate: '2023-12-01',
    lastVisit: '2024-01-08',
    totalVisits: 5,
    status: 'active'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+1987654321',
    joinDate: '2023-11-15',
    lastVisit: '2024-01-05',
    totalVisits: 3,
    status: 'active'
  }
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Doctor Approvals', href: '/admin/approvals', icon: UserPlus },
    { name: 'Manage Doctors', href: '/admin/doctors', icon: Users },
    { name: 'Manage Patients', href: '/admin/patients', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings }
  ];

  return (
    <nav className="p-6 space-y-2">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            currentPath === item.href
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="font-medium">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={mockStats.totalPatients.toLocaleString()}
          description="Registered users"
          icon={Users}
          trend="up"
          trendValue={`+${mockStats.monthlyGrowth}%`}
        />
        <StatCard
          title="Active Doctors"
          value={mockStats.totalDoctors}
          description={`${mockStats.pendingDoctors} pending approval`}
          icon={Shield}
          trend="up"
          trendValue="5 this month"
        />
        <StatCard
          title="Total Appointments"
          value={mockStats.totalAppointments.toLocaleString()}
          description="All time"
          icon={Calendar}
          trend="up"
          trendValue="234 this month"
        />
        <StatCard
          title="Active Consultations"
          value={mockStats.activeConsultations}
          description="Currently ongoing"
          icon={Activity}
          trend="neutral"
        />
      </div>

      {/* Overview Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>Key metrics and performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
              <div>
                <p className="font-medium text-foreground">Monthly Growth</p>
                <p className="text-2xl font-bold text-success">+{mockStats.monthlyGrowth}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary-soft rounded-lg">
                <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                <p className="text-xl font-bold text-primary">96%</p>
              </div>
              <div className="text-center p-4 bg-secondary-soft rounded-lg">
                <p className="text-sm text-muted-foreground">Doctor Rating</p>
                <p className="text-xl font-bold text-secondary">4.8/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Pending Doctor Approvals</CardTitle>
            <CardDescription>Doctors waiting for verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPendingDoctors.slice(0, 3).map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  <p className="text-sm text-muted-foreground">Applied: {doctor.applicationDate}</p>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" className="text-success border-success hover:bg-success hover:text-white">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white">
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Link to="/admin/approvals">
              <Button className="btn-medical w-full">
                View All Pending Approvals
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New patient registration', user: 'John Smith', time: '5 minutes ago', type: 'patient' },
              { action: 'Doctor application submitted', user: 'Dr. Lisa Chen', time: '2 hours ago', type: 'doctor' },
              { action: 'Appointment completed', user: 'Emma Johnson', time: '4 hours ago', type: 'appointment' },
              { action: 'Doctor approved', user: 'Dr. Michael Brown', time: '1 day ago', type: 'approval' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-accent rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'patient' ? 'bg-primary' :
                  activity.type === 'doctor' ? 'bg-secondary' :
                  activity.type === 'appointment' ? 'bg-success' :
                  'bg-warning'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ApprovalsPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Doctor Approvals</h2>
        <Badge className="badge-warning">
          {mockPendingDoctors.length} Pending
        </Badge>
      </div>

      <div className="grid gap-6">
        {mockPendingDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="card-medical">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.email}</p>
                  </div>
                  <Badge className="badge-warning">Pending Review</Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Specialization</p>
                    <p className="text-muted-foreground">{doctor.specialization}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">License Number</p>
                    <p className="text-muted-foreground">{doctor.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Experience</p>
                    <p className="text-muted-foreground">{doctor.experience}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Applied on {doctor.applicationDate}
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="btn-outline-medical"
                    >
                      View Documents
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      className="btn-medical"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const DoctorsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Manage Doctors</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search doctors..." className="input-medical pl-10 w-64" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {mockDoctors.map((doctor) => (
          <Card key={doctor.id} className="card-medical">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-muted-foreground">{doctor.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="badge-success">{doctor.status}</Badge>
                  <Button size="sm" variant="outline" className="btn-outline-medical">
                    Edit
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Specialization</p>
                  <p className="text-muted-foreground">{doctor.specialization}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Patients</p>
                  <p className="text-muted-foreground">{doctor.patients}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Rating</p>
                  <p className="text-muted-foreground">{doctor.rating}/5</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Joined</p>
                  <p className="text-muted-foreground">{doctor.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const PatientsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Manage Patients</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search patients..." className="input-medical pl-10 w-64" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {mockPatients.map((patient) => (
          <Card key={patient.id} className="card-medical">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                  <p className="text-muted-foreground">{patient.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="badge-success">{patient.status}</Badge>
                  <Button size="sm" variant="outline" className="btn-outline-medical">
                    View Profile
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-muted-foreground">{patient.phone}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Total Visits</p>
                  <p className="text-muted-foreground">{patient.totalVisits}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Last Visit</p>
                  <p className="text-muted-foreground">{patient.lastVisit}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Joined</p>
                  <p className="text-muted-foreground">{patient.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Platform Settings</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure platform-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Platform Name</label>
              <Input defaultValue="TeleMed" className="input-medical" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Support Email</label>
              <Input defaultValue="support@telemed.com" className="input-medical" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Max Appointments per Day</label>
              <Input defaultValue="50" type="number" className="input-medical" />
            </div>
            
            <Button className="btn-medical">Save General Settings</Button>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Session Timeout (minutes)</label>
              <Input defaultValue="60" type="number" className="input-medical" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password Min Length</label>
              <Input defaultValue="8" type="number" className="input-medical" />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="twoFactor" defaultChecked className="rounded" />
              <label htmlFor="twoFactor" className="text-sm font-medium text-foreground">
                Require Two-Factor Authentication
              </label>
            </div>
            
            <Button className="btn-medical">Save Security Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <DashboardLayout sidebar={<Sidebar />} title="Admin Dashboard">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;