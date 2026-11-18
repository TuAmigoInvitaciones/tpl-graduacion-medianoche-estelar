import React from 'react'
import { motion, type Variants } from 'framer-motion'

import bg from '@/assets/images/backgrounds/rsvp.jpeg'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import logo from '@/assets/images/icons/logo.svg'
import { useDrawer } from '@/common/hooks'
import { DRAWER_NAMES, type DrawerName } from '@/store/ui/drawer.slice'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const CAREERS: ReadonlyArray<{ drawer: DrawerName; label: string }> = [
    {
        drawer: DRAWER_NAMES.isc,
        label: 'Ingeniería en Sistemas Computacionales',
    },
]

const careerContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.55,
        },
    },
}

const careerItemVariants: Variants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: FLUID_EASE },
    },
}

export const GraduatesSection: React.FC = () => {
    const { onOpenDrawer } = useDrawer()
    const isSingleCareer = CAREERS.length === 1

    return (
        <>
            <section id="graduates" className="graduates">
                <div className="graduates__container">
                    <motion.div
                        className="graduates__card"
                        style={{ backgroundImage: `url(${bg})` }}
                        initial={{ opacity: 0, scale: 0.93 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.3, delay: 0.15, ease: FLUID_EASE }}
                    >
                        <div className="graduates__content">
                            <motion.div
                                className="graduates__logo-container"
                                initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
                                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.1, delay: 0.35, ease: FLUID_EASE }}
                            >
                                <img src={logo} alt="CEB 6/1 Logo" className="graduates__logo" />
                            </motion.div>

                            <motion.p
                                className="graduates__sub-message"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.0, delay: 0.45, ease: FLUID_EASE }}
                            >
                                Con orgullo y gratitud de nuestra institución
                            </motion.p>

                            <div className="graduates__columns">
                                <motion.div
                                    className="graduates__col"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-10% 0px' }}
                                    transition={{ duration: 1.0, delay: 0.5, ease: FLUID_EASE }}
                                >
                                    <p className="graduates__col-label">Centro de Estudios</p>
                                    <p className="graduates__col-value">de Bachillerato 6/1</p>
                                </motion.div>
                                <div className="graduates__col-divider" />
                                <motion.div
                                    className="graduates__col"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-10% 0px' }}
                                    transition={{ duration: 1.0, delay: 0.5, ease: FLUID_EASE }}
                                >
                                    <p className="graduates__col-label">Generación</p>
                                    <p className="graduates__col-value">2023 - 2026</p>
                                </motion.div>
                            </div>

                            {isSingleCareer && (
                                <motion.div
                                    className="graduates__school-message-wrapper"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-10% 0px' }}
                                    transition={{ duration: 1.0, delay: 0.52, ease: FLUID_EASE }}
                                >
                                    <div className="graduates__career-divider graduates__school-divider" />
                                    <p className="graduates__school-message">
                                        Hoy celebramos con profundo orgullo la culminación de años de esfuerzo, constancia y pasión por el conocimiento. Que cada meta alcanzada sea el impulso para transformar el mundo con ética, talento y excelencia.
                                    </p>
                                    <div className="graduates__career-divider graduates__school-divider" />
                                </motion.div>
                            )}

                            <motion.div
                                className="graduates__careers-list"
                                variants={careerContainerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-10% 0px' }}
                            >
                                {CAREERS.map((career, index) => (
                                    <motion.div
                                        key={career.drawer}
                                        className="graduates__career-item"
                                        variants={careerItemVariants}
                                    >
                                        {index > 0 && <div className="graduates__career-divider" />}
                                        <h4 className="graduates__career-name">{career.label}</h4>
                                        <motion.button
                                            type="button"
                                            className="graduates__button"
                                            onClick={() => onOpenDrawer(career.drawer, career.label)}
                                            animate={{ scale: [1, 1.035, 1] }}
                                            transition={{
                                                duration: 2.2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            <span className="graduates__button__shimmer" aria-hidden="true" />
                                            <span className="graduates__button__label">Ver graduados</span>
                                            <ArrowUpRightIcon
                                                size={19}
                                                weight="bold"
                                                className="graduates__button__icon"
                                            />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><path d="M 0,600 L 0,150 C 104.06698564593302,136.08612440191388 208.13397129186603,122.17224880382776 313,106 C 417.86602870813397,89.82775119617224 523.5311004784688,71.39712918660287 606,86 C 688.4688995215312,100.60287081339713 747.7416267942584,148.23923444976077 847,166 C 946.2583732057416,183.76076555023923 1085.5023923444976,171.64593301435406 1191,164 C 1296.4976076555024,156.35406698564594 1368.248803827751,153.17703349282297 1440,150 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="#e9dbb5" fill-opacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 300)"></path><path d="M 0,600 L 0,350 C 103.54066985645932,360.0574162679426 207.08133971291863,370.1148325358851 288,362 C 368.91866028708137,353.8851674641149 427.21531100478467,327.5980861244019 525,338 C 622.7846889952153,348.4019138755981 760.0574162679425,395.49282296650716 875,406 C 989.9425837320575,416.50717703349284 1082.555023923445,390.4306220095694 1173,375 C 1263.444976076555,359.5693779904306 1351.7224880382773,354.78468899521533 1440,350 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="#e9dbb5" fill-opacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 300)"></path></svg>
        </>
    )
}
