import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, GithubIcon, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">
                Neuro<span className="text-primary-400">Scan</span>
                <span className="text-secondary-400">AI</span>
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Advanced AI-powered brain tumor detection and classification tool with 93% accuracy.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="https://github.com/sahkanu34" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <GithubIcon className="h-6 w-6" />
              </a>
              <a href="mailto:surajsah132@gmail.com" className="text-gray-400 hover:text-white">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/scan" className="text-gray-400 hover:text-white">
                  Upload Scan
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-400 hover:text-white">
                  Scan History
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} NeuroScan AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;