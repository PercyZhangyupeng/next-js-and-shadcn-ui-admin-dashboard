"use client";

import NavMain from "./nav-main"; // 默认导入 ✅ 改这里！

import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar className="h-screen">
      <SidebarHeader title="Studio Admin" />
      <SidebarContent>
        <NavMain items={sidebarItems} />
        {/* 下面两个可选注释掉也行 */}
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
    </Sidebar>
  );
}
