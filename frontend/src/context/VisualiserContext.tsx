import React from 'react';
import VisualiserController from '@/lib/AlgorithmVisualisers/VisualiserController';

interface VisualiserContextValues {
  controller: VisualiserController;
}

const VisualiserContext = React.createContext<VisualiserContextValues>(null!);

export default VisualiserContext;