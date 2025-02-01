"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useToast } from "~/components/ui/use-toast"
import { BreadcrumbNav } from "~/components/breadcrumb-nav"
import { FileList } from "~/components/file-list"
import { mockFiles } from "./data/mock-files"
import type { BreadcrumbItem } from "./types/drive"

export default function Drive() {
  const [currentFolderId, setCurrentFolderId] = useState("root")
  const { toast } = useToast()

  // Get files for current folder
  const currentFiles = mockFiles.filter((file) => file.parentId === currentFolderId)

  // Generate breadcrumb items
  const generateBreadcrumbs = (folderId: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = []
    let currentId = folderId

    while (currentId) {
      const folder = mockFiles.find((f) => f.id === currentId)
      if (folder) {
        breadcrumbs.unshift({ id: folder.id, name: folder.name })
        currentId = folder.parentId || ""
      } else {
        break
      }
    }

    return breadcrumbs
  }

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your files are being uploaded...",
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <BreadcrumbNav items={generateBreadcrumbs(currentFolderId)} onNavigate={setCurrentFolderId} />
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
        <div className="rounded-lg border bg-card">
          <FileList files={currentFiles} onFolderClick={setCurrentFolderId} />
        </div>
      </div>
    </div>
  )
}

