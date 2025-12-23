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
        this._bstAnimationLibrary.unhighlightNode(this._root)
      )
      animationProducer.finishSequence();
    } else {
      this.doInsert(this._root, value, 2, animationProducer);

      // Unhighlight the root node.
      animationProducer.addMultipleSequenceAnimations(
        this._bstAnimationLibrary.unhighlightNode(this._root)
      )
      animationProducer.finishSequence();
    }

    return animationProducer;
  }

  public doInsert(node: GraphicalTreeNode, value: number, level: number, animationProducer: AnimationProducer) {
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

    } else if (value > node.value) {

    }
  }


  public delete(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer();
    return animationProducer;
  }

}

export default GraphicalBST;