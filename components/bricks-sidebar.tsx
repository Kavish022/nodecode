'use client'

import { brickTypes } from '@/lib/brick-types'
import { useStore } from "@/lib/store"
import { cn } from '@/lib/utils'
import { FolderCode, Trash2, ChevronRight, FileCode } from 'lucide-react'

export function BricksSidebar() {
  const { nodes, removeNode } = useStore() as any;

  const onDragStart = (event: React.DragEvent, brickType: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(brickType))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="flex flex-col h-full w-full bg-card">
      {/* SECTION 1: Project Directory */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <FolderCode className="h-4 w-4" /> Project Files
        </h2>
        <div className="mt-4 space-y-1">
          {nodes.length === 0 && (
            <p className="text-xs text-muted-foreground italic px-2">No files active...</p>
          )}
          {nodes.map((node: any) => (
            <div key={node.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 cursor-default">
              <div className="flex items-center gap-2 truncate">
                <FileCode className="h-4 w-4 text-primary/70" />
                <span className="text-sm truncate font-medium">{node.data.label}.ts</span>
              </div>
              <button 
                onClick={() => removeNode(node.id)}
                className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Library Bricks */}
      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Bricks Library</h2>
        <div className="grid grid-cols-1 gap-2">
          {brickTypes.map((brick) => {
            const Icon = brick.icon
            return (
              <div
                key={brick.id}
                draggable
                onDragStart={(e) => onDragStart(e, brick)}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border border-border shadow-sm',
                  'bg-background hover:border-primary/50 cursor-grab active:cursor-grabbing transition-all'
                )}
              >
                <div className={cn("p-2 rounded-md bg-secondary/50", brick.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{brick.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
