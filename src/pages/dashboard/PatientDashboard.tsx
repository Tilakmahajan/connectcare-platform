import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { DoctorSearch } from '@/components/search/DoctorSearch';
import { AppointmentBooking } from '@/components/appointments/AppointmentBooking';
import { VideoConsultation } from '@/components/video/VideoConsultation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  User,
  Plus,
  Video,
  Clock,
  Download,
  Search,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const mockAppointments = [
  {
    id: '1',
    doctor: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    type: 'video',
    symptoms: 'Chest pain and shortness of breath'
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    date: '2024-01-12',
    time: '2:30 PM',
    status: 'completed',
    type: 'video',
    symptoms: 'Skin rash consultation'
  }
];

const mockPrescriptions = [
  {
    id: '1',
    doctor: 'Dr. Sarah Wilson',
    medication: 'Lisinopril 10mg',
    dosage: 'Once daily',
    duration: '30 days',
    date: '2024-01-10',
    status: 'active'
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    medication: 'Hydrocortisone Cream 1%',
    dosage: 'Apply twice daily',
    duration: '14 days',
    date: '2024-01-08',
    status: 'completed'
  }
];

const mockDoctors = [
  { id: '1', name: 'Dr. Sarah Wilson', specialization: 'Cardiology', rating: 4.9, price: '$150' },
  { id: '2', name: 'Dr. Michael Chen', specialization: 'Dermatology', rating: 4.8, price: '$120' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', rating: 4.9, price: '$130' },
  { id: '4', name: 'Dr. David Kim', specialization: 'Neurology', rating: 4.7, price: '$180' }
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Dashboard', href: '/patient', icon: LayoutDashboard },
    { name: 'Find Doctors', href: '/patient/find-doctors', icon: Stethoscope },
    { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
    { name: 'Prescriptions', href: '/patient/prescriptions', icon: FileText },
    { name: 'Profile', href: '/patient/profile', icon: User }
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
          title="Upcoming Appointments"
          value="3"
          description="This week"
          icon={Calendar}
          trend="up"
          trendValue="1"
        />
        <StatCard
          title="Active Prescriptions"
          value="2"
          description="Current medications"
          icon={FileText}
          trend="neutral"
        />
        <StatCard
          title="Total Consultations"
          value="12"
          description="All time"
          icon={Video}
          trend="up"
          trendValue="2 this month"
        />
        <StatCard
          title="Health Score"
          value="8.5/10"
          description="Based on recent visits"
          icon={User}
          trend="up"
          trendValue="0.5"
        />
      </div>

      {/* Quick Actions */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your healthcare needs efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/patient/find-doctors">
              <Button className="btn-medical w-full h-20 flex-col space-y-2">
                <Plus className="w-6 h-6" />
                <span>Find & Book Doctor</span>
              </Button>
            </Link>
            <Button className="btn-secondary-medical w-full h-20 flex-col space-y-2">
              <Video className="w-6 h-6" />
              <span>Start Consultation</span>
            </Button>
            <Link to="/patient/prescriptions">
              <Button variant="outline" className="btn-outline-medical w-full h-20 flex-col space-y-2">
                <Download className="w-6 h-6" />
                <span>Download Prescription</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Your latest consultations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{appointment.doctor}</p>
                  <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                  <p className="text-sm text-muted-foreground">{appointment.date} at {appointment.time}</p>
                </div>
                <Badge className={`${
                  appointment.status === 'confirmed' ? 'badge-success' :
                  appointment.status === 'completed' ? 'badge-pending' :
                  'badge-warning'
                }`}>
                  {appointment.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Active Prescriptions</CardTitle>
            <CardDescription>Current medications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPrescriptions.filter(p => p.status === 'active').map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{prescription.medication}</p>
                  <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                  <p className="text-sm text-muted-foreground">Duration: {prescription.duration}</p>
                </div>
                <Badge className="badge-success">Active</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FindDoctorsPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleSelectDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const handleBookingComplete = (appointmentData: any) => {
    setShowBooking(false);
    setSelectedDoctor(null);
    // In real app, you'd update the appointments list
  };

  const handleBackToSearch = () => {
    setShowBooking(false);
    setSelectedDoctor(null);
  };

  if (showBooking && selectedDoctor) {
    return (
      <AppointmentBooking
        doctor={selectedDoctor}
        onBack={handleBackToSearch}
        onBookingComplete={handleBookingComplete}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Find Doctors</h2>
        <p className="text-muted-foreground">
          Search and book appointments with certified healthcare professionals
        </p>
      </div>

      <DoctorSearch onSelectDoctor={handleSelectDoctor} />
    </div>
  );
};

const AppointmentsPage = () => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<any>(null);

  const handleJoinCall = (appointment: any) => {
    setActiveAppointment(appointment);
    setShowVideoCall(true);
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
    setActiveAppointment(null);
  };

  if (showVideoCall && activeAppointment) {
    return (
      <VideoConsultation
        doctor={{
          id: '1',
          name: activeAppointment.doctor,
          specialization: activeAppointment.specialization,
        }}
        onEndCall={handleEndCall}
        isDoctor={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Appointments</h2>
        <Link to="/patient/find-doctors">
          <Button className="btn-medical">
            <Plus className="w-4 h-4 mr-2" />
            Book New Appointment
          </Button>
        </Link>
      </div>

      {/* Appointments List */}
      <div className="grid gap-4">
        {mockAppointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="card-medical">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{appointment.doctor}</h3>
                    <p className="text-primary font-medium">{appointment.specialization}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center">
                        <Video className="w-4 h-4 mr-1" />
                        {appointment.type} consultation
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${
                      appointment.status === 'confirmed' ? 'badge-success' :
                      appointment.status === 'completed' ? 'badge-pending' :
                      'badge-warning'
                    }`}>
                      {appointment.status}
                    </Badge>
                    {appointment.status === 'confirmed' && (
                      <Button 
                        size="sm" 
                        className="btn-medical"
                        onClick={() => handleJoinCall(appointment)}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Join Call
                      </Button>
                    )}
                  </div>
                </div>
                
                {appointment.symptoms && (
                  <div className="bg-accent p-3 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">Reason for visit:</p>
                    <p className="text-sm text-muted-foreground">{appointment.symptoms}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PrescriptionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Prescriptions</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search prescriptions..." className="input-medical pl-10 w-64" />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {mockPrescriptions.map((prescription) => (
          <Card key={prescription.id} className="card-medical">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{prescription.medication}</h3>
                  <p className="text-muted-foreground">Prescribed by {prescription.doctor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${
                    prescription.status === 'active' ? 'badge-success' : 'badge-pending'
                  }`}>
                    {prescription.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="btn-outline-medical">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Dosage</p>
                  <p className="text-muted-foreground">{prescription.dosage}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Duration</p>
                  <p className="text-muted-foreground">{prescription.duration}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Date Issued</p>
                  <p className="text-muted-foreground">{prescription.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Profile Settings</h2>
      
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" className="input-medical" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Patient" className="input-medical" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="patient@test.com" className="input-medical" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue="+1234567890" className="input-medical" />
          </div>
          
          <Button className="btn-medical">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const PatientDashboard = () => {
  return (
    <DashboardLayout sidebar={<Sidebar />} title="Patient Dashboard">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/find-doctors" element={<FindDoctorsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default PatientDashboard;