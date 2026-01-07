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
    url: '#',
    icon: Home,
  },
  {
    title: 'Сотрудники',
    url: '#',
    icon: User,
  },
  {
    title: 'Транспорт',
    url: '#',
    icon: Truck,
  },
  {
    title: 'Перевозки',
    url: '#',
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
