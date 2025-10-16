<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoomSlotManagementController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // User dashboard (accessible by all authenticated users)
    Route::get('user-dashboard', function () {
        return Inertia::render('user-dashboard');
    })->name('user.dashboard')->middleware('permission:view user dashboard');
    
    // Staff routes (accessible by staff and superadmin)
    Route::middleware('permission:view staff dashboard')->group(function () {
        Route::get('staff-dashboard', function () {
            return Inertia::render('staff-dashboard');
        })->name('staff.dashboard');
        
        Route::get('room-slot-management', [RoomSlotManagementController::class, 'index'])->name('room-slot-management');
    });
    
    // Admin routes (accessible by superadmin only)
    Route::middleware('permission:view admin dashboard')->group(function () {
        Route::get('admin-dashboard', function () {
            return Inertia::render('admin-dashboard');
        })->name('admin.dashboard');
        
        // User management routes
        Route::middleware('permission:view users')->group(function () {
            Route::get('admin/users', function () {
                return Inertia::render('admin/users/index');
            })->name('admin.users.index');
        });
        
        // Role management routes
        Route::middleware('permission:view roles')->group(function () {
            Route::get('admin/roles', function () {
                return Inertia::render('admin/roles/index');
            })->name('admin.roles.index');
        });
        
        // Permission management routes
        Route::middleware('permission:view permissions')->group(function () {
            Route::get('admin/permissions', function () {
                return Inertia::render('admin/permissions/index');
            })->name('admin.permissions.index');
        });
        
        // Permission Management Module (superadmin only)
        Route::prefix('admin/permission-management')->name('admin.permission-management.')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\PermissionManagementController::class, 'index'])->name('index');
            Route::get('/roles/{role}', [App\Http\Controllers\Admin\PermissionManagementController::class, 'show'])->name('roles.show');
            Route::put('/roles/{role}/permissions', [App\Http\Controllers\Admin\PermissionManagementController::class, 'updatePermissions'])->name('roles.update-permissions');
            Route::post('/roles', [App\Http\Controllers\Admin\PermissionManagementController::class, 'createRole'])->name('roles.create');
            Route::delete('/roles/{role}', [App\Http\Controllers\Admin\PermissionManagementController::class, 'deleteRole'])->name('roles.delete');
            Route::post('/permissions', [App\Http\Controllers\Admin\PermissionManagementController::class, 'createPermission'])->name('permissions.create');
            Route::delete('/permissions/{permission}', [App\Http\Controllers\Admin\PermissionManagementController::class, 'deletePermission'])->name('permissions.delete');
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
