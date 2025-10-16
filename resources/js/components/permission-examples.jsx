import { PermissionGate } from '@/components/permission-gate';
import { usePermissions } from '@/hooks/use-permissions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PermissionExamples() {
    const { 
        user, 
        hasPermission, 
        hasRole, 
        isSuperAdmin, 
        isStaff, 
        canAccessAdmin,
        getUserRole 
    } = usePermissions();

    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Permission System Examples</CardTitle>
                    <CardDescription>
                        Examples of how to use the permission system in your components
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Current User:</span>
                        <Badge variant="secondary">{user?.name}</Badge>
                        <Badge variant="outline">{getUserRole()}</Badge>
                    </div>

                    {/* Direct Permission Checks */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Direct Permission Checks:</h3>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant={hasPermission('view users') ? 'default' : 'secondary'}>
                                View Users: {hasPermission('view users') ? 'Yes' : 'No'}
                            </Badge>
                            <Badge variant={hasPermission('view admin dashboard') ? 'default' : 'secondary'}>
                                Admin Dashboard: {hasPermission('view admin dashboard') ? 'Yes' : 'No'}
                            </Badge>
                            <Badge variant={hasPermission('view reports') ? 'default' : 'secondary'}>
                                View Reports: {hasPermission('view reports') ? 'Yes' : 'No'}
                            </Badge>
                        </div>
                    </div>

                    {/* Role Checks */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Role Checks:</h3>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant={isSuperAdmin() ? 'default' : 'secondary'}>
                                Super Admin: {isSuperAdmin() ? 'Yes' : 'No'}
                            </Badge>
                            <Badge variant={isStaff() ? 'default' : 'secondary'}>
                                Staff: {isStaff() ? 'Yes' : 'No'}
                            </Badge>
                            <Badge variant={canAccessAdmin() ? 'default' : 'secondary'}>
                                Can Access Admin: {canAccessAdmin() ? 'Yes' : 'No'}
                            </Badge>
                        </div>
                    </div>

                    {/* Permission Gate Examples */}
                    <div className="space-y-4">
                        <h3 className="font-medium">Permission Gate Examples:</h3>
                        
                        {/* Admin Only Button */}
                        <PermissionGate permission="view admin dashboard">
                            <Button variant="destructive">
                                Admin Only Button
                            </Button>
                        </PermissionGate>

                        {/* Staff or Admin Button */}
                        <PermissionGate roles={['superadmin', 'staff']}>
                            <Button variant="secondary">
                                Staff/Admin Button
                            </Button>
                        </PermissionGate>

                        {/* Super Admin Only */}
                        <PermissionGate role="superadmin">
                            <Button variant="outline">
                                Super Admin Only
                            </Button>
                        </PermissionGate>

                        {/* Fallback Example */}
                        <PermissionGate 
                            permission="view reports" 
                            fallback={<Button variant="ghost" disabled>Reports (No Permission)</Button>}
                        >
                            <Button variant="default">
                                View Reports
                            </Button>
                        </PermissionGate>
                    </div>

                    {/* All User Permissions */}
                    <div className="space-y-2">
                        <h3 className="font-medium">All User Permissions:</h3>
                        <div className="flex gap-2 flex-wrap">
                            {user?.permissions?.map((permission) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                    {permission}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* All User Roles */}
                    <div className="space-y-2">
                        <h3 className="font-medium">All User Roles:</h3>
                        <div className="flex gap-2 flex-wrap">
                            {user?.roles?.map((role) => (
                                <Badge key={role} variant="secondary" className="text-xs">
                                    {role}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
