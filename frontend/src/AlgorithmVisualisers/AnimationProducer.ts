import { Runner } from "@svgdotjs/svg.js";

interface AnimationRunner {
  runners: Runner[];
}

class AnimationProducer {
  private animationSteps: AnimationRunner[] = [];
  private currAnimationSequence: Runner[] = [];
  
}

export default AnimationProducer;