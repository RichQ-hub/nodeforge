import { Runner } from "@svgdotjs/svg.js";

interface AnimationRunner {
  sequence: Runner[];
  duration: number;
}

class AnimationProducer {
  private _animationSequences: AnimationRunner[] = [];

  /**
   * Represents all the animation that are to run concurrently in a
   * single animation sequence.
   */
  private _currentSequence: Runner[] = [];

  public constructor() {}

  /**
   * Adds a complete sequence of animation runners for a single animation step.
   * @param animations
   */
  public addCompleteSequence(...animations: Runner[]): void {
    this._currentSequence.push(...animations);
    this.finishSequence();
  }

  public addSequenceSteps(...animations: Runner[]): void {
    this._currentSequence.push(...animations);
  }

  public finishSequence() {
    const duration = this.getMaxDuration();
    if (this.currentSequence.length > 0) {
      this._animationSequences.push({
        sequence: this.currentSequence,
        duration,
      })
    }

    this.currentSequence = [];
  }

  private getMaxDuration(): number {
    const maxRunner = this.currentSequence.reduce((prev: Runner, curr: Runner) => {
      return prev.duration() < curr.duration() ? curr : prev;
    });
    return maxRunner.duration();
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================
  
  public get animationSequences(): AnimationRunner[] {
    return this._animationSequences;
  }
  public set animationSequences(value: AnimationRunner[]) {
    this._animationSequences = value;
  }

  public get currentSequence(): Runner[] {
    return this._currentSequence;
  }
  public set currentSequence(value: Runner[]) {
    this._currentSequence = value;
  }
}

export default AnimationProducer;