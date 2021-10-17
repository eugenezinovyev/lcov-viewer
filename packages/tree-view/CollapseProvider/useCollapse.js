import { useCallback, useContext } from 'react';
import CollapseContext from './CollapseContext';
import findNode from './findNode';

const useCollapse = (path) => {
    const context = useContext(CollapseContext);

    return useCallback(() => {
        const current = findNode(context.state, path);
        current.collapsed = !current.collapsed;

        if (Object.hasOwnProperty.call(context.subscriptions, path)) {
            context.subscriptions[path].forEach(fn => fn());
        }
    }, [context]);
};

export default useCollapse;
