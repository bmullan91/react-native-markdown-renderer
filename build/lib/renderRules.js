import React, { Component, PropTypes } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import FitImage from 'react-native-fit-image';
import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import applyStyle from './util/applyStyle';
const renderRules = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key
    }, React.createElement(Text, null, node.type));
  },
  textgroup: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.text
    }, children);
  },
  inline: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key
    }, children);
  },
  text: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key
    }, node.content);
  },
  span: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key
    }, children);
  },
  strong: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.strong
    }, children);
  },
  s: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.strikethrough
    }, children);
  },
  // a
  link: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.link,
      onPress: () => openUrl(node.attributes.href)
    }, children);
  },
  // a with a non text element nested inside
  blocklink: (node, children, parent, styles) => {
    return React.createElement(TouchableWithoutFeedback, {
      key: node.key,
      onPress: () => openUrl(node.attributes.href),
      style: styles.blocklink
    }, React.createElement(View, {
      style: styles.image
    }, children));
  },
  em: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.em
    }, children);
  },
  heading1: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key,
      style: styles.headingContainer
    }, applyStyle(children, [styles.heading, styles.heading1], 'Text'));
  },
  heading2: (node, children, parent, styles) => {
    children = applyStyle(children, [styles.heading, styles.heading2], 'Text');
    return React.createElement(View, {
      key: node.key,
      style: styles.headingContainer
    }, children);
  },
  heading3: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.headingContainer
  }, applyStyle(children, [styles.heading, styles.heading3], 'Text')),
  heading4: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.headingContainer
  }, applyStyle(children, [styles.heading, styles.heading4], 'Text')),
  heading5: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.headingContainer
  }, applyStyle(children, [styles.heading, styles.heading5], 'Text')),
  heading6: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.headingContainer
  }, applyStyle(children, [styles.heading, styles.heading6], 'Text')),
  paragraph: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.paragraph
  }, children),
  hardbreak: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.hardbreak
  }),
  blockquote: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.blockquote
  }, children),
  code_inline: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.codeInline
    }, node.content);
  },
  code_block: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.codeBlock
    }, node.content);
  },
  fence: (node, children, parent, styles) => {
    return React.createElement(Text, {
      key: node.key,
      style: styles.codeBlock
    }, node.content);
  },
  pre: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: styles.pre
  }, children),
  // ul
  bullet_list: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key,
      style: [styles.list, styles.listUnordered]
    }, children);
  },
  ordered_list: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key,
      style: [styles.list, styles.listOrdered]
    }, children);
  },
  // li
  list_item: (node, children, parent, styles) => {
    if (hasParents(parent, 'bullet_list')) {
      return React.createElement(View, {
        key: node.key,
        style: styles.listUnorderedItem
      }, React.createElement(Text, {
        style: styles.listUnorderedItemIcon
      }, '\u00B7'), React.createElement(View, {
        style: [styles.listItem]
      }, children));
    }

    if (hasParents(parent, 'ordered_list')) {
      return React.createElement(View, {
        key: node.key,
        style: styles.listOrderedItem
      }, React.createElement(Text, {
        style: styles.listOrderedItemIcon
      }, node.index + 1, node.markup), React.createElement(View, {
        style: [styles.listItem]
      }, children));
    }

    return React.createElement(View, {
      key: node.key,
      style: [styles.listItem]
    }, children);
  },
  table: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: [styles.table]
  }, children),
  thead: (node, children, parent, styles) => React.createElement(View, {
    key: node.key,
    style: [styles.tableHeader]
  }, children),
  tbody: (node, children, parent, styles) => React.createElement(View, {
    key: node.key
  }, children),
  th: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key,
      style: [styles.tableHeaderCell]
    }, children);
  },
  tr: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key,
      style: [styles.tableRow]
    }, children);
  },
  td: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key,
      style: [styles.tableRowCell]
    }, children);
  },
  hr: (node, children, parent, styles) => {
    return React.createElement(View, {
      key: node.key,
      style: [styles.hr]
    });
  },
  // br
  softbreak: (node, children, parent, styles) => React.createElement(Text, {
    key: node.key
  }, '\n'),
  image: (node, children, parent, styles) => {
    return React.createElement(FitImage, {
      indicator: true,
      key: node.key,
      style: styles.image,
      source: {
        uri: node.attributes.src
      }
    });
  }
};
export default renderRules;