// Ticket Service - Maneja la gestión de tickets
import type { Ticket } from '@/app/models/ticket.model'

class TicketService {
  // Obtener todos los tickets del usuario
  async getTickets(): Promise<Ticket[]> {
    try {
      // En producción, aquí iría la llamada a la API para obtener tickets
      // Simulación de obtención de tickets
      return new Promise((resolve) => {
        setTimeout(() => {
          const tickets: Ticket[] = [
            {
              id: '1',
              date: '2024-01-15',
              commerceName: 'Supermercado Central',
              totalAmount: 85.3,
              category: 'Alimentación',
              paymentMethod: 'Tarjeta',
              items: 8,
              ivaAmount: 12.8,
              notes: '',
              userId: 'user-1',
              createdAt: new Date('2024-01-15'),
            },
            {
              id: '2',
              date: '2024-01-14',
              commerceName: 'Gasolinera Shell',
              totalAmount: 45.0,
              category: 'Transporte',
              paymentMethod: 'Efectivo',
              items: 1,
              ivaAmount: 6.75,
              notes: '',
              userId: 'user-1',
              createdAt: new Date('2024-01-14'),
            },
            {
              id: '3',
              date: '2024-01-13',
              commerceName: 'Farmacia San Pablo',
              totalAmount: 25.75,
              category: 'Salud',
              paymentMethod: 'Tarjeta',
              items: 3,
              ivaAmount: 3.86,
              notes: '',
              userId: 'user-1',
              createdAt: new Date('2024-01-13'),
            },
            {
              id: '4',
              date: '2024-01-12',
              commerceName: 'Restaurante El Buen Sabor',
              totalAmount: 32.5,
              category: 'Alimentación',
              paymentMethod: 'Tarjeta',
              items: 4,
              ivaAmount: 4.88,
              notes: '',
              userId: 'user-1',
              createdAt: new Date('2024-01-12'),
            },
            {
              id: '5',
              date: '2024-01-11',
              commerceName: 'Tienda de Electrónicos',
              totalAmount: 299.99,
              category: 'Hogar',
              paymentMethod: 'Transferencia',
              items: 2,
              ivaAmount: 45.0,
              notes: '',
              userId: 'user-1',
              createdAt: new Date('2024-01-11'),
            },
            {
              id: '6',
              date: '2024-01-10',
              commerceName: 'Librería Académica',
              totalAmount: 45.8,
              category: 'Entretenimiento',
              paymentMethod: 'Efectivo',
              items: 3,
              ivaAmount: 6.87,
              notes: '',
              userId: 'user-1',
              createdAt: new Date('2024-01-10'),
            },
          ]
          resolve(tickets)
        }, 1000)
      })
    } catch (error) {
      console.error('Error al obtener tickets:', error)
      return []
    }
  }

  // Obtener un ticket por ID
  async getTicketById(id: string): Promise<Ticket | null> {
    try {
      // En producción, aquí iría la llamada a la API para obtener un ticket
      // Simulación de obtención de ticket
      return new Promise((resolve) => {
        setTimeout(() => {
          const ticket: Ticket = {
            id: id,
            date: '2024-01-15',
            commerceName: 'Supermercado Central',
            totalAmount: 85.3,
            category: 'Alimentación',
            paymentMethod: 'Tarjeta',
            items: 8,
            ivaAmount: 12.8,
            notes: 'Compra semanal',
            userId: 'user-1',
            createdAt: new Date('2024-01-15'),
          }
          resolve(ticket)
        }, 500)
      })
    } catch (error) {
      console.error(`Error al obtener ticket ${id}:`, error)
      return null
    }
  }

  // Crear un nuevo ticket
  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
    try {
      // En producción, aquí iría la llamada a la API para crear un ticket
      // Simulación de creación de ticket
      return new Promise((resolve) => {
        setTimeout(() => {
          const newTicket: Ticket = {
            id: 'ticket-' + Math.random().toString(36).substring(2, 9),
            date: ticketData.date || new Date().toISOString().split('T')[0],
            commerceName: ticketData.commerceName || '',
            totalAmount: ticketData.totalAmount || 0,
            category: ticketData.category || '',
            paymentMethod: ticketData.paymentMethod || '',
            items: ticketData.items || 0,
            ivaAmount: ticketData.ivaAmount || 0,
            notes: ticketData.notes || '',
            userId: 'user-1',
            createdAt: new Date(),
          }
          resolve(newTicket)
        }, 1000)
      })
    } catch (error) {
      console.error('Error al crear ticket:', error)
      throw new Error('Error al crear ticket')
    }
  }

  // Actualizar un ticket existente
  async updateTicket(id: string, ticketData: Partial<Ticket>): Promise<Ticket> {
    try {
      // En producción, aquí iría la llamada a la API para actualizar un ticket
      // Simulación de actualización de ticket
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedTicket: Ticket = {
            id: id,
            date: ticketData.date || new Date().toISOString().split('T')[0],
            commerceName: ticketData.commerceName || '',
            totalAmount: ticketData.totalAmount || 0,
            category: ticketData.category || '',
            paymentMethod: ticketData.paymentMethod || '',
            items: ticketData.items || 0,
            ivaAmount: ticketData.ivaAmount || 0,
            notes: ticketData.notes || '',
            userId: 'user-1',
            createdAt: new Date(),
          }
          resolve(updatedTicket)
        }, 1000)
      })
    } catch (error) {
      console.error(`Error al actualizar ticket ${id}:`, error)
      throw new Error('Error al actualizar ticket')
    }
  }

  // Eliminar un ticket
  async deleteTicket(id: string): Promise<boolean> {
    try {
      // En producción, aquí iría la llamada a la API para eliminar un ticket
      // Simulación de eliminación de ticket
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    } catch (error) {
      console.error(`Error al eliminar ticket ${id}:`, error)
      return false
    }
  }

  // Obtener estadísticas de tickets
  async getTicketStats(): Promise<{
    ticketsThisMonth: number
    totalExpensesThisMonth: number
    avgTicketAmount: number
    weeklyGrowth: number
  }> {
    try {
      // En producción, aquí iría la llamada a la API para obtener estadísticas
      // Simulación de estadísticas
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ticketsThisMonth: 12,
            totalExpensesThisMonth: 1250.5,
            avgTicketAmount: 104.2,
            weeklyGrowth: 8.5,
          })
        }, 800)
      })
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      return {
        ticketsThisMonth: 0,
        totalExpensesThisMonth: 0,
        avgTicketAmount: 0,
        weeklyGrowth: 0,
      }
    }
  }
}

export const ticketService = new TicketService()
