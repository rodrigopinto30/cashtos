// WhatsApp Service - Maneja compartir por WhatsApp
class WhatsAppService {
  shareText(text: string, phone?: string): void {
    const encodedText = encodeURIComponent(text)
    const phoneParam = phone ? `&phone=${phone}` : ""
    const url = `https://wa.me/?text=${encodedText}${phoneParam}`

    window.open(url, "_blank")
  }

  shareReport(reportData: any): void {
    const message = this.formatReportMessage(reportData)
    this.shareText(message)
  }

  shareTicket(ticketData: any): void {
    const message = this.formatTicketMessage(ticketData)
    this.shareText(message)
  }

  private formatReportMessage(reportData: any): string {
    return `📊 *Reporte de Gastos - Cashtos*

📅 Período: ${reportData.period}
💰 Total gastado: $${reportData.total}
📈 Tickets procesados: ${reportData.ticketCount}
🏆 Categoría principal: ${reportData.topCategory}

Generado con Cashtos - Tu asistente inteligente de gastos`
  }

  private formatTicketMessage(ticketData: any): string {
    return `🧾 *Ticket Digitalizado - Cashtos*

🏪 Comercio: ${ticketData.commerceName}
📅 Fecha: ${ticketData.date}
💰 Total: $${ticketData.totalAmount}
🏷️ Categoría: ${ticketData.category}

Digitalizado automáticamente con Cashtos`
  }
}

export const whatsappService = new WhatsAppService()
