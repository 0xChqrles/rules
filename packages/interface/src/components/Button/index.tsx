import { transparentize } from 'polished'
import styled from 'styled-components'

// eslint-disable-next-line import/no-unused-modules
export const Button = styled.button`
  width: 100%;
  padding: 16px 32px;
  background-color: ${({ theme }) => theme.neutral1};
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => theme.surface1};
  transition: all 100ms ease;
  font-weight: 400;
  box-shadow: 0 0 10px ${({ theme }) => transparentize(0.5, theme.neutral1)};

  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => transparentize(0.8, theme.neutral1)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.surface2};
    cursor: default;
  }
`
