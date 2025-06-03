import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Verificar se o usuário está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserName("Usuário");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName("");
    window.location.href = '/';
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word: string) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 
            onClick={() => handleNavigation('/')}
            className="text-2xl font-bold text-gray-900 hover:text-black transition-colors cursor-pointer"
          >
            TrustVote
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {getInitials(userName)}
                  </div>
                  <span className="text-sm text-gray-700 hidden sm:block">
                    Olá, {userName}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => handleNavigation('/login')}
                className="hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                Login
              </Button>
              <Button 
                onClick={() => handleNavigation('/register')}
                className="bg-gray-900 hover:bg-black text-white transition-colors"
              >
                Registrar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;