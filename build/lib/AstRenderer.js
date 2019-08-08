function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, PropTypes } from "react";
import { Text, View } from "react-native";
import getUniqueID from "./util/getUniqueID";
export function rootRenderRule(children, styles) {
  return React.createElement(View, {
    key: getUniqueID(),
    style: styles.root
  }, children);
}
/**
 *
 */

export default class AstRenderer {
  /**
   *
   * @param {Object.<string, function>} renderRules
   * @param {any} style
   */
  constructor(renderRules, style) {
    _defineProperty(this, "getRenderFunction", type => {
      const renderFunction = this._renderRules[type];

      if (!renderFunction) {
        throw new Error(`${type} renderRule not defined example: <Markdown rules={renderRules}>`);
      }

      return renderFunction;
    });

    _defineProperty(this, "renderNode", (node, parentNodes) => {
      const renderFunction = this.getRenderFunction(node.type);
      const parents = [...parentNodes];
      parents.unshift(node);

      if (node.type === "text") {
        return renderFunction(node, [], parentNodes, this._style);
      }

      const children = node.children.map(value => {
        return this.renderNode(value, parents);
      });
      return renderFunction(node, children, parentNodes, this._style);
    });

    _defineProperty(this, "render", nodes => {
      const children = nodes.map(value => this.renderNode(value, []));
      return rootRenderRule(children, this._style);
    });

    this._renderRules = renderRules;
    this._style = style;
  }
  /**
   *
   * @param {string} type
   * @return {string}
   */


}