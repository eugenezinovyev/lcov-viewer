import { clsx } from '@lcov-viewer/core';
import React, { Fragment } from 'react';

const buildClassName = (token) => {
  const aliases = token.alias ? (Array.isArray(token.alias) ? token.alias : [token.alias]) : [];

  return clsx('token', token.type, ...aliases);
};

const TokenStream = ({ tokens }) => (
  <Fragment>
    {tokens.map((token, index) => typeof token === 'string'
      ? token
      : (
        <span key={index} className={buildClassName(token)}>
            {token.content && Array.isArray(token.content) ? <TokenStream tokens={token.content}/> : token.content}
        </span>
      ))}
  </Fragment>
);

export default TokenStream;
