// OCR Service - Simula la integración con servicios de IA
interface TicketItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  subtotal: number
}

// Modificar la interfaz TicketData para eliminar category
interface TicketData {
  commerceName: string
  date: string
  totalAmount: number
  ivaAmount: number
  paymentMethod: string
  notes: string
  items: TicketItem[]
}

// Define un tipo de unión para las claves de tus plantillas de tickets.
// Esto garantiza que 'commerceType' sea una clave válida.
type SupportedCommerceType = "supermercado" | "gasolinera" | "farmacia" | "restaurante" | "tienda";

// Interfaz para los ítems dentro de una plantilla de ticket (datos "crudos").
interface TemplateTicketItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

// Interfaz para una plantilla de ticket individual.
interface TicketTemplate {
  commerceName: string;
  paymentMethod: string;
  items: TemplateTicketItem[];
}

// Tipo para el objeto completo de plantillas de tickets,
// asegurando que cada clave sea de tipo SupportedCommerceType y el valor sea TicketTemplate.
type TicketTemplates = {
  [K in SupportedCommerceType]: TicketTemplate;
};

// Interfaz para el objeto 'analysis' que recibe tu función.
// ¡Esta es la parte crucial que resuelve el error en 'analysis.commerceType'!
interface ImageAnalysis {
  commerceType: SupportedCommerceType;
  confidence: number;
  detectedText: string[]; // Asumo que esto se usa en otro lugar, pero lo mantengo
  imageQuality: number; // Asumo que esto se usa en otro lugar, pero lo mantengo
}

// --- Interfaces de datos finales (las que ya tenías) ---
interface TicketItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface TicketData {
  commerceName: string;
  date: string;
  totalAmount: number;
  ivaAmount: number;
  paymentMethod: string;
  notes: string;
  items: TicketItem[];
}

class OCRService {
  async processTicket(imageBase64: string): Promise<TicketData> {
    // Simular procesamiento con delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // En producción, aquí iría la llamada a la API de OCR
    // Por ejemplo: OpenAI GPT-4 Vision, Google Cloud Vision, etc.

    // Datos simulados basados en diferentes tipos de tickets
    const mockResults = [
      {
        commerceName: "Supermercado Central",
        date: "2024-01-15",
        totalAmount: 85.3,
        ivaAmount: 12.8,
        paymentMethod: "card",
        notes: "Compra semanal",
        items: [
          {
            id: "1",
            name: "Leche entera 1L",
            quantity: 2,
            unitPrice: 3.5,
            subtotal: 7.0,
          },
          {
            id: "2",
            name: "Pan integral",
            quantity: 1,
            unitPrice: 2.8,
            subtotal: 2.8,
          },
          {
            id: "3",
            name: "Manzanas kg",
            quantity: 1.5,
            unitPrice: 4.2,
            subtotal: 6.3,
          },
        ],
      },
      {
        commerceName: "Gasolinera Shell",
        date: "2024-01-14",
        totalAmount: 45.0,
        ivaAmount: 6.75,
        paymentMethod: "card",
        notes: "Combustible",
        items: [
          {
            id: "1",
            name: "Gasolina Premium",
            quantity: 30,
            unitPrice: 1.5,
            subtotal: 45.0,
          },
        ],
      },
      {
        commerceName: "Farmacia San Pablo",
        date: "2024-01-13",
        totalAmount: 25.75,
        ivaAmount: 3.86,
        paymentMethod: "cash",
        notes: "Medicamentos",
        items: [
          {
            id: "1",
            name: "Paracetamol 500mg",
            quantity: 1,
            unitPrice: 8.5,
            subtotal: 8.5,
          },
          {
            id: "2",
            name: "Vitamina C",
            quantity: 1,
            unitPrice: 12.25,
            subtotal: 12.25,
          },
          {
            id: "3",
            name: "Alcohol gel",
            quantity: 1,
            unitPrice: 5.0,
            subtotal: 5.0,
          },
        ],
      },
    ]

    // Seleccionar resultado aleatorio para simular diferentes tipos de tickets
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]

