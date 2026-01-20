import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, Connection, Node, Edge } from '@xyflow/react';

export const useStore = create((set: any, get: any) => ({
  nodes: [] as Node[],
  edges: [] as Edge[],

  onNodesChange: (changes: any) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),

  onEdgesChange: (changes: any) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

onConnect: (connection: Connection) => {
  const currentNodes = get().nodes;
  const sourceNode = currentNodes.find((n: any) => n.id === connection.source);
  const targetNode = currentNodes.find((n: any) => n.id === connection.target);

  if (sourceNode && targetNode) {
    const exportName = sourceNode.data.exportName || 'module';
    const importStatement = `import { ${exportName} } from './${sourceNode.data.label.toLowerCase()}';\n`;

    const newEdge = { 
      ...connection, 
      type: 'custom', // Use the custom edge type
      animated: true,
      style: { stroke: '#22c55e' },
      data: { variableName: exportName } 
    };

    set({
      nodes: currentNodes.map((node: any) => {
        if (node.id === targetNode.id) {
          const updatedFiles = [...node.data.files];
          if (!updatedFiles[0].content.includes(importStatement)) {
            updatedFiles[0].content = importStatement + updatedFiles[0].content;
          }
          return { ...node, data: { ...node.data, files: updatedFiles } };
        }
        return node;
      }),
      edges: addEdge(newEdge, get().edges),
    });
  }
},

// add node new node method
addNode: (newNode: Node) =>
  set({ nodes: [...get().nodes, newNode] }),

  removeNode: (nodeId: string) => {
    set({
      nodes: get().nodes.filter((node: any) => node.id !== nodeId),
      edges: get().edges.filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId),
    });
  },

    // Fixed the split function logic here
    updateNodeCode: (nodeId: string, fileIndex: number, newContent: string) => {
      set({
        nodes: get().nodes.map((node: any) => {
          if (node.id === nodeId) {
            const updatedFiles = [...node.data.files];
            updatedFiles[fileIndex] = { ...updatedFiles[fileIndex], content: newContent };
            return { ...node, data: { ...node.data, files: updatedFiles } };
          }
          return node;
        }),
      });
    },
}));