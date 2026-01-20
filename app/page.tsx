'use client'

import { BricksSidebar } from '@/components/bricks-sidebar'
import { FlowCanvas } from '@/components/flow-canvas'
import { BuildButton } from '@/components/build-button'
import { Code2 } from 'lucide-react'

export default function Page() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center px-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h1 className="font-semibold text-lg text-foreground">BrickBuilder</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <span>Visual Backend Builder</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <BricksSidebar />
        <FlowCanvas />
      </div>

      {/* Floating Build Button */}
      <BuildButton />
    </div>
  )
}