    return randomResult
  }

  // Método mejorado que simula análisis más detallado de la imagen
  async processTicketAdvanced(imageBase64: string): Promise<TicketData> {
    // Simular procesamiento con delay más realista
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simular análisis de la imagen para generar datos más específicos
    const imageAnalysis = this.analyzeImageContent(imageBase64)

    // Generar datos basados en el "análisis" de la imagen
    return this.generateTicketDataFromAnalysis(imageAnalysis)
  }

  private analyzeImageContent(imageBase64: string): any {
    // Simular análisis de contenido de imagen
    // En producción, aquí se haría el análisis real con IA

    // Simular diferentes tipos de comercios basado en características de la imagen
    const commerceTypes = [
      {
        type: "supermercado",
        indicators: ["productos", "alimentos", "código de barras"],
        probability: 0.4,
      },
      {
        type: "gasolinera",
        indicators: ["combustible", "litros", "precio por litro"],
        probability: 0.2,
      },
      {
        type: "farmacia",
        indicators: ["medicamentos", "receta", "salud"],
        probability: 0.15,
      },
      {
        type: "restaurante",
        indicators: ["comida", "bebida", "mesa"],
        probability: 0.15,
      },
      {
        type: "tienda",
        indicators: ["productos", "retail"],
        probability: 0.1,
      },
    ]

    // Seleccionar tipo de comercio aleatoriamente
    const selectedType = commerceTypes[Math.floor(Math.random() * commerceTypes.length)]

    return {
      commerceType: selectedType.type,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confianza
      detectedText: this.generateDetectedText(selectedType.type),
      imageQuality: Math.random() * 0.4 + 0.6, // 60-100% calidad
    }
  }

  private generateDetectedText(commerceType: string): string[] {
    const textPatterns = {
      supermercado: [
        "SUPERMERCADO CENTRAL",
        "LECHE ENTERA 1L",
        "PAN INTEGRAL",
        "MANZANAS KG",
        "TOTAL: $85.30",
        "IVA: $12.80",
      ],
      gasolinera: ["GASOLINERA SHELL", "GASOLINA PREMIUM", "30.00 LITROS", "TOTAL: $45.00", "IVA: $6.75"],
      farmacia: ["FARMACIA SAN PABLO", "PARACETAMOL 500MG", "VITAMINA C", "ALCOHOL GEL", "TOTAL: $25.75", "IVA: $3.86"],
      restaurante: [
        "RESTAURANTE EL BUEN SABOR",
        "HAMBURGUESA CLÁSICA",
        "PAPAS FRITAS",
        "REFRESCO",
        "TOTAL: $32.50",
        "IVA: $4.88",
      ],
      tienda: ["TIENDA DE ELECTRÓNICOS", "CABLE USB", "CARGADOR", "TOTAL: $299.99", "IVA: $45.00"],
    }

    // return textPatterns[commerceType] || textPatterns.tienda
      return textPatterns[commerceType as keyof typeof textPatterns] || textPatterns.tienda;

  }

 private generateTicketDataFromAnalysis(analysis: ImageAnalysis): TicketData {
    // Aquí definimos el objeto ticketTemplates y lo tipamos explícitamente
    const ticketTemplates: TicketTemplates = {
      supermercado: {
        commerceName: "Supermercado Central",
        paymentMethod: "card",
        items: [
          { name: "Leche entera 1L", quantity: 2, unitPrice: 3.5 },
          { name: "Pan integral", quantity: 1, unitPrice: 2.8 },
          { name: "Manzanas kg", quantity: 1.5, unitPrice: 4.2 },
          { name: "Yogurt natural", quantity: 4, unitPrice: 1.25 },
          { name: "Cereal integral", quantity: 1, unitPrice: 8.5 },
        ],
      },
      gasolinera: {
        commerceName: "Gasolinera Shell",
        paymentMethod: "card",
        items: [{ name: "Gasolina Premium", quantity: 30, unitPrice: 1.5 }],
      },
      farmacia: {
        commerceName: "Farmacia San Pablo",
        paymentMethod: "cash",
        items: [
          { name: "Paracetamol 500mg", quantity: 1, unitPrice: 8.5 },
          { name: "Vitamina C", quantity: 1, unitPrice: 12.25 },
          { name: "Alcohol gel", quantity: 1, unitPrice: 5.0 },
        ],
      },
      restaurante: {
        commerceName: "Restaurante El Buen Sabor",
        paymentMethod: "card",
        items: [
          { name: "Hamburguesa Clásica", quantity: 1, unitPrice: 15.0 },
          { name: "Papas Fritas", quantity: 1, unitPrice: 8.5 },
          { name: "Refresco", quantity: 1, unitPrice: 4.0 },
          { name: "Postre", quantity: 1, unitPrice: 5.0 },
        ],
      },
      tienda: {
        commerceName: "Tienda de Electrónicos",
        paymentMethod: "transfer",
        items: [
          { name: "Cable USB-C", quantity: 1, unitPrice: 25.99 },
          { name: "Cargador rápido", quantity: 1, unitPrice: 45.0 },
          { name: "Funda protectora", quantity: 1, unitPrice: 15.99 },
        ],
      },
    };

    // Aquí, TypeScript sabe que 'analysis.commerceType' es de tipo 'SupportedCommerceType',
    // lo que le permite acceder de forma segura a las claves de 'ticketTemplates'.
    const template: TicketTemplate = ticketTemplates[analysis.commerceType] || ticketTemplates.tienda;

    // Calcular totales
    // Explicitamente tipamos 'items' como un array de 'TicketItem'
    const items: TicketItem[] = template.items.map((item, index) => ({
      id: (index + 1).toString(), // Genera un ID simple
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.quantity * item.unitPrice,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const ivaAmount = subtotal * 0.15; // 15% IVA
    const totalAmount = subtotal + ivaAmount;

    return {
      commerceName: template.commerceName,
      date: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
      totalAmount: Math.round(totalAmount * 100) / 100, // Redondeo a 2 decimales
      ivaAmount: Math.round(ivaAmount * 100) / 100, // Redondeo a 2 decimales
      paymentMethod: template.paymentMethod,
      notes: `Procesado automáticamente con ${Math.round(analysis.confidence * 100)}% de confianza`,
      items: items,
    };
  }

  // Método para integración futura con APIs reales
  async processWithGPT4Vision(imageBase64: string): Promise<TicketData> {
    // Ejemplo de integración con OpenAI GPT-4 Vision
    const response = await fetch("/api/ocr/gpt4-vision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64,
        prompt: `Analiza este ticket y extrae la siguiente información en formato JSON:
        {
          "commerceName": "nombre del comercio",
          "date": "fecha en formato YYYY-MM-DD",
          "totalAmount": número_total,
          "ivaAmount": número_iva,
          "paymentMethod": "cash|card|transfer",
          "category": "alimentacion|transporte|salud|hogar|entretenimiento|otros",
          "items": [
            {
              "name": "nombre del producto",
              "quantity": cantidad,
              "unitPrice": precio_unitario,
              "subtotal": subtotal
            }
          ]
        }`,
      }),
    })

    return await response.json()
  }

  async processWithGoogleVision(imageBase64: string): Promise<TicketData> {
    // Ejemplo de integración con Google Cloud Vision
    const response = await fetch("/api/ocr/google-vision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64,
      }),
    })

    return await response.json()
  }
}

export const ocrService = new OCRService()
