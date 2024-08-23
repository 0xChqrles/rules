/* eslint-disable import/no-unused-modules */

import { useCallback } from 'react'
import { useBoundStore } from 'src/state'
import { ModalType } from 'src/state/application'
import { useShallow } from 'zustand/react/shallow'

export function useCloseModal(): () => void {
  const { closeModals } = useBoundStore(useShallow((state) => ({ closeModals: state.closeModals })))

  return closeModals
}

function useModal(modal: ModalType): [boolean, () => void] {
  const { toggleModal, isModalOpened } = useBoundStore((state) => ({
    toggleModal: state.toggleModal,
    isModalOpened: state.isModalOpened,
  }))

  const isOpen = isModalOpened(modal)
  const toggle = useCallback(() => toggleModal(modal), [modal, toggleModal])

  return [isOpen, toggle]
}

export const useWalletConnectModal = () => useModal(ModalType.WALLET_CONNECT)

export const useL2WalletOverviewModal = () => useModal(ModalType.L2_WALLET_OVERVIEW)

export const useSigninModal = () => useModal(ModalType.SIGN_IN)

export const useSignupModal = () => useModal(ModalType.SIGN_UP)

export const useMigrationModal = () => useModal(ModalType.MIGRATION)

export const useRemove2FAModal = () => useModal(ModalType.REMOVE_2FA)

export const useUpdatePasswordModal = () => useModal(ModalType.UPDATE_PASSWORD)
