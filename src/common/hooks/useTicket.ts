import type { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { useInvitationConfig } from "./useInvitationConfig"
import { useCallback } from "react"
import { startCheckingTicket, startGettingTicket } from "@/store/ticket/ticket.thunk"
import { TicketHelpers } from "../utils/ticket.helpers"
import { clearTicketState } from "@/store/ticket/ticket.slice"
import { closeMenu } from "@/store/ui/menu.slice"
import { closeModal } from "@/store/ui/modal.slice"

export const useTicket = () => {

    const { templateName } = useInvitationConfig()

    const dispatch = useDispatch<AppDispatch>()
    const { ticket, isLoading, isChecking, error } = useSelector((state: RootState) => state.ticket)

    const onGetTicket = useCallback((keyPass: string): Promise<boolean> => {
        return dispatch(startGettingTicket(keyPass, templateName))
    }, [dispatch, templateName])

    const onRefreshTicket = useCallback((keyPass: string): Promise<boolean> => {
        return dispatch(startGettingTicket(keyPass, templateName, { silent: true }))
    }, [dispatch, templateName])

    const onRemoveTicket = useCallback(() => {
        TicketHelpers.clearStoredTicket(templateName)
        dispatch(clearTicketState())
        dispatch(closeMenu())
        dispatch(closeModal())
    }, [dispatch, templateName])

    const onCheckInitialData = useCallback(() => {
        dispatch(startCheckingTicket(templateName))
    }, [dispatch, templateName])

    return {
        ticket,
        error,
        isLoading,
        isChecking,

        onGetTicket,
        onRefreshTicket,
        onRemoveTicket,
        onCheckInitialData
    }

}