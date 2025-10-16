import { usePermissions } from '@/hooks/use-permissions';

export function PermissionGate({
    permission,
    role,
    roles,
    requireAll = false,
    fallback = null,
    children,
}) {
    const { hasPermission, hasRole, hasAnyRole, hasAllRoles } = usePermissions();

    // Check permission if specified
    if (permission && !hasPermission(permission)) {
        return <>{fallback}</>;
    }

    // Check single role if specified
    if (role && !hasRole(role)) {
        return <>{fallback}</>;
    }

    // Check multiple roles if specified
    if (roles) {
        const hasRequiredRoles = requireAll ? hasAllRoles(roles) : hasAnyRole(roles);
        if (!hasRequiredRoles) {
            return <>{fallback}</>;
        }
    }

    // If no restrictions or all checks passed, render children
    return <>{children}</>;
}
