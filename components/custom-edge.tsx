'use client'

import React from "react"
// getBezierPath: Calculates the SVG path string for the curved line
// EdgeLabelRenderer: A special container that lets us render HTML (divs) on top of the SVG canvas
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from "@xyflow/react";

/**
 * CustomEdge Component
 * This renders the "wire" between nodes and a floating UI label.
 * @param props - Includes coordinates (sourceX, targetY), positions, and custom data from the store
 */
export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps): React.JSX.Element { // Fix: Explicitly return JSX.Element to satisfy the ReactNode requirement
  
  // 1. Calculate the path data and the center point (labelX, labelY) for our label
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  return (
    <>
      {/* 2. BaseEdge: The actual visible line (the "wire"). 
          We use BaseEdge instead of a raw <path /> for better compatibility with React Flow's internal styling */}
      <BaseEdge 
        id={id} 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={style} 
      />

      {/* 3. EdgeLabelRenderer: This is a "Portal". 
          It moves the label out of the SVG group and into a standard HTML div group 
          so we can use Tailwind classes like shadow-sm and rounded-md. */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            // Centering logic: move the div to the calculated path center
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all', // Ensures we can still click/interact with the label if needed
          }}
          className="bg-background border border-border px-2 py-1 rounded-md shadow-sm z-50"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
              Importing
            </span>
            {/* data?.variableName: Coming from the onConnect function in lib/store.ts */}
            <code className="text-[11px] font-mono bg-secondary px-1 rounded text-foreground">
              {String(data?.variableName || 'module')}
            </code>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}