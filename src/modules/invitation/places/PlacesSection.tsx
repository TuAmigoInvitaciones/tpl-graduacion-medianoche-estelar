import React from 'react'
import { motion } from 'framer-motion'
import { MapPinIcon } from '@phosphor-icons/react'

import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { FormatHelpers } from '@/common/utils/format.helpers'

import colagantes from '@/assets/images/icons/colgantes.webp'
import macetero from '@/assets/images/icons/jarron.webp'
import iconChurch from '@/assets/images/icons/icon-church.svg'
import iconCups from '@/assets/images/icons/icon-cups.svg'
import rsvpBg from '@/assets/images/backgrounds/rsvp.jpeg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const getPlaceIcon = (title?: string) => {
    const normalized = (title ?? '').toLowerCase()
    return /ceremonia|iglesia|misa|templo|parroquia/.test(normalized)
        ? iconChurch
        : iconCups
}

const getRibbonCorner = (title?: string, idx = 0): 'top-left' | 'top-right' => {
    const normalized = (title ?? '').toLowerCase()
    if (/ceremonia|iglesia|misa|templo|parroquia/.test(normalized)) {
        return 'top-left'
    }
    if (/recepci[oó]n|fiesta|sal[oó]n|banquete/.test(normalized)) {
        return 'top-right'
    }
    return idx % 2 === 0 ? 'top-left' : 'top-right'
}

const getCardVariant = (idx: number) => ({
    initial: { opacity: 0, x: idx % 2 === 0 ? -35 : 35, y: 15 },
    animate: { opacity: 1, x: 0, y: 0 },
})

export const PlacesSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const placesConfig = sections.places
    const eventDate = sections.countdown?.targetDate || placesConfig?.locations?.[0]?.date
    const formattedDate = FormatHelpers.formatLocalDate(eventDate)

    if (!placesConfig?.showPlaces || !placesConfig?.locations) {
        return null
    }

    return (
        <>
            <motion.div
                className="places-section__colgantes"
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px' }}
                transition={{ duration: 1.1, delay: 0.2, ease: FLUID_EASE }}
            >
                <img src={colagantes} alt="colgantes" />
            </motion.div>

            <section id="places" className="places-section">
                <div className="places-section__container">
                    <motion.div
                        className="places-section__header"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.2, ease: FLUID_EASE }}
                    >
                        <SectionHeader
                            pretitle="NO TE PIERDAS"
                            title="Ubicaciones Especiales"
                            align="center"
                            variant="uppercase"
                        />

                        {formattedDate && (
                            <motion.div
                                className="places-section__date-card"
                                style={{ backgroundImage: `url(${rsvpBg})` }}
                                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 0.9, delay: 0.45, ease: FLUID_EASE }}
                            >
                                <div className="places-section__date-inner">
                                    <span className="places-section__date-text">{formattedDate}</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    <div className="places-section__grid">
                        {placesConfig.locations.map((loc, idx) => {
                            const variant = getCardVariant(idx)
                            const ribbonCorner = getRibbonCorner(loc.title, idx)

                            return (
                                <motion.div
                                    key={idx}
                                    className="places-item"
                                    initial={variant.initial}
                                    whileInView={variant.animate}
                                    viewport={{ once: true, margin: '-10% 0px' }}
                                    transition={{ duration: 1.1, delay: 0.35 + idx * 0.22, ease: FLUID_EASE }}
                                >
                                    <div
                                        className={`places-item__ribbon places-item__ribbon--${ribbonCorner}`}
                                        style={{ '--rsvp-bg': `url(${rsvpBg})` } as React.CSSProperties}
                                        aria-hidden="true"
                                    />

                                    <img
                                        src={getPlaceIcon(loc.title)}
                                        alt={loc.title || 'Ubicación'}
                                        className="places-item__icon"
                                    />

                                    {loc.title && (
                                        <h3 className="places-item__title">{loc.title}</h3>
                                    )}


                                    {loc.venue && (
                                        <p className="places-item__venue">{loc.venue}</p>
                                    )}

                                    {loc.time && (
                                        <p className="places-item__time">{loc.time}</p>
                                    )}

                                    {loc.location && (
                                        <p className="places-item__address">{loc.location}</p>
                                    )}

                                    {loc.url && (
                                        <Button
                                            variant="primary"
                                            radius="full"
                                            icon={<MapPinIcon size={22} weight='thin' />}
                                            onClick={() => window.open(loc.url, '_blank')}
                                            className="places-item__button"
                                        >
                                            Ver ubicación
                                        </Button>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        className="places-section__jarrones"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: FLUID_EASE }}
                    >
                        <img src={macetero} alt="macetero izquierdo" className="places-section__jarron places-section__jarron--left" />
                        <span className="places-section__jarron-line" />
                        <img src={macetero} alt="macetero derecho" className="places-section__jarron places-section__jarron--right" />
                    </motion.div>
                </div>
            </section>
        </>
    )
}
