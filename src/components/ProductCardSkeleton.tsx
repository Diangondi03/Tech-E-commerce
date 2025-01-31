import { Card, Skeleton } from "@heroui/react"

const skeletonStyles = "bg-gray-400 dark:bg-gray-600 animate-pulse"

export default function ProductCardSkeleton() {
  return (
    <Card className="md:w-sm max-w-sm md:mx-auto overflow-hidden bg-white dark:bg-dark-gray rounded-lg shadow-md h-full">
      <div className="relative aspect-square w-full">
        <Skeleton className={"absolute inset-0 " + skeletonStyles} isLoaded={false} />
      </div>
      <div className="p-4 space-y-4">
        <div className="w-full overflow-hidden">
          <Skeleton className={"h-6 w-3/4 rounded-lg " + skeletonStyles} isLoaded={false} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Skeleton className={"h-8 w-1/3 rounded-lg " + skeletonStyles} isLoaded={false} />
            <Skeleton className={"h-4 w-1/4 rounded-lg " + skeletonStyles} isLoaded={false} />
          </div>
        </div>
        <Skeleton className={"h-10 w-full rounded-lg " + skeletonStyles} isLoaded={false} />
      </div>
    </Card>
  )
}