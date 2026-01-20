'use client'

import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { useState } from 'react'

export function BuildButton() {
  const [isBuilding, setIsBuilding] = useState(false)

  const handleBuild = () => {
    setIsBuilding(true)
    // Simulate build process
    setTimeout(() => {
      setIsBuilding(false)
      console.log('[v0] Build triggered')
    }, 2000)
  }

  return (
    <Button
      size="lg"
      onClick={handleBuild}
      disabled={isBuilding}
      className="fixed bottom-8 right-8 h-14 px-6 shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
    >
      <Play className="h-5 w-5 mr-2" />
      {isBuilding ? 'Building...' : 'Build'}
    </Button>
  )
}
