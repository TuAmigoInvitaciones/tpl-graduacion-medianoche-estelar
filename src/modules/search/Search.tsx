import React from 'react'
import { motion } from 'framer-motion'
import { InfoIcon } from '@phosphor-icons/react'
import { useInvitationConfig, useModal } from '@/common/hooks'
import { MODAL_NAMES } from '@/store/ui/modal.slice'
import { SearchForm } from './components/SearchForm'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const Search: React.FC = () => {
    const { onOpenModal } = useModal()
    const { sections } = useInvitationConfig()

    const title = sections?.hero?.names as string
    const generation = sections?.hero?.generation as string
    const date = sections?.hero?.date as string

    const handleOpenInfoModal = () => {
        onOpenModal(MODAL_NAMES.searchInfo, 'Información de Acceso')
    }

    return (
        <main className="search">
            <button
                type="button"
                className="search-fixed-info-btn"
                onClick={handleOpenInfoModal}
                aria-label="Información de clave de acceso"
            >
                <InfoIcon size={22} weight="regular" />
            </button>

            <motion.div
                className="search__container"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: FLUID_EASE }}
            >
                <header className="search-hero">
                    <span className="drawer-monogram" aria-hidden="true">
                        {title}
                    </span>
                    <span className="search-hero__divider" aria-hidden="true" />
                </header>

                <SearchForm />

                {(generation || date) && (
                    <footer className="search-footer-info">
                        {generation && <span className="search-footer-info__date">{generation}</span>}
                        {date && <span className="search-footer-info__detail">{date}</span>}
                    </footer>
                )}
            </motion.div>
        </main>
    )
}







