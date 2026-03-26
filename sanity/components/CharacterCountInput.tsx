import { Stack, Text, TextArea } from '@sanity/ui'
import { set, unset, StringInputProps } from 'sanity'
import { useCallback } from 'react'

export function CharacterCountInput(props: StringInputProps) {
  const { value = '', onChange, elementProps } = props
  const max = 350
  const current = value?.length || 0

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  return (
    <Stack space={3}>
      <TextArea
        {...elementProps}
        onChange={handleChange}
        value={value}
        rows={5}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Text
          size={1}
          weight="semibold"
          muted={current <= max}
          style={{ 
            color: current > max ? 'var(--card-accent-fg-color)' : undefined,
            opacity: current > max ? 1 : 0.6
          }}
        >
          {current} / {max} characters
        </Text>
      </div>
    </Stack>
  )
}
