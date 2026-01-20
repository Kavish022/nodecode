import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  addNode: (newNode) => {
    set({ nodes: [...get().nodes, newNode] });
  },

  // This updates the code inside a node when you type in the editor
  updateNodeCode: (nodeId, fileIndex, newContent) => {
    set({
      nodes: get().nodes.map((node) => {
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
