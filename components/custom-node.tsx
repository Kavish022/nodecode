'use client'

import { memo } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { brickTypes } from '@/lib/brick-types'

interface CustomNodeData {
  label: string
  brickId: string
}

export const CustomNode = memo(({ data }: NodeProps<CustomNodeData>) => {
  const brick = brickTypes.find((b) => b.id === data.brickId)
  const Icon = brick?.icon

  return (
    <Card className="w-[400px] border-2 border-border shadow-lg bg-card">
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-primary" />
      
      <CardHeader className="p-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn('h-5 w-5', brick?.color)} />}
          <h3 className="font-semibold text-sm text-foreground">{data.label}</h3>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="model" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-9 p-0">
            <TabsTrigger 
              value="model" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Model
            </TabsTrigger>
            <TabsTrigger 
              value="route"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Route
            </TabsTrigger>
            <TabsTrigger 
              value="config"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="model" className="m-0 p-3 min-h-[200px]">
            <div className="rounded-md bg-secondary/50 border border-border p-3 font-mono text-xs h-[180px] overflow-auto">
              <div className="text-muted-foreground">
                <span className="text-purple-400">{'// Monaco Editor Placeholder'}</span>
                {'\n\n'}
                <span className="text-blue-400">interface</span> {data.label}Model {'{'}
                {'\n  '}id: <span className="text-green-400">string</span>;
                {'\n  '}name: <span className="text-green-400">string</span>;
                {'\n  '}createdAt: <span className="text-green-400">Date</span>;
                {'\n}'}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="route" className="m-0 p-3 min-h-[200px]">
            <div className="rounded-md bg-secondary/50 border border-border p-3 font-mono text-xs h-[180px] overflow-auto">
              <div className="text-muted-foreground">
                <span className="text-purple-400">{'// Monaco Editor Placeholder'}</span>
                {'\n\n'}
                <span className="text-blue-400">router</span>.get(<span className="text-green-400">'/api/{data.brickId}'</span>, {'{'}
                {'\n  '}
                <span className="text-yellow-400">async</span> (req, res) {'=> {'}
                {'\n    '}
                <span className="text-purple-400">// Handle request</span>
                {'\n  }'}
                {'\n}'});
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="m-0 p-3 min-h-[200px]">
            <div className="rounded-md bg-secondary/50 border border-border p-3 font-mono text-xs h-[180px] overflow-auto">
              <div className="text-muted-foreground">
                <span className="text-purple-400">{'// Monaco Editor Placeholder'}</span>
                {'\n\n'}
                <span className="text-blue-400">export</span> <span className="text-blue-400">const</span> config = {'{'}
                {'\n  '}port: <span className="text-orange-400">3000</span>,
                {'\n  '}database: <span className="text-green-400">'mongodb://localhost'</span>,
                {'\n  '}env: <span className="text-green-400">'development'</span>
                {'\n}'};
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-primary" />
    </Card>
  )
})

CustomNode.displayName = 'CustomNode'
