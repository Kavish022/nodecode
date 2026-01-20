"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { brickTypes } from "@/lib/brick-types";
import Editor from "@monaco-editor/react";
import { useStore } from "@/lib/store";

export const CustomNode = memo(({ id, data }: NodeProps | any) => {
  const brick = brickTypes.find((b) => b.id === data.brickId);
  const Icon = brick?.icon;
  
  // Hook must be INSIDE the component
  const updateNodeCode = useStore((state: any) => state.updateNodeCode);

  return (
    <Card className="w-[450px] border-2 border-border shadow-lg bg-card">
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-primary" />

      <CardHeader className="p-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("h-5 w-5", brick?.color)} />}
          <h3 className="font-semibold text-sm text-foreground">{data.label}</h3>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* We use data.files from the store instead of hardcoded tabs */}
        <Tabs defaultValue={data.files?.[0]?.name} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-9 p-0">
            {data.files?.map((file: any) => (
              <TabsTrigger
                key={file.name}
                value={file.name}
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary text-xs"
              >
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.files?.map((file: any, index: number) => (
            <TabsContent key={file.name} value={file.name} className="m-0 p-0">
              <Editor
                height="220px"
                theme="vs-dark"
                defaultLanguage="typescript"
                value={file.content}
                onChange={(val) => updateNodeCode(id, index, val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-primary" />
    </Card>
  );
});

CustomNode.displayName = "CustomNode";