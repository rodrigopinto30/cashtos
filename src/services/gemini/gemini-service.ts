// Gemini Service - Integración con Google Gemini AI
interface GeminiTicketData {
  commerceName: string
  date: string
  totalAmount: number
  ivaAmount: number
  paymentMethod: string
  category: string
  notes: string
  items: Array<{
    name: string
    quantity: number
    unitPrice: number
    subtotal: number
  }>
}

class GeminiService {
  private apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
  private apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

  async analyzeTicket(imageBase64: string): Promise<GeminiTicketData> {
    if (!this.apiKey) {
      throw new Error('API Key de Gemini no configurada')
    }

    try {
      const prompt = `Analiza esta imagen de un ticket o factura y extrae la siguiente información en formato JSON exacto:
  
  {
    "commerceName": "nombre del comercio o establecimiento",
    "date": "fecha en formato YYYY-MM-DD",
    "totalAmount": número_total_sin_simbolos,
    "ivaAmount": número_iva_sin_simbolos,
    "paymentMethod": "cash" | "card" | "transfer",
    "category": "alimentacion" | "transporte" | "salud" | "hogar" | "entretenimiento" | "otros",
    "notes": "observaciones adicionales si las hay",
    "items": [
      {
        "name": "nombre del producto o servicio",
        "quantity": cantidad_numerica,
        "unitPrice": precio_unitario_numerico,
        "subtotal": subtotal_numerico
      }
    ]
  }
  
  Instrucciones importantes:
  - Si no puedes detectar algún campo, usa valores por defecto razonables
  - Los números deben ser solo números, sin símbolos de moneda
  - La fecha debe estar en formato YYYY-MM-DD
  - Si no hay items específicos, crea al menos uno con el total
  - Responde SOLO con el JSON, sin texto adicional`

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: imageBase64.split(',')[1], // Remover el prefijo data:image/jpeg;base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(
          `Error de Gemini API: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        throw new Error('Respuesta inválida de Gemini API')
      }

      const textResponse = data.candidates[0].content.parts[0].text

      // Limpiar la respuesta para extraer solo el JSON
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No se pudo extraer JSON de la respuesta de Gemini')
      }

      const ticketData = JSON.parse(jsonMatch[0])

      // Validar y procesar los datos
      return this.validateAndProcessTicketData(ticketData)
    } catch (error) {
      console.error('Error al analizar ticket con Gemini:', error)
      throw new Error(
        'Error al procesar el ticket con IA. Por favor, intenta de nuevo.'
      )
    }
  }

  private validateAndProcessTicketData(data: any): GeminiTicketData {
    // Validar y limpiar los datos recibidos
    const processedData: GeminiTicketData = {
      commerceName: data.commerceName || 'Comercio no identificado',
      date:
        this.validateDate(data.date) || new Date().toISOString().split('T')[0],
      totalAmount: Number(data.totalAmount) || 0,
      ivaAmount: Number(data.ivaAmount) || 0,
      paymentMethod: this.validatePaymentMethod(data.paymentMethod) || 'cash',
      category: this.validateCategory(data.category) || 'otros',
      notes: data.notes || 'Procesado automáticamente con IA',
      items: this.validateItems(data.items) || [],
    }

    // Si no hay items, crear uno con el total
    if (processedData.items.length === 0) {
      processedData.items = [
        {
          name: 'Compra general',
          quantity: 1,
          unitPrice: processedData.totalAmount - processedData.ivaAmount,
          subtotal: processedData.totalAmount - processedData.ivaAmount,
        },
      ]
    }

    return processedData
  }

  private validateDate(date: string): string | null {
    if (!date) return null

    // Intentar parsear la fecha
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) return null

    return parsedDate.toISOString().split('T')[0]
  }

  private validatePaymentMethod(method: string): string {
    const validMethods = ['cash', 'card', 'transfer']
    return validMethods.includes(method) ? method : 'cash'
  }

  private validateCategory(category: string): string {
    const validCategories = [
      'alimentacion',
      'transporte',
      'salud',
      'hogar',
      'entretenimiento',
      'otros',
    ]
    return validCategories.includes(category) ? category : 'otros'
  }

  private validateItems(
    items: any[]
  ): Array<{
    name: string
    quantity: number
    unitPrice: number
    subtotal: number
  }> {
    if (!Array.isArray(items)) return []

    return items
      .map((item, index) => ({
        name: item.name || `Item ${index + 1}`,
        quantity: Number(item.quantity) || 1,
        unitPrice: Number(item.unitPrice) || 0,
        subtotal: Number(item.subtotal) || 0,
      }))
      .filter((item) => item.name && item.quantity > 0)
  }
}

export const geminiService = new GeminiService()
