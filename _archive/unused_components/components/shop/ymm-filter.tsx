"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Car } from "lucide-react";
import { vehiclesData } from "@/lib/data";

interface YMMFilterProps {
  onFilterChange: (filter: { year?: number; make?: string; model?: string } | null) => void;
  className?: string;
}

export function YMMFilter({ onFilterChange, className }: YMMFilterProps) {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  // Extract unique values from vehicle data
  const years = useMemo(() => {
    const uniqueYears = [...new Set(vehiclesData.map((v) => v.year))];
    return uniqueYears.sort((a, b) => b - a); // Descending order
  }, []);

  const makes = useMemo(() => {
    const filtered = selectedYear
      ? vehiclesData.filter((v) => v.year === Number(selectedYear))
      : vehiclesData;
    return [...new Set(filtered.map((v) => v.make))].sort();
  }, [selectedYear]);

  const models = useMemo(() => {
    let filtered = vehiclesData;
    if (selectedYear) {
      filtered = filtered.filter((v) => v.year === Number(selectedYear));
    }
    if (selectedMake) {
      filtered = filtered.filter((v) => v.make === selectedMake);
    }
    return [...new Set(filtered.map((v) => v.model))].sort();
  }, [selectedYear, selectedMake]);

  // Emit filter changes
  useEffect(() => {
    if (selectedYear || selectedMake || selectedModel) {
      onFilterChange({
        year: selectedYear ? Number(selectedYear) : undefined,
        make: selectedMake || undefined,
        model: selectedModel || undefined,
      });
    } else {
      onFilterChange(null);
    }
  }, [selectedYear, selectedMake, selectedModel, onFilterChange]);

  const clearFilters = () => {
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
  };

  const hasFilter = selectedYear || selectedMake || selectedModel;

  return (
    <div className={`bg-card border rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Car className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold text-sm">Find Parts by Vehicle</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Year Select */}
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Make Select */}
        <Select 
          value={selectedMake} 
          onValueChange={(value) => {
            setSelectedMake(value);
            setSelectedModel(""); // Reset model when make changes
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Make" />
          </SelectTrigger>
          <SelectContent>
            {makes.map((make) => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Model Select */}
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger>
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilter && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <span className="text-xs text-muted-foreground">
            Showing parts for: {[selectedYear, selectedMake, selectedModel].filter(Boolean).join(" ")}
          </span>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
