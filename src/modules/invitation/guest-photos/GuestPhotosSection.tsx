import React from 'react'
import { motion } from 'framer-motion'
import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

import bg from '@/assets/images/backgrounds/rsvp-2.jpg'
import qrCode from '@/assets/images/icons/album-qr-code.png'
import photos from '@/assets/images/icons/polaroid-photos.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const GuestPhotosSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const guestPhotosConfig = sections.guestPhotos
    const playlistAndPhotosConfig = sections.addons?.playlistAndPhotos

    if (guestPhotosConfig?.showGuestPhotos === false) {
        return null
    }

    const albumUrl = guestPhotosConfig?.albumUrl || playlistAndPhotosConfig?.qrAlbumUrl || ''

    return (
        <section id="guest-photos" className="guest-photos-section">
            <div className="guest-photos-section__bg" style={{ backgroundImage: `url(${bg})` }} />

            <motion.div
                className="guest-photos-section__container"
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.2, delay: 0.2, ease: FLUID_EASE }}
            >
                <motion.div
                    className="guest-photos-section__header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.32, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="FOTOS DEL EVENTO"
                        title={guestPhotosConfig?.title || 'Álbum de Fotos'}
                        align="center"
                        variant="uppercase"
                    />
                </motion.div>

                <div className="guest-photos-section__content">
                    <motion.div
                        className="guest-photos-section__placeholder guest-photos-section__placeholder--photos"
                        initial={{ opacity: 0, rotate: -6, scale: 0.82 }}
                        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.45, ease: FLUID_EASE }}
                    >
                        <img src={photos} alt="Photos Icon" />
                    </motion.div>

                    <motion.p
                        className="guest-photos-section__text"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 0.9, delay: 0.56, ease: FLUID_EASE }}
                    >
                        Captura los mejores instantes de esta noche especial y súbelos al álbum compartido para que todos los invitados puedan verlos.
                    </motion.p>

                    <motion.div
                        className="guest-photos-section__qr-wrapper"
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 0.66, ease: FLUID_EASE }}
                    >
                        <div className="guest-photos-section__placeholder guest-photos-section__placeholder--qr">
                            <img src={qrCode} alt="QR album" />
                        </div>
                    </motion.div>

                    <motion.p
                        className="guest-photos-section__message"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 0.85, delay: 0.76, ease: FLUID_EASE }}
                    >
                        Escanea el código o abre el álbum para subirlas.
                    </motion.p>

                    <motion.div
                        className="guest-photos-section__button-wrapper"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 0.9, delay: 0.86, ease: FLUID_EASE }}
                    >
                        <motion.button
                            type="button"
                            className="guest-photos-section__album-btn"
                            onClick={() => window.open(albumUrl, '_blank', 'noopener,noreferrer')}
                            animate={{ scale: [1, 1.035, 1] }}
                            transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <span className="guest-photos-section__album-btn__shimmer" aria-hidden="true" />
                            <span className="guest-photos-section__album-btn__label">Abrir Álbum de Fotos</span>
                            <ArrowSquareOutIcon
                                size={19}
                                weight="bold"
                                className="guest-photos-section__album-btn__icon"
                            />
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
