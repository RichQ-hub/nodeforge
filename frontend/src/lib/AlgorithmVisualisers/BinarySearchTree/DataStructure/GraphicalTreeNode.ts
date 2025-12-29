import { Circle, Line, Text } from "@svgdotjs/svg.js";

export interface SVGData {
  shape: Circle;
  text: Text;
  leftChildLine: Line;
  rightChildLine: Line;
  // leftChildArrow: Marker;
  // rightChildMarker: Marker;
}

class GraphicalTreeNode {
  public static NODE_RADIUS: number = 30;
  public static INITIAL_LINE_OFFSET_X = 500;
  public static LINE_OFFSET_Y = 100;

  private _x: number;
  private _y: number;

  private _value: number;
  private _leftChild: GraphicalTreeNode | null;
  private _rightChild: GraphicalTreeNode | null;
  private _svgData: SVGData;

  public constructor(value: number, svgData: SVGData) {
    this._x = 0;
    this._y = 0;
    this._value = value;
    this._svgData = svgData;
    this._leftChild = null;
    this._rightChild = null;
  }

  // ==============================================================================
  // Methods
  // ==============================================================================

  public static createNode(value: number): GraphicalTreeNode {
    const shape = new Circle().radius(this.NODE_RADIUS).attr({
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
      value,
      {
        shape,
        text,
        leftChildLine: leftLine,
        rightChildLine: rightLine,
      }
    );
  }

  public static getChildOffsetX(depth: number): number {
    return this.INITIAL_LINE_OFFSET_X / (2 ** depth);
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================

  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
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