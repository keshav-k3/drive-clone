export interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  mimeType?: string
  size?: string
  modified: string
  parentId: string | null
}

export interface BreadcrumbNavItem {
  id: string
  name: string
}

export const mockFiles: FileItem[] = [
  {
    id: "root",
    name: "My Drive",
    type: "folder",
    modified: new Date().toLocaleDateString(),
    parentId: null,
  },
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: new Date().toLocaleDateString(),
    parentId: "root",
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    modified: new Date().toLocaleDateString(),
    parentId: "root",
  },
  {
    id: "3",
    name: "Resume.pdf",
    type: "file",
    mimeType: "application/pdf",
    size: "2.1 MB",
    modified: new Date().toLocaleDateString(),
    parentId: "root",
  },
  {
    id: "4",
    name: "Project Proposal.docx",
    type: "file",
    mimeType: "application/docx",
    size: "500 KB",
    modified: new Date().toLocaleDateString(),
    parentId: "1",
  },
  {
    id: "5",
    name: "Budget.xlsx",
    type: "file",
    mimeType: "application/xlsx",
    size: "750 KB",
    modified: new Date().toLocaleDateString(),
    parentId: "1",
  },
  {
    id: "6",
    name: "Profile Picture.jpg",
    type: "file",
    mimeType: "image/jpeg",
    size: "3.2 MB",
    modified: new Date().toLocaleDateString(),
    parentId: "2",
  },
  {
    id: "7",
    name: "Screenshot.png",
    type: "file",
    mimeType: "image/png",
    size: "1.8 MB",
    modified: new Date().toLocaleDateString(),
    parentId: "2",
  },
]

