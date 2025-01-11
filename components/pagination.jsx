import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, setPage, hasNextPage, hasPrevPage }) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage(currentPage - 1)}
        disabled={!hasPrevPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-semibold">{currentPage}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage(currentPage + 1)}
        disabled={!hasNextPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

