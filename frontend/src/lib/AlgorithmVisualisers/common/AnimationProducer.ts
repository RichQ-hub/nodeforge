import { Runner } from "@svgdotjs/svg.js";
import GraphicalCodeLine from "../CodeLine/GraphicalCodeLine";
import CodeAnimations from "../CodeLine/CodeAnimations";

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

  private _codeAnimationLibrary: CodeAnimations;
  private _codeLines: GraphicalCodeLine[];

  public constructor(codeLines: GraphicalCodeLine[]) {
    this._codeLines = codeLines;
    this._codeAnimationLibrary = new CodeAnimations();

    // Whenever a new AnimationProducer is created, we make sure all codelines are
    // unhighlighted, since previous AnimationProducers could've left some lines
    // highlighted, and this new producer doesn't have those previous highlighted
    // lines tracked in the highlightedLines array.
    this._codeAnimationLibrary.unhighlightCodeLines(codeLines);
  }

  public addAnimationWithCodeHighlight(
    lineNum: number,
    animationFn: any,
    ...args: any[]
  ) {
    this.addCompleteSequence(
      ...this._codeAnimationLibrary.highlightCode(this.codeLines[lineNum - 1]),
      ...animationFn(...args),
    )
  }

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
    if (this.currentSequence.length > 0) {
      this._animationSequences.push({
        sequence: this.currentSequence,
        duration: this.getMaxDuration(),
      })
    }

    this.currentSequence = [];
  }

  private getMaxDuration(): number {
    const maxRunner = this.currentSequence.reduce((prev: Runner, curr: Runner) => {
      return prev.duration() < curr.duration() ? curr : prev;
    }, this.currentSequence[0]);
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

  public get codeLines(): GraphicalCodeLine[] {
    return this._codeLines;
  }
  public set codeLines(value: GraphicalCodeLine[]) {
    this._codeLines = value;
  }
}

export default AnimationProducer;