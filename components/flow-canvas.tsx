'use client'

import React, { useCallback, useState, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
  Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { CustomNode } from './custom-node'
import { BrickType } from '@/lib/brick-types'
import { useStore } from "@/lib/store"

const nodeTypes = {
  custom: CustomNode,
}

// 1. This handles the logic
function FlowCanvasInner() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { nodes, edges, onNodesChange, onEdgesChange, addNode, onConnect } = useStore() as any
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const brickData = event.dataTransfer.getData('application/reactflow')
      if (!brickData || !reactFlowInstance) return

      const brick: BrickType = JSON.parse(brickData)
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const id = `${brick.id}_${Math.random().toString(36).substring(2, 9)}`
      
      const newNode: Node = {
        id,
        type: 'custom',
        position,
        data: { 
          label: brick.label,
          brickId: brick.id,
          files: brick.files.map((f: any) => ({ ...f })) 
        },
      }

      addNode(newNode)
    },
    [reactFlowInstance, addNode]
  )

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={20} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

// 2. This exports the component wrapped in the Provider
export function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  )
}