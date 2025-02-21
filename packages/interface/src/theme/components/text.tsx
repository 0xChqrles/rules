/**
 * Preset styles of the Rebass Text component
 */

import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled from 'styled-components'

interface TextWrapperCustomProps {
  color: keyof string
}

const TextWrapper = styled(Text).withConfig({
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontFamily',
})<TextWrapperCustomProps>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

type TextProps = Omit<TextPropsOriginal, 'css'>

// todo: export each component individually
export const ThemedText = {
  Custom(props: TextProps) {
    return <TextWrapper {...props} />
  },

  HeadlineLarge(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={36} color="neutral1" {...props} />
  },

  HeadlineSmall(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={20} color="neutral1" {...props} />
  },

  BodyPrimary(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color="neutral1" {...props} />
  },

  BodySubtitle(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={16} color="neutral2" {...props} />
  },

  Title(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={16} color="neutral1" {...props} />
  },
}
