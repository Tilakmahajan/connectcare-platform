import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Video, 
  FileText, 
  Shield, 
  Clock, 
  Users,
  ArrowRight,
  Play
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-telemedicine.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Easy Appointment Booking',
      description: 'Schedule consultations with top doctors at your convenience'
    },
    {
      icon: Video,
      title: 'HD Video Consultations',
      description: 'High-quality, secure video calls with healthcare professionals'
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Receive and manage prescriptions digitally with complete history'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption ensures your medical data stays protected'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access healthcare services anytime, anywhere you need them'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Connect with licensed, verified healthcare professionals'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Patients' },
    { number: '1,200+', label: 'Certified Doctors' },
    { number: '500,000+', label: 'Consultations' },
    { number: '4.9/5', label: 'Patient Rating' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <span className="text-xl font-bold text-foreground">TeleMed</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <Link to="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-medical">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Healthcare at Your
                <span className="text-transparent bg-clip-text bg-gradient-hero block">
                  Fingertips
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Connect with certified doctors instantly. Get consultations, prescriptions, 
                and medical advice from the comfort of your home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="btn-medical text-lg px-8 py-4"
                  onClick={() => navigate('/signup?role=patient')}
                >
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-outline-medical text-lg px-8 py-4"
                  onClick={() => navigate('/signup?role=doctor')}
                >
                  Join as Doctor
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start mt-8 space-x-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-glow">
                <img 
                  src={heroImage} 
                  alt="Telemedicine consultation" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white/90 hover:bg-white text-primary rounded-full p-6"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-accent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose TeleMed?
            </h2>
            <p className="text-xl text-muted-foreground">
              We're revolutionizing healthcare with cutting-edge technology and 
              personalized care that puts you first.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-medical-hover h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of patients and doctors who trust TeleMed for their healthcare needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-medical text-lg px-12 py-4"
                onClick={() => navigate('/signup?role=patient')}
              >
                Start as Patient
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                className="btn-secondary-medical text-lg px-12 py-4"
                onClick={() => navigate('/signup?role=doctor')}
              >
                Join as Doctor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <span className="text-xl font-bold">TeleMed</span>
          </div>
          <p className="text-background/70">
            © 2024 TeleMed. All rights reserved. Revolutionizing healthcare, one consultation at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;