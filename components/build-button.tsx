'use client'

import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export function BuildButton() {
  const [isBuilding, setIsBuilding] = useState(false)
  const nodes = useStore((state: any) => state.nodes)

  const handleBuild = async () => {
    setIsBuilding(true)
    const zip = new JSZip()

    try {
      // 1. Create a folder for each node
      nodes.forEach((node: any) => {
        const folderName = `${node.data.brickId}_${node.id}`
        const folder = zip.folder(folderName)

        // 2. Add each file from the node into that folder
        node.data.files.forEach((file: any) => {
          folder?.file(file.name, file.content)
        })
      })

      // 3. Generate the ZIP file
      const content = await zip.generateAsync({ type: 'blob' })
      
      // 4. Trigger download
      saveAs(content, 'backend-project.zip')
    } catch (error) {
      console.error('Build failed:', error)
    } finally {
      setIsBuilding(false)
    }
  }

  return (
    <Button
      size="lg"
      onClick={handleBuild}
      disabled={isBuilding || nodes.length === 0}
      className="fixed bottom-8 right-8 h-14 px-6 shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold z-50"
    >
      <Play className="h-5 w-5 mr-2" />
      {isBuilding ? 'Generating ZIP...' : 'Build Project'}
    </Button>
  )
}