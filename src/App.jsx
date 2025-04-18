import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OCConnect, LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia, arbitrumSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import CreateCourse from './pages/CreateCourse';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import CreateAssignment from './pages/CreateAssignment';
import AIAssignment from './pages/AIAssignment';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';
import RoadmapGenerator from './pages/RoadmapGenerator';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ProjectRooms from './pages/ProjectRooms';
import ProjectRoom from './pages/ProjectRoom';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Rewards from './pages/Rewards';
import Certificates from './pages/Certificates';
import CoursePage from './pages/CoursePage';
import { CoinsProvider } from './context/CoinsContext';
import Instructors from './pages/Instructors';
import Privacy from './pages/Privacy';
import Careers from './pages/Careers';
import Documentation from './pages/Documentation';
import Blog from './pages/Blog';
import Support from './pages/Support';
import Community from './pages/Community';
import Pricing from './pages/Pricing';
import Enterprise from './pages/Enterprise';
import Partners from './pages/Partners';
import AffiliateProgram from './pages/AffiliateProgram';
import BecomeInstructor from './pages/BecomeInstructor';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import Accessibility from './pages/Accessibility';
import ScrollToTop from './components/ScrolltoTop';
// OCConnect configuration
const ocConnectOpts = {
  clientId: import.meta.env.VITE_OC_CLIENT_ID || 'sandbox',
  redirectUri: `${window.location.origin}/redirect`,
  referralCode: 'MENTORA',
  storageType: 'cookie',
};

// Create a client for react-query
const queryClient = new QueryClient();

// Configure Wagmi
const config = createConfig({
  chains: [mainnet, sepolia, arbitrumSepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
// Custom Loading Component
const CustomLoadingComponent = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Loading authentication...</p>
    </div>
  </div>
);

// Custom Error Component
const CustomErrorComponent = () => {
  const { authState } = useOCAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Authentication Error</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {authState.error?.message || 'An error occurred during authentication'}
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};


// Login Callback Handlers
const loginSuccess = async () => {
  try {
    console.log('Login successful');
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Error initializing contracts:', error);
    // You might want to show an error message to the user here
  }
};

const loginError = (error) => {
  console.error('Login error:', error);
};

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OCConnect opts={ocConnectOpts} sandboxMode={true}>
          <CoinsProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="courses">
                    <Route index element={<Courses />} />
                    <Route path=":id" element={<CourseDetails />} />
                  </Route>
                  <Route path="roadmap" element={<RoadmapGenerator />} />
                  <Route path="rooms" element={<ProjectRooms />} />
                  <Route path="room/:roomId" element={<ProjectRoom />} />
                  <Route path="profile" element={<Dashboard />} />
                  <Route path="dashboard" element={<Profile />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="create-course" element={<CreateCourse />} />
                  <Route path="about" element={<About />} />
                  <Route path="ai-assignment/:id" element={<AIAssignment />} />
                  <Route path="assignments" element={<Assignments />} />
                  <Route path="create-assignment" element={<CreateAssignment />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="certificates" element={<Certificates />} />
                  <Route path="course/:courseId" element={<CoursePage />} />
                  <Route path="instructors" element={<Instructors />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="careers" element={<Careers />} />
                  <Route path="docs" element={<Documentation />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="support" element={<Support />} />
                  <Route path="community" element={<Community />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="enterprise" element={<Enterprise />} />
                  <Route path="partners" element={<Partners />} />
                  <Route path="affiliates" element={<AffiliateProgram />} />
                  <Route path="teach" element={<BecomeInstructor />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="cookies" element={<CookiePolicy />} />
                  <Route path="accessibility" element={<Accessibility />} />
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/redirect"
                    element={
                      <LoginCallBack
                        customErrorComponent={CustomErrorComponent}
                        customLoadingComponent={CustomLoadingComponent}
                        errorCallback={loginError}
                        successCallback={loginSuccess}
                      />
                    }
                  />
                </Route>
              </Routes>
              <ScrollToTop />
            </Router>
          </ThemeProvider>
          </CoinsProvider>
        </OCConnect>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;