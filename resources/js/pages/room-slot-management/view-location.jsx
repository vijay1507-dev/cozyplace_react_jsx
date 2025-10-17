import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Building2, Globe, Map } from 'lucide-react';

export default function ViewLocationDetails({
    location = {
        id: 1,
        name: 'Downtown Plaza',
        address: '123 Main Street, Suite 100',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    },
}) {
    const breadcrumbs = [
        {
            title: 'Room / Slot Management',
            href: '/room-slot-management',
        },
        {
            title: location.name,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${location.name} - Details`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <Link href="/room-slot-management">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Location Details
                        </h1>
                    </div>

                    {/* Location Image */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 overflow-hidden">
                        <img
                            src={location.image}
                            alt={location.name}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>

                    {/* Location Info */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            {location.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-5 w-5" />
                                    <span className="text-sm font-medium">Address</span>
                                </div>
                                <p className="text-gray-900 dark:text-white pl-7">
                                    {location.address}
                                </p>
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Building2 className="h-5 w-5" />
                                    <span className="text-sm font-medium">City</span>
                                </div>
                                <p className="text-gray-900 dark:text-white pl-7">
                                    {location.city}
                                </p>
                            </div>

                            {/* State */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Map className="h-5 w-5" />
                                    <span className="text-sm font-medium">State</span>
                                </div>
                                <p className="text-gray-900 dark:text-white pl-7">
                                    {location.state}
                                </p>
                            </div>

                            {/* Country */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Globe className="h-5 w-5" />
                                    <span className="text-sm font-medium">Country</span>
                                </div>
                                <p className="text-gray-900 dark:text-white pl-7">
                                    {location.country}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                            <Link href={`/room-slot-management/${location.id}`}>
                                <Button className="gap-2">
                                    View Rooms
                                </Button>
                            </Link>
                            <Button variant="outline" className="gap-2">
                                Edit Location
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Rooms</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">10</div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available Rooms</div>
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">7</div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Occupied Rooms</div>
                            <div className="text-3xl font-bold text-red-600 dark:text-red-400">2</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
