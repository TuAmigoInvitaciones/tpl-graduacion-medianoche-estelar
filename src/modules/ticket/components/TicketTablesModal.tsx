import React from 'react'
import { Modal } from '@/common/components/modal/Modal'
import { useTicket } from '@/common/hooks/useTicket'
import mesasImage from '@/assets/images/mesas.png'

export const TicketTablesModal: React.FC = () => {
    const { ticket } = useTicket()
    const tableInfo = ticket?.table || 'No asignada'
    const guestName = ticket?.name || ''

    return (
        <Modal size="lg">
            <div className="ticket__tables-modal">
                <a
                    href={mesasImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ticket__tables-modal-link"
                >
                    <img
                        src={mesasImage}
                        alt="Distribución de mesas"
                        className="ticket__tables-modal-image"
                    />
                </a>
                <p className="ticket__tables-modal-hint">
                    💡 Haz clic o toca el mapa para abrirlo en tamaño completo y poder hacer zoom.
                </p>

                {ticket && (
                    <div className="ticket__table-card ticket__tables-modal-card">
                        <span className="ticket__table-label">Mesa reservada para:</span>
                        <span className="ticket__tables-modal-guest">
                            {guestName}
                        </span>
                        <span className="ticket__table-label ticket__tables-modal-divider">
                            Mesa Asignada
                        </span>
                        <span className="ticket__table-value ticket__tables-modal-number">
                            {tableInfo}
                        </span>
                    </div>
                )}
            </div>
        </Modal>
    )
}


