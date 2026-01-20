
import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

export const useStore = create((set, get: any) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: any) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes: any) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  // FIX: This allows you to draw lines between nodes
  onConnect: (connection: any) => set({ edges: addEdge(connection, get().edges) }),
  addNode: (newNode: any) => set({ nodes: [...get().nodes, newNode] }),
  updateNodeCode: (nodeId: string, fileIndex: number, newContent: string) => {
    set({
      nodes: get().nodes.map((node: any) => {
        if (node.id === nodeId) {
          const updatedFiles = [...node.data.files];
          updatedFiles[fileIndex].content = newContent;
          return { ...node, data: { ...node.data, files: updatedFiles } };
        }
        return node;
      }),
    });
  },
}));