"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Mail, Loader2 } from "lucide-react";
import { useState } from "react";

export default function UserDropdown() {
  const { user, logout, loading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (loading) return; // Prevent multiple clicks
    
    setIsSigningOut(true);
    try {
      await logout();
      // AuthProvider will handle the redirect
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsSigningOut(false);
      // Optional: Show toast notification
      alert("Sign out failed. Please try again.");
    }
  };

  if (!user) {
    return null;
  }

  const getUserDisplay = () => {
    if (user.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="relative flex items-center text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          disabled={isSigningOut}
        >
          <span className="relative overflow-hidden rounded-full h-11 w-11 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {getUserDisplay()}
            </span>
          </span>
          {isSigningOut && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse"></div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 p-1"
        align="end"
        sideOffset={4}
      >
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative overflow-hidden rounded-full h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {getUserDisplay()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.name || user.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email || 'No email'}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1" />

        {/* Profile Menu Items */}
        <DropdownMenuItem 
          className="cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-800 rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-300"
          onClick={() => window.location.href = '/dashboard/profile'}
          disabled={isSigningOut}
        >
          <User className="w-4 h-4 mr-3" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem 
          className="cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-800 rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-300"
          onClick={() => window.location.href = '/dashboard/settings'}
          disabled={isSigningOut}
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </DropdownMenuItem>

        {user.email && (
          <DropdownMenuItem 
            className="cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-800 rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-300"
            onClick={() => window.location.href = `mailto:${user.email}`}
            disabled={isSigningOut}
          >
            <Mail className="w-4 h-4 mr-3" />
            Email
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="my-1" />

        {/* Sign Out */}
        <DropdownMenuItem 
          className={`
            cursor-pointer rounded-md px-2 py-2 text-sm font-medium
            ${isSigningOut 
              ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' 
              : 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
            }
          `}
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <span className="flex items-center w-full">
            {isSigningOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                Signing Out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </>
            )}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}