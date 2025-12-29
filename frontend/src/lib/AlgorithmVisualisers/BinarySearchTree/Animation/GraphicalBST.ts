import AnimationProducer from "../../common/AnimationProducer";
import { VISUALISER_CANVAS_ID } from "../../common/constants";
import GraphicalDataStructure from "../../common/GraphicalDataStructure";
import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";
import BSTAnimations from "./BSTAnimations";
import { deleteCode, insertCode } from "./CodeSnippets";

class GraphicalBST extends GraphicalDataStructure {
  public static MAX_DEPTH = 8;
  private _bstAnimationLibrary: BSTAnimations;
  private _root: GraphicalTreeNode | null;

  public constructor() {
    super();
    this._bstAnimationLibrary = new BSTAnimations(VISUALISER_CANVAS_ID);
    this._root = null;
    this.registerOperations();
  }

  /**
   * NOTE: Read the following for how .bind() works:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
   */
  public registerOperations(): void {
    this._operations.set('Insert', {
      description: 'Inserts a new node as a leaf node.',
      args: [
        {
          name: 'Value',
          placeholder: 'value',
          inputType: 'number',
        }
      ],
      codeSnippet: insertCode,
      run: this.insert.bind(this),
    });
    this._operations.set('Delete', {
      description: 'Deletes any node.',
      args: [{
        name: 'Value',
        placeholder: 'value',
        inputType: 'number',
      }],
      codeSnippet: deleteCode,
      run: this.delete.bind(this),
    });
    this._operations.set('Search', {
      description: 'Searches the tree for the given value.',
      args: [
        {
          name: 'Value',
          placeholder: 'value',
          inputType: 'number',
        }
      ],
      codeSnippet: insertCode,
      run: this.search.bind(this),
    });
    this._operations.set('Rotate Left', {
      description: 'Rotates a tree to the left.',
      args: [
        {
          name: 'Value',
          placeholder: 'value',
          inputType: 'number',
        }
      ],
      codeSnippet: insertCode,
      run: this.rotateLeft.bind(this),
    });
    this._operations.set('Rotate Right', {
      description: 'Rotates a tree to the right.',
      args: [
        {
          name: 'Value',
          placeholder: 'value',
          inputType: 'number',
        }
      ],
      codeSnippet: insertCode,
      run: this.rotateRight.bind(this),
    });
    this._operations.set('Preorder Traversal', {
      description: 'Traverses a tree in an NLR path.',
      args: [],
      codeSnippet: insertCode,
      run: this.preorderTraversal.bind(this),
    });
    this._operations.set('Inorder Traversal', {
      description: 'Traverses a tree in an LNR path.',
      args: [],
      codeSnippet: insertCode,
      run: this.inorderTraversal.bind(this),
    });
    this._operations.set('Postorder Traversal', {
      description: 'Traverses a tree in an LRN path.',
      args: [],
      codeSnippet: insertCode,
      run: this.postorderTraversal.bind(this),
    });
  }

  public resetDataStructure(): void {
    this._root = null;
  }

  // ==============================================================================
  // Helpers.
  // ==============================================================================

  public addAnimationWithCodeHighlight(
    animationProducer: AnimationProducer,
    lineNum: number,
    animationFn: any,
    ...args: any[]
  ) {
    animationProducer.addCompleteSequence(
      ...this._codeAnimationLibrary.highlightCode(this.codeLines[lineNum]),
      ...animationFn.apply(this, ...args),
    )
  }

  public updateNodePositions(root: GraphicalTreeNode | null): void {
    if (root === null) {
      return;
    }
    
    const doUpdate = (curr: GraphicalTreeNode | null, depth: number, newX: number, newY: number) => {
      if (curr === null) {
        return;
      } 
      
      curr.x = newX;
      curr.y = newY;

      doUpdate(
        curr.leftChild,
        depth + 1,
        curr.x - GraphicalTreeNode.getChildOffsetX(depth),
        curr.y + GraphicalTreeNode.LINE_OFFSET_Y
      );

      doUpdate(
        curr.rightChild,
        depth + 1,
        curr.x + GraphicalTreeNode.getChildOffsetX(depth),
        curr.y + GraphicalTreeNode.LINE_OFFSET_Y
      );
    }

    doUpdate(root, 0, root.x, root.y);
  }

