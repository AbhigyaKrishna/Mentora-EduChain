import { useOCAuthState } from '../hooks/useOCAuthState';
import { useTheme } from '../context/ThemeContext';

export default function LoginButton() {
  const { login } = useOCAuthState();
  const { darkMode } = useTheme();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className={`px-4 py-2 rounded-md ${
        darkMode 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } transition-colors duration-200 flex items-center gap-2`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
      Login with Open Campus
    </button>
  );
} 