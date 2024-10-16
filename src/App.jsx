import './App.css';
import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import StatusMessage from './components/StatusMessage';
import AuthForm from './components/AuthForm';
import { useDbData, auth, signOut, onAuthStateChanged, isAdmin } from './utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const { data, error, isLoading } = useDbData('/');
  const [user, setUser] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  // Track authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user); 
      if (user) {
        const adminStatus = await isAdmin(user.uid);  // Check if the user is an admin
        setIsUserAdmin(adminStatus);
        // console.log(`User admin status: ${adminStatus}`);
      } else {
        setIsUserAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  const handleAuthSuccess = (user) => {
    setUser(user);
    setShowAuthForm(false);
  };

  if (isLoading || error) {
    return <StatusMessage message={isLoading ? "Loading..." : `Error fetching courses: ${error.message}`} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Banner
          title={data.title || "CS Courses"}
          user={user}
          onSignIn={() => setShowAuthForm(true)}
          onSignOut={handleSignOut}
        />
        <TermPage courses={data.courses} user={user} isAdmin={isUserAdmin} />
        {showAuthForm && (
          <div className="auth-modal">
            <AuthForm
              onAuthSuccess={handleAuthSuccess}
              onClose={() => setShowAuthForm(false)}
            />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
