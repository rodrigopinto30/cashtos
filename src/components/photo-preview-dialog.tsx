'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Camera, Send, X, Loader2 } from 'lucide-react'

interface PhotoPreviewDialogProps {
  isOpen: boolean
  onClose: () => void
  imageData: string | null
  onSend: (imageData: string) => Promise<void>
}

export function PhotoPreviewDialog({
  isOpen,
  onClose,
  imageData,
  onSend,
}: PhotoPreviewDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSend = async () => {
    if (!imageData) return

    setIsProcessing(true)
    try {
      await onSend(imageData)
    } catch (error) {
      console.error('Error al enviar imagen:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancel = () => {
    if (!isProcessing) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center'>
            <Camera className='h-5 w-5 mr-2' />
            Foto Capturada
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          {imageData && (
            <div className='relative'>
              <img
                src={imageData || '/placeholder.svg'}
                alt='Ticket capturado'
                className='w-full h-auto rounded-lg border border-slate-200'
              />
              {isProcessing && (
                <div className='absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center'>
                  <div className='text-center text-white'>
                    <Loader2 className='h-8 w-8 mx-auto animate-spin mb-2' />
                    <p className='text-sm'>Analizando con IA...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <p className='text-sm text-slate-600 text-center'>
            ¿Quieres enviar esta imagen para analizar el ticket con inteligencia
            artificial?
          </p>
        </div>

        <DialogFooter className='flex flex-row justify-end space-x-2'>
          <Button
            variant='outline'
            onClick={handleCancel}
            disabled={isProcessing}
            className='flex-1'
          >
            <X className='h-4 w-4 mr-2' />
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            disabled={isProcessing || !imageData}
            className='flex-1 bg-teal-600 hover:bg-teal-700'
          >
            {isProcessing ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                Enviando...
              </>
            ) : (
              <>
                <Send className='h-4 w-4 mr-2' />
                Enviar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
