import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './i18n'; // initialize i18n before rendering
import { Suspense } from 'react';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Suspense fallback={<div>Loading translations...</div>}>
    <App />
  </Suspense>
);