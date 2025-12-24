import { Runner } from "@svgdotjs/svg.js";

interface AnimationRunner {
  runners: Runner[];
}

class AnimationProducer {
  private _animationSteps: AnimationRunner[] = [];

  /**
   * Represents all the animation that are to run concurrently in a
   * single animation step.
   */
  private _currentSequence: Runner[] = [];

  public constructor() {}

  /**
   * Adds a complete sequence of animation runners for a single animation step.
   * @param animations
   */
  public addAnimationStep(animations: Runner[]): void {
    this._currentSequence.push(...animations);
    this.finishSequence();
  }

  public addMultipleAnimationStep(...animations: Runner[]): void {
    this._currentSequence.push(...animations);
    this.finishSequence();
  }

  public addSequenceAnimation(animation: Runner): void {
    this._currentSequence.push(animation);
  }

  public addMultipleSequenceAnimations(animations: Runner[]): void {
    this._currentSequence.push(...animations);
  }

  public finishSequence() {
    if (this.currentSequence.length > 0) {
      this.animationSteps.push({
        runners: this.currentSequence
      })
    }

    this.currentSequence = [];
  }

  // ==============================================================================
  // Getters and Setters.
  // ==============================================================================
  
  public get animationSteps(): AnimationRunner[] {
    return this._animationSteps;
  }
  public set animationSteps(value: AnimationRunner[]) {
    this._animationSteps = value;
  }

  public get currentSequence(): Runner[] {
    return this._currentSequence;
  }
  public set currentSequence(value: Runner[]) {
    this._currentSequence = value;
  }
}

export default AnimationProducer;