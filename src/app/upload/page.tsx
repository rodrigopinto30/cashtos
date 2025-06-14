'use client'
import type React from 'react'

import { useRef, useEffect } from 'react'
import { CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ScanLine,
  Upload,
  X,
  Camera,
  FlashlightOffIcon as FlashOff,
  FlashlightIcon as FlashOn,
} from 'lucide-react'
import { PhotoPreviewDialog } from '@/components/photo-preview-dialog'
import { TicketDataDialog } from '@/components/ticket-data-dialog'
import { geminiService } from '@/services/gemini/gemini-service'
import { ticketService } from '@/services/tickets/ticket-service'

import { WebcamPhotoCapture } from '@/components/webcam-photo-capture'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [sentPhotos, setSentPhotos] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isUsingCamera, setIsUsingCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const startCamera = async () => {
    console.log('Iniciando cámara...')
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setIsUsingCamera(true)
      }
      console.log('Cámara iniciada correctamente')
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert(
        'No se pudo acceder a la cámara. Por favor, usa la opción de subir archivo.'
      )
    }
  }

  const handlePhotoSend = (photoDataUrl: string) => {
    setSentPhotos((prev) => [...prev, photoDataUrl])
    console.log('Foto enviada:', photoDataUrl)
    // Aca, quizas, puedo agregar la logica para enviar la foto a una IA para que la analice
    // Por ejemplo, enviar a un servicio de IA o guardarla en una base de datos
  }

  const handlePhotoCancel = () => {
    console.log('Foto cancelada')
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 py-6 sm:py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Digitalizar Ticket
          </h1>
          <p className='text-slate-600'>
            Captura una imagen de tu ticket para digitalizarlo automáticamente
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Subir ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <WebcamPhotoCapture
              onPhotoSend={handlePhotoSend}
              onPhotoCancel={handlePhotoCancel}
            />
          </CardContent>
        </Card>

        {sentPhotos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Tickets generados ({sentPhotos.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {sentPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo || '/placeholder.svg'}
                    alt={`Foto enviada ${index + 1}`}
                    className='w-full h-32 object-cover rounded-lg border'
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
