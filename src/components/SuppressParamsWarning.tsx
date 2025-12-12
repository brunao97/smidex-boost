'use client';

import { useEffect } from 'react';

export default function SuppressParamsWarning() {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('params are being enumerated')
      ) {
        return; // Suprimir este aviso específico
      }
      originalError.apply(console, args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}





