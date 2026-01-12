import Link from 'next/link';
import { BriefcaseBusiness, Home, Package, Truck, User } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const routes = [
  {
    title: 'Главная',
    url: '/',
    icon: Home,
  },
  {
    title: 'Перевозки',
    url: '/cargos',
    icon: Package,
  },
  {
    title: 'Клиенты',
    url: '/customers',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Сотрудники',
    url: '/employees',
    icon: User,
  },
  {
    title: 'Транспорт',
    url: '/vehicles',
    icon: Truck,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Cargo Run</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Управление</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="#">
              <Settings />
              <span>Настройки</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarFooter>
    </Sidebar>
  );
}
