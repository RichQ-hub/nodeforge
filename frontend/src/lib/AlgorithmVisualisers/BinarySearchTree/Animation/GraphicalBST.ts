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
      args: [{
        name: 'Value',
        placeholder: 'value',
        inputType: 'number',
      }],
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

  // ==============================================================================
  // Methods
  // ==============================================================================

  public insert(value: number, width: number, height: number): AnimationProducer {
    const animationProducer = new AnimationProducer();
    const newNode = GraphicalTreeNode.createNode(value);
    newNode.coordinates = {
      x: 100,
      y: 100,
    }

    animationProducer.addMultipleSequenceAnimations(
      this._bstAnimationLibrary.drawNode(newNode)
    )
    animationProducer.finishSequence();

    animationProducer.addMultipleSequenceAnimations(
      this._bstAnimationLibrary.highlightNode(newNode)
    )
    animationProducer.finishSequence();

    animationProducer.addMultipleSequenceAnimations(
      this._bstAnimationLibrary.UnhighlightNode(newNode)
    )
    animationProducer.finishSequence();

    return animationProducer;
  }

  public doInsert(node: GraphicalTreeNode, value: number, animationProducer: AnimationProducer ) {

  }


  public delete(value: number): AnimationProducer {
    const animationProducer = new AnimationProducer();
    return animationProducer;
  }

}

export default GraphicalBST;