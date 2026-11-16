import React from 'react'
import { useMenu } from '@/common/hooks'

import { CountdownSection } from './countdown/CountdownSection'
import { DressCodeSection } from './dress-code/DressCodeSection'
import { HeroSection } from './hero/HeroSection'
import { ItinerarySection } from './itinerary/ItinerarySection'
import { MessageSection } from './message/Message'
import { PlacesSection } from './places/PlacesSection'
import { RsvpSection } from './rsvp/RsvpSection'
import { GraduatesSection } from './graduates/GraduatesSection'
import { DetailsSection } from './details/DetailsSection'
import { FarewellSection } from './farewell/FarewellSection'
import { GuestPhotosSection } from './guest-photos/GuestPhotosSection'
import { GallerySection } from './gallery/GallerySection'

export const Invitation: React.FC = () => {
    const { activeVariant, isMenuVisible } = useMenu()

    const hasMenuBarClass = isMenuVisible && activeVariant === 'bar' ? 'invitation--has-menu-bar' : ''
    const containerClass = `invitation ${hasMenuBarClass}`.trim()

    return (
        <main className={containerClass}>
            <HeroSection />
            <CountdownSection />
            <MessageSection />
            <RsvpSection />
            <PlacesSection />
            <GraduatesSection />
            <GallerySection />
            <DressCodeSection />
            <GuestPhotosSection />
            <ItinerarySection />
            <DetailsSection />
            <FarewellSection />
        </main>
    )
}
