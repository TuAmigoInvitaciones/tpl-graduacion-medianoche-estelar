import React from 'react'
import { motion } from 'framer-motion'
import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

import bg from '@/assets/images/backgrounds/rsvp-2.jpg'
import qrCode from '@/assets/images/icons/album-qr-code.png'
import photos from '@/assets/images/icons/polaroid-photos.svg'

export const GuestPhotosSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const guestPhotosConfig = sections.guestPhotos
    const playlistAndPhotosConfig = sections.addons?.playlistAndPhotos

    if (guestPhotosConfig?.showGuestPhotos === false) {
        return null
    }

    const albumUrl =
        guestPhotosConfig?.albumUrl ||
        playlistAndPhotosConfig?.qrAlbumUrl ||
        'https://photos.app.goo.gl/xqUqNJ5Cvm9mjo7m8'

    return (
        <section id="guest-photos" className="guest-photos-section">
            <div className="guest-photos-section__bg" style={{ backgroundImage: `url(${bg})` }} />

            <div className="guest-photos-section__container">
                <div className="guest-photos-section__header">
                    <SectionHeader
                        pretitle="FOTOS DEL EVENTO"
                        title={guestPhotosConfig?.title || 'Álbum de Fotos'}
                        align="center"
                        variant="uppercase"
                    />
                </div>

                <div className="guest-photos-section__content">
                    <div className="guest-photos-section__placeholder guest-photos-section__placeholder--photos">
                        <img src={photos} alt="Photos Icon" />
                    </div>

                    <p className="guest-photos-section__text">
                        Captura los mejores instantes de esta noche especial y súbelos al álbum compartido para que todos los invitados puedan verlos.
                    </p>


                    <div className="guest-photos-section__qr-wrapper">
                        <div className="guest-photos-section__placeholder guest-photos-section__placeholder--qr">
                            <img src={qrCode} alt='QR album' />
                        </div>
                    </div>

                    <p className="guest-photos-section__message">
                        Escanea el código o abre el álbum para subirlas.
                    </p>

                    <div className="guest-photos-section__button-wrapper">
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
                    </div>
                </div>
            </div>
        </section>
    )
}
