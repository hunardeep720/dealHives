import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

export default function FilterSidebar({
  selectedCountry,
  selectedSortBy,
  selectedProductCondition,
  selectedIsPrime,
  setSelectedCountry,
  setSelectedSortBy,
  setSelectedProductCondition,
  setSelectedIsPrime,
  setLoading,
  visibility,
}) {
  return (
    <div className={`w-64 space-y-6 ${visibility}`}>
      <div>
        <h3 className="font-semibold mb-2">Country</h3>
        <RadioGroup value={selectedCountry} onValueChange={setSelectedCountry}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CA" id="country-ca" />
            <Label htmlFor="country-ca">Canada</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="US" id="country-us" />
            <Label htmlFor="country-us">United States</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <RadioGroup value={selectedSortBy} onValueChange={setSelectedSortBy}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="RELEVANCE" id="sort-relevance" />
            <Label htmlFor="sort-relevance">Relevance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PRICE_LOW_TO_HIGH" id="sort-price-low" />
            <Label htmlFor="sort-price-low">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PRICE_HIGH_TO_LOW" id="sort-price-high" />
            <Label htmlFor="sort-price-high">Price: High to Low</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Product Condition</h3>
        <RadioGroup value={selectedProductCondition} onValueChange={setSelectedProductCondition}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ALL" id="condition-all" />
            <Label htmlFor="condition-all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NEW" id="condition-new" />
            <Label htmlFor="condition-new">New</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USED" id="condition-used" />
            <Label htmlFor="condition-used">Used</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="prime"
          checked={selectedIsPrime}
          onCheckedChange={setSelectedIsPrime}
        />
        <Label htmlFor="prime">Prime Only</Label>
      </div>
    </div>
  )
}

