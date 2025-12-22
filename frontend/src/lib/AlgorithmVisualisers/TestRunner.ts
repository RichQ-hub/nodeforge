import { Runner, Timeline } from "@svgdotjs/svg.js";
import AnimationProducer from "./common/AnimationProducer";
import BSTAnimations from "./BinarySearchTree/Animation/BSTAnimations";
import React from "react";

const CANVAS_ID: string = '#visualiser-canvas';

class TestRunner {
  private _animationProducer: AnimationProducer;
  private _bstAnimationLibrary: BSTAnimations;
  private _timeline: Timeline;
  private _timelineDuration: number;

  public constructor() {
    this._animationProducer = new AnimationProducer();
    this._bstAnimationLibrary = new BSTAnimations(CANVAS_ID);
    this._timeline = new Timeline().persist(true);
    this._timelineDuration = 0;
  }

  public buildAnimation(): void {
    const anim = this._bstAnimationLibrary.drawNode(2, 100, 100);

    anim.forEach((a) => {
      this._animationProducer.addSequenceAnimation(a);
    })

    this._animationProducer.finishSequence();

    const anim2 = this._bstAnimationLibrary.drawNode(2, 200, 200);
    anim2.forEach((a) => {
      this._animationProducer.addSequenceAnimation(a);
    })

    this._animationProducer.finishSequence();
  }

  public constructTimeline(): void {
    this._animationProducer.animationSteps.forEach((step) => {
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

  public run(): void {
    this.buildAnimation();
    this.constructTimeline();
  }
}

export default TestRunner;