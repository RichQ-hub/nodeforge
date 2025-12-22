import AnimationProducer from "./AnimationProducer";

export const CODE_CANVAS_ID = '#code-canvas';
export const VISUALISER_CANVAS_ID = '#visualiser-canvas';

export const NODE_ATTRIBUTES = {
  radius: 30,
  fill: '#D6E7F9',
  stroke: '#0285BD',
  'stroke-width': 2,
}

export interface OperationUsage {
  description: string;
  args: {
    name: string;
    placeholder: string;
    inputType: string;
  }[];
  codeSnippet: string;
  run: (...args: any[]) => AnimationProducer;
}

export interface DataStructureDocumentation {
  [command: string]: OperationUsage;
}