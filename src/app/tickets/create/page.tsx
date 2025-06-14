"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Plus, Trash2, Save, X } from "lucide-react";

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
  category: string;
  notes: string;
  items: TicketItem[];
}

export default function CreateTicketPage() {
  const router = useRouter();
  const [ticketData, setTicketData] = useState<TicketData>({
    commerceName: "",
    date: new Date().toISOString().split("T")[0],
    totalAmount: 0,
    ivaAmount: 0,
    paymentMethod: "",
    category: "",
    notes: "",
    items: [],
  });

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

  const calculateTotal = () => {
    const itemsTotal = ticketData.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    setTicketData((prev) => ({
      ...prev,
      totalAmount: itemsTotal + prev.ivaAmount,
    }));
  };

  const saveTicket = () => {
    // Aquí se guardaría en la base de datos
    alert("Ticket creado exitosamente!");
    router.push("/tickets");
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Crear Registro Manual
          </h1>
          <p className="text-slate-600">
            Ingresa los datos del ticket manualmente
          </p>
        </div>

        {/* Formulario principal */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Información del Ticket</CardTitle>
            <CardDescription>
              Completa los datos básicos del ticket
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="commerceName">Comercio *</Label>
                <Input
                  id="commerceName"
                  placeholder="Nombre del comercio"
                  value={ticketData.commerceName}
                  onChange={(e) =>
                    setTicketData((prev) => ({
                      ...prev,
                      commerceName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={ticketData.date}
                  onChange={(e) =>
                    setTicketData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="paymentMethod">Método de Pago *</Label>
                <Select
                  value={ticketData.paymentMethod}
                  onValueChange={(value) =>
                    setTicketData((prev) => ({ ...prev, paymentMethod: value }))
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
              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={ticketData.category}
                  onValueChange={(value) =>
                    setTicketData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacion">Alimentación</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="hogar">Hogar</SelectItem>
                    <SelectItem value="salud">Salud</SelectItem>
                    <SelectItem value="entretenimiento">
                      Entretenimiento
                    </SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ivaAmount">IVA</Label>
                <Input
                  id="ivaAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={ticketData.ivaAmount}
                  onChange={(e) => {
                    setTicketData((prev) => ({
                      ...prev,
                      ivaAmount: Number.parseFloat(e.target.value) || 0,
                    }));
                  }}
                  onBlur={calculateTotal}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                placeholder="Notas adicionales (opcional)"
                value={ticketData.notes}
                onChange={(e) =>
                  setTicketData((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Items del ticket */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Artículos</CardTitle>
              <CardDescription>Agrega los productos del ticket</CardDescription>
            </div>
            <Button onClick={addItem} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Artículo
            </Button>
          </CardHeader>
          <CardContent>
            {ticketData.items.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>
                  No hay artículos agregados. Haz clic en "Agregar Artículo"
                  para comenzar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {ticketData.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 sm:gap-3 items-center p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="col-span-12 md:col-span-4">
                      <Label className="text-xs text-slate-600">Producto</Label>
                      <Input
                        placeholder="Nombre del producto"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <Label className="text-xs text-slate-600">Cantidad</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) => {
                          updateItem(
                            item.id,
                            "quantity",
                            Number.parseFloat(e.target.value) || 0
                          );
                          setTimeout(calculateTotal, 100);
                        }}
                      />
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <Label className="text-xs text-slate-600">
                        Precio Unit.
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={item.unitPrice}
                        onChange={(e) => {
                          updateItem(
                            item.id,
                            "unitPrice",
                            Number.parseFloat(e.target.value) || 0
                          );
                          setTimeout(calculateTotal, 100);
                        }}
                      />
                    </div>
                    <div className="col-span-10 md:col-span-3">
                      <Label className="text-xs text-slate-600">Subtotal</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.subtotal.toFixed(2)}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label className="text-xs text-slate-600 opacity-0">
                        Acción
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resumen y total */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal (artículos):</span>
                <span className="font-medium">
                  $
                  {ticketData.items
                    .reduce((sum, item) => sum + item.subtotal, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">IVA:</span>
                <span className="font-medium">
                  ${ticketData.ivaAmount.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-teal-600">
                    $
                    {(
                      ticketData.items.reduce(
                        (sum, item) => sum + item.subtotal,
                        0
                      ) + ticketData.ivaAmount
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push("/tickets")}
            className="border-slate-300"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={saveTicket}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
