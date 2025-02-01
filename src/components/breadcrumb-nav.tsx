import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
interface BreadcrumbItemType {
  id: string;
  name: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItemType[]
  onNavigate: (id: string) => void
}

export function BreadcrumbNav({ items, onNavigate }: BreadcrumbNavProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={item.id}>
            {index === items.length - 1 ? (
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink onClick={() => onNavigate(item.id)}>{item.name}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

