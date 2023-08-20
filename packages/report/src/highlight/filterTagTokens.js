export default function filterTagTokens(tokens, types) {
  return tokens
    .map(token => {
      if (types.includes(token.type)) {
        return null;
      }

      if (token.content && Array.isArray(token.content)) {
        token.content = filterTagTokens(token.content, types);
      }

      return token;
    })
    .filter(token => token !== null);
}
