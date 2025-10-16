import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Shield, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PermissionManagement({ roles: initialRoles, permissions: allPermissions }) {
    const [roles, setRoles] = useState(initialRoles);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCreateRoleDialogOpen, setIsCreateRoleDialogOpen] = useState(false);
    const [isCreatePermissionDialogOpen, setIsCreatePermissionDialogOpen] = useState(false);
    const [newRoleName, setNewRoleName] = useState('');
    const [newPermissionName, setNewPermissionName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleEditRole = (role) => {
        setSelectedRole(role);
        setSelectedPermissions([...role.permissions]);
        setIsEditDialogOpen(true);
    };

    const handlePermissionToggle = (permissionName) => {
        setSelectedPermissions((prev) =>
            prev.includes(permissionName)
                ? prev.filter((p) => p !== permissionName)
                : [...prev, permissionName]
        );
    };

    const handleSavePermissions = async () => {
        if (!selectedRole) return;

        setIsSaving(true);
        try {
            const response = await fetch(
                `/admin/permission-management/roles/${selectedRole.id}/permissions`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                    },
                    body: JSON.stringify({ permissions: selectedPermissions }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setRoles((prev) =>
                    prev.map((r) =>
                        r.id === selectedRole.id
                            ? { ...r, permissions: data.role.permissions, permissions_count: data.role.permissions.length }
                            : r
                    )
                );
                setIsEditDialogOpen(false);
                toast({
                    title: 'Success',
                    description: 'Permissions updated successfully',
                });
            } else {
                throw new Error('Failed to update permissions');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update permissions',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateRole = async () => {
        if (!newRoleName.trim()) return;

        setIsSaving(true);
        try {
            const response = await fetch('/admin/permission-management/roles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
                },
                body: JSON.stringify({ name: newRoleName }),
            });

            if (response.ok) {
                const data = await response.json();
                setRoles((prev) => [...prev, {
                    id: data.role.id,
                    name: data.role.name,
                    permissions: data.role.permissions,
                    permissions_count: data.role.permissions.length,
                }]);
                setIsCreateRoleDialogOpen(false);
                setNewRoleName('');
                toast({
                    title: 'Success',
                    description: 'Role created successfully',
                });
            } else {
                throw new Error('Failed to create role');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create role',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreatePermission = async () => {
        if (!newPermissionName.trim()) return;

        setIsSaving(true);
        try {
            const response = await fetch('/admin/permission-management/permissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
                },
                body: JSON.stringify({ name: newPermissionName }),
            });

            if (response.ok) {
                setIsCreatePermissionDialogOpen(false);
                setNewPermissionName('');
                toast({
                    title: 'Success',
                    description: 'Permission created successfully. Refreshing page...',
                });
                // Refresh the page to get updated permissions
                setTimeout(() => router.reload(), 1000);
            } else {
                throw new Error('Failed to create permission');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create permission',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteRole = async (roleId, roleName) => {
        if (roleName === 'superadmin') {
            toast({
                title: 'Error',
                description: 'Cannot delete superadmin role',
                variant: 'destructive',
            });
            return;
        }

        if (!confirm(`Are you sure you want to delete the role "${roleName}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/admin/permission-management/roles/${roleId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
                },
            });

            if (response.ok) {
                setRoles((prev) => prev.filter((r) => r.id !== roleId));
                toast({
                    title: 'Success',
                    description: 'Role deleted successfully',
                });
            } else {
                throw new Error('Failed to delete role');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete role',
                variant: 'destructive',
            });
        }
    };

    // Group permissions by category
    const groupedPermissions = allPermissions.reduce((acc, permission) => {
        const parts = permission.name.split(' ');
        const action = parts[0]; // view, create, edit, delete, etc.
        const category = parts.slice(1).join(' '); // users, roles, etc.
        
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
    }, {});

    return (
        <AppLayout>
            <Head title="Permission Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Permission Management</h1>
                        <p className="text-muted-foreground">
                            Manage roles and assign permissions dynamically
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => setIsCreatePermissionDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Permission
                        </Button>
                        <Button onClick={() => setIsCreateRoleDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Role
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Roles & Permissions
                        </CardTitle>
                        <CardDescription>
                            Click on a role to edit its permissions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Role Name</TableHead>
                                    <TableHead>Permissions Count</TableHead>
                                    <TableHead>Permissions</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">{role.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {role.permissions_count} permissions
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.slice(0, 3).map((perm) => (
                                                    <Badge key={perm} variant="outline" className="text-xs">
                                                        {perm}
                                                    </Badge>
                                                ))}
                                                {role.permissions.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{role.permissions.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEditRole(role)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                {role.name !== 'superadmin' && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteRole(role.id, role.name)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Permissions Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Permissions for {selectedRole?.name}</DialogTitle>
                        <DialogDescription>
                            Select the permissions you want to assign to this role
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        {Object.entries(groupedPermissions).map(([category, perms]) => (
                            <div key={category} className="space-y-3">
                                <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {perms.map((permission) => (
                                        <div key={permission.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`perm-${permission.id}`}
                                                checked={selectedPermissions.includes(permission.name)}
                                                onCheckedChange={() => handlePermissionToggle(permission.name)}
                                            />
                                            <Label
                                                htmlFor={`perm-${permission.id}`}
                                                className="text-sm font-normal cursor-pointer"
                                            >
                                                {permission.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSavePermissions} disabled={isSaving}>
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create Role Dialog */}
            <Dialog open={isCreateRoleDialogOpen} onOpenChange={setIsCreateRoleDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Role</DialogTitle>
                        <DialogDescription>
                            Enter a name for the new role
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input
                            id="role-name"
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                            placeholder="e.g., manager, editor, viewer"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateRoleDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateRole} disabled={isSaving || !newRoleName.trim()}>
                            {isSaving ? 'Creating...' : 'Create Role'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create Permission Dialog */}
            <Dialog open={isCreatePermissionDialogOpen} onOpenChange={setIsCreatePermissionDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Permission</DialogTitle>
                        <DialogDescription>
                            Enter a name for the new permission (e.g., "view reports", "edit settings")
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="permission-name">Permission Name</Label>
                        <Input
                            id="permission-name"
                            value={newPermissionName}
                            onChange={(e) => setNewPermissionName(e.target.value)}
                            placeholder="e.g., view reports, edit settings"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreatePermissionDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreatePermission} disabled={isSaving || !newPermissionName.trim()}>
                            {isSaving ? 'Creating...' : 'Create Permission'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
