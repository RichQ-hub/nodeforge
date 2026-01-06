import AnimationProducer from "../../common/AnimationProducer";
import { VISUALISER_CANVAS_ID } from "../../common/constants";
import GraphicalDataStructure from "../../common/GraphicalDataStructure";
import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";
import BSTAnimations from "./BSTAnimations";
import { deleteCode, inorderTraversalCode, insertCode, postorderTraversalCode, preorderTraversalCode, rotateLeftCode, rotateRightCode, searchCode } from "./CodeSnippets";

class GraphicalBST extends GraphicalDataStructure {
  public static MAX_DEPTH = 8;
  public static ROOT_X = 500;
  public static ROOT_Y = 40;
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
      codeSnippet: searchCode,
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
      codeSnippet: rotateLeftCode,
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
      codeSnippet: rotateRightCode,
      run: this.rotateRight.bind(this),
    });
    this._operations.set('Preorder Traversal', {
      description: 'Traverses a tree in an NLR path.',
      args: [],
      codeSnippet: preorderTraversalCode,
      run: this.preorderTraversal.bind(this),
    });
    this._operations.set('Inorder Traversal', {
      description: 'Traverses a tree in an LNR path.',
      args: [],
      codeSnippet: inorderTraversalCode,
      run: this.inorderTraversal.bind(this),
    });
    this._operations.set('Postorder Traversal', {
      description: 'Traverses a tree in an LRN path.',
      args: [],
      codeSnippet: postorderTraversalCode,
      run: this.postorderTraversal.bind(this),
    });
  }

  public resetDataStructure(): void {
    this._root = null;
  }

  // ==============================================================================
  // Helpers.
  // ==============================================================================

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

      // Update left subtree.
      doUpdate(
        curr.leftChild,
        depth + 1,
        curr.x - GraphicalTreeNode.getChildOffsetX(depth),
        curr.y + GraphicalTreeNode.LINE_OFFSET_Y
      );

      // Update right subtree.
      doUpdate(
        curr.rightChild,
        depth + 1,
        curr.x + GraphicalTreeNode.getChildOffsetX(depth),
        curr.y + GraphicalTreeNode.LINE_OFFSET_Y
      );
    }

    // Ensures the root coords are static. This is because deleting the root node can
    // change the root coords.
    doUpdate(root, 0, GraphicalBST.ROOT_X, GraphicalBST.ROOT_Y);
  }

  // ==============================================================================
  // Methods
  // ==============================================================================

  public insert(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer(this.codeLines);

    if (this._root === null) {
      this._root = GraphicalTreeNode.createNode(value);
      this._root.x = GraphicalBST.ROOT_X;
      this._root.y = GraphicalBST.ROOT_Y;

      animationProducer.addAnimationWithCodeHighlight(
        3,
        this._bstAnimationLibrary.drawNode,
        this._root,
        0
      );

    } else {
      this.doInsert(this._root, value, 0, animationProducer);
    }

    animationProducer.addAnimationWithCodeHighlight(
      9,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );

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
      animationProducer.addAnimationWithCodeHighlight(
        9,
        this._bstAnimationLibrary.highlightNode,
        node
      );
    } else if (value < node.value) {
      animationProducer.addAnimationWithCodeHighlight(
        5,
        this._bstAnimationLibrary.halfHighlightNode,
        node
      );

      // We can insert.
      if (node.leftChild === null) {
        node.leftChild = GraphicalTreeNode.createNode(value);
        // TODO: Find better way to dynamically set node coords based on depth.
        node.leftChild.x = node.x - GraphicalTreeNode.getChildOffsetX(depth);
        node.leftChild.y = node.y + GraphicalTreeNode.LINE_OFFSET_Y;

        animationProducer.addAnimationWithCodeHighlight(
          2,
          this._bstAnimationLibrary.revealLine,
          node.svgData.leftChildLine
        );

        animationProducer.addAnimationWithCodeHighlight(
          3,
          this._bstAnimationLibrary.drawNode,
          node.leftChild,
          depth + 1
        );
      } else {
        animationProducer.addAnimationWithCodeHighlight(
          6,
          this._bstAnimationLibrary.highlightLine,
          node.svgData.leftChildLine
        );
        this.doInsert(node.leftChild, value, depth + 1, animationProducer);
      }
    } else if (value > node.value) {
      animationProducer.addAnimationWithCodeHighlight(
        7,
        this._bstAnimationLibrary.halfHighlightNode,
        node
      );

      // We can insert.
      if (node.rightChild === null) {
        node.rightChild = GraphicalTreeNode.createNode(value);
        // TODO: Find better way to dynamically set node coords based on depth.
        node.rightChild.x = node.x + GraphicalTreeNode.getChildOffsetX(depth);
        node.rightChild.y = node.y + GraphicalTreeNode.LINE_OFFSET_Y;

        animationProducer.addAnimationWithCodeHighlight(
          2,
          this._bstAnimationLibrary.revealLine,
          node.svgData.rightChildLine
        );
        animationProducer.addAnimationWithCodeHighlight(
          3,
          this._bstAnimationLibrary.drawNode,
          node.rightChild,
          depth + 1
        );
      } else {
        animationProducer.addAnimationWithCodeHighlight(
          8,
          this._bstAnimationLibrary.highlightLine,
          node.svgData.rightChildLine
        );
        this.doInsert(node.rightChild, value, depth + 1, animationProducer);
      }
    }
  }

  public delete(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer(this.codeLines);
    this._root = this.doDelete(this._root, null, value, animationProducer);
    // Unhighlight the BST.
    animationProducer.addAnimationWithCodeHighlight(
      23,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );
    // Since the newRoot was assigned a new node (not null), we fix the BST
    // with their new updated coordinates on the canvas.
    this.updateNodePositions(this._root);
    animationProducer.addAnimationWithCodeHighlight(
      23,
      this._bstAnimationLibrary.fixBST,
      this._root,
      0
    );
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
        animationProducer.addAnimationWithCodeHighlight(
          7,
          this._bstAnimationLibrary.halfHighlightNode,
          root
        );
        animationProducer.addAnimationWithCodeHighlight(
          8,
          this._bstAnimationLibrary.highlightLine,
          root.svgData.leftChildLine
        );
        root.leftChild = this.doDelete(root.leftChild, root, value, animationProducer);
      } else if (value > root.value) {
        animationProducer.addAnimationWithCodeHighlight(
          9,
          this._bstAnimationLibrary.halfHighlightNode,
          root
        );
        animationProducer.addAnimationWithCodeHighlight(
          10,
          this._bstAnimationLibrary.highlightLine,
          root.svgData.rightChildLine
        );
        root.rightChild = this.doDelete(root.rightChild, root, value, animationProducer);
      } else {
        // We found the node we want to delete.
        if (root.leftChild === null && root.rightChild === null) {
          // Case 1: No subtrees.
          newRoot = null;

          // Free the node.
          animationProducer.addAnimationWithCodeHighlight(
            21,
            this._bstAnimationLibrary.freeNode,
            root,
            parent,
            true
          );
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
          animationProducer.addAnimationWithCodeHighlight(
            21,
            this._bstAnimationLibrary.freeNode,
            root,
            parent
          );
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
        ...this._bstAnimationLibrary.moveNodeLine(parent, curr.rightChild, parent.svgData.leftChildLine)
      );
      curr.rightChild = root2;
      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.revealLine(curr.svgData.rightChildLine),
        ...this._bstAnimationLibrary.moveNodeLine(curr, root2, curr.svgData.rightChildLine)
      );
    }
    curr.leftChild = root1;

    animationProducer.addCompleteSequence(
      ...this._bstAnimationLibrary.revealLine(curr.svgData.leftChildLine),
      ...this._bstAnimationLibrary.moveNodeLine(curr, root1, curr.svgData.leftChildLine)
    );
    return curr;
  }

  public search(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer(this.codeLines);
    this.doSearch(this._root, value, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      9,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );
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
      animationProducer.addAnimationWithCodeHighlight(
        3,
        this._bstAnimationLibrary.highlightNode,
        node
      );
      return node;
    }

    // Look in the children.
    if (value < node.value) {
      animationProducer.addAnimationWithCodeHighlight(
        5,
        this._bstAnimationLibrary.halfHighlightNode,
        node
      );
      animationProducer.addAnimationWithCodeHighlight(
        6,
        this._bstAnimationLibrary.highlightLine,
        node.svgData.leftChildLine
      );
      return this.doSearch(node.leftChild, value, animationProducer)
    } else if (value > node.value) {
      animationProducer.addAnimationWithCodeHighlight(
        8,
        this._bstAnimationLibrary.halfHighlightNode,
        node
      );
      animationProducer.addAnimationWithCodeHighlight(
        8,
        this._bstAnimationLibrary.highlightLine,
        node.svgData.rightChildLine
      );
      return this.doSearch(node.rightChild, value, animationProducer)
    }
    return null;
  }

  public rotateLeft(value: number) {
    const animationProducer = new AnimationProducer(this.codeLines);
    this._root = this.doRotateLeft(this._root, value, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      16,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );
    // Since the newRoot was assigned a new node (not null), we fix the BST
    // with their new updated coordinates on the canvas.
    this.updateNodePositions(this._root);
    animationProducer.addAnimationWithCodeHighlight(
      16,
      this._bstAnimationLibrary.fixBST,
      this._root,
      0
    );
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

      // Highlight the curr node and the new root.
      animationProducer.addAnimationWithCodeHighlight(
        2,
        this._bstAnimationLibrary.highlightNode,
        curr
      );

      const newRoot = curr.rightChild;
      if (newRoot === null) {
        return curr;
      }
      animationProducer.addAnimationWithCodeHighlight(
        6,
        this._bstAnimationLibrary.highlightNode,
        newRoot
      );
      
      curr.rightChild = newRoot.leftChild;
      if (newRoot.leftChild === null) {
        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.hideLine(curr.svgData.rightChildLine)
        )
      }

      animationProducer.addAnimationWithCodeHighlight(
        7,
        this._bstAnimationLibrary.moveNodeLine,
        curr,
        newRoot.leftChild,
        curr.svgData.rightChildLine
      );

      animationProducer.addAnimationWithCodeHighlight(
        8,
        this._bstAnimationLibrary.moveNodeLine,
        newRoot,
        curr,
        newRoot.svgData.leftChildLine
      );

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.revealLine(newRoot.svgData.leftChildLine)
      )

      newRoot.leftChild = curr;

      return newRoot;
    }
    
    if (value < curr.value) {
      animationProducer.addAnimationWithCodeHighlight(
        10,
        this._bstAnimationLibrary.halfHighlightNode,
        curr
      );
      animationProducer.addAnimationWithCodeHighlight(
        11,
        this._bstAnimationLibrary.highlightLine,
        curr.svgData.leftChildLine
      );
      curr.leftChild = this.doRotateLeft(curr.leftChild, value, animationProducer);
    } else if (value > curr.value) {
      animationProducer.addAnimationWithCodeHighlight(
        12,
        this._bstAnimationLibrary.halfHighlightNode,
        curr
      );
      animationProducer.addAnimationWithCodeHighlight(
        13,
        this._bstAnimationLibrary.highlightLine,
        curr.svgData.rightChildLine
      );
      curr.rightChild =  this.doRotateLeft(curr.rightChild, value, animationProducer);
    }

    return curr;
  }

  public rotateRight(value: number) {
    const animationProducer = new AnimationProducer(this.codeLines);
    this._root = this.doRotateRight(this._root, value, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      16,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );
    // Since the newRoot was assigned a new node (not null), we fix the BST
    // with their new updated coordinates on the canvas.
    this.updateNodePositions(this._root);
    animationProducer.addAnimationWithCodeHighlight(
      16,
      this._bstAnimationLibrary.fixBST,
      this._root,
      0
    );
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

      // Highlight the curr node and the new root.
      animationProducer.addAnimationWithCodeHighlight(
        2,
        this._bstAnimationLibrary.highlightNode,
        curr
      );

      const newRoot = curr.leftChild;
      if (newRoot === null) {
        return curr;
      }

      animationProducer.addAnimationWithCodeHighlight(
        6,
        this._bstAnimationLibrary.highlightNode,
        newRoot
      );

      curr.leftChild = newRoot.rightChild;
      if (newRoot.rightChild === null) {
        animationProducer.addCompleteSequence(
          ...this._bstAnimationLibrary.hideLine(curr.svgData.leftChildLine)
        )
      }

      animationProducer.addAnimationWithCodeHighlight(
        7,
        this._bstAnimationLibrary.moveNodeLine,
        curr,
        newRoot.rightChild,
        curr.svgData.leftChildLine
      );

      animationProducer.addAnimationWithCodeHighlight(
        8,
        this._bstAnimationLibrary.moveNodeLine,
        newRoot,
        curr,
        newRoot.svgData.rightChildLine
      );

      animationProducer.addCompleteSequence(
        ...this._bstAnimationLibrary.revealLine(newRoot.svgData.rightChildLine)
      )


      newRoot.rightChild = curr;

      return newRoot;
    }
    
    if (value < curr.value) {
      animationProducer.addAnimationWithCodeHighlight(
        10,
        this._bstAnimationLibrary.halfHighlightNode,
        curr
      );
      animationProducer.addAnimationWithCodeHighlight(
        11,
        this._bstAnimationLibrary.highlightLine,
        curr.svgData.leftChildLine
      );
      curr.leftChild = this.doRotateRight(curr.leftChild, value, animationProducer);
    } else if (value > curr.value) {
      animationProducer.addAnimationWithCodeHighlight(
        12,
        this._bstAnimationLibrary.halfHighlightNode,
        curr
      );
      animationProducer.addAnimationWithCodeHighlight(
        13,
        this._bstAnimationLibrary.highlightLine,
        curr.svgData.rightChildLine
      );
      curr.rightChild =  this.doRotateRight(curr.rightChild, value, animationProducer);
    }

    return curr;
  }

  public preorderTraversal(): AnimationProducer {
    const animationProducer = new AnimationProducer(this.codeLines);
    this.doPreorderTraversal(this._root, animationProducer);
    animationProducer.addAnimationWithCodeHighlight(
      9,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );
    return animationProducer;
  }

  private doPreorderTraversal(curr: GraphicalTreeNode | null, animationProducer: AnimationProducer) {
    if (curr === null) {
      return;
    }

    animationProducer.addAnimationWithCodeHighlight(
      6,
      this._bstAnimationLibrary.highlightNode,
      curr
    );

    animationProducer.addAnimationWithCodeHighlight(
      7,
      this._bstAnimationLibrary.highlightLine,
      curr.svgData.leftChildLine
    );

    this.doPreorderTraversal(curr.leftChild, animationProducer);
    
    animationProducer.addAnimationWithCodeHighlight(
      8,
      this._bstAnimationLibrary.highlightLine,
      curr.svgData.rightChildLine
    );

    this.doPreorderTraversal(curr.rightChild, animationProducer);
  }

  public inorderTraversal() {
    const animationProducer = new AnimationProducer(this.codeLines);
    this.doInorderTraversal(this._root, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      9,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );
    return animationProducer;
  }

  private doInorderTraversal(curr: GraphicalTreeNode | null, animationProducer: AnimationProducer) {
    if (curr === null) {
      return;
    }

    animationProducer.addAnimationWithCodeHighlight(
      1,
      this._bstAnimationLibrary.halfHighlightNode,
      curr
    );

    animationProducer.addAnimationWithCodeHighlight(
      6,
      this._bstAnimationLibrary.highlightLine,
      curr.svgData.leftChildLine
    );
    this.doInorderTraversal(curr.leftChild, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      7,
      this._bstAnimationLibrary.highlightNode,
      curr
    );

    animationProducer.addAnimationWithCodeHighlight(
      8,
      this._bstAnimationLibrary.highlightLine,
      curr.svgData.rightChildLine
    );
    this.doInorderTraversal(curr.rightChild, animationProducer);
  }

  public postorderTraversal() {
    const animationProducer = new AnimationProducer(this.codeLines);
    this.doPostorderTraversal(this._root, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      9,
      this._bstAnimationLibrary.unhighlightBST,
      this._root
    );
    return animationProducer;
  }

  private doPostorderTraversal(curr: GraphicalTreeNode | null, animationProducer: AnimationProducer) {
    if (curr === null) {
      return;
    }

    animationProducer.addAnimationWithCodeHighlight(
      1,
      this._bstAnimationLibrary.halfHighlightNode,
      curr
    );

    animationProducer.addAnimationWithCodeHighlight(
      6,
      this._bstAnimationLibrary.highlightLine,
      curr.svgData.leftChildLine
    );

    this.doPostorderTraversal(curr.leftChild, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      7,
      this._bstAnimationLibrary.highlightLine,
      curr.svgData.rightChildLine
    );

    this.doPostorderTraversal(curr.rightChild, animationProducer);

    animationProducer.addAnimationWithCodeHighlight(
      8,
      this._bstAnimationLibrary.highlightNode,
      curr
    );
  }

}

export default GraphicalBST;