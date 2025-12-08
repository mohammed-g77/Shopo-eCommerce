import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon, HeartIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="w-full bg-white">
       
      <div className="bg-gray-900 text-white text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9">
            <div className="hidden md:flex items-center space-x-6">
              <Link to="#" className="hover:text-yellow-400 transition-colors">Account</Link>
              <Link to="#" className="hover:text-yellow-400 transition-colors">Track Order</Link>
              <Link to="#" className="hover:text-yellow-400 transition-colors">Support</Link>
            </div>
            <div className="md:hidden">
              <span className="text-xs">Welcome to Shopo</span>
            </div>
            <div className="flex items-center space-x-4">
              <select className="bg-transparent border-0 text-white hover:text-yellow-400 transition-colors cursor-pointer focus:outline-none text-xs">
                <option className="text-black">🇺🇸 United State</option>
                <option className="text-black">🇦🇪 UAE</option>
              </select>
              <select className="bg-transparent border-0 text-white hover:text-yellow-400 transition-colors cursor-pointer focus:outline-none text-xs">
                <option className="text-black">USD</option>
                <option className="text-black">EUR</option>
              </select>
              <select className="bg-transparent border-0 text-white hover:text-yellow-400 transition-colors cursor-pointer focus:outline-none text-xs">
                <option className="text-black">Bangla</option>
                <option className="text-black">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

     
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
             
            <div className="flex-shrink-0">
              <Link to="/" className="text-3xl font-bold text-gray-900">
                Shopo<span className="text-yellow-400">.</span>
              </Link>
            </div>

          
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search Product..."
                  className="w-full px-6 py-3 border-2 border-yellow-400 rounded-full focus:outline-none focus:border-yellow-500 pr-12"
                />
                <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-2 transition-colors">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="relative text-gray-700 hover:text-yellow-500 transition-colors">
                <HeartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <Link to="/cart" className="relative text-gray-700 hover:text-yellow-500 transition-colors">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <button className="text-gray-700 hover:text-yellow-500 transition-colors">
                <UserIcon className="h-6 w-6" />
              </button>
            </div>

            
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

       <div className="bg-white border-b border-gray-200 hidden lg:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-14">
            
             <div className="relative">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2 rounded transition-colors"
              >
                <Bars3Icon className="h-5 w-5" />
                <span>All Category</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
             
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                  <Link to="#" className="block px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-yellow-500 transition-colors">Electronics</Link>
                  <Link to="#" className="block px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-yellow-500 transition-colors">Fashion</Link>
                  <Link to="#" className="block px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-yellow-500 transition-colors">Home & Garden</Link>
                  <Link to="#" className="block px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-yellow-500 transition-colors">Sports</Link>
                  <Link to="#" className="block px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-yellow-500 transition-colors">Books</Link>
                </div>
              )}
            </div>

            
            <nav className="flex space-x-8 flex-1">
              <Link to="/home" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">Home</Link>
              <Link to="#" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">Shop</Link>
              <Link to="#" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">Pages</Link>
              <Link to="#" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">About</Link>
              <Link to="#" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">Blog</Link>
              <Link to="#" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">Contact</Link>
            </nav>

             
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded transition-colors font-medium">
              Shop Now
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          
          <div className="px-4 pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Product..."
                className="w-full px-4 py-2 border-2 border-yellow-400 rounded-full focus:outline-none focus:border-yellow-500 pr-10"
              />
              <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-1.5">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">Home</Link>
            <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">Shop</Link>
            <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">Pages</Link>
            <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">About</Link>
            <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">Blog</Link>
            <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">Contact</Link>
          </div>

          
          <div className="pt-4 pb-4 border-t border-gray-100">
            <div className="flex items-center justify-around px-5">
              <button className="text-gray-600 hover:text-yellow-500 relative">
                <HeartIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs text-black font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
              <Link to="/cart" className="text-gray-600 hover:text-yellow-500 relative">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs text-black font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <button className="text-gray-600 hover:text-yellow-500">
                <UserIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
