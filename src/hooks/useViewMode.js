import { useLocation } from '@reach/router';

/**
 * Custom hook for getting the current view mode from URL
 * @param {string} defaultView - Default view mode if not specified in URL
 * @returns {string} - Current view mode ('grid' or 'list')
 */
const useViewMode = (defaultView = 'grid') => {
  const location = useLocation();
  const match = location.search.match(/view=(grid|list)/);
  return match ? match[1] : defaultView;
};

export default useViewMode; 