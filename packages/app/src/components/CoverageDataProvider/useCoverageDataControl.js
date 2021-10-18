import { useCallback, useContext } from 'react';
import CoverageDataContext from './CoverageDataContext';

const useCoverageDataControl = () => {
  const context = useContext(CoverageDataContext).current;
  const dispatch = useCallback((type, payload) => {
    switch (type) {
      case 'set':
        context.data = payload;
        context.subscriptions.forEach(cb => cb());
        break;
      case 'unset':
        context.data = null;
        context.subscriptions.forEach(cb => cb());
        break;
    }
  }, [context]);
  const set = useCallback((data) => dispatch('set', data), [context]);
  const unset = useCallback(() => dispatch('unset'), [context]);

  return [set, unset];
};

export default useCoverageDataControl;
