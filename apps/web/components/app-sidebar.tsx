"use client";

import {
  Book,
  BookOpenIcon,
  BotIcon,
  FrameIcon,
  GalleryVerticalEndIcon,
  GraduationCap,
  MapIcon,
  PieChartIcon,
  Settings2Icon,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.

const standards = Array.from({ length: 8 }, (_, i) => {
  const std = i + 5;

  return {
    title: `STD ${std}`,
    url: `/admin/standard/${std}`,
    logo: <GraduationCap />,
  };
});

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Q Paper Generation",
      logo: <GalleryVerticalEndIcon />,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "All Standard",
      url: "#",
      icon: <Book />,
      isActive: true,
      items: standards,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
