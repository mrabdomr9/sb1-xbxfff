import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLogoStore } from '../store/logoStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { logo } = useLogoStore();
  const { user } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-[#213c4d] text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            {logo ? (
              <img src={logo} alt="Company Logo" className="h-8 w-auto" />
            ) : (
              <Database className="h-8 w-8 text-[#04968d]" />
            )}
            <span className="text-2xl font-bold font-display">Active Soft</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-[#04968d] transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLinks isAdmin={isAdmin} user={user} />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <NavLinks 
                isAdmin={isAdmin} 
                user={user} 
                isMobile={true} 
                onItemClick={closeMenu}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

interface NavLinksProps {
  isAdmin: boolean;
  user: any;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavLinks = ({ isAdmin, user, isMobile = false, onItemClick }: NavLinksProps) => {
  const linkClass = `hover:text-[#04968d] transition-colors ${isMobile ? 'block py-2' : ''}`;
  const buttonClass = `flex items-center space-x-1 bg-[#04968d] px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors ${
    isMobile ? 'w-full justify-center mt-2' : ''
  }`;

  return (
    <>
      {!isAdmin && (
        <>
          <Link to="/" className={linkClass} onClick={onItemClick}>Home</Link>
          <Link to="/services" className={linkClass} onClick={onItemClick}>Services</Link>
          <Link to="/clients" className={linkClass} onClick={onItemClick}>Clients</Link>
          <Link to="/brochures" className={linkClass} onClick={onItemClick}>Brochures</Link>
          <Link to="/contact" className={linkClass} onClick={onItemClick}>Contact Us</Link>
          {user ? (
            <Link to="/admin" className={buttonClass} onClick={onItemClick}>
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link to="/admin/login" className={buttonClass} onClick={onItemClick}>
              <span>Login</span>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default Header;