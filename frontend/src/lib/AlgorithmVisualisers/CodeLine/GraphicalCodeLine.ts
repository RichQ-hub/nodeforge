import { G, Rect, Text } from "@svgdotjs/svg.js";

export interface CodeSvgData {
  container: G;
  backgroundRect: Rect;
  text: Text;
}

export interface CodeNodeCoordinates {
  x: number;
  y: number;
}

class GraphicalCodeLine {
  public static BOX_HEIGHT = 24;
  public static X_PADDING = 10;

  private _codeString: string;
  private _svgData: CodeSvgData;

  public constructor(codeString: string) {
    this._codeString = codeString;
    this._svgData = GraphicalCodeLine.createSvgData(codeString);
  }

  // ==============================================================================
  // Methods
  // ==============================================================================

  private static createSvgData(code: string): CodeSvgData {
    const group = new G();
    
    const backgroundRect = new Rect()
      .size(0, this.BOX_HEIGHT)
      .attr({
        opacity: 0
      })
      .fill('#DE24FF')
      .move(0, 0)
      
    const text = new Text()
      .text(code)
      .attr({
        'dominant-baseline': 'central',
        x: this.X_PADDING,
        y: this.BOX_HEIGHT / 2
      })
      .fill('#fff')
      .attr('style', 'white-space: pre-wrap')
      .font({
        family: 'JetBrains Mono',
        weight: 400,
        size: 12,
      })
    
    group.add(backgroundRect);
    group.add(text);
  
    return {
      container: group,
      backgroundRect,
      text,
    }
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================

  public get codeString(): string {
    return this._codeString;
  }
  public set codeString(value: string) {
    this._codeString = value;
  }

  public get svgData(): CodeSvgData {
    return this._svgData;
  }
  public set svgData(value: CodeSvgData) {
    this._svgData = value;
  }

}

export default GraphicalCodeLine;