import { Runner } from "@svgdotjs/svg.js";
import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";

const CANVAS_ID: string = '#visualiser-canvas';

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

    const x = node.coordinates.x;
    const y = node.coordinates.y;
    svgData.shape.center(x, y).addTo(this.canvasId);
    svgData.text.center(x, y).addTo(this.canvasId);

    sequence.push(svgData.shape.animate(1000).attr({
      opacity: 1
    }));

    sequence.push(svgData.text.animate(1000).attr({
      opacity: 1
    }));

    return sequence;
  }

  public highlightNode(node: GraphicalTreeNode): Runner[] {
    const sequence: Runner[] = [];
    const svgData = node.svgData;

    sequence.push(svgData.shape.animate(600).attr({
      fill: '#01CF68',
      stroke: '#00A547',
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
      stroke: '#00A547',
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#00A547'
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