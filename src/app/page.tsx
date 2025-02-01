"use client"

import { useState } from "react"
import { File, FileText, Folder, ImageIcon, FileSpreadsheet, Upload } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useToast } from "~/components/ui/use-toast"
import { Toaster } from "~/components/ui/toaster"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { mockFiles, type FileItem } from "~/lib/mock-data"

// Define the breadcrumb type locally to avoid conflict
type BreadcrumbNavItem = {
  id: string
  name: string
}

export default function Drive() {
  const [currentFolderId, setCurrentFolderId] = useState("root")
  const { toast } = useToast()

  // Get files for current folder
  const currentFiles = mockFiles.filter((file) => file.parentId === currentFolderId)

  // Generate breadcrumb items
  // Update the return type here
  const generateBreadcrumbs = (folderId: string): BreadcrumbNavItem[] => {
    const breadcrumbs: BreadcrumbNavItem[] = []
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

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return <Folder className="w-5 h-5 text-blue-400" />
    if (file.mimeType?.includes("image")) return <ImageIcon className="w-5 h-5 text-green-400" />
    if (file.mimeType?.includes("pdf")) return <FileText className="w-5 h-5 text-red-400" />
    if (file.mimeType?.includes("xlsx")) return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
    return <File className="w-5 h-5 text-gray-400" />
  }

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your files are being uploaded...",
    })
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">Drive</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  {generateBreadcrumbs(currentFolderId).map((item, index, array) => (
                    <BreadcrumbItem key={item.id}>
                      {index === array.length - 1 ? (
                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                      ) : (
                        <>
                          <BreadcrumbLink
                            onClick={() => setCurrentFolderId(item.id)}
                            className="cursor-pointer hover:text-primary"
                          >
                            {item.name}
                          </BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Button onClick={handleUpload} size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>

          {/* File List */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFiles.map((file) => (
                  <TableRow
                    key={file.id}
                    className={file.type === "folder" ? "cursor-pointer hover:bg-muted/50" : "hover:bg-muted/25"}
                    onClick={() => file.type === "folder" && setCurrentFolderId(file.id)}
                  >
                    <TableCell className="flex items-center gap-2 font-medium">
                      {getFileIcon(file)}
                      {file.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {file.type === "folder" ? "Folder" : file.mimeType}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{file.size || "--"}</TableCell>
                    <TableCell className="text-muted-foreground">{file.modified}</TableCell>
                  </TableRow>
                ))}
                {currentFiles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      This folder is empty
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

