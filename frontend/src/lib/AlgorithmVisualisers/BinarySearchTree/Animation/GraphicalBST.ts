import AnimationProducer from "../../common/AnimationProducer";
import { VISUALISER_CANVAS_ID } from "../../common/constants";
import GraphicalDataStructure from "../../common/GraphicalDataStructure";
import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";
import BSTAnimations from "./BSTAnimations";
import { deleteCode, insertCode } from "./CodeSnippets";

class GraphicalBST extends GraphicalDataStructure {
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
      this._root.coordinates = {
        x: 500,
        y: 40,
      }

      // Draw and highlight newly added node.
      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.drawNode(this._root)
      )
      animationProducer.finishSequence();

      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.highlightNode(this._root)
      )
      animationProducer.finishSequence();

      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.unhighlightBST(this._root)
      )
      animationProducer.finishSequence();
    } else {
      this.doInsert(this._root, value, animationProducer);

      // Unhighlight the entire tree once done.
      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.unhighlightBST(this._root)
      )
      animationProducer.finishSequence();
    }

    return animationProducer;
  }

  public doInsert(node: GraphicalTreeNode, value: number, animationProducer: AnimationProducer) {
    if (value === node.value) {
      // Node already exists, so we end recursion.
      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.highlightNode(node)
      )
      animationProducer.finishSequence();

      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.unhighlightNode(node)
      )
      animationProducer.finishSequence();
    } else if (value < node.value) {
      // TODO: TEST FOR NOW.
      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.halfHighlightNode(node)
      )
      animationProducer.finishSequence();

      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.highlightLine(node.svgData.leftChildLine)
      )
      animationProducer.finishSequence();

      // We can insert.
      if (node.leftChild === null) {
        node.leftChild = GraphicalTreeNode.createNode(value);
        // TODO: Find better way to dynamically set node coords based on depth.
        node.leftChild.coordinates = {
          x: node.coordinates.x - 300,
          y: node.coordinates.y + 100,
        }

        animationProducer.addMultipleSequenceAnimations(
          this._bstAnimationLibrary.revealLine(node.svgData.leftChildLine)
        )
        animationProducer.finishSequence();

        animationProducer.addMultipleSequenceAnimations(
          this._bstAnimationLibrary.drawNode(node.leftChild)
        )
        animationProducer.finishSequence();

        animationProducer.addMultipleSequenceAnimations(
          this._bstAnimationLibrary.highlightNode(node.leftChild)
        )
        animationProducer.finishSequence();
      } else {
        this.doInsert(node.leftChild, value, animationProducer);
      }
    } else if (value > node.value) {

    }
  }


  public delete(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer();
    return animationProducer;
  }

}

export default GraphicalBST;