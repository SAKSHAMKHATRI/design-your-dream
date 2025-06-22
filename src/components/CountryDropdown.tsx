
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface CountryDropdownProps {
  value: string;
  onChange: (country: string) => void;
}

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium",
  "Brazil", "Bulgaria", "Cambodia", "Canada", "Chile", "China", "Colombia",
  "Croatia", "Czech Republic", "Denmark", "Egypt", "Estonia", "Finland",
  "France", "Germany", "Greece", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Malaysia", "Mexico",
  "Morocco", "Netherlands", "New Zealand", "Norway", "Pakistan", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Saudi Arabia", "Singapore", "Slovakia", "Slovenia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand",
  "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Venezuela", "Vietnam"
];

export const CountryDropdown = ({ value, onChange }: CountryDropdownProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: string) => {
    onChange(country);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          value={isOpen ? search : value}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search and select country..."
          className="pr-10"
          required
        />
        <ChevronDown 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country}
                className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm"
                onClick={() => handleSelect(country)}
              >
                {country}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No countries found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
