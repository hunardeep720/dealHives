"use client";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import FilterSidebar from "./filter-sidebar"

export default function MobileFilterDrawer({
  open,
  setOpen,
  ...filterProps
}) {
useEffect(()=>{
    console.log(filterProps)
})
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <FilterSidebar {...filterProps} />
      </SheetContent>
    </Sheet>
  )
}

