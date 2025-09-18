import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  User,
  Video,
  Clock,
  Search,
  FileText,
  Upload,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const mockAppointments = [
  {
    id: '1',
    patient: 'John Patient',
    email: 'john@example.com',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    type: 'video',
    symptoms: 'Chest pain and shortness of breath'
  },
  {
    id: '2',
    patient: 'Jane Smith',
    email: 'jane@example.com',
    date: '2024-01-15',
    time: '11:30 AM',
    status: 'pending',
    type: 'video',
    symptoms: 'Regular checkup'
  },
  {
    id: '3',
    patient: 'Bob Wilson',
    email: 'bob@example.com',
    date: '2024-01-12',
    time: '2:30 PM',
    status: 'completed',
    type: 'video',
    symptoms: 'Follow-up consultation'
  }
];

const mockPatients = [
  {
    id: '1',
    name: 'John Patient',
    email: 'john@example.com',
    phone: '+1234567890',
    lastVisit: '2024-01-10',
    totalVisits: 5,
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    lastVisit: '2024-01-08',
    totalVisits: 3,
    status: 'active'
  }
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Dashboard', href: '/doctor', icon: LayoutDashboard },
    { name: 'Appointments', href: '/doctor/appointments', icon: Calendar },
    { name: 'Patients', href: '/doctor/patients', icon: Users },
    { name: 'Profile', href: '/doctor/profile', icon: User }
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
          title="Today's Appointments"
          value="5"
          description="2 pending approval"
          icon={Calendar}
          trend="up"
          trendValue="2"
        />
        <StatCard
          title="Total Patients"
          value="248"
          description="Active patients"
          icon={Users}
          trend="up"
          trendValue="12 this month"
        />
        <StatCard
          title="Consultations Today"
          value="3"
          description="Completed"
          icon={Video}
          trend="neutral"
        />
        <StatCard
          title="Average Rating"
          value="4.9"
          description="Based on 156 reviews"
          icon={User}
          trend="up"
          trendValue="0.2"
        />
      </div>

      {/* Quick Actions */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your practice efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/doctor/appointments">
              <Button className="btn-medical w-full h-20 flex-col space-y-2">
                <Calendar className="w-6 h-6" />
                <span>View Appointments</span>
              </Button>
            </Link>
            <Button className="btn-secondary-medical w-full h-20 flex-col space-y-2">
              <Video className="w-6 h-6" />
              <span>Start Consultation</span>
            </Button>
            <Link to="/doctor/patients">
              <Button variant="outline" className="btn-outline-medical w-full h-20 flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <span>Write Prescription</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAppointments.filter(apt => apt.date === '2024-01-15').map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{appointment.patient}</p>
                  <p className="text-sm text-muted-foreground">{appointment.symptoms}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${
                    appointment.status === 'confirmed' ? 'badge-success' :
                    appointment.status === 'pending' ? 'badge-warning' :
                    'badge-pending'
                  }`}>
                    {appointment.status}
                  </Badge>
                  {appointment.status === 'confirmed' && (
                    <Button size="sm" className="btn-medical">
                      <Video className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Latest patient interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPatients.slice(0, 3).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                  <p className="text-sm text-muted-foreground">Last visit: {patient.lastVisit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{patient.totalVisits} visits</p>
                  <Badge className="badge-success">Active</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AppointmentsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredAppointments = selectedStatus === 'all' 
    ? mockAppointments 
    : mockAppointments.filter(apt => apt.status === selectedStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Appointments</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search appointments..." className="input-medical pl-10 w-64" />
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex items-center space-x-2">
        <Button 
          variant={selectedStatus === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedStatus('all')}
          className={selectedStatus === 'all' ? 'btn-medical' : 'btn-outline-medical'}
        >
          All
        </Button>
        <Button 
          variant={selectedStatus === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedStatus('pending')}
          className={selectedStatus === 'pending' ? 'btn-medical' : 'btn-outline-medical'}
        >
          Pending
        </Button>
        <Button 
          variant={selectedStatus === 'confirmed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedStatus('confirmed')}
          className={selectedStatus === 'confirmed' ? 'btn-medical' : 'btn-outline-medical'}
        >
          Confirmed
        </Button>
        <Button 
          variant={selectedStatus === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedStatus('completed')}
          className={selectedStatus === 'completed' ? 'btn-medical' : 'btn-outline-medical'}
        >
          Completed
        </Button>
      </div>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="card-medical">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{appointment.patient}</h3>
                    <p className="text-muted-foreground">{appointment.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${
                      appointment.status === 'confirmed' ? 'badge-success' :
                      appointment.status === 'pending' ? 'badge-warning' :
                      appointment.status === 'completed' ? 'badge-pending' :
                      'badge-warning'
                    }`}>
                      {appointment.status}
                    </Badge>
                    {appointment.status === 'pending' && (
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="text-success border-success hover:bg-success hover:text-white">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {appointment.status === 'confirmed' && (
                      <Button size="sm" className="btn-medical">
                        <Video className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Date & Time</p>
                    <p className="text-muted-foreground">{appointment.date} at {appointment.time}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Type</p>
                    <p className="text-muted-foreground capitalize">{appointment.type} consultation</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reason</p>
                    <p className="text-muted-foreground">{appointment.symptoms}</p>
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

const PatientsPage = () => {
  const [prescriptionForm, setPrescriptionForm] = useState({
    patient: '',
    medication: '',
    dosage: '',
    duration: '',
    instructions: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Patients</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search patients..." className="input-medical pl-10 w-64" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Patients List */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>Manage your patients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPatients.map((patient) => (
              <div key={patient.id} className="p-4 bg-accent rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{patient.name}</h4>
                  <Badge className="badge-success">{patient.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p>Email: {patient.email}</p>
                    <p>Phone: {patient.phone}</p>
                  </div>
                  <div>
                    <p>Last visit: {patient.lastVisit}</p>
                    <p>Total visits: {patient.totalVisits}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" className="btn-outline-medical">
                    View History
                  </Button>
                  <Button size="sm" className="btn-medical">
                    <FileText className="w-4 h-4 mr-1" />
                    Prescribe
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Prescription Form */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Write Prescription</CardTitle>
            <CardDescription>Create a new prescription for your patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Select Patient</Label>
              <select 
                className="input-medical w-full"
                value={prescriptionForm.patient}
                onChange={(e) => setPrescriptionForm(prev => ({ ...prev, patient: e.target.value }))}
              >
                <option value="">Choose a patient</option>
                {mockPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication">Medication</Label>
              <Input
                id="medication"
                placeholder="Enter medication name"
                value={prescriptionForm.medication}
                onChange={(e) => setPrescriptionForm(prev => ({ ...prev, medication: e.target.value }))}
                className="input-medical"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 10mg twice daily"
                  value={prescriptionForm.dosage}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, dosage: e.target.value }))}
                  className="input-medical"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 30 days"
                  value={prescriptionForm.duration}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="input-medical"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Additional instructions for the patient..."
                value={prescriptionForm.instructions}
                onChange={(e) => setPrescriptionForm(prev => ({ ...prev, instructions: e.target.value }))}
                className="input-medical min-h-24"
              />
            </div>

            <div className="flex space-x-2">
              <Button className="btn-medical flex-1">
                Create Prescription
              </Button>
              <Button variant="outline" className="btn-outline-medical">
                <Upload className="w-4 h-4 mr-1" />
                Upload File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Doctor Profile</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>Update your professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Dr. Sarah" className="input-medical" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Wilson" className="input-medical" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" defaultValue="Cardiology" className="input-medical" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" defaultValue="MD12345" className="input-medical" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" defaultValue="15" className="input-medical" />
            </div>
            
            <Button className="btn-medical">Save Professional Info</Button>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Update your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="doctor@test.com" className="input-medical" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+1987654321" className="input-medical" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell patients about yourself..." 
                className="input-medical min-h-24"
                defaultValue="Board-certified cardiologist with 15 years of experience in treating heart conditions and preventive cardiovascular care."
              />
            </div>
            
            <Button className="btn-medical">Save Contact Info</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DoctorDashboard = () => {
  return (
    <DashboardLayout sidebar={<Sidebar />} title="Doctor Dashboard">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DoctorDashboard;