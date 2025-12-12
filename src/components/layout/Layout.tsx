import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import jesterLogo from '@/assets/jester-logo.png';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Jester Watermark */}
      <div className="fixed bottom-6 right-6 opacity-[0.03] pointer-events-none select-none">
        <img 
          src={jesterLogo} 
          alt="" 
          className="w-32 h-32 object-contain"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}