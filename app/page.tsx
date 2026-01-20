'use client'

import { BricksSidebar } from '@/components/bricks-sidebar'
import { FlowCanvas } from '@/components/flow-canvas'
import { BuildButton } from '@/components/build-button'
import { Code2 } from 'lucide-react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Page() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center px-4 shrink-0">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h1 className="font-semibold text-lg text-foreground">BrickBuilder</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <span>Visual Backend Builder</span>
        </div>
      </header>

      {/* Main Content with Resizer */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
            <BricksSidebar />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80}>
            <FlowCanvas />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <BuildButton />
    </div>
  )
}
