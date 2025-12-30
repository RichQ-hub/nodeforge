import { Circle, Runner, SVG, Timeline } from "@svgdotjs/svg.js";
import AnimationProducer from "./common/AnimationProducer";
import GraphicalDataStructure from "./common/GraphicalDataStructure";
import GraphicalBST from "./BinarySearchTree/Animation/GraphicalBST";
import { VISUALISER_CANVAS_ID } from "./common/constants";

class VisualiserController {
  private _dataStructure: GraphicalDataStructure;
  private _timeline: Timeline;
  private _timelineDuration: number;

  public constructor() {
    this._dataStructure = new GraphicalBST();
    this._timeline = new Timeline().persist(true);
    this._timelineDuration = 0;
  }

  // ==============================================================================
  // Timeline Operations.
  // ==============================================================================

  public runOperation(command: string, ...args: number[]) {
    const animationProducer = this._dataStructure.execute(command, ...args);
    if (!animationProducer) {
      return;
    }

    this.constructTimeline(animationProducer);
  }

  public selectOperation(operationKey: string) {
    this._dataStructure.renderCode(operationKey);
  }

  public constructTimeline(animationProducer: AnimationProducer): void {
    this.finishTimeline();
    animationProducer.animationSequences.forEach((step) => {
      step.sequence.forEach((run) => {
        this._timeline.schedule(run, this._timelineDuration + 25, 'absolute');
      })

      // Increment the timer for the next step.
      this._timelineDuration += step.duration + 25;
    });

    // Play timeline.
    this._timeline.play();
  }

  public playTimeline() {
    this._timeline.play();
  }

  public pauseTimeline() {
    this._timeline.pause();
  }

  public finishTimeline() {
    this._timeline.finish();
  }

  public clearVisualiserCanvas(): void {
    SVG(VISUALISER_CANVAS_ID).clear();
    this.dataStructure.resetDataStructure();
    
    // Redraw the reference point circle.
    const circ = new Circle().center(500, 40).attr({
      r: '10',
      fill: '#f06',
    });

    circ.addTo(VISUALISER_CANVAS_ID);
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================

  public get dataStructure(): GraphicalDataStructure {
    return this._dataStructure;
  }
  public set dataStructure(value: GraphicalDataStructure) {
    this._dataStructure = value;
  }
}

export default VisualiserController;