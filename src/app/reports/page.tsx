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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
} from "lucide-react";
// import { LayoutWithSidebar } from "@/components/layout-with-sidebar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
} from "recharts";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-31");
  const [showReport, setShowReport] = useState(false);

  // Datos de ejemplo para los gráficos
  const categoryData = [
    { name: "Alimentación", amount: 450.3, color: "#10B981" },
    { name: "Transporte", amount: 280.5, color: "#3B82F6" },
    { name: "Salud", amount: 125.75, color: "#EF4444" },
    { name: "Hogar", amount: 320.99, color: "#8B5CF6" },
    { name: "Entretenimiento", amount: 180.8, color: "#F59E0B" },
  ];

  const monthlyData = [
    { month: "Ene", amount: 1250.5 },
    { month: "Feb", amount: 980.3 },
    { month: "Mar", amount: 1450.75 },
    { month: "Abr", amount: 1120.4 },
    { month: "May", amount: 1380.9 },
  ];

  const commerceData = [
    { name: "Supermercado Central", amount: 285.6, visits: 8 },
    { name: "Gasolinera Shell", amount: 180.0, visits: 4 },
    { name: "Farmacia San Pablo", amount: 95.5, visits: 3 },
    { name: "Restaurante El Buen Sabor", amount: 150.3, visits: 5 },
    { name: "Tienda de Electrónicos", amount: 299.99, visits: 1 },
  ];

  const generateReport = () => {
    if (!reportType) {
      alert("Por favor selecciona un tipo de reporte");
      return;
    }
    setShowReport(true);
  };

  const exportReport = (format: string) => {
    alert(`Exportando reporte en formato ${format}...`);
  };

  const totalExpenses = categoryData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Reportes y Análisis
          </h1>
          <p className="text-slate-600">
            Genera reportes detallados sobre tus gastos y patrones de consumo
          </p>
        </div>

        {/* Generador de reportes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Generador de Reportes
            </CardTitle>
            <CardDescription>
              Configura los parámetros para generar tu reporte personalizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <Label htmlFor="reportType">Tipo de Reporte</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">
                      Gastos por Categoría
                    </SelectItem>
                    <SelectItem value="commerce">
                      Gastos por Comercio
                    </SelectItem>
                    <SelectItem value="monthly">Tendencia Mensual</SelectItem>
                    <SelectItem value="payment">Métodos de Pago</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Fecha Inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="endDate">Fecha Fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <Button
                  onClick={generateReport}
                  className="w-full bg-teal-500 hover:bg-teal-600"
                >
                  Generar Reporte
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {showReport && (
          <>
            {/* Resumen ejecutivo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Total Gastado</p>
                      <p className="text-xl font-bold text-slate-800">
                        ${totalExpenses.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Período</p>
                      <p className="text-lg font-bold text-slate-800">
                        31 días
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Promedio Diario</p>
                      <p className="text-lg font-bold text-slate-800">
                        ${(totalExpenses / 31).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <BarChart3 className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Categorías</p>
                      <p className="text-lg font-bold text-slate-800">
                        {categoryData.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos según el tipo de reporte */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {reportType === "category" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Gastos por Categoría - Gráfico de Barras
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          amount: {
                            label: "Monto",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[250px] sm:h-[300px]"
                      >
                        <BarChart data={categoryData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="amount" fill="#10B981" />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Distribución por Categoría - Gráfico Circular
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          amount: {
                            label: "Monto",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[250px] sm:h-[300px]"
                      >
                        <RechartsPieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="amount"
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RechartsPieChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </>
              )}

              {reportType === "monthly" && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Tendencia de Gastos Mensuales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        amount: {
                          label: "Monto",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[250px] sm:h-[300px]"
                    >
                      <BarChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="#3B82F6" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tabla de datos detallados */}
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Datos Detallados</CardTitle>
                  <CardDescription>
                    Información detallada del reporte generado
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportReport("CSV")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportReport("PDF")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {reportType === "category" && (
                  <div className="space-y-4">
                    {categoryData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="font-medium text-slate-800">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">
                            ${item.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-500">
                            {((item.amount / totalExpenses) * 100).toFixed(1)}%
                            del total
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {reportType === "commerce" && (
                  <div className="space-y-4">
                    {commerceData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {item.visits} visitas
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">
                            ${item.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-500">
                            ${(item.amount / item.visits).toFixed(2)} promedio
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {reportType === "monthly" && (
                  <div className="space-y-4">
                    {monthlyData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium text-slate-800">
                          {item.month} 2024
                        </span>
                        <span className="font-semibold text-slate-800">
                          ${item.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
