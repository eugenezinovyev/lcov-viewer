import { useContext, useEffect, useState } from 'react';
import CollapseContext from './CollapseContext';
import findNode from './findNode';

const useCollapsedState = (path) => {
    const [, forceUpdate] = useState();
    const context = useContext(CollapseContext);
    const current = findNode(context.state, path);

    useEffect(() => {
        if (!Object.hasOwnProperty.call(context.subscriptions, path)) {
            context.subscriptions[path] = [];
        }

        const notify = () => forceUpdate({});
        context.subscriptions[path].push(notify);

        return () => {
            const index = context.subscriptions[path].findIndex(x => x === notify);

            if (index > -1) {
                context.subscriptions[path].splice(index, 1);
            }
        };
    }, [context]);

    return current.collapsed;
};

export default useCollapsedState;
