'use client';

import { useEffect } from 'react';

export default function SuppressParamsWarning() {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      // Verificar se é um erro de hidratação causado por extensões do navegador
      const errorMessage = args[0];
      if (
        typeof errorMessage === 'string' &&
        (errorMessage.includes('params are being enumerated') ||
         errorMessage.includes('searchParams') ||
         errorMessage.includes('React.use()') ||
         errorMessage.includes('cz-shortcut-listen') ||
         errorMessage.includes('hydration mismatch') ||
         errorMessage.includes('hydrated but some attributes') ||
         errorMessage.includes('A tree hydrated but some attributes'))
      ) {
        return; // Suprimir avisos relacionados a params, searchParams e extensões do navegador
      }
      
      // Verificar também se algum dos argumentos contém o texto do erro
      const allArgs = args.join(' ');
      if (
        allArgs.includes('cz-shortcut-listen') ||
        allArgs.includes('hydration mismatch') ||
        (allArgs.includes('hydrated') && allArgs.includes('attributes'))
      ) {
        return;
      }
      
      originalError.apply(console, args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}








