import { createInertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { BrowserRouter } from 'react-router-dom';

createInertiaApp({
  resolve: name => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <BrowserRouter>
        <App {...props} />
      </BrowserRouter>
    );
  },
});
