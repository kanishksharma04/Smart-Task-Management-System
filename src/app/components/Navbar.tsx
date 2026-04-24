'use client';

import { motion } from 'framer-motion';
import { Layout, Sun, Moon, LogOut, User, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm dark:shadow-lg dark:shadow-blue-900/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={user ? (isAdmin ? '/dashboard' : '/member') : '/'} className="flex items-center gap-2 sm:gap-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-all duration-300 group-hover:scale-110">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
                Task<span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Forge</span>
              </h1>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* User info + logout */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                    <User className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[100px] sm:max-w-none">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      {user.role}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-slate-200/50 dark:border-slate-700/50 px-4 py-3 bg-gradient-to-b from-white/50 to-transparent dark:from-slate-950/50"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {user.role}
                  </span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
