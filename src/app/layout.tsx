import { Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const outfit = Outfit({
  subsets: ['latin'],
});

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