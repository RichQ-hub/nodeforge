import { Line, Runner } from "@svgdotjs/svg.js";
import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";
import { getPointerStartEndCoordinates } from "./helpers";

class BSTAnimations {
  private _canvasId: string;

  public constructor(canvasId: string) {
    this._canvasId = canvasId;
  }

  // ==============================================================================
  // Methods
  // ==============================================================================

  /**
   * Draws a node at (x, y) in terms of the user coordinate space of the
   * svg canvas.
   * @param x 
   * @param y 
   */
  public drawNode(node: GraphicalTreeNode): Runner[] {
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

    return sequence;
  }

  /**
   * Sets the correct line endpoints between the node and its child.
   * @param node 
   * @param child 
   * @param line The line connecting the 2 nodes.
   * @returns 
   */
  public plotNodeLine(node: GraphicalTreeNode, child: GraphicalTreeNode, line: Line) {
    const lineCoords = getPointerStartEndCoordinates(node.x, node.y, child.x, child.y, GraphicalTreeNode.NODE_RADIUS);
    line.plot(lineCoords);
    return this.revealLine(line);
  }

  public unhighlightBST(root: GraphicalTreeNode): Runner[] {
    const sequence: Runner[] = [];
    this.recurseUnlighlightBST(root, sequence);
    return sequence;
  }

  private recurseUnlighlightBST(node: GraphicalTreeNode | null, sequence: Runner[]): void {
    if (node === null) {
      return;
    }

    sequence.push(
      ...this.unhighlightNode(node),
      ...this.unhighlightLine(node.svgData.leftChildLine),
      ...this.unhighlightLine(node.svgData.rightChildLine)
    );
    this.recurseUnlighlightBST(node.leftChild, sequence);
    this.recurseUnlighlightBST(node.rightChild, sequence);
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

  public revealLine(line: Line): Runner[] {
    const sequence: Runner[] = [];
    
    sequence.push(line.animate(600).attr({
      opacity: 1
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