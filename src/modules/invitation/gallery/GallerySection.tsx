import React from 'react'
import { motion } from 'framer-motion'
import { ImageIcon } from '@phosphor-icons/react'
import { useGallery, useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import rsvpBg from '@/assets/images/backgrounds/rsvp.jpeg'
import bowlFlowers from '@/assets/images/icons/bowl-flowers.svg'
import photo1 from '@/assets/images/photos/1.jpg'
import photo2 from '@/assets/images/photos/2.jpg'
import photo3 from '@/assets/images/photos/3.jpg'
import photo4 from '@/assets/images/photos/4.jpg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const CARD_TRANSITION = { type: 'spring' as const, stiffness: 260, damping: 24 }
const GALLERY_PHOTOS = [photo1, photo2, photo3, photo4]

export const GallerySection: React.FC = () => {

    const { sections } = useInvitationConfig()
    const generation = (sections.hero?.generation ?? 'Generación 2023 - 2026') as string

    const {
        title,
        cards,
        isAnimating,
        getCardPose,
        handleCardClick,
        handleDragEnd,
        handleKeyDown,
    } = useGallery(GALLERY_PHOTOS)

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-section__container">
                <motion.div
                    className="gallery-section__header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.2, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="RECUERDOS"
                        title={title}
                        align="center"
                        variant="uppercase"
                    />
                </motion.div>

                <motion.div
                    className="gallery-section__stage"
                    initial={{ opacity: 0, scale: 0.94, y: 24 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.35, ease: FLUID_EASE }}
                >
                    <div className="gallery-deck" aria-label="Galería interactiva de fotografías">
                        {cards.map((card, stackIndex) => {
                            const isFront = stackIndex === 0
                            const pose = getCardPose(stackIndex, card.id)

                            return (
                                <motion.div
                                    key={card.id}
                                    className={`gallery-card ${isFront ? 'gallery-card--front' : ''}`}
                                    style={{ zIndex: pose.zIndex }}
                                    animate={{
                                        x: pose.x,
                                        y: pose.y,
                                        rotate: pose.rotate,
                                        scale: pose.scale,
                                        opacity: pose.opacity,
                                    }}
                                    transition={CARD_TRANSITION}
                                    drag={isFront && !isAnimating ? 'x' : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.45}
                                    whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                                    onDragEnd={(event, info) => handleDragEnd(isFront, event, info)}
                                    onClick={() => handleCardClick(isFront)}
                                    onKeyDown={(event) => handleKeyDown(isFront, event)}
                                    role={isFront ? 'button' : undefined}
                                    tabIndex={isFront ? 0 : -1}
                                    aria-label={isFront ? `${card.label}. Presiona para pasar a la siguiente foto` : undefined}
                                >
                                    <div className={`gallery-card__media gallery-card__media--${card.tone}`}>
                                        {card.image ? (
                                            <img
                                                src={card.image}
                                                alt={card.label}
                                                className="gallery-card__image"
                                                draggable={false}
                                            />
                                        ) : (
                                            <div className="gallery-card__placeholder">
                                                <ImageIcon size={34} weight="thin" className="gallery-card__placeholder-icon" />
                                                <span className="gallery-card__placeholder-label">{card.label}</span>
                                                <span className="gallery-card__placeholder-hint">Toca para avanzar</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        className="gallery-section__quote-frame"
                        style={{ backgroundImage: `url(${rsvpBg})` }}
                        initial={{ opacity: 0, x: 18, y: 18 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 0.55, ease: FLUID_EASE }}
                    >
                        <div className="gallery-section__quote-card">
                            <p className="gallery-section__quote-text">
                                &ldquo;Cada esfuerzo compartido hoy se convierte en el recuerdo que nos acompañará para siempre.&rdquo;
                            </p>
                            <span className="gallery-section__quote-author">&mdash; {generation}</span>
                        </div>
                    </motion.div>

                    <motion.img
                        src={bowlFlowers}
                        alt=""
                        aria-hidden="true"
                        className="gallery-section__flowers"
                        initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
                        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 0.65, ease: FLUID_EASE }}
                    />
                </motion.div>
            </div>
        </section>
    )
}
