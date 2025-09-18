import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Calendar,
  Filter,
  Video,
  MessageSquare
} from 'lucide-react';

// Mock doctors data
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    rating: 4.9,
    reviews: 234,
    experience: 15,
    location: 'New York, NY',
    availableToday: true,
    consultationFee: 150,
    avatar: '/api/placeholder/100/100',
    languages: ['English', 'Spanish'],
    education: 'Harvard Medical School',
    nextAvailable: '2:00 PM Today'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    rating: 4.8,
    reviews: 189,
    experience: 12,
    location: 'Los Angeles, CA',
    availableToday: true,
    consultationFee: 120,
    avatar: '/api/placeholder/100/100',
    languages: ['English', 'Mandarin'],
    education: 'Stanford University',
    nextAvailable: '4:30 PM Today'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    rating: 4.9,
    reviews: 312,
    experience: 18,
    location: 'Chicago, IL',
    availableToday: false,
    consultationFee: 130,
    avatar: '/api/placeholder/100/100',
    languages: ['English', 'Spanish'],
    education: 'Johns Hopkins University',
    nextAvailable: 'Tomorrow 9:00 AM'
  },
  {
    id: '4',
    name: 'Dr. David Kim',
    specialization: 'Neurology',
    rating: 4.7,
    reviews: 156,
    experience: 20,
    location: 'Boston, MA',
    availableToday: true,
    consultationFee: 180,
    avatar: '/api/placeholder/100/100',
    languages: ['English', 'Korean'],
    education: 'MIT Medical',
    nextAvailable: '6:00 PM Today'
  },
  {
    id: '5',
    name: 'Dr. Anna Thompson',
    specialization: 'Psychiatry',
    rating: 4.8,
    reviews: 278,
    experience: 14,
    location: 'Seattle, WA',
    availableToday: true,
    consultationFee: 160,
    avatar: '/api/placeholder/100/100',
    languages: ['English'],
    education: 'University of Washington',
    nextAvailable: '1:00 PM Today'
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    rating: 4.6,
    reviews: 203,
    experience: 16,
    location: 'Miami, FL',
    availableToday: false,
    consultationFee: 170,
    avatar: '/api/placeholder/100/100',
    languages: ['English', 'Spanish'],
    education: 'University of Miami',
    nextAvailable: 'Tomorrow 10:30 AM'
  }
];

const specializations = [
  'All Specializations',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Neurology',
  'Psychiatry',
  'Orthopedics',
  'General Practice',
  'Endocrinology',
  'Gastroenterology',
  'Oncology',
  'Radiology'
];

interface DoctorSearchProps {
  onSelectDoctor?: (doctor: any) => void;
  showBookingButton?: boolean;
}

export const DoctorSearch: React.FC<DoctorSearchProps> = ({ 
  onSelectDoctor, 
  showBookingButton = true 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [availableToday, setAvailableToday] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const filteredDoctors = useMemo(() => {
    let filtered = mockDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialization = selectedSpecialization === 'All Specializations' ||
                                   doctor.specialization === selectedSpecialization;
      const matchesAvailability = !availableToday || doctor.availableToday;
      
      return matchesSearch && matchesSpecialization && matchesAvailability;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price-low':
          return a.consultationFee - b.consultationFee;
        case 'price-high':
          return b.consultationFee - a.consultationFee;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedSpecialization, availableToday, sortBy]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="card-medical">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors or specializations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-medical pl-10"
              />
            </div>

            {/* Specialization Filter */}
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="input-medical">
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="input-medical">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Available Today Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="availableToday"
                checked={availableToday}
                onChange={(e) => setAvailableToday(e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="availableToday" className="text-sm font-medium text-foreground">
                Available Today
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
        </p>
        <Button variant="outline" size="sm" className="btn-outline-medical">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-6">
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="card-medical-hover">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {getInitials(doctor.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {doctor.name}
                          </h3>
                          {doctor.availableToday && (
                            <Badge className="badge-success">Available Today</Badge>
                          )}
                        </div>
                        
                        <p className="text-primary font-medium mb-1">{doctor.specialization}</p>
                        <p className="text-sm text-muted-foreground mb-2">{doctor.education}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-warning text-warning" />
                            <span className="font-medium">{doctor.rating}</span>
                            <span>({doctor.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{doctor.experience} years exp.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{doctor.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>

                    {/* Next Available */}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Next available:</span>
                      <span className="font-medium text-foreground">{doctor.nextAvailable}</span>
                    </div>
                  </div>

                  {/* Booking Section */}
                  <div className="lg:w-72 border-l lg:border-l border-border pl-6">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        ${doctor.consultationFee}
                      </div>
                      <div className="text-sm text-muted-foreground">per consultation</div>
                    </div>

                    {showBookingButton && (
                      <div className="space-y-3">
                        <Button 
                          className="btn-medical w-full"
                          onClick={() => onSelectDoctor?.(doctor)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="btn-outline-medical"
                          >
                            <Video className="w-4 h-4 mr-1" />
                            Video Call
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="btn-outline-medical"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card className="card-medical">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No doctors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all available doctors.
            </p>
            <Button 
              className="btn-medical mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialization('All Specializations');
                setAvailableToday(false);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};