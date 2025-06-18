import { useEffect } from 'react';

/**
 * useDebouncedEffect
 * Ejecuta un callback luego de que los valores observados (deps) se mantengan estables por cierto tiempo.
 *
 * @param callback - Función que se ejecutará tras el retraso
 * @param deps - Dependencias que disparan el efecto
 * @param delay - Tiempo en milisegundos para aplicar el debounce
 */
export function useDebouncedEffect(callback: () => void, deps: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);

    return () => clearTimeout(handler);
  }, [...deps, delay]);
}
