import getTokenTypeByToken from './getTokenTypeByToken';
import flattenTokens from './flattenTokens';

export function cleanupTokens(tokens) {
  tokens = flattenTokens(tokens);
  tokens.forEach(token => {
    token.type = getTokenTypeByToken(token);

    if (token.type === 'image') {
      token.block = true;
    }
  });

  /**
   * changing a link token to a blocklink to fix issue where link tokens with
   * nested non text tokens breaks component
   */
  const stack = [];
  tokens = tokens.reduce((acc, token, index) => {
    if (token.type === 'link' && token.nesting === 1) {
      stack.push(token);
    } else if (stack.length > 0 && token.type === 'link' && token.nesting === -1) {
      if (stack.some(stackToken => stackToken.block)) {
        stack[0].type = 'blocklink';
        stack[0].block = true;
        token.type = 'blocklink';
        token.block = true;
      }

      stack.push(token);

      while (stack.length) {
        acc.push(stack.shift());
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }

    return acc;
  }, []);

  return tokens;
}
