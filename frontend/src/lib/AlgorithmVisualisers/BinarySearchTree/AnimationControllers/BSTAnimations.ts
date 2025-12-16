import { Runner } from "@svgdotjs/svg.js";
import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";

const CANVAS_ID: string = '#visualiser-canvas';

class BSTAnimations {
  private _canvasId: string;

  public constructor(canvasId: string) {
    this._canvasId = canvasId;
  }

  /**
   * Draws a node at (x, y) in terms of the user coordinate space of the
   * svg canvas.
   * @param x 
   * @param y 
   */
  public drawNode(x: number, y: number): Runner[] {
    const sequence: Runner[] = [];
    const node = GraphicalTreeNode.createNode(88);
    const svgData = node.svgData;

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




  public get canvasId(): string {
    return this._canvasId;
  }
  public set canvasId(value: string) {
    this._canvasId = value;
  }

}

export default BSTAnimations;