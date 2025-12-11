import React from 'react';
import PanelBox from '../PanelBox';
import { jetbrains, monomaniac } from '@/fonts';

const sampleCodeSnippet = 
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
}
}
}
}`

const CanvasSidebar = () => {
  return (
    <aside className='bg-nodeforge-panel p-4 text-white flex flex-col gap-6'>
      <div className='flex items-center'>
        <h1 className={`${monomaniac.className} mr-4 text-2xl`}>Binary Search Tree</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" id="Binary-Tree--Streamline-Tabler" height="24" width="24">
          <path d="M6 20a2 2 0 1 0 -4 0 2 2 0 0 0 4 0z" strokeWidth="2"></path>
          <path d="M16 4a2 2 0 1 0 -4 0 2 2 0 0 0 4 0z" strokeWidth="2"></path>
          <path d="M16 20a2 2 0 1 0 -4 0 2 2 0 0 0 4 0z" strokeWidth="2"></path>
          <path d="M11 12a2 2 0 1 0 -4 0 2 2 0 0 0 4 0z" strokeWidth="2"></path>
          <path d="M21 12a2 2 0 1 0 -4 0 2 2 0 0 0 4 0z" strokeWidth="2"></path>
          <path d="m5.058 18.306 2.88 -4.606" strokeWidth="2"></path>
          <path d="m10.061 10.303 2.877 -4.604" strokeWidth="2"></path>
          <path d="m10.065 13.705 2.876 4.6" strokeWidth="2"></path>
          <path d="m15.063 5.7 2.881 4.61" strokeWidth="2"></path>
        </svg>
      </div>

      <PanelBox title='Actions'>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
        <p>nice</p>
      </PanelBox>
      <PanelBox title='Code Snippet'>
        <pre className={`${jetbrains.className} text-xs/loose text-nowrap scrollbar`}>{sampleCodeSnippet}</pre>
      </PanelBox>
    </aside>
  )
}

export default CanvasSidebar;