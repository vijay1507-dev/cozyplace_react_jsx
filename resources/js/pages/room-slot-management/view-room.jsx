import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Monitor, Volume2, Armchair, DollarSign, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function ViewRoom({ 
    room = {
        id: 1,
        roomNo: '101',
        roomType: 'Premium',
        capacity: 6,
        screenSize: '85-inch 4K',
        soundSystem: 'Dolby Atmos 7.1',
        seatingType: 'Luxury Recliners',
        hourlyPricing: [
            { hours: 2, price: 80 },
            { hours: 3, price: 110 },
            { hours: 6, price: 200 },
            { hours: 12, price: 350 },
        ],
        status: 'Available',
        floor: 1,
        streamingServices: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max'],
        gamingConsoles: ['PlayStation 5', 'Xbox Series X'],
        foodBeverage: true,
        decorationService: true,
        karaoke: false,
        specialOccasions: ['Romantic', 'Anniversary', 'Birthday', 'Family Gathering'],
        featuredImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1574267432644-f610f5ac8c5f?w=400&h=300&fit=crop',
        ],
    },
    locationName = 'Downtown Plaza',
    locationId = 1,
}) {
    const breadcrumbs = [
        { title: 'Room / Slot Management', href: '/room-slot-management' },
        { title: locationName, href: `/room-slot-management/${locationId}` },
        { title: `Room ${room.roomNo}`, href: '#' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available':
                return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
            case 'Occupied':
                return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
            case 'Maintenance':
                return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Room ${room.roomNo} - ${locationName}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={`/room-slot-management/${locationId}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    Room {room.roomNo} - {room.roomType}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{locationName}</p>
                            </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full font-medium ${getStatusColor(room.status)}`}>
                            {room.status}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 overflow-hidden">
                        <img
                            src={room.featuredImage}
                            alt={`Room ${room.roomNo}`}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>

                    {/* Gallery Images */}
                    {room.galleryImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {room.galleryImages.map((image, index) => (
                                <div key={index} className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-32 object-cover hover:scale-105 transition-transform cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Room Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Basic Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {room.capacity} {room.capacity === 1 ? 'Person' : 'Persons'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Floor</p>
                                        <p className="font-medium text-gray-900 dark:text-white">Floor {room.floor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Specifications */}
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Technical Specifications
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Monitor className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Screen Size</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{room.screenSize}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Sound System</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{room.soundSystem}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Armchair className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Seating Type</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{room.seatingType}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hourly Pricing */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                Hourly Pricing
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {room.hourlyPricing.map((pricing, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-4 text-center"
                                >
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        {pricing.hours} {pricing.hours === 1 ? 'Hour' : 'Hours'}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        ${pricing.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Streaming Services */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Streaming Services
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {room.streamingServices.map((service, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-full bg-purple-50 dark:bg-purple-900/30 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Gaming Consoles */}
                    {room.gamingConsoles.length > 0 && (
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Gaming Consoles
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {room.gamingConsoles.map((console, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/30 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300"
                                    >
                                        {console}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Services */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Additional Services
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {room.foodBeverage && (
                                <span className="inline-flex items-center rounded-full bg-orange-50 dark:bg-orange-900/30 px-4 py-2 text-sm font-medium text-orange-700 dark:text-orange-300">
                                    Food & Beverage Service
                                </span>
                            )}
                            {room.decorationService && (
                                <span className="inline-flex items-center rounded-full bg-pink-50 dark:bg-pink-900/30 px-4 py-2 text-sm font-medium text-pink-700 dark:text-pink-300">
                                    Decoration Service
                                </span>
                            )}
                            {room.karaoke && (
                                <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                    Karaoke System
                                </span>
                            )}
                            {!room.foodBeverage && !room.decorationService && !room.karaoke && (
                                <p className="text-gray-600 dark:text-gray-400">No additional services</p>
                            )}
                        </div>
                    </div>

                    {/* Special Occasions */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                Perfect For
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {room.specialOccasions.map((occasion, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300"
                                >
                                    {occasion}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <Link href={`/room-slot-management/${locationId}/rooms/${room.id}/edit`}>
                            <Button className="gap-2">Edit Room</Button>
                        </Link>
                        <Button variant="outline" className="gap-2">
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
