function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { Text } from 'react-native';
/**
 *
 * @param Array<any> children
 * @param Array<number> styles
 * @param {string} type
 */

export default function applyStyle(children, styles, type) {
  if (!(styles instanceof Array)) {
    styles = [styles];
  }

  return children.map(child => {
    if (child.type.displayName === type) {
      return React.createElement(Text, _extends({
        key: child.key
      }, child.props, {
        style: [].concat(child.props.style, styles)
      }));
    }

    return child;
  });
}