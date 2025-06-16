"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";

export default function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {sidebarItems.map((group) => (
        <SidebarGroup key={group.title}>
          {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
          <SidebarGroupContent className="flex flex-col gap-2">
            {group.items.map((item) => (
              <NavItemExpanded key={item.title} item={item} pathname={pathname} />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarMenu>
  );
}

function NavItemExpanded({
  item,
  pathname,
}: {
  item: {
    title: string;
    href: string;
    icon: keyof typeof Icons;
    newTab?: boolean;
  };
  pathname: string;
}) {
  const isActive = item.href && pathname === item.href;
  const Icon = Icons[item.icon];

  return (
    <SidebarMenuButton
      asChild
      variant="ghost"
      className={cn("justify-start", isActive && "bg-muted")}
      tooltip={item.title}
    >
      <Link href={item.href} target={item.newTab ? "_blank" : undefined}>
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
}