  // ==============================================================================
  // Methods
  // ==============================================================================

  public insert(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer();

    if (this._root === null) {
      this._root = GraphicalTreeNode.createNode(value);
      this._root.x = 500;
      this._root.y = 40;

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.drawNode(this._root)
      )

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.unhighlightBST(this._root)
      )

    } else {
      this.doInsert(this._root, value, 0, animationProducer);
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.unhighlightBST(this._root)
      )
    }

    return animationProducer;
  }

  private doInsert(
    node: GraphicalTreeNode,
    value: number,
    depth: number,
    animationProducer: AnimationProducer
  ): void {
    if (depth > GraphicalBST.MAX_DEPTH) {
      console.log('Reached Max Depth');
      return;
    } else if (value === node.value) {
      // Node already exists, so we end recursion.
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightNode(node)
      )

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.unhighlightNode(node)
      )
    } else if (value < node.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.halfHighlightNode(node)
      )
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(node.svgData.leftChildLine)
      )

      // We can insert.
      if (node.leftChild === null) {
        node.leftChild = GraphicalTreeNode.createNode(value);
        // TODO: Find better way to dynamically set node coords based on depth.
        node.leftChild.x = node.x - GraphicalTreeNode.getChildOffsetX(depth);
        node.leftChild.y = node.y + GraphicalTreeNode.LINE_OFFSET_Y;

        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.plotNodeLine(node, node.leftChild, node.svgData.leftChildLine)
        )

        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.drawNode(node.leftChild)
        )
      } else {
        this.doInsert(node.leftChild, value, depth + 1, animationProducer);
      }
    } else if (value > node.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.halfHighlightNode(node)
      )
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(node.svgData.rightChildLine)
      )

      // We can insert.
      if (node.rightChild === null) {
        node.rightChild = GraphicalTreeNode.createNode(value);
        // TODO: Find better way to dynamically set node coords based on depth.
        node.rightChild.x = node.x + GraphicalTreeNode.getChildOffsetX(depth);
        node.rightChild.y = node.y + GraphicalTreeNode.LINE_OFFSET_Y;

        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.plotNodeLine(node, node.rightChild, node.svgData.rightChildLine)
        )

        animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.drawNode(node.rightChild)
      )
      } else {
        this.doInsert(node.rightChild, value, depth + 1, animationProducer);
      }
    }
  }

  public delete(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer();
    this._root = this.doDelete(this._root, null, value, animationProducer);
    // Unhighlight the BST.
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.unhighlightBST(this._root)
    );
    // Since the newRoot was assigned a new node (not null), we fix the BST
    // with their new updated coordinates on the canvas.
    this.updateNodePositions(this._root);
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.fixBST(this._root, 0)
    )
    return animationProducer;
  }

  private doDelete(
    root: GraphicalTreeNode | null,
    parent: GraphicalTreeNode | null,
    value: number,
    animationProducer: AnimationProducer
  ): GraphicalTreeNode | null {
    let newRoot: GraphicalTreeNode | null = root;

    if (root !== null) {
      if (value < root.value) {
        root.leftChild = this.doDelete(root.leftChild, root, value, animationProducer);
      } else if (value > root.value) {
        root.rightChild = this.doDelete(root.rightChild, root, value, animationProducer);
      } else {
        // We found the node we want to delete.
        if (root.leftChild === null && root.rightChild === null) {
          // Case 1: No subtrees.
          newRoot = null;

          // Free the node.
          animationProducer.addCompleteSequence(
            ...this._bstAnimationLibrary.freeNode(root, parent, true)
          )
        } else {
          if (root.leftChild === null) {
            // Case 2: 1 subtree (right)
            newRoot = root.rightChild;
          } else if (root.rightChild === null) {
            // Case 2: 1 subtree (left)
            newRoot = root.leftChild;
          } else {
            // Case 3: Both subtrees exist for the curr node we want to delete.
            newRoot = this.join(root.leftChild, root.rightChild, animationProducer);
          }

          // Free the node.
          animationProducer.addCompleteSequence(
            ...this._bstAnimationLibrary.freeNode(root, parent)
          )
        }
      }
    }

    return newRoot;
  }

  public join(
    root1: GraphicalTreeNode,
    root2: GraphicalTreeNode,
    animationProducer: AnimationProducer
  ): GraphicalTreeNode {

    // We find the bottom leftmost node in tree 2.
    let curr = root2;
    let parent = null;
    while (curr.leftChild !== null) {
      parent = curr;
      curr = curr.leftChild
    }

    // Curr should now point to the bottom leftmost node.
    if (parent !== null) {
      parent.leftChild = curr.rightChild;

      // If the curr.rightChild was null, we have to hide the parent's left child
      // line since we have nothing to connect it to.
      if (curr.rightChild === null) {
        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.hideLine(parent.svgData.leftChildLine)
        );
      }

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.plotNodeLine(parent, curr.rightChild, parent.svgData.leftChildLine)
      );
      curr.rightChild = root2;
      animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.plotNodeLine(curr, root2, curr.svgData.rightChildLine)
    );
    }
    curr.leftChild = root1;

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.plotNodeLine(curr, root1, curr.svgData.leftChildLine)
    );
    return curr;
  }

  public search(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer();
    this.doSearch(this._root, value, animationProducer);

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.unhighlightBST(this._root)
    )
    return animationProducer;
  }

  private doSearch(
    node: GraphicalTreeNode | null,
    value: number,
    animationProducer: AnimationProducer
  ): GraphicalTreeNode | null {
    if (node === null) {
      return null;
    } 
    
    // We found the node.
    if (value === node.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightNode(node)
      )
      return node;
    }

    // Look in the children.
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.halfHighlightNode(node)
    )
    if (value < node.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(node.svgData.leftChildLine)
      )
      return this.doSearch(node.leftChild, value, animationProducer)
    } else if (value > node.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(node.svgData.rightChildLine)
      )
      return this.doSearch(node.rightChild, value, animationProducer)
    }
    return null;
  }

  public rotateLeft(value: number) {
    const animationProducer = new AnimationProducer();
    this._root = this.doRotateLeft(this._root, value, animationProducer);

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.unhighlightBST(this._root)
    );
    // Since the newRoot was assigned a new node (not null), we fix the BST
    // with their new updated coordinates on the canvas.
    this.updateNodePositions(this._root);
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.fixBST(this._root, 0)
    )
    return animationProducer;
  }

  private doRotateLeft(
    curr: GraphicalTreeNode | null,
    value: number,
    animationProducer: AnimationProducer
  ): GraphicalTreeNode | null {
    if (curr === null) {
      return null;
    }

    if (value === curr.value) {
      // We found the node.
      const newRoot = curr.rightChild;
      if (newRoot === null) {
        return curr;
      }
      curr.rightChild = newRoot.leftChild;
      if (newRoot.leftChild === null) {
        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.hideLine(curr.svgData.rightChildLine)
        )
      }

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.plotNodeLine(curr, newRoot.leftChild, curr.svgData.rightChildLine)
      )

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.plotNodeLine(newRoot, curr, newRoot.svgData.leftChildLine)
      )

      newRoot.leftChild = curr;

      return newRoot;
    }

    // Highlight the current node.
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.halfHighlightNode(curr)
    )
    
    if (value < curr.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(curr.svgData.leftChildLine)
      )
      curr.leftChild = this.doRotateLeft(curr.leftChild, value, animationProducer);
    } else if (value > curr.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(curr.svgData.rightChildLine)
      )
      curr.rightChild =  this.doRotateLeft(curr.rightChild, value, animationProducer);
    }

    return curr;
  }

  public rotateRight(value: number) {
    const animationProducer = new AnimationProducer();
    this._root = this.doRotateRight(this._root, value, animationProducer);

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.unhighlightBST(this._root)
    );
    // Since the newRoot was assigned a new node (not null), we fix the BST
    // with their new updated coordinates on the canvas.
    this.updateNodePositions(this._root);
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.fixBST(this._root, 0)
    )
    return animationProducer;
  }

  private doRotateRight(
    curr: GraphicalTreeNode | null,
    value: number,
    animationProducer: AnimationProducer
  ): GraphicalTreeNode | null {
    if (curr === null) {
      return null;
    }

    if (value === curr.value) {
      // We found the node.
      const newRoot = curr.leftChild;
      if (newRoot === null) {
        return curr;
      }
      curr.leftChild = newRoot.rightChild;
      if (newRoot.rightChild === null) {
        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.hideLine(curr.svgData.leftChildLine)
        )
      }

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.plotNodeLine(curr, newRoot.rightChild, curr.svgData.leftChildLine)
      )

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.plotNodeLine(newRoot, curr, newRoot.svgData.rightChildLine)
      )

      newRoot.rightChild = curr;

      return newRoot;
    }

    // Highlight the current node.
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.halfHighlightNode(curr)
    )
    
    if (value < curr.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(curr.svgData.leftChildLine)
      )
      curr.leftChild = this.doRotateRight(curr.leftChild, value, animationProducer);
    } else if (value > curr.value) {
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.highlightLine(curr.svgData.rightChildLine)
      )
      curr.rightChild =  this.doRotateRight(curr.rightChild, value, animationProducer);
    }

    return curr;
  }

  public preorderTraversal(): AnimationProducer {
    const animationProducer = new AnimationProducer();
    this.doPreorderTraversal(this._root, animationProducer);
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.unhighlightBST(this._root)
    )
    return animationProducer;
  }

  private doPreorderTraversal(curr: GraphicalTreeNode | null, animationProducer: AnimationProducer) {
    if (curr === null) {
      return;
    }

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightNode(curr)
    );

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightLine(curr.svgData.leftChildLine)
    );
    this.doPreorderTraversal(curr.leftChild, animationProducer);
    
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightLine(curr.svgData.rightChildLine)
    );
    this.doPreorderTraversal(curr.rightChild, animationProducer);
  }

  public inorderTraversal() {
    const animationProducer = new AnimationProducer();
    this.doInorderTraversal(this._root, animationProducer);
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.unhighlightBST(this._root)
    )
    return animationProducer;
  }

  private doInorderTraversal(curr: GraphicalTreeNode | null, animationProducer: AnimationProducer) {
    if (curr === null) {
      return;
    }

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.halfHighlightNode(curr)
    );

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightLine(curr.svgData.leftChildLine)
    );
    this.doInorderTraversal(curr.leftChild, animationProducer);

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightNode(curr)
    );

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightLine(curr.svgData.rightChildLine)
    );
    this.doInorderTraversal(curr.rightChild, animationProducer);
  }

  public postorderTraversal() {
    const animationProducer = new AnimationProducer();
    this.doPostorderTraversal(this._root, animationProducer);
    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.unhighlightBST(this._root)
    )
    return animationProducer;
  }

  private doPostorderTraversal(curr: GraphicalTreeNode | null, animationProducer: AnimationProducer) {
    if (curr === null) {
      return;
    }

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.halfHighlightNode(curr)
    );

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightLine(curr.svgData.leftChildLine)
    );
    this.doPostorderTraversal(curr.leftChild, animationProducer);

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightLine(curr.svgData.rightChildLine)
    );
    this.doPostorderTraversal(curr.rightChild, animationProducer);

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.highlightNode(curr)
    );
  }

}

export default GraphicalBST;