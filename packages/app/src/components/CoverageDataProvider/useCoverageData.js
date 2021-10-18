import { useContext, useEffect, useState } from 'react';
import CoverageDataContext from './CoverageDataContext';

const useCoverageData = () => {
  const [, forceUpdate] = useState();
  const context = useContext(CoverageDataContext).current;

  useEffect(() => {
    const notify = () => forceUpdate({});
    context.subscriptions.push(notify);

    return () => {
      const index = context.subscriptions.findIndex(cb => cb === notify);

      if (index > -1) {
        context.subscriptions.splice(index, 1);
      }
    };
  }, [context]);

  return context.data;
};

export default useCoverageData;
