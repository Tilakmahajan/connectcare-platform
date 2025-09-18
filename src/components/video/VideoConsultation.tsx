import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  MessageSquare,
  FileText,
  Settings,
  Monitor,
  Camera,
  Volume2,
  VolumeX
} from 'lucide-react';

interface VideoConsultationProps {
  doctor?: {
    id: string;
    name: string;
    specialization: string;
    avatar?: string;
  };
  patient?: {
    id: string;
    name: string;
    avatar?: string;
  };
  onEndCall?: () => void;
  isDoctor?: boolean;
}

export const VideoConsultation: React.FC<VideoConsultationProps> = ({
  doctor = {
    id: '1',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    avatar: '/api/placeholder/100/100'
  },
  patient = {
    id: '1',
    name: 'John Patient',
    avatar: '/api/placeholder/100/100'
  },
  onEndCall,
  isDoctor = false
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: isDoctor ? 'patient' : 'doctor',
      message: 'Hello! I\'m ready for our consultation.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Mock call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallStarted) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallStarted(true);
    // Initialize mock video streams
    if (localVideoRef.current && remoteVideoRef.current) {
      // In real implementation, you'd initialize WebRTC here
      console.log('Starting video consultation...');
    }
  };

  const handleEndCall = () => {
    setIsCallStarted(false);
    setCallDuration(0);
    onEndCall?.();
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: isDoctor ? 'doctor' : 'patient',
        message: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!isCallStarted) {
    // Pre-call screen
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="card-medical shadow-glow">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage 
                    src={isDoctor ? patient.avatar : doctor.avatar} 
                    alt={isDoctor ? patient.name : doctor.name} 
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {getInitials(isDoctor ? patient.name : doctor.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {isDoctor ? patient.name : doctor.name}
                </h2>
                {!isDoctor && (
                  <p className="text-muted-foreground">{doctor.specialization}</p>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {isDoctor 
                    ? "Ready to start consultation with your patient?"
                    : "Your doctor is ready to see you"
                  }
                </p>

                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={isVideoOn ? 'btn-outline-medical' : 'bg-destructive text-destructive-foreground'}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className={isAudioOn ? 'btn-outline-medical' : 'bg-destructive text-destructive-foreground'}
                  >
                    {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                </div>

                <Button 
                  onClick={handleStartCall}
                  className="btn-medical w-full"
                  size="lg"
                >
                  <Video className="w-5 h-5 mr-2" />
                  Start Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Active call screen
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Call Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage 
                src={isDoctor ? patient.avatar : doctor.avatar} 
                alt={isDoctor ? patient.name : doctor.name} 
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(isDoctor ? patient.name : doctor.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">
                {isDoctor ? patient.name : doctor.name}
              </h3>
              {!isDoctor && (
                <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="badge-success">
              {formatTime(callDuration)}
            </Badge>
            <Badge variant="outline">HD</Badge>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-slate-900">
        <div className="grid h-full">
          {/* Remote Video (Main) */}
          <div className="relative">
            {isVideoOn ? (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage 
                      src={isDoctor ? patient.avatar : doctor.avatar} 
                      alt={isDoctor ? patient.name : doctor.name} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      {getInitials(isDoctor ? patient.name : doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xl font-semibold">
                    {isDoctor ? patient.name : doctor.name}
                  </p>
                  <p className="text-sm opacity-75">Video call in progress</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Video is turned off</p>
                </div>
              </div>
            )}

            {/* Local Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-slate-700 rounded-lg overflow-hidden border-2 border-white/20">
              {isVideoOn ? (
                <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                  <Avatar className="w-16 h-16">
                    <AvatarImage 
                      src={isDoctor ? doctor.avatar : patient.avatar} 
                      alt={isDoctor ? doctor.name : patient.name} 
                    />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {getInitials(isDoctor ? doctor.name : patient.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white">
                  <VideoOff className="w-8 h-8 opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-card/90 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={isAudioOn ? 'btn-outline-medical' : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'}
            >
              {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={isVideoOn ? 'btn-outline-medical' : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'}
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={isScreenSharing ? 'bg-primary text-primary-foreground' : 'btn-outline-medical'}
            >
              <Monitor className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="btn-outline-medical"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>

            {isDoctor && (
              <Button
                variant="outline"
                size="sm"
                className="btn-outline-medical"
              >
                <FileText className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleEndCall}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <PhoneOff className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          className="fixed right-0 top-0 bottom-0 w-80 bg-card border-l border-border z-50"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Chat</h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === (isDoctor ? 'doctor' : 'patient') ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === (isDoctor ? 'doctor' : 'patient')
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 input-medical"
                />
                <Button onClick={sendMessage} size="sm" className="btn-medical">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};