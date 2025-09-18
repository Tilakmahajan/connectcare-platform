import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageSquare, 
  Star, 
  MapPin,
  ArrowLeft,
  Check,
  CreditCard,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  consultationFee: number;
  avatar?: string;
  location: string;
  nextAvailable: string;
}

interface AppointmentBookingProps {
  doctor: Doctor;
  onBack?: () => void;
  onBookingComplete?: (appointmentData: any) => void;
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
];

const appointmentTypes = [
  { id: 'video', name: 'Video Consultation', icon: Video, description: 'Face-to-face consultation via video call' },
  { id: 'chat', name: 'Text Consultation', icon: MessageSquare, description: 'Text-based consultation via chat' }
];

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  doctor,
  onBack,
  onBookingComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    type: 'video',
    symptoms: '',
    urgency: 'normal',
    patientNotes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack?.();
    }
  };

  const handleBookingSubmit = () => {
    // Mock booking submission
    const appointmentData = {
      id: Date.now().toString(),
      doctor,
      ...bookingData,
      status: 'confirmed',
      totalCost: doctor.consultationFee,
      bookingDate: new Date().toISOString()
    };

    toast({
      title: "Appointment Booked Successfully!",
      description: `Your ${bookingData.type} consultation with ${doctor.name} is confirmed for ${bookingData.date} at ${bookingData.time}.`,
    });

    onBookingComplete?.(appointmentData);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Select Date & Time</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    min={getMinDate()}
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                    className="input-medical"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={bookingData.time === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBookingData(prev => ({ ...prev, time }))}
                        className={bookingData.time === time ? 'btn-medical' : 'btn-outline-medical'}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Consultation Type</Label>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                {appointmentTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setBookingData(prev => ({ ...prev, type: type.id }))}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      bookingData.type === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <type.icon className={`w-5 h-5 ${
                        bookingData.type === type.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">{type.name}</p>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Medical Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Please describe your symptoms or reason for the consultation..."
                  value={bookingData.symptoms}
                  onChange={(e) => setBookingData(prev => ({ ...prev, symptoms: e.target.value }))}
                  className="input-medical min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <Select 
                  value={bookingData.urgency} 
                  onValueChange={(value) => setBookingData(prev => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger className="input-medical">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal - Routine consultation</SelectItem>
                    <SelectItem value="urgent">Urgent - Need attention soon</SelectItem>
                    <SelectItem value="emergency">Emergency - Immediate attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information you'd like the doctor to know..."
                  value={bookingData.patientNotes}
                  onChange={(e) => setBookingData(prev => ({ ...prev, patientNotes: e.target.value }))}
                  className="input-medical"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Review & Confirm</h3>
            
            <Card className="card-medical">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {getInitials(doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground">{doctor.name}</h4>
                    <p className="text-primary font-medium">{doctor.specialization}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Appointment Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{bookingData.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{bookingData.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {bookingData.type === 'video' ? (
                            <Video className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="capitalize">{bookingData.type} Consultation</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-foreground mb-2">Medical Information</h5>
                      <div className="text-sm text-muted-foreground">
                        <p><strong>Symptoms:</strong> {bookingData.symptoms}</p>
                        <p><strong>Urgency:</strong> <span className="capitalize">{bookingData.urgency}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-accent p-4 rounded-lg">
                      <h5 className="font-medium text-foreground mb-2">Cost Breakdown</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Consultation Fee</span>
                          <span>${doctor.consultationFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Fee</span>
                          <span>$5</span>
                        </div>
                        <div className="border-t border-border pt-2 flex justify-between font-medium">
                          <span>Total</span>
                          <span>${doctor.consultationFee + 5}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Secure payment protected by 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Payment</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className={`w-5 h-5 ${
                        paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                  </div>
                  
                  <div
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'wallet'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded ${
                        paymentMethod === 'wallet' ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      <span className="font-medium">Digital Wallet</span>
                    </div>
                  </div>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="input-medical"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      className="input-medical"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="input-medical"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="input-medical"
                    />
                  </div>
                </div>
              )}

              <div className="bg-primary-soft p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>${doctor.consultationFee + 5}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= step
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {currentStep > step ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{step}</span>
              )}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 ml-2 ${
                currentStep > step ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-8 text-center text-sm">
          <span className={currentStep >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Date & Time
          </span>
          <span className={currentStep >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Medical Info
          </span>
          <span className={currentStep >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Review
          </span>
          <span className={currentStep >= 4 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Payment
          </span>
        </div>
      </div>

      {/* Step Content */}
      <Card className="card-medical">
        <CardContent className="p-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="btn-outline-medical"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 1 ? 'Back to Doctors' : 'Previous'}
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!bookingData.date || !bookingData.time)) ||
              (currentStep === 2 && !bookingData.symptoms)
            }
            className="btn-medical"
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleBookingSubmit}
            className="btn-medical"
          >
            Confirm & Pay ${doctor.consultationFee + 5}
          </Button>
        )}
      </div>
    </div>
  );
};