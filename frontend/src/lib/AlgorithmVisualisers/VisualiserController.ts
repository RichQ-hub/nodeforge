import { Runner, Timeline } from "@svgdotjs/svg.js";
import AnimationProducer from "./common/AnimationProducer";
import GraphicalDataStructure from "./common/GraphicalDataStructure";
import GraphicalBST from "./BinarySearchTree/Animation/GraphicalBST";

class VisualiserController {
  private _dataStructure: GraphicalDataStructure;
  private _timeline: Timeline;
  private _timelineDuration: number;

  /**
   * FOR TESTING.
   */
  private testArr: number[] = [];

  public constructor() {
    this._dataStructure = new GraphicalBST();
    this._timeline = new Timeline().persist(true);
    this._timelineDuration = 0;
  }

  public switchOperation(operationKey: string): void {
    this._dataStructure.switchOperation(operationKey);
  }

  /**
   * FOR TESTING.
   */
  public testUpdate() {
    this.testArr.push(2);
    console.log(this.testArr);
  }

  // ==============================================================================
  // Timeline Operations.
  // ==============================================================================

  public runOperation(command: string, ...args: number[]) {
    this._dataStructure.switchOperation(command);
    const animationProducer = this._dataStructure.execute(...args);
    if (!animationProducer) {
      return;
    }

    this.constructTimeline(animationProducer);
  }

  public constructTimeline(animationProducer: AnimationProducer): void {
    animationProducer.animationSteps.forEach((step) => {
      step.runners.forEach((run) => {
        this._timeline.schedule(run, this._timelineDuration + 25, 'absolute');
      })

      const maxRunner = step.runners.reduce((prev: Runner, curr: Runner) => {
        return prev.duration() < curr.duration() ? curr : prev;
      })

      // Increment the timer for the next step.
      this._timelineDuration += maxRunner.duration() + 25;
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