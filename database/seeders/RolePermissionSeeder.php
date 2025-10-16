<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            // User management
            'view users',
            'create users',
            'edit users',
            'delete users',
            
            // Role management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            
            // Permission management
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
            
            // Dashboard access
            'view admin dashboard',
            'view staff dashboard',
            'view user dashboard',
            
            // Room management
            'view rooms',
            'create rooms',
            'edit rooms',
            'delete rooms',
            
            // Booking management
            'view bookings',
            'create bookings',
            'edit bookings',
            'delete bookings',
            'manage all bookings',
            
            // Settings
            'view settings',
            'edit settings',
            
            // Reports
            'view reports',
            'generate reports',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);
        $superAdminRole->syncPermissions(Permission::all());

        $staffRole = Role::firstOrCreate(['name' => 'staff']);
        $staffPermissions = [
            'view users',
            'view staff dashboard',
            // Removed: 'view roles', 'view permissions', 'view admin dashboard'
            // Removed: 'view rooms', 'create rooms', 'edit rooms'
            // Removed: 'view bookings', 'create bookings', 'edit bookings', 'manage all bookings'
            // Removed: 'view settings', 'view reports', 'generate reports'
        ];
        $staffRole->syncPermissions($staffPermissions);

        $userRole = Role::firstOrCreate(['name' => 'user']);
        $userPermissions = [
            'view user dashboard',
            // Removed: 'view rooms' - users should not see Room/Slot Management
            // Removed: 'view bookings' - users should not see Booking Management
            // Removed: 'create bookings', 'edit bookings'
        ];
        $userRole->syncPermissions($userPermissions);

        // Create users with roles
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@cozyplace.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $superAdmin->assignRole('superadmin');

        $staff = User::firstOrCreate(
            ['email' => 'staff@cozyplace.com'],
            [
                'name' => 'Staff Member',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $staff->assignRole('staff');

        $user = User::firstOrCreate(
            ['email' => 'user@cozyplace.com'],
            [
                'name' => 'Regular User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $user->assignRole('user');

        // Assign user role to existing test user if exists
        $existingTestUser = User::where('email', 'test@example.com')->first();
        if ($existingTestUser && !$existingTestUser->hasRole('user')) {
            $existingTestUser->assignRole('user');
        }
    }
}