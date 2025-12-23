import { Circle, Line, Marker, NumberAlias, Text } from "@svgdotjs/svg.js";

export interface SVGData {
  shape: Circle;
  text: Text;
  leftChildLine: Line;
  rightChildLine: Line;
  // leftChildArrow: Marker;
  // rightChildMarker: Marker;
}

export interface NodeCoordinates {
  x: number;
  y: number;
}

class GraphicalTreeNode {
  private _coordinates: NodeCoordinates;
  private _value: number;
  private _leftChild: GraphicalTreeNode | null;
  private _rightChild: GraphicalTreeNode | null;
  private _svgData: SVGData;

  public constructor(nodeCoordinates: NodeCoordinates, value: number, svgData: SVGData) {
    this._coordinates = nodeCoordinates;
    this._value = value;
    this._svgData = svgData;
    this._leftChild = null;
    this._rightChild = null;
  }

  // ==============================================================================
  // Methods
  // ==============================================================================

  public static createNode(value: number): GraphicalTreeNode {
    const shape = new Circle().radius(30).attr({
      fill: '#D6E7F9',
      stroke: '#0285BD',
      'stroke-width': 2,
      opacity: 0,
    });

    const text = new Text()
      .text(value.toString())
      .font({
        family: 'JetBrains Mono',
        weight: 700,
        size: 20
      })
      .attr({
        fill: '#0285BD',
        opacity: 0,
      });

    const leftLine = new Line()
      .attr({
        stroke: '#0285BD',
        opacity: 0,
        'stroke-width': 2,
      });
    const rightLine = new Line()
      .attr({
        stroke: '#0285BD',
        opacity: 0,
        'stroke-width': 2,
      });

    return new GraphicalTreeNode(
      { x: 0, y: 0},
      value,
      {
        shape,
        text,
        leftChildLine: leftLine,
        rightChildLine: rightLine,
      }
    );
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================

  public get coordinates(): NodeCoordinates {
    return this._coordinates;
  }
  public set coordinates(value: NodeCoordinates) {
    this._coordinates = value;
  }

  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    this._value = value;
  }

  public get leftChild(): GraphicalTreeNode | null {
    return this._leftChild;
  }
  public set leftChild(value: GraphicalTreeNode | null) {
    this._leftChild = value;
  }

  public get rightChild(): GraphicalTreeNode | null {
    return this._rightChild;
  }
  public set rightChild(value: GraphicalTreeNode | null) {
    this._rightChild = value;
  }

  public get svgData(): SVGData {
    return this._svgData;
  }
  public set svgData(value: SVGData) {
    this._svgData = value;
  }

}

export default GraphicalTreeNode;