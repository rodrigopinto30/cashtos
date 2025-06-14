'use client'

import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Camera, RotateCcw } from 'lucide-react'

interface WebcamPhotoCaptureProps {
  onPhotoSend?: (photoDataUrl: string) => void
  onPhotoCancel?: () => void
}

export function WebcamPhotoCapture({
  onPhotoSend,
  onPhotoCancel,
}: WebcamPhotoCaptureProps) {
  const webcamRef = useRef<Webcam>(null)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  }

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setCapturedPhoto(imageSrc)
      setIsModalOpen(true)
    }
  }, [webcamRef])

  const handleSendPhoto = () => {
    if (capturedPhoto) {
      onPhotoSend?.(capturedPhoto)
      handleCloseModal()
    }
  }

  const handleCancelPhoto = () => {
    onPhotoCancel?.()
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCapturedPhoto(null)
  }

  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }

  return (
    <div className='flex flex-col items-center space-y-4'>
      <div className='relative rounded-lg overflow-hidden border'>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat='image/jpeg'
          videoConstraints={videoConstraints}
          className='w-full max-w-md'
        />
      </div>

      <div className='flex gap-2'>
        <Button
          onClick={capturePhoto}
          size='lg'
          className='flex items-center gap-2'
        >
          <Camera className='w-5 h-5' />
          Tomar Foto
        </Button>
        <Button onClick={switchCamera} variant='outline' size='lg'>
          <RotateCcw className='w-5 h-5' />
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Foto Capturada</DialogTitle>
          </DialogHeader>

          <div className='flex justify-center'>
            {capturedPhoto && (
              <img
                src={capturedPhoto || '/placeholder.svg'}
                alt='Foto capturada'
                className='max-w-full h-auto rounded-lg border'
              />
            )}
          </div>

          <DialogFooter className='flex gap-2'>
            <Button variant='outline' onClick={handleCancelPhoto}>
              Cancelar
            </Button>
            <Button onClick={handleSendPhoto}>Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
