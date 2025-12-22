import { SVG } from '@svgdotjs/svg.js';
import { CODE_CANVAS_ID, OperationUsage, VISUALISER_CANVAS_ID } from './constants';
import GraphicalCodeLine from '../CodeLine/GraphicalCodeLine';
import CodeAnimations from '../CodeLine/CodeAnimations';

interface IDataStructure {
  execute(command: any, ...args: any[]): any;
  getOperations(): string[];
  switchOperation(operationKey: string): void;
}

abstract class GraphicalDataStructure implements IDataStructure {
  protected _operations: Map<string, OperationUsage> = new Map();
  protected _selectedOperation = '';

  protected _codeLines: GraphicalCodeLine[];
  protected _codeAnimationLibrary: CodeAnimations;

  public constructor() {
    this._codeLines = [];
    this._codeAnimationLibrary = new CodeAnimations();
  }

  public abstract registerOperations(): void;

  public execute(...args: any[]) {
    const commandFn = this._operations.get(this._selectedOperation);
    if (!commandFn) {
      console.log('Operation does not exist.');
      return;
    }

    return commandFn.run(...args);
  }

  public getOperations(): string[] {
    return Array.from(this._operations.keys());
  }

  public switchOperation(operationKey: string): void {
    const operationDoc = this._operations.get(operationKey);
    if (!operationDoc) {
      console.log('Operation not found');
      return;
    }

    this._selectedOperation = operationKey;
    this.renderCode(operationDoc.codeSnippet);
  }

  private renderCode(codeSnippet: string): void {
    this.clearCodeCanvas();
    const lines = codeSnippet.split('\n');

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

  public clearVisualiserCanvas(): void {
    SVG(VISUALISER_CANVAS_ID).clear();
  }
}


export default GraphicalDataStructure;