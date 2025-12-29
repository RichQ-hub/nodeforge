import { Line, Runner } from "@svgdotjs/svg.js";
import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";
import { getPointerStartEndCoordinates } from "./helpers";

class BSTAnimations {
  private _canvasId: string;

  public constructor(canvasId: string) {
    this._canvasId = canvasId;
  }

  // ==============================================================================
  // Node Animations.
  // ==============================================================================

  /**
   * Draws a node at (x, y) in terms of the user coordinate space of the
   * svg canvas.
   * @param x 
   * @param y 
   */
  public drawNode(node: GraphicalTreeNode | null): Runner[] {
    if (node === null) {
      return [];
    }
    const sequence: Runner[] = [];
    const svgData = node.svgData;

    svgData.shape.addTo(this.canvasId);
    svgData.text.addTo(this.canvasId);
    svgData.leftChildLine.addTo(this.canvasId);
    svgData.rightChildLine.addTo(this.canvasId);

    const x = node.x;
    const y = node.y;

    svgData.shape.center(x, y);
    svgData.text.center(x, y);

    sequence.push(svgData.shape.animate(600).attr({
      opacity: 1
    }));

    sequence.push(svgData.text.animate(600).attr({
      opacity: 1
    }));

    // Automatically highlight node when inserted.
    sequence.push(...this.highlightNode(node));

    return sequence;
  }

  public unhighlightBST(root: GraphicalTreeNode | null): Runner[] {
    if (root === null) {
      return [];
    }
    const sequence: Runner[] = [];

    const recurseUnlighlightBST = (curr: GraphicalTreeNode | null) => {
      if (curr === null) {
        return;
      }

      sequence.push(
        ...this.unhighlightNode(curr),
        ...this.unhighlightLine(curr.svgData.leftChildLine),
      ...this.unhighlightLine(curr.svgData.rightChildLine)
      )

      recurseUnlighlightBST(curr.leftChild);
      recurseUnlighlightBST(curr.rightChild);
    }

    recurseUnlighlightBST(root);
    return sequence;
  }

  public freeNode(
    node: GraphicalTreeNode | null,
    parent: GraphicalTreeNode | null,
    hideParentLine: boolean = false
  ): Runner[] {
    if (node === null) {
      return [];
    }

    const sequence: Runner[] = [];
  
    // If we want to hide the parent line to the child.
    if (parent !== null && hideParentLine) {
      if (parent.leftChild === node) {
        sequence.push(parent.svgData.leftChildLine.animate(600).attr({
          opacity: 0,
        }));
      } else {
        sequence.push(parent.svgData.rightChildLine.animate(600).attr({
          opacity: 0,
        }));
      }
    }

    sequence.push(node.svgData.shape.animate(600).attr({
      opacity: 0,
    }));
    sequence.push(node.svgData.text.animate(600).attr({
      opacity: 0,
    }))
    sequence.push(node.svgData.rightChildLine.animate(600).attr({
      opacity: 0,
    }))
    sequence.push(node.svgData.leftChildLine.animate(600).attr({
      opacity: 0,
    }))

    return sequence;
  }

  /**
   * Repositions changed node positions to their correct coordinates on the canvas.
   * @param node 
   * @param depth 
   */
  public fixBST(root: GraphicalTreeNode | null, depth: number): Runner[] {
    if (root === null) {
      return [];
    }

    const sequence: Runner[] = [];

    /**
     * Internal Recursive function.
     * @param curr 
     * @param currDepth 
     */
    const doFixBST = (curr: GraphicalTreeNode | null, currDepth: number) => {
      if (curr === null) {
        return;
      }

      sequence.push(curr.svgData.shape.animate(600).center(curr.x, curr.y));
      sequence.push(curr.svgData.text.animate(600).center(curr.x, curr.y));

      // Fix left line.
      sequence.push(
        ...this.plotNodeLine(curr, curr.leftChild, curr.svgData.leftChildLine)
      );

      // Fix right line.
      sequence.push(
        ...this.plotNodeLine(curr, curr.rightChild, curr.svgData.rightChildLine)
      );

      doFixBST(curr.leftChild, currDepth + 1);
      doFixBST(curr.rightChild, currDepth + 1);
    }

    doFixBST(root, depth);

    return sequence;
  }

  public highlightNode(node: GraphicalTreeNode): Runner[] {
    const sequence: Runner[] = [];
    const svgData = node.svgData;

    sequence.push(svgData.shape.animate(600).attr({
      fill: '#F71B1F',
      stroke: '#C00003',
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#ffffff'
    }));

    return sequence;
  }

  public halfHighlightNode(node: GraphicalTreeNode): Runner[] {
    const sequence: Runner[] = [];
    const svgData = node.svgData;

    sequence.push(svgData.shape.animate(600).attr({
      stroke: '#C00003',
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#C00003'
    }));

    return sequence;
  }

  public unhighlightNode(node: GraphicalTreeNode): Runner[] {
    const sequence: Runner[] = [];
    const svgData = node.svgData;

    sequence.push(svgData.shape.animate(600).attr({
      fill: '#D6E7F9',
      stroke: '#0285BD',
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#0285BD'
    }));

    return sequence;
  }

  // ==============================================================================
  // Line Animations.
  // ==============================================================================

  public revealLine(line: Line): Runner[] {
    const sequence: Runner[] = [];
    
    sequence.push(line.animate(600).attr({
      opacity: 1
    }));

    return sequence;
  }

  public hideLine(line: Line): Runner[] {
    const sequence: Runner[] = [];
    
    sequence.push(line.animate(600).attr({
      opacity: 0
    }));

    return sequence;
  }

  public highlightLine(line: Line): Runner[] {
    const sequence: Runner[] = [];

    sequence.push(line.animate(600).attr({
      stroke: '#C00003',
    }));

    return sequence;
  }

  public unhighlightLine(line: Line): Runner[] {
    const sequence: Runner[] = [];

    sequence.push(line.animate(600).attr({
      stroke: '#44A0C8',
    }));

    return sequence;
  }

  /**
   * Sets the correct line endpoints between the node and its child.
   * @param node 
   * @param child 
   * @param line The line connecting the 2 nodes.
   * @returns 
   */
  public plotNodeLine(node: GraphicalTreeNode | null, child: GraphicalTreeNode | null, line: Line): Runner[] {
    if (node === null || child === null) {
      return [];
    }
    const sequence: Runner[] = [];
    const lineCoords = getPointerStartEndCoordinates(node.x, node.y, child.x, child.y);
    sequence.push(line.animate(600).plot(lineCoords));
    sequence.push(...this.revealLine(line));
    return sequence;
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================

  public get canvasId(): string {
    return this._canvasId;
  }

  public set canvasId(value: string) {
    this._canvasId = value;
  }
}

export default BSTAnimations;