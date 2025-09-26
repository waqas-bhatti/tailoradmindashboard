import { Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import type { Metadata } from 'next';

const outfit = Outfit({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tailorix',
  icons: {
    icon: [
      // Default favicon (light mode)
      {
        url: '/images/logo/t-icon.png',
        type: 'image/png',
      },
      // Alternative for dark mode (optional)
      {
        url: '/images/logo/t-icon-dark.png',
        media: '(prefers-color-scheme: dark)',
        type: 'image/png',
      },
    ],
    // Apple Touch Icon
    apple: '/images/logo/t-icon.png',
    // Other icon sizes
    shortcut: '/images/logo/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <AuthProvider>
          <ProtectedRoute>
          <SidebarProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </SidebarProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}