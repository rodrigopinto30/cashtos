"use client";

import { useState } from "react";
import {
  Receipt,
  TrendingUp,
  Calendar,
  DollarSign,
  ScanLine,
  BarChart3,
  Plus,
  Edit,
  Target,
  Zap,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentTicket {
  id: string;
  date: string;
  commerceName: string;
  amount: number;
  category: string;
}

export default function Page() {
  const [hideAmounts, setHideAmounts] = useState(false);
  const [stats, setStats] = useState({
    ticketsThisMonth: 12,
    totalExpensesThisMonth: 1250.5,
    topCategory: "Alimentación",
    avgTicketAmount: 104.2,
    weeklyGrowth: 8.5,
    monthlyGoal: 1500,
    processingTime: 2.3,
  });

  const [recentTickets] = useState<RecentTicket[]>([
    {
      id: "1",
      date: "2024-01-15",
      commerceName: "Supermercado Central",
      amount: 85.3,
      category: "Alimentación",
    },
    {
      id: "2",
      date: "2024-01-14",
      commerceName: "Gasolinera Shell",
      amount: 45.0,
      category: "Transporte",
    },
    {
      id: "3",
      date: "2024-01-13",
      commerceName: "Farmacia San Pablo",
      amount: 25.75,
      category: "Salud",
    },
    {
      id: "4",
      date: "2024-01-12",
      commerceName: "Restaurante El Buen Sabor",
      amount: 32.5,
      category: "Alimentación",
    },
  ]);

  const goalProgress = (stats.totalExpensesThisMonth / stats.monthlyGoal) * 100;

  const formatAmount = (amount: number) => {
    return hideAmounts ? "••••" : `$${amount.toFixed(2)}`;
  };

  return (
    <div
      className={`container mx-auto px-4 sm:px-6 py-6 sm:py-8 ${
        hideAmounts ? "" : ""
      }`}
    >
      {/* Welcome Section with Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 gap-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">
            ¡Bienvenido a Cashtos! 👋
          </h1>
          <p className="text-slate-600 text-lg mb-6 max-w-2xl">
            Gestiona tus gastos de forma inteligente y mantén el control de tus
            finanzas.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-shrink-0">
          <Link href="/upload">
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2"
            >
              <ScanLine className="mr-2 h-4 w-4" />
              Escanear Ticket
            </Button>
          </Link>
          <Link href="/tickets/create">
            <Button
              size="sm"
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50 px-4 py-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear Manual
            </Button>
          </Link>
        </div>
      </div>

      {/* Privacy Toggle */}
      <div className="flex justify-end mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setHideAmounts(!hideAmounts)}
          className="text-slate-600 hover:text-slate-800"
        >
          {hideAmounts ? (
            <Eye className="h-4 w-4 mr-2" />
          ) : (
            <EyeOff className="h-4 w-4 mr-2" />
          )}
          {hideAmounts ? "Mostrar importes" : "Ocultar importes"}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="border-l-4 border-l-teal-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Tickets este mes
            </CardTitle>
            <Receipt className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="text-2xl font-bold text-slate-800">
              {stats.ticketsThisMonth}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2 desde la semana pasada
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Gastos totales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="text-2xl font-bold text-slate-800">
              {formatAmount(stats.totalExpensesThisMonth)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <Calendar className="inline h-3 w-3 mr-1" />
              Enero 2024
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Promedio por ticket
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="text-2xl font-bold text-slate-800">
              {formatAmount(stats.avgTicketAmount)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />+
              {stats.weeklyGrowth}% esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Tiempo de procesado
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="text-2xl font-bold text-slate-800">
              {stats.processingTime}s
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <Zap className="inline h-3 w-3 mr-1" />
              Promedio por ticket
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Monthly Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Target className="h-5 w-5 mr-2" />
              Meta Mensual
            </CardTitle>
            <CardDescription>
              Progreso hacia tu objetivo de gastos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Gastado</span>
                <span className="font-medium">
                  {formatAmount(stats.totalExpensesThisMonth)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Meta</span>
                <span className="font-medium">
                  {formatAmount(stats.monthlyGoal)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(goalProgress, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500">
                {goalProgress.toFixed(1)}% completado
                {goalProgress > 100 && " - ¡Meta superada!"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-800">
              Categorías Principales
            </CardTitle>
            <CardDescription>Tus gastos más frecuentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Alimentación</span>
                </div>
                <span className="text-sm text-slate-600">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Transporte</span>
                </div>
                <span className="text-sm text-slate-600">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Hogar</span>
                </div>
                <span className="text-sm text-slate-600">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Otros</span>
                </div>
                <span className="text-sm text-slate-600">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-800">Acciones Rápidas</CardTitle>
            <CardDescription>Gestiona tus registros</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/tickets" className="block">
              <Button
                variant="outline"
                className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar Registros
              </Button>
            </Link>
            <Link href="/reports" className="block">
              <Button
                variant="outline"
                className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Reportes
              </Button>
            </Link>
            <Link href="/settings" className="block">
              <Button
                variant="outline"
                className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Target className="mr-2 h-4 w-4" />
                Configurar Metas
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-slate-800">Tickets Recientes</CardTitle>
            <CardDescription className="text-slate-600">
              Tus últimas digitalizaciones
            </CardDescription>
          </div>
          <Link href="/tickets">
            <Button
              variant="ghost"
              size="sm"
              className="text-teal-600 hover:text-teal-700"
            >
              Ver todos
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Receipt className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {ticket.commerceName}
                    </p>
                    <p className="text-sm text-slate-500">{ticket.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">
                    {formatAmount(ticket.amount)}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {ticket.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
