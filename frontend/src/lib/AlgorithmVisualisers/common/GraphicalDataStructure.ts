import { SVG } from '@svgdotjs/svg.js';
import { CODE_CANVAS_ID, OperationUsage } from './constants';
import GraphicalCodeLine from '../CodeLine/GraphicalCodeLine';
import CodeAnimations from '../CodeLine/CodeAnimations';

interface IDataStructure {
  execute(command: any, ...args: any[]): any;
  getOperations(): string[];
  resetDataStructure(): void;
  renderCode(operationKey: string): void;
}

abstract class GraphicalDataStructure implements IDataStructure {
  protected _operations: Map<string, OperationUsage> = new Map();

  private _codeLines: GraphicalCodeLine[];
  protected _codeAnimationLibrary: CodeAnimations;

  public constructor() {
    this._codeLines = [];
    this._codeAnimationLibrary = new CodeAnimations();
  }

  public abstract registerOperations(): void;
  public abstract resetDataStructure(): void;

  public execute(operationKey: string, ...args: any[]) {
    const commandFn = this._operations.get(operationKey);
    if (!commandFn) {
      console.log('Operation does not exist.');
      return;
    }

    return commandFn.run(...args);
  }

  public getOperations(): string[] {
    return Array.from(this._operations.keys());
  }

  public getOperationDetails(operationKey: string): OperationUsage | undefined {
    return this._operations.get(operationKey);
  }

  public renderCode(operationKey: string): void {
    this.clearCodeCanvas();
    const operation = this._operations.get(operationKey);
    if (!operation) {
      console.log('Cannot render operation code.');
      return;
    }

    const lines = operation.codeSnippet.split('\n');

    let maxCanvasWidth = 0;

    // Create object representations for each line of code, containing their
    // svg information.
    lines.forEach((line, idx) => {
      const newCodeTarget = new GraphicalCodeLine(line);
      this._codeLines.push(newCodeTarget);
      const svgData = newCodeTarget.svgData;

      // Add it into the canvas
      svgData.container.translate(0, GraphicalCodeLine.BOX_HEIGHT * idx);

      // Get max line width.
      const lineWidth = svgData.container.bbox().width;
      maxCanvasWidth = lineWidth > maxCanvasWidth ? lineWidth : maxCanvasWidth;
    });

    SVG(CODE_CANVAS_ID).size(
      maxCanvasWidth + (GraphicalCodeLine.X_PADDING * 2),
      GraphicalCodeLine.BOX_HEIGHT * lines.length
    );

    this._codeLines.map((codeLine) => {
      codeLine.svgData.backgroundRect.width(maxCanvasWidth + (GraphicalCodeLine.X_PADDING * 2));
      codeLine.svgData.container.addTo(CODE_CANVAS_ID);
    });
  }

  public clearCodeCanvas(): void {
    this._codeLines = [];
    SVG(CODE_CANVAS_ID).clear();
  }

  public get codeLines(): GraphicalCodeLine[] {
    return this._codeLines;
  }
  public set codeLines(value: GraphicalCodeLine[]) {
    this._codeLines = value;
  }
}


export default GraphicalDataStructure;