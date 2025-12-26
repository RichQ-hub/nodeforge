import GraphicalTreeNode from "../DataStructure/GraphicalTreeNode";

/**
 * Calculates the starting and ending coordinates of a pointer, given the coordinates of the centres of the
 * originating nodes and target nodes.
 * It is calculated such that the pointer starts and ends at the edge of a node, rather than the centre.
 * 
 * You must think in terms of simply pythogrean maths. SIN = Opposite / Hypotenuse.
 */
export const getPointerStartEndCoordinates = (
  startCentreX: number,
  startCentreY: number,
  endCentreX: number,
  endCentreY: number,
): [[number, number], [number, number]] => {
  const nodeRadius = GraphicalTreeNode.NODE_RADIUS;
  // Calculate the theta from the vertical shaft from the centre of the node. It 
  // essentially calculates the angle of direction from the source - target node.
  const theta: number = Math.atan(
    Math.abs(startCentreX - endCentreX) / Math.abs(startCentreY - endCentreY)
  );

  // We essentially calculate the x and y offsets of the NEW source and target endpoints
  // of the line, such that the endpoints essentially lie on the BORDER of the nodes.
  let startX; // New start x of the line from the source node.
  let endX;
  if (startCentreX < endCentreX) {
    // Here, it means the end node is to the RIGHT of the start node. This means that
    // we must shift the start endpoint to the right.
    startX = startCentreX + nodeRadius * Math.sin(theta);
    endX = endCentreX - nodeRadius * Math.sin(theta);
  } else {
    startX = startCentreX - nodeRadius * Math.sin(theta);
    endX = endCentreX + nodeRadius * Math.sin(theta);
  }

  // Here instead we calculate the y offsets. The above code calculates the x offsets.
  let startY;
  let endY;
  if (startCentreY < endCentreY) {
    startY = startCentreY + nodeRadius * Math.cos(theta);
    endY = endCentreY - nodeRadius * Math.cos(theta);
  } else {
    startY = startCentreY - nodeRadius * Math.cos(theta);
    endY = endCentreY + nodeRadius * Math.cos(theta);
  }

  return [
    [startX, startY],
    [endX, endY],
  ];
};