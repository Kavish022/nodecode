"use client";

import React, { memo, useState, useEffect } from "react";
import { Handle, Position, NodeProps, NodeResizer } from "@xyflow/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";
import Editor from "@monaco-editor/react";
import { CodeEditor } from "./code-editor";

export const CustomNode = memo(
  ({ id, data, selected, style }: NodeProps | any) => {
    const updateNodeCode = useStore((state: any) => state.updateNodeCode);
    const [isMounted, setIsMounted] = useState(false);
    //hook for new files in editor
    const addFileToNode = useStore((state: any) => state.addFileToNode);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <div
        style={{ ...style }}
        className="relative flex flex-col h-full w-full"
      >
        <NodeResizer
          color="#3b82f6"
          isVisible={selected}
          minWidth={300}
          minHeight={250}
          handleClassName="h-2 w-2 bg-white border border-primary rounded-full"
        />

        <Card className="h-full w-full border-2 border-border shadow-lg bg-card overflow-hidden flex flex-col m-0">
          <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 !bg-primary z-10"
          />

          <CardHeader className="p-2 border-b border-border bg-secondary/30 shrink-0">
            <h3 className="font-semibold text-xs tracking-tight">
              {data.label}
            </h3>
          </CardHeader>

          <CardContent className="p-0 flex-1 flex flex-col min-h-0 overflow-hidden">
            <Tabs
              defaultValue={data.files?.[0]?.name}
              className="w-full h-full flex flex-col"
            >
              <TabsList className="w-full justify-start rounded-none border-b border-border h-8 shrink-0 bg-muted/50 p-0">
                {data.files?.map((file: any) => (
                  <TabsTrigger
                    key={file.name}
                    value={file.name}
                    className="text-[11px] h-full rounded-none px-4"
                  >
                    {file.name}
                  </TabsTrigger>
                ))}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const name = prompt("Enter file name (e.g. schema.ts):");
                    // FIX: Pass 'id' (the string) and 'name' (the user input)
                    if (name) addFileToNode(id, name);
                  }}
                  className="px-3 h-full hover:bg-secondary flex items-center justify-center border-l border-border text-foreground font-bold transition-colors"
                >
                  +
                </button>
              </TabsList>

              {data.files?.map((file: any, index: number) => (
                <TabsContent
                  key={`${id}-${file.name}`} // Keep this stable key!
                  value={file.name}
                  // force flex-1 and h-full to ensure there is space for the editor
                  className="m-0 p-0 flex-1 h-full min-h-[200px] relative overflow-hidden nodrag nowheel"
                >
                  {isMounted && (
                    <CodeEditor nodeId={id} file={file} index={index} />
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>

          <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 !bg-primary z-10"
          />
        </Card>
      </div>
    );
  },
);

CustomNode.displayName = "CustomNode";
