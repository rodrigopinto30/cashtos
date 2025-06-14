"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Store,
} from "lucide-react";

interface Ticket {
  id: string;
  date: string;
  commerceName: string;
  totalAmount: number;
  category: string;
  paymentMethod: string;
  items: number;
}

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      date: "2024-01-15",
      commerceName: "Supermercado Central",
      totalAmount: 85.3,
      category: "Alimentación",
      paymentMethod: "Tarjeta",
      items: 8,
    },
    {
      id: "2",
      date: "2024-01-14",
      commerceName: "Gasolinera Shell",
      totalAmount: 45.0,
      category: "Transporte",
      paymentMethod: "Efectivo",
      items: 1,
    },
    {
      id: "3",
      date: "2024-01-13",
      commerceName: "Farmacia San Pablo",
      totalAmount: 25.75,
      category: "Salud",
      paymentMethod: "Tarjeta",
      items: 3,
    },
    {
      id: "4",
      date: "2024-01-12",
      commerceName: "Restaurante El Buen Sabor",
      totalAmount: 32.5,
      category: "Alimentación",
      paymentMethod: "Tarjeta",
      items: 4,
    },
    {
      id: "5",
      date: "2024-01-11",
      commerceName: "Tienda de Electrónicos",
      totalAmount: 299.99,
      category: "Hogar",
      paymentMethod: "Transferencia",
      items: 2,
    },
    {
      id: "6",
      date: "2024-01-10",
      commerceName: "Librería Académica",
      totalAmount: 45.8,
      category: "Entretenimiento",
      paymentMethod: "Efectivo",
      items: 3,
    },
  ]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.commerceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || ticket.category === categoryFilter;
    const matchesDate = !dateFilter || ticket.date.includes(dateFilter);

    return matchesSearch && matchesCategory && matchesDate;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Alimentación: "bg-green-100 text-green-800",
      Transporte: "bg-blue-100 text-blue-800",
      Salud: "bg-red-100 text-red-800",
      Hogar: "bg-purple-100 text-purple-800",
      Entretenimiento: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getPaymentMethodColor = (method: string) => {
    const colors: { [key: string]: string } = {
      Efectivo: "bg-orange-100 text-orange-800",
      Tarjeta: "bg-blue-100 text-blue-800",
      Transferencia: "bg-green-100 text-green-800",
    };
    return colors[method] || "bg-gray-100 text-gray-800";
  };

  const totalAmount = filteredTickets.reduce(
    (sum, ticket) => sum + ticket.totalAmount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Gestión de Tickets
          </h1>
          <p className="text-slate-600">
            Administra y organiza todos tus tickets digitalizados
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <Store className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Tickets</p>
                  <p className="text-xl font-bold text-slate-800">
                    {filteredTickets.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Monto Total</p>
                  <p className="text-xl font-bold text-slate-800">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Este Mes</p>
                  <p className="text-xl font-bold text-slate-800">
                    {tickets.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Filter className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Promedio</p>
                  <p className="text-xl font-bold text-slate-800">
                    $
                    {tickets.length > 0
                      ? (totalAmount / tickets.length).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </CardTitle>
            <CardDescription>Filtra y busca tus tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por comercio o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="Alimentación">Alimentación</SelectItem>
                  <SelectItem value="Transporte">Transporte</SelectItem>
                  <SelectItem value="Salud">Salud</SelectItem>
                  <SelectItem value="Hogar">Hogar</SelectItem>
                  <SelectItem value="Entretenimiento">
                    Entretenimiento
                  </SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="month"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Filtrar por mes"
              />

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setDateFilter("");
                }}
                className="border-slate-300"
              >
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Tickets</CardTitle>
            <CardDescription>
              {filteredTickets.length} ticket(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Comercio</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Método de Pago</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        {new Date(ticket.date).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell>{ticket.commerceName}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(ticket.category)}>
                          {ticket.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getPaymentMethodColor(
                            ticket.paymentMethod
                          )}
                        >
                          {ticket.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.items} items</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${ticket.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredTickets.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500">
                  No se encontraron tickets con los filtros aplicados.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
