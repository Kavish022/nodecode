"use client";
import React from "react";
import { memo } from "react";
import { Handle, Position, NodeProps, NodeResizer } from "@xyflow/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";
import Editor from "@monaco-editor/react";

export const CustomNode = memo(({ id, data, selected, style }: NodeProps | any) => {
  const updateNodeCode = useStore((state: any) => state.updateNodeCode);
const [isMounted, setIsMounted] = React.useState(false);

React.useEffect(() => {
  setIsMounted(true); // This only runs once the component is in the browser
}, []);
  return (
    // style: provides the exact width/height from React Flow state
    <div style={{ ...style }} className="relative flex flex-col">
      <NodeResizer 
        color="#3b82f6" 
        isVisible={selected} 
        minWidth={300} 
        minHeight={250}
        handleClassName="h-2 w-2 bg-white border border-primary rounded-full"
      />
      
      {/* h-full w-full: stretches the card to the style dimensions */}
      <Card className="h-full w-full border-2 border-border shadow-lg bg-card overflow-hidden flex flex-col m-0">
        <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-primary z-10" />

        <CardHeader className="p-3 border-b border-border bg-secondary/30 shrink-0">
          <h3 className="font-semibold text-sm tracking-tight">{data.label}</h3>
        </CardHeader>

        {/* flex-1 + min-h-0: This is the magic fix for height resizing. 
            Without min-h-0, the content refuses to be smaller than the Editor's default height. */}
        <CardContent className="p-0 flex-1 flex flex-col min-h-0 overflow-hidden">
          <Tabs defaultValue={data.files?.[0]?.name} className="w-full h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border h-9 shrink-0 bg-muted/50 p-0">
              {data.files?.map((file: any) => (
                <TabsTrigger 
                  key={file.name} 
                  value={file.name} 
                  className="text-[11px] h-full rounded-none px-4"
                >
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {data.files?.map((file: any, index: number) => (
              /* FIX: Added h-full and flex-1 here so the editor has a parent with a defined height */
              <TabsContent 
                key={file.name} 
                value={file.name} 
                className="m-0 p-0 flex-1 h-full min-h-0"
              >
              
                <Editor
                  height="100%"
                  theme="vs-dark"
                  defaultLanguage="typescript"
                  value={file.content}
                  onChange={(val) => updateNodeCode(id, index, val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    automaticLayout: true, 
                    scrollBeyondLastLine: false,
                    // Ensures the editor doesn't try to grow past its container
                    overflowWidgetsDomNode: isMounted? document.body : undefined, 
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>

        <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-primary z-10" />
      </Card>
    </div>
  );
});

CustomNode.displayName = "CustomNode";