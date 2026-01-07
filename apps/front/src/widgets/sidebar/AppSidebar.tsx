import Link from 'next/link';
import { Home, Package, Truck, User } from 'lucide-react';
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
    title: 'Сотрудники',
    url: '/employees',
    icon: User,
  },
  {
    title: 'Транспорт',
    url: '/vehicles',
    icon: Truck,
  },
  {
    title: 'Перевозки',
    url: '/cargos',
    icon: Package,
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
