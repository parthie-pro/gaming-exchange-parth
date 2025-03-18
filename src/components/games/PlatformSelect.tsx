"use client"

import Select from "@/components/ui/Select"
import { platformEnum } from "@/db/schema/platforms"

// Create a mapping of platform labels
const platformLabels: Record<string, string> = {
  PC: "PC",
  PlayStation: "PlayStation",
  Xbox: "Xbox",
  Nintendo: "Nintendo",
  Mobile: "Mobile"
}

interface PlatformSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function PlatformSelect({
  value,
  onChange,
  disabled = false
}: PlatformSelectProps) {
  // Get platforms from the enum
  const platforms = platformEnum.enumValues

  // Convert to options format for the Select component
  const options = platforms.map(platform => ({
    value: platform,
    label: platformLabels[platform] || platform
  }))

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      className={disabled ? "opacity-50 cursor-not-allowed" : ""}
    />
  )
} 