export interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  mimeType?: string
  size?: string
  modified: string
  parentId: string | null
}

export interface BreadcrumbItem {
  id: string
  name: string
}

