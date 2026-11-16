import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { PanInfo } from 'framer-motion'
import { useInvitationConfig } from './useInvitationConfig'

export type GalleryCardTone = 'navy' | 'gold' | 'rose' | 'sage'

export interface GalleryCardItem {
    id: string
    label: string
    image?: string
    tone: GalleryCardTone
}

export interface GalleryInputItem {
    id?: string
    label?: string
    image: string
    tone?: GalleryCardTone
}

export type GalleryPhotoInput = string | GalleryInputItem

export interface UseGalleryOptions {
    images?: GalleryPhotoInput[]
    title?: string
}

export interface GalleryCardPose {
    x: number
    y: number
    rotate: number
    scale: number
    opacity: number
    zIndex: number
}

const DEFAULT_GALLERY_CARDS: GalleryCardItem[] = [
    { id: 'photo-1', label: 'Foto 01', tone: 'navy' },
    { id: 'photo-2', label: 'Foto 02', tone: 'gold' },
    { id: 'photo-3', label: 'Foto 03', tone: 'rose' },
    { id: 'photo-4', label: 'Foto 04', tone: 'sage' },
]

const TONES: GalleryCardTone[] = ['navy', 'gold', 'rose', 'sage']

const buildInitialCards = (images?: GalleryPhotoInput[]): GalleryCardItem[] => {
    if (!images || images.length === 0) {
        return DEFAULT_GALLERY_CARDS
    }

    return images.map((item, idx) => {
        const defaultLabel = `Foto ${String(idx + 1).padStart(2, '0')}`
        const defaultTone = TONES[idx % TONES.length]

        if (typeof item === 'string') {
            return {
                id: `gallery-${idx}`,
                label: defaultLabel,
                image: item,
                tone: defaultTone,
            }
        }

        return {
            id: item.id ?? `gallery-${idx}`,
            label: item.label ?? defaultLabel,
            image: item.image,
            tone: item.tone ?? defaultTone,
        }
    })
}

const computeCardPose = (
    stackIndex: number,
    total: number,
    isLeaving: boolean,
    leaveDirection: number
): GalleryCardPose => {
    if (isLeaving) {
        return {
            x: leaveDirection * 210,
            y: -12,
            rotate: leaveDirection * 12,
            scale: 0.94,
            opacity: 0.85,
            zIndex: total + 2,
        }
    }

    if (stackIndex === 0) {
        return { x: -10, y: 0, rotate: -4, scale: 1, opacity: 1, zIndex: total }
    }

    if (stackIndex === 1) {
        return { x: 16, y: 8, rotate: 2.5, scale: 0.96, opacity: 1, zIndex: total - 1 }
    }

    if (stackIndex === 2) {
        return { x: 34, y: 16, rotate: 6, scale: 0.92, opacity: 0.98, zIndex: total - 2 }
    }

    return {
        x: 42,
        y: 20,
        rotate: 8,
        scale: 0.88,
        opacity: 0,
        zIndex: Math.max(1, total - stackIndex),
    }
}

export const useGallery = (input?: GalleryPhotoInput[] | UseGalleryOptions) => {
    const { sections } = useInvitationConfig()
    const galleryConfig = sections.gallery

    const options: UseGalleryOptions = Array.isArray(input) ? { images: input } : (input ?? {})
    const externalImages = options.images && options.images.length > 0 ? options.images : undefined
    const resolvedImages = externalImages ?? galleryConfig?.images

    const baseCards = useMemo(() => buildInitialCards(resolvedImages), [resolvedImages])
    const [offset, setOffset] = useState(0)
    const [leavingCard, setLeavingCard] = useState<{ id: string; direction: number } | null>(null)
    const timerRef = useRef<number | null>(null)
    const didDragRef = useRef(false)

    const cards = useMemo(() => {
        if (baseCards.length === 0) return []
        const shift = offset % baseCards.length
        return [...baseCards.slice(shift), ...baseCards.slice(0, shift)]
    }, [baseCards, offset])

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current)
            }
        }
    }, [])

    const sendFrontToBack = (direction = 1) => {
        if (leavingCard || cards.length <= 1) return

        const frontId = cards[0].id
        setLeavingCard({ id: frontId, direction })

        timerRef.current = window.setTimeout(() => {
            setOffset((prev) => (prev + 1) % baseCards.length)
            setLeavingCard(null)
            timerRef.current = null
        }, 220)
    }

    const handleCardClick = (isFront: boolean) => {
        if (!isFront) return
        if (didDragRef.current) {
            didDragRef.current = false
            return
        }
        sendFrontToBack(1)
    }

    const handleDragEnd = (
        isFront: boolean,
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        if (!isFront) return

        const draggedEnough = Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 300
        if (draggedEnough) {
            didDragRef.current = true
            sendFrontToBack(info.offset.x < 0 ? -1 : 1)
            return
        }

        if (Math.abs(info.offset.x) > 8) {
            didDragRef.current = true
            window.setTimeout(() => {
                didDragRef.current = false
            }, 60)
        }
    }

    const handleKeyDown = (isFront: boolean, event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isFront) return
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            sendFrontToBack(1)
        }
    }

    const getCardPose = (stackIndex: number, cardId: string): GalleryCardPose => {
        const isLeaving = leavingCard?.id === cardId
        return computeCardPose(stackIndex, cards.length, isLeaving, leavingCard?.direction ?? 1)
    }

    return {
        title: options.title || galleryConfig?.title || 'Nuestra Galería',
        cards,
        isAnimating: leavingCard !== null,
        getCardPose,
        handleCardClick,
        handleDragEnd,
        handleKeyDown,
    }
}
