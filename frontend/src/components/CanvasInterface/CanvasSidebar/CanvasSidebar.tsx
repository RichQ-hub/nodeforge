import PanelBox from '../PanelBox';
import { jetbrains, monomaniac } from '@/fonts';
import Image from 'next/image';

import bstIcon from '@/assets/bst-icon.svg';

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
        <Image src={bstIcon} alt=''/>
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
        <pre className={`${jetbrains.className} text-xs/loose`}>{sampleCodeSnippet}</pre>
      </PanelBox>
    </aside>
  )
}

export default CanvasSidebar;