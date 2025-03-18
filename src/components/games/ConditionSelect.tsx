"use client"

import { GameCondition, conditionLabels } from "@/lib/validations/collection"
import Select from "@/components/ui/Select"

interface ConditionSelectProps {
  value: GameCondition
  onChange: (value: GameCondition) => void
  disabled?: boolean
}

export function ConditionSelect({
  value,
  onChange,
  disabled = false
}: ConditionSelectProps) {
  // Convert the condition enum to options for Select
  const options = Object.entries(conditionLabels).map(([condition, label]) => ({
    value: condition,
    label
  }))

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as GameCondition)
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