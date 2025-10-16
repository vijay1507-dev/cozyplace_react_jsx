<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionManagementController extends Controller
{
    /**
     * Display the permission management page
     */
    public function index()
    {
        $roles = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name'),
                'permissions_count' => $role->permissions->count(),
            ];
        });

        $permissions = Permission::all()->map(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
            ];
        });

        return Inertia::render('admin/permission-management/index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Get role details with permissions
     */
    public function show($roleId)
    {
        $role = Role::with('permissions')->findOrFail($roleId);
        
        return response()->json([
            'id' => $role->id,
            'name' => $role->name,
            'permissions' => $role->permissions->pluck('name'),
        ]);
    }

    /**
     * Update role permissions
     */
    public function updatePermissions(Request $request, $roleId)
    {
        $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role = Role::findOrFail($roleId);
        
        // Sync permissions (this will replace all existing permissions)
        $role->syncPermissions($request->permissions);

        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        return response()->json([
            'message' => 'Permissions updated successfully',
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name'),
            ],
        ]);
    }

    /**
     * Create a new role
     */
    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name|max:255',
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role = Role::create(['name' => $request->name]);
        
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        return response()->json([
            'message' => 'Role created successfully',
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name'),
            ],
        ], 201);
    }

    /**
     * Delete a role
     */
    public function deleteRole($roleId)
    {
        $role = Role::findOrFail($roleId);
        
        // Prevent deletion of superadmin role
        if ($role->name === 'superadmin') {
            return response()->json([
                'message' => 'Cannot delete superadmin role',
            ], 403);
        }

        $role->delete();

        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        return response()->json([
            'message' => 'Role deleted successfully',
        ]);
    }

    /**
     * Create a new permission
     */
    public function createPermission(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name|max:255',
        ]);

        $permission = Permission::create(['name' => $request->name]);

        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        return response()->json([
            'message' => 'Permission created successfully',
            'permission' => [
                'id' => $permission->id,
                'name' => $permission->name,
            ],
        ], 201);
    }

    /**
     * Delete a permission
     */
    public function deletePermission($permissionId)
    {
        $permission = Permission::findOrFail($permissionId);
        $permission->delete();

        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        return response()->json([
            'message' => 'Permission deleted successfully',
        ]);
    }
}
