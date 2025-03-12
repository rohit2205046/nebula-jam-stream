
import { useState, useEffect, useCallback } from 'react';

// Standard breakpoints
export const breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type BreakpointKey = keyof typeof breakpoints;

/**
 * Custom hook to check if a media query matches
 * @param query The media query string to check
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Return early if we're not in the browser
    if (typeof window === 'undefined') return undefined;
    
    const media = window.matchMedia(query);
    
    // Initial check
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Event listener callback with stabilized reference
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Add event listener (using the modern API when available)
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }
    
    // Cleanup function
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        // Fallback for older browsers
        media.removeListener(listener);
      }
    };
  }, [query, matches]);

  return matches;
}

/**
 * Hook to check if the current viewport is mobile sized
 * @param breakpoint The breakpoint to check against (default: sm - 640px)
 * @returns Boolean indicating if the viewport is mobile sized
 */
export function useIsMobile(breakpoint: BreakpointKey = 'sm'): boolean {
  return useMediaQuery(`(max-width: ${breakpoints[breakpoint]}px)`);
}

/**
 * Hook to get the current active breakpoint
 * @returns The current active breakpoint key
 */
export function useBreakpoint(): BreakpointKey {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>('sm');
  
  const updateBreakpoint = useCallback(() => {
    const width = window.innerWidth;
    
    if (width < breakpoints.sm) {
      setCurrentBreakpoint('xs');
    } else if (width < breakpoints.md) {
      setCurrentBreakpoint('sm');
    } else if (width < breakpoints.lg) {
      setCurrentBreakpoint('md');
    } else if (width < breakpoints.xl) {
      setCurrentBreakpoint('lg');
    } else if (width < breakpoints['2xl']) {
      setCurrentBreakpoint('xl');
    } else {
      setCurrentBreakpoint('2xl');
    }
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    
    // Set initial value
    updateBreakpoint();
    
    // Add resize listener with debouncing for performance
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateBreakpoint, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateBreakpoint]);
  
  return currentBreakpoint;
}

/**
 * Hook to get a boolean value for each breakpoint indicating if it's active
 * @returns Object with booleans for each breakpoint
 */
export function useBreakpoints() {
  return {
    isXs: useMediaQuery(`(max-width: ${breakpoints.xs}px)`),
    isSm: useMediaQuery(`(min-width: ${breakpoints.sm}px)`),
    isMd: useMediaQuery(`(min-width: ${breakpoints.md}px)`),
    isLg: useMediaQuery(`(min-width: ${breakpoints.lg}px)`),
    isXl: useMediaQuery(`(min-width: ${breakpoints.xl}px)`),
    is2Xl: useMediaQuery(`(min-width: ${breakpoints['2xl']}px)`),
  };
}
