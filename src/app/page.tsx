"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  ScanLine,
  BarChart3,
  Smartphone,
  CheckCircle,
  Scan,
  FileText,
  ChevronUp,
} from "lucide-react";

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Mostrar/ocultar botón de scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Efecto parallax para el fondo
      if (backgroundRef.current) {
        const scrollPosition = window.scrollY;
        backgroundRef.current.style.transform = `translateX(-${
          scrollPosition * 0.05
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fijo */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <ScanLine className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">Cashtos</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-800"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Regístrame
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section con Background en movimiento */}
      <section className="relative py-32 px-6 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background con movimiento automático y elementos visuales */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            ref={backgroundRef}
            className="absolute inset-0 w-[300%] h-full opacity-20"
            style={{
              background: `
                linear-gradient(45deg, #f1f5f9 25%, transparent 25%), 
                linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #e2e8f0 75%), 
                linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)
              `,
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
              animation: "slidePattern 120s linear infinite",
            }}
          />

          {/* Elementos flotantes animados */}
          <div className="absolute inset-0">
            {/* Círculos flotantes */}
            <div className="absolute top-20 left-10 w-3 h-3 sm:w-4 sm:h-4 bg-teal-200 rounded-full opacity-40 animate-float-slow"></div>
            <div className="absolute top-40 right-20 w-6 h-6 bg-blue-200 rounded-full opacity-30 animate-float-medium"></div>
            <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-slate-300 rounded-full opacity-50 animate-float-fast"></div>
            <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-teal-300 rounded-full opacity-35 animate-float-slow"></div>

            {/* Formas geométricas */}
            <div className="absolute top-16 right-1/4 w-8 h-8 bg-gradient-to-br from-teal-200 to-blue-200 opacity-25 rotate-45 animate-float-medium"></div>
            <div className="absolute bottom-20 right-16 w-6 h-6 bg-gradient-to-br from-slate-200 to-slate-300 opacity-30 rotate-12 animate-float-fast"></div>

            {/* Líneas decorativas */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent opacity-30 animate-slide-horizontal"></div>
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-20 animate-slide-horizontal-reverse"></div>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-slate-900/5 to-blue-900/10" />
        </div>

        {/* Content */}
        <div className="container mx-auto text-center max-w-6xl relative z-10">
          <Badge className="mb-6 bg-teal-100 text-teal-800 hover:bg-teal-100">
            Digitalización Inteligente
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-800 mb-4 md:mb-6">
            Digitaliza tus tickets
            <span className="text-teal-600"> automáticamente</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 mb-8 md:mb-12 max-w-2xl mx-auto">
            Transforma cualquier ticket o factura en datos organizados con solo
            una foto. Gestiona tus gastos de forma inteligente y sin
            complicaciones.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Una plataforma completa para digitalizar y organizar todos tus
              gastos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ScanLine className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-slate-800">
                  Captura Instantánea
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Toma una foto de cualquier ticket y nuestro sistema extraerá
                  automáticamente todos los datos importantes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-slate-800">
                  Reportes Inteligentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Genera reportes detallados y visualiza tus patrones de gasto
                  con gráficos interactivos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-slate-800">
                  Multiplataforma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Accede desde cualquier dispositivo. Diseño responsive que se
                  adapta perfectamente a móvil, tablet y desktop.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Así de simple
            </h2>
            <p className="text-lg text-slate-600">
              En solo 3 pasos tendrás todos tus gastos organizados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Captura
              </h3>
              <p className="text-slate-600">
                Toma una foto de tu ticket con la cámara de tu dispositivo
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Procesa
              </h3>
              <p className="text-slate-600">
                Nuestro sistema extrae automáticamente todos los datos del
                ticket
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Organiza
              </h3>
              <p className="text-slate-600">
                Revisa, categoriza y genera reportes de tus gastos fácilmente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scanning Animation/Illustration - Movida más abajo */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-slate-600">
              Digitalización inteligente en segundos
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-slate-50 to-teal-50 rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Step 1: Ticket */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-dashed border-slate-300 mb-4 mx-auto w-32 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <div className="text-xs text-slate-500">
                      Ticket Original
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  1. Ticket físico
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <div className="flex items-center space-x-2">
                  <ScanLine className="h-6 w-6 text-teal-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <Scan className="h-6 w-6 text-teal-600" />
                </div>
              </div>

              {/* Step 3: Digital Data */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-teal-200 mb-4 mx-auto w-32 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                    <div className="text-xs text-teal-700 font-medium">
                      Datos Digitales
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  2. Datos organizados
                </p>
              </div>
            </div>

            {/* Scanning effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              ¿Por qué Cashtos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Sin entrada manual
                </h3>
                <p className="text-slate-600">
                  Olvídate de escribir datos manualmente. Todo se digitaliza
                  automáticamente.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Seguro y privado
                </h3>
                <p className="text-slate-600">
                  Tus datos están protegidos con los más altos estándares de
                  seguridad.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Reportes detallados
                </h3>
                <p className="text-slate-600">
                  Visualiza tus gastos con gráficos y exporta reportes en
                  múltiples formatos.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  Fácil de usar
                </h3>
                <p className="text-slate-600">
                  Interfaz intuitiva diseñada para que cualquiera pueda usarla
                  sin complicaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-teal-600 p-2 rounded-lg">
              <ScanLine className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Cashtos</span>
          </div>
          <p className="text-slate-600">
            © 2025 Cashtos. Digitalización inteligente de tickets y facturas.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Volver arriba"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      {/* Estilos CSS para las animaciones */}
      <style jsx global>{`
        @keyframes slidePattern {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(90deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(270deg);
          }
        }

        @keyframes slide-horizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slide-horizontal-reverse {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-slide-horizontal {
          animation: slide-horizontal 15s linear infinite;
        }

        .animate-slide-horizontal-reverse {
          animation: slide-horizontal-reverse 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
