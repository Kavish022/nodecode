'use client'

import React from "react"

import { brickTypes } from '@/lib/brick-types'
import { cn } from '@/lib/utils'

export function BricksSidebar() {
  const onDragStart = (event: React.DragEvent, brickType: typeof brickTypes[0]) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(brickType))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Bricks</h2>
        <p className="text-xs text-muted-foreground mt-1">Drag and drop to canvas</p>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-2">
          {brickTypes.map((brick) => {
            const Icon = brick.icon
            return (
              <div
                key={brick.id}
                draggable
                onDragStart={(e) => onDragStart(e, brick)}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border border-border',
                  'bg-secondary/50 hover:bg-secondary cursor-grab active:cursor-grabbing',
                  'transition-colors'
                )}
              >
                <Icon className={cn('h-5 w-5', brick.color)} />
                <span className="text-sm font-medium text-foreground">{brick.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
