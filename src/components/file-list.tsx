import type { FileItem } from "types/drive"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { File, FileText, Folder, ImageIcon, FileSpreadsheet } from "lucide-react"

interface FileListProps {
  files: FileItem[]
  onFolderClick: (id: string) => void
}

export function FileList({ files, onFolderClick }: FileListProps) {
  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return <Folder className="w-5 h-5" />

    if (file.mimeType?.includes("image")) return <ImageIcon className="w-5 h-5" />
    if (file.mimeType?.includes("pdf")) return <FileText className="w-5 h-5" />
    if (file.mimeType?.includes("xlsx")) return <FileSpreadsheet className="w-5 h-5" />

    return <File className="w-5 h-5" />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow
            key={file.id}
            className={file.type === "folder" ? "cursor-pointer hover:bg-muted/50" : ""}
            onClick={() => file.type === "folder" && onFolderClick(file.id)}
          >
            <TableCell className="flex items-center gap-2">
              {getFileIcon(file)}
              {file.name}
            </TableCell>
            <TableCell>{file.type === "folder" ? "Folder" : file.mimeType}</TableCell>
            <TableCell>{file.size ?? "--"}</TableCell>
            <TableCell>{file.modified}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

