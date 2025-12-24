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
  }

  public resetDataStructure(): void {
    this._root = null;
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

      // Draw and highlight newly added node.
      animationProducer.addMultipleAnimationStep(
        ...this._bstAnimationLibrary.drawNode(this._root),
        ...this._codeAnimationLibrary.highlightCode(this.codeLines[2])
      )

      animationProducer.addAnimationStep(
        this._bstAnimationLibrary.highlightNode(this._root)
      )

      animationProducer.addAnimationStep(
        this._bstAnimationLibrary.unhighlightBST(this._root)
      )

    } else {
      this.doInsert(this._root, value, 0, animationProducer);

      // Unhighlight the entire tree once done.
      animationProducer.addMultipleAnimationStep(
        ...this._bstAnimationLibrary.unhighlightBST(this._root),
        ...this._codeAnimationLibrary.highlightCode(this.codeLines[8])
      )
    }

    return animationProducer;
  }

  public doInsert(node: GraphicalTreeNode, value: number, depth: number, animationProducer: AnimationProducer) {
    if (depth > GraphicalBST.MAX_DEPTH) {
      console.log('Reached Max Depth');
      return;
    } else if (value === node.value) {
      // Node already exists, so we end recursion.
      animationProducer.addAnimationStep(
        this._bstAnimationLibrary.highlightNode(node)
      )

      animationProducer.addAnimationStep(
        this._bstAnimationLibrary.unhighlightNode(node)
      )
    } else if (value < node.value) {
      // TODO: TEST FOR NOW.
      animationProducer.addMultipleAnimationStep(
        ...this._bstAnimationLibrary.halfHighlightNode(node),
        ...this._codeAnimationLibrary.highlightCode(this.codeLines[4])
      )

      animationProducer.addMultipleAnimationStep(
        ...this._bstAnimationLibrary.highlightLine(node.svgData.leftChildLine),
        ...this._codeAnimationLibrary.highlightCode(this.codeLines[5])
      )

      // We can insert.
      if (node.leftChild === null) {
        node.leftChild = GraphicalTreeNode.createNode(value);
        // TODO: Find better way to dynamically set node coords based on depth.
        node.leftChild.x = node.x - GraphicalTreeNode.INITIAL_LINE_OFFSET_X / (2 ** depth);
        node.leftChild.y = node.y + 100;

        animationProducer.addAnimationStep(
          this._bstAnimationLibrary.plotNodeLine(node, node.leftChild, node.svgData.leftChildLine)
        )

        animationProducer.addMultipleAnimationStep(
          ...this._bstAnimationLibrary.drawNode(node.leftChild),
          ...this._codeAnimationLibrary.highlightCode(this.codeLines[2])
        )

        animationProducer.addAnimationStep(
          this._bstAnimationLibrary.highlightNode(node.leftChild)
        )
      } else {
        this.doInsert(node.leftChild, value, depth + 1, animationProducer);
      }
    } else if (value > node.value) {
      // TODO: TEST FOR NOW.
      animationProducer.addMultipleAnimationStep(
        ...this._bstAnimationLibrary.halfHighlightNode(node),
        ...this._codeAnimationLibrary.highlightCode(this.codeLines[6])
      )

      animationProducer.addMultipleAnimationStep(
        ...this._bstAnimationLibrary.highlightLine(node.svgData.rightChildLine),
        ...this._codeAnimationLibrary.highlightCode(this.codeLines[7])
      )

      // We can insert.
      if (node.rightChild === null) {
        node.rightChild = GraphicalTreeNode.createNode(value);
        // TODO: Find better way to dynamically set node coords based on depth.
        node.rightChild.x = node.x + GraphicalTreeNode.INITIAL_LINE_OFFSET_X / (2 ** depth);
        node.rightChild.y = node.y + 100;

        animationProducer.addAnimationStep(
          this._bstAnimationLibrary.plotNodeLine(node, node.rightChild, node.svgData.rightChildLine)
        )

        animationProducer.addMultipleAnimationStep(
          ...this._bstAnimationLibrary.drawNode(node.rightChild),
          ...this._codeAnimationLibrary.highlightCode(this.codeLines[2])
        )

        animationProducer.addAnimationStep(
          this._bstAnimationLibrary.highlightNode(node.rightChild)
        )
      } else {
        this.doInsert(node.rightChild, value, depth + 1, animationProducer);
      }
    }
  }


  public delete(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer();
    return animationProducer;
  }

}

export default GraphicalBST;