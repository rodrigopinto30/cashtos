// Export Service - Maneja exportación a diferentes formatos
import * as XLSX from "xlsx"

interface ExportData {
  tickets?: any[]
  reports?: any[]
  summary?: any
}

class ExportService {
  // Exportar a Excel
  async exportToExcel(data: ExportData, filename = "cashtos-export") {
    const workbook = XLSX.utils.book_new()

    // Hoja de tickets
    if (data.tickets && data.tickets.length > 0) {
      const ticketsSheet = XLSX.utils.json_to_sheet(data.tickets)
      XLSX.utils.book_append_sheet(workbook, ticketsSheet, "Tickets")
    }

    // Hoja de reportes
    if (data.reports && data.reports.length > 0) {
      const reportsSheet = XLSX.utils.json_to_sheet(data.reports)
      XLSX.utils.book_append_sheet(workbook, reportsSheet, "Reportes")
    }

    // Hoja de resumen
    if (data.summary) {
      const summarySheet = XLSX.utils.json_to_sheet([data.summary])
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Resumen")
    }

    // Descargar archivo
    XLSX.writeFile(workbook, `${filename}.xlsx`)
  }

  // Exportar a CSV
  async exportToCSV(data: any[], filename = "cashtos-export") {
    const csv = this.convertToCSV(data)
    this.downloadFile(csv, `${filename}.csv`, "text/csv")
  }

  // Exportar a PDF
  async exportToPDF(data: any, filename = "cashtos-export") {
    // Aquí se integraría con una librería como jsPDF
    const response = await fetch("/api/export/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const blob = await response.blob()
    this.downloadBlob(blob, `${filename}.pdf`)
  }

  private convertToCSV(data: any[]): string {
    if (!data.length) return ""

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            return typeof value === "string" ? `"${value}"` : value
          })
          .join(","),
      ),
    ].join("\n")

    return csvContent
  }

  private downloadFile(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType })
    this.downloadBlob(blob, filename)
  }

  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

export const exportService = new ExportService()
