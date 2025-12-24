import { Runner } from "@svgdotjs/svg.js";
import GraphicalCodeLine from "./GraphicalCodeLine";
import GraphicalDataStructure from "../common/GraphicalDataStructure";

class CodeAnimations {
  private _dataStructure: GraphicalDataStructure;

  public constructor(dataStructure: GraphicalDataStructure) {
    this._dataStructure = dataStructure;
  }

  public highlightCode(codeTarget: GraphicalCodeLine): Runner[] {
    const sequence: Runner[] = [];
    const svgData = codeTarget.svgData;
    sequence.push(...this.unhighlightAllCodeLines());

    sequence.push(svgData.backgroundRect.animate(600).attr({
      opacity: 1
    }));

    sequence.push(svgData.text.animate(600).attr({
      fill: '#000'
    }));

    return sequence;
  }

  public unhighlightCode(codeTarget: GraphicalCodeLine): Runner[] {
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

  public unhighlightAllCodeLines(): Runner[] {
    console.log(this._dataStructure.codeLines.length);
    const sequence: Runner[] = [];
    this._dataStructure.codeLines.forEach((l) => {
      sequence.push(...this.unhighlightCode(l))
    });
    return sequence;
  }
}

export default CodeAnimations;