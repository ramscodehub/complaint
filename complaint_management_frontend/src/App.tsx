import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import SubmitPage from './pages/SubmitPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="bg-gray-800/50 backdrop-blur-sm rounded-b-lg shadow-lg mb-8">
            <ul className="flex justify-center space-x-6">
              <li>
                {/* This link now correctly points to /submit */}
                <Link 
                  to="/submit" 
                  className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 py-4 px-2 block"
                >
                  Submit Complaint
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 py-4 px-2 block"
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          <main className="bg-gray-800 p-8 rounded-lg shadow-inner">
            <Routes>
              {/* This is the new route for the submission page */}
              <Route path="/submit" element={<SubmitPage />} />
              
              {/* This is the route for the admin page (no change) */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* This is a redirect. If a user visits '/', they will be sent to '/submit' */}
              <Route path="/" element={<Navigate to="/submit" replace />} />
            </Routes>
          </main>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;