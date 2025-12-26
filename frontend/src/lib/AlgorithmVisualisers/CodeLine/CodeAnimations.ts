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
    sequence.push(...this.unhighlightAllCodeLines());
    this.currHighlightedLines.push(codeTarget);

    sequence.push(svgData.backgroundRect.animate(600).attr({
      opacity: 1
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#000'
    }));

    return sequence;
  }

  public unhighlightAllCodeLines(): Runner[] {
    const sequence: Runner[] = [];
    this.currHighlightedLines.forEach((l) => {
      sequence.push(...this.unhighlightCode(l))
    });
    this._currHighlightedLines = [];
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