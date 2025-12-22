'use client';

import { G, Rect, SVG, Text } from '@svgdotjs/svg.js';
import React, { useEffect, useState } from 'react';

const sampleCodeSnippet0 = 
`struct node *insert(struct node *node, int value) {
  if (node == null)
    return create_new_node(value);
  if (value < node->value)
    node->left = insert(node->left, value);
  else if (value > node->value)
    node->right = insert(node->right, value);
  else if (value == node->value)
    return node;

  node->height = height(node);
  int balance = height(node->left) - height(node->right);
  if (balance > 1) {
    if (value > node->left->value)
      node->left = rotate_left(node->left);
    return rotate_right(node);
  } else if (balance < -1) {
    if (value < node->right->value)
      node->right = rotate_right(node->right);
    return rotate_left(node);
  } else {
    return node;
  }
}`



const TestCodeCanvas = () => {

  useEffect(() => {
    const lines = sampleCodeSnippet0.split('\n');
    const boxHeight = 24
    const xPadding = 20;

    let canvasWidth = 0;

    const codeObjects = lines.map((line, idx) => {
      const group = new G().translate(0, boxHeight * idx);

      const boxShape = new Rect()
        .size(0, boxHeight)
        .attr({
          opacity: 0
        })
        .fill('#5cebda')
        .move(0, 0)
        
      const textShape = new Text()
        .text(line)
        .attr({
          'dominant-baseline': 'central',
          x: xPadding,
          y: boxHeight / 2
        })
        .attr('style', 'white-space: pre-wrap')
        .font({
          family: 'JetBrains Mono',
          weight: 400,
          size: 12,
        })
      
      group.add(boxShape);
      group.add(textShape);

      // Get line width.
      const lineWidth = group.bbox().width;
      canvasWidth = lineWidth > canvasWidth ? lineWidth : canvasWidth;

      return {
        group,
        boxShape,
        textShape
      }
    });
    
    SVG('#code-canvas').size(canvasWidth + (xPadding * 2), boxHeight * lines.length)
    codeObjects.map((codeLine) => {
      codeLine.boxShape.width(canvasWidth + (xPadding * 2));
      codeLine.group.addTo('#code-canvas')
    });
    
  }, []);

  return (
    <div id='code-canvas-container' className='w-100 bg-amber-200 overflow-x-scroll'>
      <svg
        id='code-canvas'
      >
      </svg>
    </div>
  )
}

export default TestCodeCanvas;