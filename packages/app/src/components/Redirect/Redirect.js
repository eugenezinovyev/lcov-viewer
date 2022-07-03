import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

const Redirect = ({ to }) => {
  useEffect(() => {
    route(to, true);
  }, [to]);

  return null;
};

export default Redirect;
