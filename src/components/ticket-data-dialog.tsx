'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X, Plus, Trash2, Edit3 } from 'lucide-react'

interface TicketItem {
  name: string
  quantity: number
  unitPrice: number
  subtotal: number
}

interface TicketData {
  commerceName: string
  date: string
  totalAmount: number
  ivaAmount: number
  paymentMethod: string
  category: string
  notes: string
  items: TicketItem[]
}

interface TicketDataDialogProps {
  isOpen: boolean
  onClose: () => void
  ticketData: TicketData | null
  onSave: (data: TicketData) => Promise<void>
}

export function TicketDataDialog({
  isOpen,
  onClose,
  ticketData,
  onSave,
}: TicketDataDialogProps) {
  const [editableData, setEditableData] = useState<TicketData | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (ticketData) {
      setEditableData({ ...ticketData })
    }
  }, [ticketData])

  const handleSave = async () => {
    if (!editableData) return

    setIsSaving(true)
    try {
      await onSave(editableData)
      onClose()
    } catch (error) {
      console.error('Error al guardar ticket:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (!isSaving) {
      onClose()
    }
  }

  const updateField = (field: keyof TicketData, value: any) => {
    if (!editableData) return
    setEditableData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const addItem = () => {
    if (!editableData) return
    const newItem: TicketItem = {
      name: '',
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    }
    setEditableData((prev) =>
      prev
        ? {
            ...prev,
            items: [...prev.items, newItem],
          }
        : null
    )
  }

  const updateItem = (
    index: number,
    field: keyof TicketItem,
    value: string | number
  ) => {
    if (!editableData) return
    const updatedItems = [...editableData.items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    // Recalcular subtotal si se cambia cantidad o precio unitario
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].subtotal =
        updatedItems[index].quantity * updatedItems[index].unitPrice
    }

    setEditableData((prev) => (prev ? { ...prev, items: updatedItems } : null))
  }

  const removeItem = (index: number) => {
    if (!editableData) return
    const updatedItems = editableData.items.filter((_, i) => i !== index)
    setEditableData((prev) => (prev ? { ...prev, items: updatedItems } : null))
  }

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      alimentacion: 'Alimentación',
      transporte: 'Transporte',
      salud: 'Salud',
      hogar: 'Hogar',
      entretenimiento: 'Entretenimiento',
      otros: 'Otros',
    }
    return categoryMap[category] || 'Otros'
  }

  if (!editableData) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center'>
            <Edit3 className='h-5 w-5 mr-2' />
            Datos del Ticket Analizados
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='commerceName'>Comercio</Label>
                  <Input
                    id='commerceName'
                    value={editableData.commerceName}
                    onChange={(e) =>
                      updateField('commerceName', e.target.value)
                    }
                    placeholder='Nombre del comercio'
                  />
                </div>
                <div>
                  <Label htmlFor='date'>Fecha</Label>
                  <Input
                    id='date'
                    type='date'
                    value={editableData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <Label htmlFor='totalAmount'>Total</Label>
                  <Input
                    id='totalAmount'
                    type='number'
                    step='0.01'
                    value={editableData.totalAmount}
                    onChange={(e) =>
                      updateField(
                        'totalAmount',
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='ivaAmount'>IVA</Label>
                  <Input
                    id='ivaAmount'
                    type='number'
                    step='0.01'
                    value={editableData.ivaAmount}
                    onChange={(e) =>
                      updateField(
                        'ivaAmount',
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='paymentMethod'>Método de Pago</Label>
                  <Select
                    value={editableData.paymentMethod}
                    onValueChange={(value) =>
                      updateField('paymentMethod', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cash'>Efectivo</SelectItem>
                      <SelectItem value='card'>Tarjeta</SelectItem>
                      <SelectItem value='transfer'>Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='category'>Categoría</Label>
                  <Select
                    value={editableData.category}
                    onValueChange={(value) => updateField('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='alimentacion'>Alimentación</SelectItem>
                      <SelectItem value='transporte'>Transporte</SelectItem>
                      <SelectItem value='salud'>Salud</SelectItem>
                      <SelectItem value='hogar'>Hogar</SelectItem>
                      <SelectItem value='entretenimiento'>
                        Entretenimiento
                      </SelectItem>
                      <SelectItem value='otros'>Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor='notes'>Notas</Label>
                  <Textarea
                    id='notes'
                    value={editableData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder='Notas adicionales...'
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items del ticket */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-lg'>Artículos</CardTitle>
              <Button
                onClick={addItem}
                size='sm'
                className='bg-teal-600 hover:bg-teal-700'
              >
                <Plus className='h-4 w-4 mr-2' />
                Agregar Item
              </Button>
            </CardHeader>
            <CardContent>
              {editableData.items.length === 0 ? (
                <div className='text-center py-8 text-slate-500'>
                  <p>
                    No hay artículos. Haz clic en "Agregar Item" para añadir
                    productos.
                  </p>
                </div>
              ) : (
                <div className='space-y-3'>
                  {editableData.items.map((item, index) => (
                    <div
                      key={index}
                      className='grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-lg'
                    >
                      <div className='col-span-12 md:col-span-4'>
                        <Input
                          placeholder='Nombre del producto'
                          value={item.name}
                          onChange={(e) =>
                            updateItem(index, 'name', e.target.value)
                          }
                        />
                      </div>
                      <div className='col-span-4 md:col-span-2'>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder='Cantidad'
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              index,
                              'quantity',
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className='col-span-4 md:col-span-2'>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder='Precio unit.'
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateItem(
                              index,
                              'unitPrice',
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className='col-span-3 md:col-span-2'>
                        <Input
                          type='number'
                          step='0.01'
                          value={item.subtotal.toFixed(2)}
                          readOnly
                          className='bg-gray-100'
                        />
                      </div>
                      <div className='col-span-1 md:col-span-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => removeItem(index)}
                          className='w-full text-red-600 hover:text-red-700'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-slate-600'>Subtotal (artículos):</span>
                  <span className='font-medium'>
                    $
                    {editableData.items
                      .reduce((sum, item) => sum + item.subtotal, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-slate-600'>IVA:</span>
                  <span className='font-medium'>
                    ${editableData.ivaAmount.toFixed(2)}
                  </span>
                </div>
                <div className='border-t pt-2'>
                  <div className='flex justify-between text-lg font-bold'>
                    <span>Total:</span>
                    <span className='text-teal-600'>
                      ${editableData.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className='flex flex-row justify-end space-x-2'>
          <Button
            variant='outline'
            onClick={handleCancel}
            disabled={isSaving}
            className='flex-1'
          >
            <X className='h-4 w-4 mr-2' />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className='flex-1 bg-teal-600 hover:bg-teal-700'
          >
            {isSaving ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className='h-4 w-4 mr-2' />
                Guardar Ticket
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
