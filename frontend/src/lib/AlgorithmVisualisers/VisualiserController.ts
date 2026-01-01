import { Circle, SVG, Timeline } from "@svgdotjs/svg.js";
import AnimationProducer from "./common/AnimationProducer";
import GraphicalDataStructure from "./common/GraphicalDataStructure";
import GraphicalBST from "./BinarySearchTree/Animation/GraphicalBST";
import { VISUALISER_CANVAS_ID } from "./common/constants";

class VisualiserController {
  private _dataStructure: GraphicalDataStructure;
  private _timeline: Timeline;
  private _timelineDuration: number;
  private _timestamps: number[];
  private _speed: number;

  public constructor() {
    this._dataStructure = new GraphicalBST();
    this._timeline = new Timeline().persist(true);
    this._timelineDuration = 0;
    this._timestamps = [0];
    this._speed = 1;
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
    this.resetTimeline();

    animationProducer.animationSequences.forEach((step) => {
      step.sequence.forEach((run) => {
        this._timeline.schedule(run, this._timelineDuration + 25, 'absolute');
      })

      // Increment the timer for the next step.
      this._timelineDuration += step.duration + 25;

      // Create a timestamp.
      this._timestamps.push(this.timelineDuration + 1);
    });

    // Play timeline.
    this.playTimeline();
  }

  public resetTimeline() {
    this.timeline = new Timeline().persist(true);
    this.timelineDuration = 0;
    this._timestamps = [0];
    this.timeline.speed(this._speed);
  }

  /**
   * Sets the progress of the timeline to the given percent.
   * @param percent Between 0 - 100
   */
  public seekPercent(percent: number) {
    const pos = (percent * this.timelineDuration) / 100;
    this.timeline.time(pos);
  }

  public stepForward() {
    let nextTimestampIdx = -1;
    for (let i = 0; i < this._timestamps.length; i += 1) {
      if (this.timeline.time() < this._timestamps[i]) {
        nextTimestampIdx = i;
        break;
      }
    }

    if (nextTimestampIdx !== -1) {
      this.timeline.time(this._timestamps[nextTimestampIdx]);
    }
  }

  public stepBackward() {
    let prevTimestampIdx = -1;
    for (let i = 0; i < this._timestamps.length; i += 1) {
      if (this.timeline.time() >= this._timestamps[i]) {
        prevTimestampIdx = i;
      }
    }

    if (prevTimestampIdx !== -1) {
      this.timeline.time(this._timestamps[prevTimestampIdx - 1]);
    }
  }

  public setTimelineSpeed(speed: number) {
    // We keep an member variable because we want to preserve the speed
    // between each operation execution. This is because a new timeline is
    // created each time we run an operation, which resets the speed back
    // to 1.
    this._speed = speed;
    this.timeline.speed(speed);
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

  public get timeline(): Timeline {
    return this._timeline;
  }
  public set timeline(value: Timeline) {
    this._timeline = value;
  }

  public get timelineDuration(): number {
    return this._timelineDuration;
  }
  public set timelineDuration(value: number) {
    this._timelineDuration = value;
  }
}

export default VisualiserController;