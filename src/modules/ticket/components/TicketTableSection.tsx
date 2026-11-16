import React from 'react'
import { motion } from 'framer-motion'
import { ArmchairIcon } from '@phosphor-icons/react'
import { useModal } from '@/common/hooks/useModal'
import { MODAL_NAMES } from '@/store/ui/modal.slice'
import type { Ticket } from '@/common/types'

interface Props {
    ticket?: Ticket | null
}

export const TicketTableSection: React.FC<Props> = ({ ticket }) => {
    const { onOpenModal } = useModal()
    const rawTable = String(ticket?.table ?? '').trim()
    const hasAssignedTable = Boolean(rawTable) && !/^(por asignar|no asignad[oa])$/i.test(rawTable)
    const tableInfo = hasAssignedTable ? rawTable : 'Por Asignar'

    return (
        <div className="ticket__table-section">
            <div className="ticket__table-card">
                <span className="ticket__table-label">Mesa Asignada</span>
                <span className="ticket__table-value">{tableInfo}</span>
            </div>

            {hasAssignedTable && (
                <div className="ticket__button">
                    <motion.button
                        type="button"
                        className="ticket__tables-btn"
                        onClick={() => onOpenModal(MODAL_NAMES.tables, 'Distribución de Mesas')}
                        animate={{ scale: [1, 1.035, 1] }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <span className="ticket__tables-btn__shimmer" aria-hidden="true" />
                        <ArmchairIcon size={20} weight="thin" className="ticket__tables-btn__icon" />
                        <span className="ticket__tables-btn__label">Ver Mesas</span>
                    </motion.button>
                </div>
            )}
        </div>
    )
}
