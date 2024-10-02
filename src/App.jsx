import './App.css';
import React from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import StatusMessage from './components/StatusMessage';
import { useCourses } from './utilities/fetchCourses';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const { data, error, isLoading } = useCourses();

  // Handle loading or error state
  if (isLoading || error) {
    return <StatusMessage message={isLoading ? "Loading..." : `Error fetching courses: ${error.message}`} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Banner title={data.title} />
        <TermPage courses={data.courses} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
