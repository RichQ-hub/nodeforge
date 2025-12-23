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

    const x = node.coordinates.x;
    const y = node.coordinates.y;

    svgData.shape.center(x, y);
    svgData.text.center(x, y);

    const leftLineCoords = getPointerStartEndCoordinates(x, y, x - 300, y + 100, 30);
    svgData.leftChildLine.plot(leftLineCoords);

    const rightLineCoords = getPointerStartEndCoordinates(x, y, x + 300, y + 100, 30);
    svgData.rightChildLine.plot(rightLineCoords);

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

    sequence.push(svgData.shape.animate(1000).attr({
      fill: '#01CF68',
      stroke: '#00A547',
    }));

    sequence.push(svgData.text.animate(1000).attr({
      fill: '#ffffff'
    }));

    return sequence;
  }

  public halfHighlightNode(node: GraphicalTreeNode): Runner[] {
    const sequence: Runner[] = [];
    const svgData = node.svgData;

    sequence.push(svgData.shape.animate(1000).attr({
      stroke: '#00A547',
    }));

    sequence.push(svgData.text.animate(1000).attr({
      fill: '#00A547'
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
    
    sequence.push(line.animate(1000).attr({
      opacity: 1
    }));

    return sequence;
  }

  public highlightLine(line: Line): Runner[] {
    const sequence: Runner[] = [];

    sequence.push(line.animate(1000).attr({
      stroke: '#00A547',
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