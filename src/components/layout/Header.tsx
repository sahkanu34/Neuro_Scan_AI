import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X, History, Info, Upload, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  current: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon, current, onClick }) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
        current
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      )}
      onClick={onClick}
      aria-current={current ? 'page' : undefined}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      {label}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navigation = [
    { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Scan', href: '/scan', icon: <Upload className="h-5 w-5" /> },
    { name: 'History', href: '/history', icon: <History className="h-5 w-5" /> },
    { name: 'About', href: '/about', icon: <Info className="h-5 w-5" /> },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-200',
        isScrolled 
          ? 'bg-white shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Neuro<span className="text-primary-600">Scan</span>
                <span className="text-secondary-600">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-2">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                href={item.href}
                label={item.name}
                icon={item.icon}
                current={location.pathname === item.href}
              />
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-200 ease-in-out overflow-hidden',
          isMenuOpen ? 'max-h-64' : 'max-h-0'
        )}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              href={item.href}
              label={item.name}
              icon={item.icon}
              current={location.pathname === item.href}
              onClick={closeMenu}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;