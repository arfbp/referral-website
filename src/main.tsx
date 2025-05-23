
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add preloading for critical resources
const preloadResources = () => {
  const links = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
  
  links.forEach(linkProps => {
    const link = document.createElement('link');
    Object.entries(linkProps).forEach(([key, value]) => {
      if (value !== undefined) {
        link.setAttribute(key, value.toString());
      }
    });
    document.head.appendChild(link);
  });
};

// Preload resources before rendering
preloadResources();

// Use createRoot for Concurrent Mode rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
