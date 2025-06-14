"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ScanLine,
  Upload,
  X,
  Check,
  Loader2,
  Plus,
  Trash2,
  Camera,
  FlashlightOffIcon as FlashOff,
  FlashlightIcon as FlashOn,
} from "lucide-react";
import { ocrService } from "@/services/ocr-service";

interface TicketItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// 1. Modificar la interfaz TicketData para eliminar category
interface TicketData {
  commerceName: string;
  date: string;
  totalAmount: number;
  ivaAmount: number;
  paymentMethod: string;
  notes: string;
  items: TicketItem[];
}

export default function UploadPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scanningProgress, setScanningProgress] = useState(0);
  // 2. Eliminar category del estado inicial
  const [ticketData, setTicketData] = useState<TicketData>({
    commerceName: "",
    date: new Date().toISOString().split("T")[0],
    totalAmount: 0,
    ivaAmount: 0,
    paymentMethod: "",
    notes: "",
    items: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsUsingCamera(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "No se pudo acceder a la cámara. Por favor, usa la opción de subir archivo."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsUsingCamera(false);
  };

  const toggleFlash = async () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack && "torch" in videoTrack.getCapabilities()) {
        try {
          await videoTrack.applyConstraints({
            advanced: [{ torch: !flashEnabled }],
          });
          setFlashEnabled(!flashEnabled);
        } catch (error) {
          console.log("Flash not supported on this device");
        }
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedImage(imageData);

        // Iniciar animación de escaneo
        setIsScanning(true);
        setScanningProgress(0);

        // Simular progreso de escaneo
        const progressInterval = setInterval(() => {
          setScanningProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setIsScanning(false);
              stopCamera();
              processImage(imageData);
              return 100;
            }
            return prev + 2;
          });
        }, 50);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);

        // Mostrar efecto de escaneo para archivos también
        setIsScanning(true);
        setScanningProgress(0);

        const progressInterval = setInterval(() => {
          setScanningProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setIsScanning(false);
              processImage(imageData);
              return 100;
            }
            return prev + 3;
          });
        }, 40);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);

    try {
      const ocrResult = await ocrService.processTicketAdvanced(imageData);
      setTicketData(ocrResult);
      setIsProcessing(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error al procesar la imagen. Por favor, intenta de nuevo.");
      setIsProcessing(false);
    }
  };

  const confirmAndSave = () => {
    setShowConfirmation(false);
    setShowPreview(true);
  };

  const addItem = () => {
    const newItem: TicketItem = {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    };
    setTicketData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateItem = (
    id: string,
    field: keyof TicketItem,
    value: string | number
  ) => {
    setTicketData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.subtotal = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const removeItem = (id: string) => {
    setTicketData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const saveTicket = () => {
    alert("Ticket guardado exitosamente!");
    setCapturedImage(null);
    setShowPreview(false);
    setShowConfirmation(false);
    setTicketData({
      commerceName: "",
      date: new Date().toISOString().split("T")[0],
      totalAmount: 0,
      ivaAmount: 0,
      paymentMethod: "",
      notes: "",
      items: [],
    });
  };

  const rejectAndRetry = () => {
    setShowConfirmation(false);
    setCapturedImage(null);
    setTicketData({
      commerceName: "",
      date: new Date().toISOString().split("T")[0],
      totalAmount: 0,
      ivaAmount: 0,
      paymentMethod: "",
      notes: "",
      items: [],
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Scanner Interface - Como QR Scanner
  if (isUsingCamera) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Scanner Overlay */}
        <div className="absolute inset-0 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={stopCamera}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-white font-semibold">Escanear Ticket</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFlash}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              {flashEnabled ? (
                <FlashOff className="h-5 w-5" />
              ) : (
                <FlashOn className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Scanner Area */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative w-full max-w-sm aspect-[3/4]">
              {/* Scanner Frame */}
              <div className="absolute inset-0 border-2 border-white rounded-2xl">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-1 h-full bg-teal-400 rounded-full"></div>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8">
                  <div className="absolute top-0 right-0 w-full h-1 bg-teal-400 rounded-full"></div>
                  <div className="absolute top-0 right-0 w-1 h-full bg-teal-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8">
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-400 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-full bg-teal-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8">
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-teal-400 rounded-full"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-full bg-teal-400 rounded-full"></div>
                </div>

                {/* Scanning Line */}
                {!isScanning && (
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                      className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-80"
                      style={{
                        animation: "scanLine 2s ease-in-out infinite",
                        top: "50%",
                      }}
                    ></div>
                  </div>
                )}

                {/* Scanning Progress */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="mb-4">
                        <ScanLine className="h-12 w-12 mx-auto animate-pulse text-teal-400" />
                      </div>
                      <p className="text-lg font-semibold mb-2">
                        Escaneando...
                      </p>
                      <div className="w-48 bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-teal-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scanningProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-300">
                        {scanningProgress}%
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Overlay Mask */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top mask */}
                <div className="absolute top-0 left-0 right-0 h-0 bg-black bg-opacity-50"></div>
                {/* Bottom mask */}
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-black bg-opacity-50"></div>
                {/* Left mask */}
                <div className="absolute top-0 bottom-0 left-0 w-0 bg-black bg-opacity-50"></div>
                {/* Right mask */}
                <div className="absolute top-0 bottom-0 right-0 w-0 bg-black bg-opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 sm:p-6 bg-black bg-opacity-50">
            <p className="text-white text-center text-lg mb-4">
              Posiciona el ticket dentro del marco
            </p>
            <p className="text-gray-300 text-center text-sm mb-6">
              Asegúrate de que el ticket esté bien iluminado y enfocado
            </p>

            {/* Capture Button */}
            <div className="flex justify-center">
              <Button
                onClick={capturePhoto}
                disabled={isScanning}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 p-0"
              >
                {isScanning ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <Camera className="h-8 w-8" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Scanning Overlay for uploaded files
  if (isScanning && capturedImage) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Escaneando Ticket
            </h1>
            <p className="text-slate-600">
              Analizando la imagen con inteligencia artificial...
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="relative">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Ticket escaneado"
                  className="w-full h-auto rounded-lg border"
                />

                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 border-4 border-teal-500 rounded-lg">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <ScanLine className="h-12 w-12 mx-auto animate-pulse text-teal-400 mb-4" />
                        <p className="text-lg font-semibold mb-2">
                          Escaneando...
                        </p>
                        <div className="w-48 bg-gray-700 rounded-full h-2 mb-2">
                          <div
                            className="bg-teal-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${scanningProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm">{scanningProgress}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Confirmation Modal
  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Confirmar Datos Escaneados
            </h1>
            <p className="text-slate-600">
              Revisa los datos extraídos por la IA antes de continuar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Imagen Escaneada</CardTitle>
              </CardHeader>
              <CardContent>
                {capturedImage && (
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Ticket capturado"
                    className="w-full h-auto rounded-lg border"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Datos Extraídos</CardTitle>
                <CardDescription>
                  Información detectada por la IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Comercio</Label>
                    <p className="text-slate-800">
                      {ticketData.commerceName || "No detectado"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Fecha</Label>
                    <p className="text-slate-800">
                      {ticketData.date || "No detectada"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Total</Label>
                    <p className="text-slate-800 font-semibold">
                      ${ticketData.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">IVA</Label>
                    <p className="text-slate-800">
                      ${ticketData.ivaAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* 3. Eliminar el campo de categoría en la pantalla de confirmación */}
                {ticketData.items.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">
                      Artículos Detectados
                    </Label>
                    <div className="mt-2 space-y-2">
                      {ticketData.items.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span>{item.name}</span>
                          <span>${item.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
                      {ticketData.items.length > 3 && (
                        <p className="text-xs text-slate-500">
                          +{ticketData.items.length - 3} artículos más
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              onClick={rejectAndRetry}
              className="border-slate-300"
            >
              <X className="h-4 w-4 mr-2" />
              No es correcto, intentar de nuevo
            </Button>
            <Button
              onClick={confirmAndSave}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Sí, continuar con estos datos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Preview and Edit Mode
  if (showPreview) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Revisar Ticket Digitalizado
            </h1>
            <p className="text-slate-600">
              Verifica y edita los datos extraídos del ticket
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Imagen Original</CardTitle>
              </CardHeader>
              <CardContent>
                {capturedImage && (
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Ticket capturado"
                    className="w-full h-auto rounded-lg border"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Datos del Ticket</CardTitle>
                <CardDescription>
                  Edita los campos según sea necesario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="commerceName">Comercio</Label>
                    <Input
                      id="commerceName"
                      value={ticketData.commerceName}
                      onChange={(e) =>
                        setTicketData((prev) => ({
                          ...prev,
                          commerceName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={ticketData.date}
                      onChange={(e) =>
                        setTicketData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalAmount">Monto Total</Label>
                    <Input
                      id="totalAmount"
                      type="number"
                      step="0.01"
                      value={ticketData.totalAmount}
                      onChange={(e) =>
                        setTicketData((prev) => ({
                          ...prev,
                          totalAmount: Number.parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="ivaAmount">IVA</Label>
                    <Input
                      id="ivaAmount"
                      type="number"
                      step="0.01"
                      value={ticketData.ivaAmount}
                      onChange={(e) =>
                        setTicketData((prev) => ({
                          ...prev,
                          ivaAmount: Number.parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>

                {/* 4. Eliminar el campo de categoría en la pantalla de edición */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="paymentMethod">Método de Pago</Label>
                    <Select
                      value={ticketData.paymentMethod}
                      onValueChange={(value) =>
                        setTicketData((prev) => ({
                          ...prev,
                          paymentMethod: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Efectivo</SelectItem>
                        <SelectItem value="card">Tarjeta</SelectItem>
                        <SelectItem value="transfer">Transferencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    placeholder="Notas adicionales..."
                    value={ticketData.notes}
                    onChange={(e) =>
                      setTicketData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Artículos</CardTitle>
                <CardDescription>
                  Lista de productos detectados en el ticket
                </CardDescription>
              </div>
              <Button
                onClick={addItem}
                size="sm"
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticketData.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="col-span-4">
                      <Input
                        placeholder="Nombre del producto"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Cantidad"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number.parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Precio unit."
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            Number.parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Subtotal"
                        value={item.subtotal}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div className="col-span-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
              className="border-slate-300"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={saveTicket}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Guardar Ticket
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Upload Interface
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Digitalizar Ticket
          </h1>
          <p className="text-slate-600">
            Captura o sube una imagen de tu ticket para digitalizarlo
            automáticamente
          </p>
        </div>

        {isProcessing ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-teal-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Procesando ticket...
              </h3>
              <p className="text-slate-600 text-center">
                Estamos extrayendo los datos de tu ticket usando IA. Esto puede
                tomar unos segundos.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Subir Ticket</CardTitle>
              <CardDescription>
                Elige cómo quieres digitalizar tu ticket
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Arrastra tu imagen aquí
                </h3>
                <p className="text-slate-500 mb-4">
                  o haz clic para seleccionar un archivo
                </p>
                <Badge variant="secondary">JPG, PNG, PDF hasta 10MB</Badge>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-slate-500">O</span>
                </div>
              </div>

              <Button
                onClick={startCamera}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                size="lg"
              >
                <ScanLine className="h-5 w-5 mr-2" />
                Usar Cámara
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
