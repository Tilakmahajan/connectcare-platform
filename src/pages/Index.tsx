import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect authenticated users to their dashboard
        navigate(`/${user.role}`, { replace: true });
      } else {
        // Redirect unauthenticated users to landing page
        navigate('/landing', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Show loading while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading TeleMed...</p>
      </div>
    </div>
  );
};

export default Index;
