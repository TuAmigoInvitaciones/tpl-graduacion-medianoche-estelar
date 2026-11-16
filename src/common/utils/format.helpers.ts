export class FormatHelpers {

    public static formatLocalDate = (dateStr?: string) => {
        if (!dateStr) return ''
        const [datePart] = dateStr.trim().split('T')
        const [year, month, day] = datePart.split('-').map(Number)
        if (!year || !month || !day) return ''

        const dateObj = new Date(year, month - 1, day)
        if (Number.isNaN(dateObj.getTime())) return ''

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }
        const formatted = dateObj.toLocaleDateString('es-ES', options)
        return formatted.charAt(0).toUpperCase() + formatted.slice(1)
    }

    public static formatDateToICal = (date: Date): string => {
        const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
        const year = date.getUTCFullYear()
        const month = pad(date.getUTCMonth() + 1)
        const day = pad(date.getUTCDate())
        const hours = pad(date.getUTCHours())
        const minutes = pad(date.getUTCMinutes())
        const seconds = pad(date.getUTCSeconds())

        return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
    }

    public static formatTitleFromKey = (key: string) => {
        const formatted = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        return formatted.charAt(0).toUpperCase() + formatted.slice(1)
    }

}