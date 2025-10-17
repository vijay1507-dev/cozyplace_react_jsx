<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomSlotManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('room-slot-management/index');
    }

    public function view($id)
    {
        // Static location data for demo
        $locationsData = [
            1 => [
                'id' => 1,
                'name' => 'Downtown Plaza',
                'address' => '123 Main Street, Suite 100',
                'country' => 'United States',
                'state' => 'California',
                'city' => 'Los Angeles',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
            ],
            2 => [
                'id' => 2,
                'name' => 'Riverside Complex',
                'address' => '456 River Road, Building A',
                'country' => 'United States',
                'state' => 'New York',
                'city' => 'New York City',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
            ],
            3 => [
                'id' => 3,
                'name' => 'Mountain View Center',
                'address' => '789 Highland Avenue',
                'country' => 'Canada',
                'state' => 'British Columbia',
                'city' => 'Vancouver',
                'image' => 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
            ],
        ];

        $location = $locationsData[$id] ?? [
            'id' => $id,
            'name' => 'Unknown Location',
            'address' => 'N/A',
            'country' => 'N/A',
            'state' => 'N/A',
            'city' => 'N/A',
            'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        ];

        return Inertia::render('room-slot-management/view-location', [
            'location' => $location,
        ]);
    }

    public function viewRooms($id)
    {
        // Static location names for demo
        $locations = [
            1 => 'Downtown Plaza',
            2 => 'Riverside Complex',
            3 => 'Mountain View Center',
            4 => 'Sunset Business Park',
            5 => 'Harbor Point',
            6 => 'Tech Hub Central',
            7 => 'Lakeside Tower',
            8 => 'Pacific Heights Office',
            9 => 'Green Valley Plaza',
            10 => 'Metro Business Center',
            11 => 'Capital Square',
            12 => 'Skyline Tower',
        ];

        return Inertia::render('room-slot-management/view', [
            'locationName' => $locations[$id] ?? 'Unknown Location',
            'locationId' => $id,
        ]);
    }

    public function create()
    {
        return Inertia::render('room-slot-management/create');
    }

    public function store(Request $request)
    {
        // Validation and storage logic would go here
        // For now, just redirect back to index
        return redirect()->route('room-slot-management');
    }

    public function createRoom($locationId)
    {
        // Static location names for demo
        $locations = [
            1 => 'Downtown Plaza',
            2 => 'Riverside Complex',
            3 => 'Mountain View Center',
            4 => 'Sunset Business Park',
            5 => 'Harbor Point',
            6 => 'Tech Hub Central',
            7 => 'Lakeside Tower',
            8 => 'Pacific Heights Office',
            9 => 'Green Valley Plaza',
            10 => 'Metro Business Center',
            11 => 'Capital Square',
            12 => 'Skyline Tower',
        ];

        return Inertia::render('room-slot-management/create-room', [
            'locationName' => $locations[$locationId] ?? 'Unknown Location',
            'locationId' => $locationId,
        ]);
    }

    public function storeRoom(Request $request, $locationId)
    {
        // Validation and storage logic would go here
        // For now, just redirect back to location view
        return redirect()->route('room-slot-management.rooms', $locationId);
    }

    public function viewRoom($locationId, $roomId)
    {
        // Static location names for demo
        $locations = [
            1 => 'Downtown Plaza',
            2 => 'Riverside Complex',
            3 => 'Mountain View Center',
        ];

        // Static room data for demo
        $room = [
            'id' => $roomId,
            'roomNo' => '101',
            'roomType' => 'Premium',
            'capacity' => 6,
            'screenSize' => '85-inch 4K',
            'soundSystem' => 'Dolby Atmos 7.1',
            'seatingType' => 'Luxury Recliners',
            'hourlyPricing' => [
                ['hours' => 2, 'price' => 80],
                ['hours' => 3, 'price' => 110],
                ['hours' => 6, 'price' => 200],
                ['hours' => 12, 'price' => 350],
            ],
            'status' => 'Available',
            'floor' => 1,
            'streamingServices' => ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max'],
            'gamingConsoles' => ['PlayStation 5', 'Xbox Series X'],
            'foodBeverage' => true,
            'decorationService' => true,
            'karaoke' => false,
            'specialOccasions' => ['Romantic', 'Anniversary', 'Birthday', 'Family Gathering'],
            'featuredImage' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
            'galleryImages' => [
                'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1574267432644-f610f5ac8c5f?w=400&h=300&fit=crop',
            ],
        ];

        return Inertia::render('room-slot-management/view-room', [
            'room' => $room,
            'locationName' => $locations[$locationId] ?? 'Unknown Location',
            'locationId' => $locationId,
        ]);
    }

    public function manageSlots($locationId, $roomId)
    {
        // Static location names for demo
        $locations = [
            1 => 'Downtown Plaza',
            2 => 'Riverside Complex',
            3 => 'Mountain View Center',
        ];

        // Static room data for demo
        $room = [
            'id' => $roomId,
            'roomNo' => '101',
            'roomType' => 'Premium',
        ];

        // Static slots data for demo
        $slots = [
            [
                'id' => 1,
                'date' => '2025-10-20',
                'startTime' => '10:00 AM',
                'endTime' => '12:00 PM',
                'duration' => 2,
                'price' => 80,
                'status' => 'Available',
            ],
            [
                'id' => 2,
                'date' => '2025-10-20',
                'startTime' => '12:00 PM',
                'endTime' => '03:00 PM',
                'duration' => 3,
                'price' => 110,
                'status' => 'Booked',
                'customerName' => 'John Doe',
            ],
            [
                'id' => 3,
                'date' => '2025-10-20',
                'startTime' => '03:00 PM',
                'endTime' => '06:00 PM',
                'duration' => 3,
                'price' => 110,
                'status' => 'Available',
            ],
            [
                'id' => 4,
                'date' => '2025-10-20',
                'startTime' => '06:00 PM',
                'endTime' => '12:00 AM',
                'duration' => 6,
                'price' => 200,
                'status' => 'Available',
            ],
            [
                'id' => 5,
                'date' => '2025-10-21',
                'startTime' => '10:00 AM',
                'endTime' => '12:00 PM',
                'duration' => 2,
                'price' => 80,
                'status' => 'Blocked',
            ],
            [
                'id' => 6,
                'date' => '2025-10-21',
                'startTime' => '02:00 PM',
                'endTime' => '05:00 PM',
                'duration' => 3,
                'price' => 110,
                'status' => 'Available',
            ],
        ];

        return Inertia::render('room-slot-management/manage-slots', [
            'room' => $room,
            'locationName' => $locations[$locationId] ?? 'Unknown Location',
            'locationId' => $locationId,
            'slots' => $slots,
        ]);
    }

    public function createSlot($locationId, $roomId)
    {
        // Static location names for demo
        $locations = [
            1 => 'Downtown Plaza',
            2 => 'Riverside Complex',
            3 => 'Mountain View Center',
        ];

        // Static room data for demo
        $room = [
            'id' => $roomId,
            'roomNo' => '101',
            'roomType' => 'Premium',
            'hourlyPricing' => [
                ['hours' => 2, 'price' => 80],
                ['hours' => 3, 'price' => 110],
                ['hours' => 6, 'price' => 200],
                ['hours' => 12, 'price' => 350],
            ],
        ];

        return Inertia::render('room-slot-management/create-slot', [
            'room' => $room,
            'locationName' => $locations[$locationId] ?? 'Unknown Location',
            'locationId' => $locationId,
        ]);
    }

    public function storeSlot(Request $request, $locationId, $roomId)
    {
        // Validation and storage logic would go here
        // For now, just redirect back to slot management
        return redirect()->route('room-slot-management.rooms.slots', [$locationId, $roomId]);
    }
}
