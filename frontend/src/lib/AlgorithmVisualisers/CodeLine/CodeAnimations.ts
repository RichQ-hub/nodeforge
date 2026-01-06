import { Runner } from "@svgdotjs/svg.js";
import GraphicalCodeLine from "./GraphicalCodeLine";

class CodeAnimations {
  private _currHighlightedLines: GraphicalCodeLine[];

  public constructor() {
    this._currHighlightedLines = [];
  }

  public highlightCode(codeTarget: GraphicalCodeLine): Runner[] {
    const sequence: Runner[] = [];
    const svgData = codeTarget.svgData;
    sequence.push(...this.unhighlightCodeLines(this.currHighlightedLines));

    sequence.push(svgData.backgroundRect.animate(600).attr({
      opacity: 1
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#000'
    }));

    this.currHighlightedLines.push(codeTarget);

    return sequence;
  }

  public unhighlightCodeLines(codeLines: GraphicalCodeLine[]): Runner[] {
    const sequence: Runner[] = [];
    codeLines.forEach((l) => {
      sequence.push(...this.unhighlightCode(l))
    });
    this.currHighlightedLines = [];
    return sequence;
  }

  private unhighlightCode(codeTarget: GraphicalCodeLine): Runner[] {
    const sequence: Runner[] = [];
    const svgData = codeTarget.svgData;

    sequence.push(svgData.backgroundRect.animate(600).attr({
      opacity: 0
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#fff'
    }));

    return sequence;
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================

  public get currHighlightedLines(): GraphicalCodeLine[] {
    return this._currHighlightedLines;
  }
  public set currHighlightedLines(value: GraphicalCodeLine[]) {
    this._currHighlightedLines = value;
  }
}

export default CodeAnimations;