import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BarChart, BookOpen, Calendar, CircleDollarSign, Folder, LayoutGrid, Notebook, Settings, Shield } from 'lucide-react';
import { usePermissions } from '@/hooks/use-permissions';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Room / Slot Management',
        url: '/room-slot-management',
        icon: Notebook,
        permission: 'view rooms',
    },
    {
        title: 'Pricing Management',
        url: '/pricing-management',
        icon: CircleDollarSign,
        permission: 'edit settings',
    },
    {
        title: 'Booking Management',
        url: '/booking-management',
        icon: Calendar,
        permission: 'view bookings',
    },
    {
        title: 'Loyalty Points Management',
        url: '/loyalty-points-management',
        icon: BarChart,
        permission: 'view reports',
    },
    {
        title: 'Analytics / Reports',
        url: '/analytics-reports',
        icon: Notebook,
        permission: 'view reports',
    },
    {
        title: 'Integrations',
        url: '/integrations',
        icon: Settings,
        permission: 'edit settings',
    },
    {
        title: 'CMS Management',
        url: '/cms-management',
        icon: LayoutGrid,
        permission: 'view admin dashboard',
    },
    {
        title: 'Permission Management',
        url: '/admin/permission-management',
        icon: Shield,
        permission: 'view admin dashboard',
    },
];

export function AppSidebar() {
     const { hasPermission } = usePermissions();

    // Filter menu items based on user permissions
    const filteredNavItems = mainNavItems.filter((item) => {
        // If no permission is required, show the item
        if (!item.permission) {
            return true;
        }

        // Check if user has the required permission
        return hasPermission(item.permission);
    });
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
