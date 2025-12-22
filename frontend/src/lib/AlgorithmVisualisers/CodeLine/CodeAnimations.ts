import { Runner } from "@svgdotjs/svg.js";
import GraphicalCodeLine from "./GraphicalCodeLine";

class CodeAnimations {
  public highlightCode(codeTarget: GraphicalCodeLine): Runner[] {
    const sequence: Runner[] = [];
    const svgData = codeTarget.svgData;

    sequence.push(svgData.backgroundRect.animate(1000).attr({
      opacity: 1
    }));

    sequence.push(svgData.text.animate(1000).attr({
      fill: '#000'
    }));

    return sequence;
  }

  public unhighlightCode(codeTarget: GraphicalCodeLine): Runner[] {
    const sequence: Runner[] = [];
    const svgData = codeTarget.svgData;

    sequence.push(svgData.backgroundRect.animate(1000).attr({
      opacity: 0
    }));

    sequence.push(svgData.text.animate(1000).attr({
      fill: '#fff'
    }));

    return sequence;
  }
}

export default CodeAnimations;