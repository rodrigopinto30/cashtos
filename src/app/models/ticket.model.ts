export interface Ticket {
  id: string
  date: string
  commerceName: string
  totalAmount: number
  category: string
  paymentMethod: string
  items: number
  ivaAmount: number
  notes: string
  userId: string
  createdAt: Date
  imageUrl?: string
}

export interface TicketItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface TicketDetail extends Ticket {
  itemsList: TicketItem[]
}
