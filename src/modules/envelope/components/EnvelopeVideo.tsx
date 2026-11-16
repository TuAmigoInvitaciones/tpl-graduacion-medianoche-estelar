import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useMusicPlayer } from '@/common/hooks'
import envelopVideo from '@/assets/videos/envelop-opening.mp4'

export const EnvelopeVideo: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const timeoutRef = useRef<number | null>(null)
    const flashTimeoutRef = useRef<number | null>(null)
    const [isPlayStarted, setIsPlayStarted] = useState(false)
    const [showFlash, setShowFlash] = useState(false)
    const { goTo } = useNavigation()
    const { onPlayMusic } = useMusicPlayer()

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
        }
    }, [])

    const triggerFlashAndNavigate = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setShowFlash(true)
        flashTimeoutRef.current = window.setTimeout(() => {
            goTo('/invitation')
        }, 2000)
    }

    const handleOpen = () => {
        if (isPlayStarted) return
        setIsPlayStarted(true)
        onPlayMusic()

        // Safety fallback: if video fails to play or gets blocked, trigger flash after 5 seconds
        timeoutRef.current = window.setTimeout(() => {
            triggerFlashAndNavigate()
        }, 5000)

        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error('Error attempting to play video:', error)
                triggerFlashAndNavigate()
            })
        } else {
            triggerFlashAndNavigate()
        }
    }

    const handleVideoEnded = () => {
        triggerFlashAndNavigate()
    }

    return (
        <div
            className="envelope envelope-video"
            onClick={handleOpen}
        >
            <video
                ref={videoRef}
                src={envelopVideo}
                playsInline
                {...{ 'webkit-playsinline': 'true' }}
                controls={false}
                muted
                preload="auto"
                className="envelope-video__video"
                onEnded={handleVideoEnded}
            />

            {/* Transparent pulsing indicator overlayed on the center seal area to guide the click */}
            {!isPlayStarted && (
                <div className="envelope-video__indicator-ring" />
            )}

            {showFlash && (
                <div className="envelope__flash-transition" />
            )}
        </div>
    )
}
