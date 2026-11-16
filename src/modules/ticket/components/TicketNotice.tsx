import React from 'react'
import { TicketIcon, QrCodeIcon } from '@phosphor-icons/react'

export const TicketNotice: React.FC = () => {
    return (
        <div className="ticket__notice-container">
            <div className="ticket__notice">
                <TicketIcon size={22} weight="bold" className="ticket__notice-icon" />
                <p className="ticket__notice-text">
                    Es indispensable presentar este boleto digital en la recepción del evento para el ingreso.
                </p>
            </div>

            <div className="ticket__notice">
                <QrCodeIcon size={22} weight="bold" className="ticket__notice-icon" />
                <p className="ticket__notice-text">
                    La cantidad de boletos irá disminuyendo conforme se vaya escaneando en la recepción hasta llegar a 0.
                </p>
            </div>
        </div>
    )
}
