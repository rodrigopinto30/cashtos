"use client";
import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

/* const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Escanear Ticket",
          url: "upload",
          isActive: true,
        },
        {
          title: "Crear Manual",
          url: "create",
        },
        {
          title: "Mis Tickets",
          url: "tickets",
        },
        {
          title: "Reportes",
          url: "reports",
        },
        {
          title: "Configuración",
          url: "settings",
        },
      ],
    },
  ],
}; */

const data = {
  navMain: [
    {
      title: "Escanear Ticket",
      url: "upload",
    },
    {
      title: "Crear Manual",
      url: "create",
    },
    {
      title: "Mis Tickets",
      url: "tickets",
    },
    {
      title: "Reportes",
      url: "reports",
    },
    {
      title: "Configuración",
      url: "settings",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">CASHTOS</span>
                  <span className="">Control...</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                  <Link href={item.url}>{item.title}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
