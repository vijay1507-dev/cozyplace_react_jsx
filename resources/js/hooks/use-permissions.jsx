import { usePage } from '@inertiajs/react';

export function usePermissions() {
    const { auth } = usePage().props;
    const user = auth.user;

    const hasPermission = (permission) => {
        return user?.can?.[permission] || false;
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role) || false;
    };

    const hasAnyRole = (roles) => {
        return roles.some(role => hasRole(role));
    };

    const hasAllRoles = (roles) => {
        return roles.every(role => hasRole(role));
    };

    const isSuperAdmin = () => {
        return hasRole('superadmin');
    };

    const isStaff = () => {
        return hasRole('staff');
    };

    const isUser = () => {
        return hasRole('user');
    };

    const canAccessAdmin = () => {
        return hasAnyRole(['superadmin', 'staff']);
    };

    const getUserRole = () => {
        if (isSuperAdmin()) return 'Super Admin';
        if (isStaff()) return 'Staff';
        if (isUser()) return 'User';
        return 'User';
    };

    return {
        user,
        hasPermission,
        hasRole,
        hasAnyRole,
        hasAllRoles,
        isSuperAdmin,
        isStaff,
        isUser,
        canAccessAdmin,
        getUserRole,
        permissions: user?.permissions || [],
        roles: user?.roles || [],
    };
}
