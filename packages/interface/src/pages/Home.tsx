import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Column, Row } from 'src/components/Flex'
import { useRemove2FAModal, useUpdatePasswordModal } from 'src/hooks/useModal'
import { ThemedText } from 'src/theme/components'
import * as Icons from 'src/theme/components/icons'
import styled from 'styled-components'

const Logo = styled(Icons.FlickeringLogoOutline)`
  display: block;
  margin: 100px auto;
  width: 80%;
  max-width: 1024px;
  color: ${({ theme }) => theme.neutral1};
`

const StyledHome = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 32px;
`

const ConnectionWrapper = styled(Column)`
  gap: 24px;
  padding: 28px 32px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  background: ${({ theme }) => theme.surface2};
  box-shadow: 0px 8px 12px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px 4px rgba(0, 0, 0, 0.3);
  width: 380px;
  align-items: flex-end;
`

const RulesAccount = styled(Row)`
  background: ${({ theme }) => theme.surface3};
  border-radius: 10px;
  padding: 16px;
  justify-content: center;
  width: 100%;
`

const CardHeader = styled(Row)`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  gap: 12px;
  padding-right: 12px;
  width: fit-content;

  & img {
    border-radius: 8px;
    height: 54px;
    width: 54px;
    margin: -1px;
  }
`

const RulesLogo = styled.img`
  background: ${({ theme }) => theme.surface2};
`

const Connect = styled.button`
  outline: none;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.neutral2};
  transition: all 100ms ease;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.neutral1};
  }
`

export default function Home() {
  // router
  const query = new URLSearchParams(useLocation().search)

  // modal
  const [, toggleUpdatePasswordModal] = useUpdatePasswordModal()
  const [, toggleRemove2FAModal] = useRemove2FAModal()

  // ?action
  useEffect(() => {
    switch (query.get('action')) {
      case 'update-password':
        toggleUpdatePasswordModal()
        break

      case 'remove-2fa':
        toggleRemove2FAModal()
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleRemove2FAModal, toggleUpdatePasswordModal])

  return (
    <>
      <Logo />

      <StyledHome>
        <Row gap={64}>
          <Column gap={16} alignItems="normal">
            <CardHeader>
              <RulesLogo src="/assets/rules.png" />

              <Column alignItems="normal">
                <ThemedText.HeadlineSmall>Rules</ThemedText.HeadlineSmall>
                <ThemedText.BodySubtitle>Account</ThemedText.BodySubtitle>
              </Column>
            </CardHeader>

            <ConnectionWrapper>
              <RulesAccount>Not connected</RulesAccount>

              <Connect>Connect</Connect>
            </ConnectionWrapper>
          </Column>

          <Column gap={16} alignItems="normal">
            <CardHeader>
              <RulesLogo src="/assets/starknet.png" />

              <Column alignItems="normal">
                <ThemedText.HeadlineSmall>Starknet</ThemedText.HeadlineSmall>
                <ThemedText.BodySubtitle>Wallet</ThemedText.BodySubtitle>
              </Column>
            </CardHeader>

            <ConnectionWrapper>
              <RulesAccount>Not connected</RulesAccount>

              <Connect>Connect</Connect>
            </ConnectionWrapper>
          </Column>
        </Row>
      </StyledHome>
    </>
  )
}
