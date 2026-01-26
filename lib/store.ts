import { create } from 'zustand';
import { 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges, 
  Connection, 
  Node, 
  Edge,
  OnNodesChange,
  OnEdgesChange
} from '@xyflow/react';

/**
 * useStore: The central "Brain" of our application.
 * It manages the visual nodes, the connection lines (edges), 
 * and the actual code content inside the nodes.
 */
export const useStore = create((set: any, get: any) => ({
  nodes: [] as Node[],
  edges: [] as Edge[],

  // Standard React Flow handlers: These track movements and deletions in the UI
 onNodesChange: (changes: any) => {
  const currentNodes = get().nodes;
  
  // We apply the changes to see what the NEW state would look like
  const nextNodes = applyNodeChanges(changes, currentNodes);
  
  // Check: Did anything actually change? 
  // This prevents the store from triggering a re-render if the data is identical.
if (currentNodes !== nextNodes) {
    set({ nodes: nextNodes });
  }
},
  onEdgesChange: (changes: any) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  /**
   * onConnect: Triggered when you drag a line between two nodes.
   * Logic: 
   * 1. Find the variable (exportName) from the Source Node.
   * 2. Inject an 'import' statement into the Target Node's code.
   * 3. Create the visual Edge with a custom label.
   */
  onConnect: (connection: Connection) => {
    const nodes = get().nodes;
    const sourceNode = nodes.find((n: any) => n.id === connection.source);
    const targetNode = nodes.find((n: any) => n.id === connection.target);

    if (sourceNode && targetNode) {
      const exportName = sourceNode.data.exportName || 'module';
      const importStatement = `import { ${exportName} } from './${sourceNode.data.label.toLowerCase()}';\n`;

      // Create the Edge object with metadata
      const newEdge = { 
        ...connection, 
        type: 'custom', 
        animated: true,
        style: { stroke: '#22c55e' },
        data: { variableName: exportName } 
      };

      // We update both Nodes and Edges in a single 'set' call to prevent UI flickering
      set({
        nodes: nodes.map((node: any) => {
          if (node.id === targetNode.id) {
            const updatedFiles = [...node.data.files];
            // Only add the import if it doesn't already exist
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

  /**
   * onEdgesDelete: Triggered when you click a line and press Delete.
   * Logic:
   * It cleans up the code by removing the 'import' statement from the target node.
   */
  onEdgesDelete: (deletedEdges: Edge[]) => {
    const nodes = get().nodes;
    const edges = get().edges;

    // STEP 1: Calculate new node contents (removing imports)
    const nextNodes = nodes.map((node: any) => {
      let updatedContent = node.data.files[0].content;
      
      deletedEdges.forEach((edge) => {
        if (edge.target === node.id) {
          const variableName = edge.data?.variableName;
          // Regex: matches "import { name } from '...';" and a newline
          const importPattern = new RegExp(`import { ${variableName} } from '.*';\\n?`, 'g');
          updatedContent = updatedContent.replace(importPattern, '');
        }
      });

      const updatedFiles = [...node.data.files];
      updatedFiles[0] = { ...updatedFiles[0], content: updatedContent };
      return { ...node, data: { ...node.data, files: updatedFiles } };
    });

    // STEP 2: Filter out the deleted edges
    const nextEdges = edges.filter((e: any) => !deletedEdges.some(d => d.id === e.id));

    // STEP 3: Update state once
    set({ nodes: nextNodes, edges: nextEdges });
  },

  /**
   * updateNodeCode: Updates the Monaco Editor content in the state.
   * Logic:
   * Uses a "Gatekeeper" check to ensure we only update if the text actually changed.
   */
  updateNodeCode: (nodeId: string, fileIndex: number, newContent: string) => {
    const nodes = get().nodes;
    const targetNode = nodes.find((n: any) => n.id === nodeId);

    // Equality Check: This is the primary defense against the RangeError loop
    if (targetNode?.data.files[fileIndex].content === newContent) return;

    set({
      nodes: nodes.map((node: any) => {
        if (node.id === nodeId) {
          const updatedFiles = [...node.data.files];
          updatedFiles[fileIndex] = { ...updatedFiles[fileIndex], content: newContent };
          return { ...node, data: { ...node.data, files: updatedFiles } };
        }
        return node;
      }),
    });
  },

  // Helper: Adds a new brick to the canvas
  addNode: (newNode: Node) =>
    set({ nodes: [...get().nodes, newNode] }),

  // Helper: Deletes a node and all lines connected to it
  removeNode: (nodeId: string) => {
    set({
      nodes: get().nodes.filter((node: any) => node.id !== nodeId),
      edges: get().edges.filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId),
    });
  },
  //adfiles to node
  addFileToNode: (nodeId: string, fileName: string) => {
    const nodes = get().nodes;
    set({
      nodes: nodes.map((node:any) => {
        if(node.id === nodeId){
          return {
            ...node,
            data: {
              ...node.data,
              files: [...node.data.files, {name: fileName, content: ""}]
            }
          };
        }
        return node;
      })
    },)








  }
}));