import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function CreateSlot({
    room = {
        id: 1,
        roomNo: '101',
        roomType: 'Premium',
        hourlyPricing: [
            { hours: 2, price: 80 },
            { hours: 3, price: 110 },
            { hours: 6, price: 200 },
            { hours: 12, price: 350 },
        ],
    },
    locationName = 'Downtown Plaza',
    locationId = 1,
}) {
    const breadcrumbs = [
        { title: 'Room / Slot Management', href: '/room-slot-management' },
        { title: locationName, href: `/room-slot-management/${locationId}` },
        { title: `Room ${room.roomNo} - Slots`, href: `/room-slot-management/${locationId}/rooms/${room.id}/slots` },
        { title: 'Add Slot', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        date: '',
        startTime: '',
        endTime: '',
        duration: '',
        price: '',
        status: 'Available',
        maxBookings: '1',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Slot data:', data);
        // post(`/room-slot-management/${locationId}/rooms/${room.id}/slots/store`);
    };

    const handleDurationChange = (hours, price) => {
        setData({
            ...data,
            duration: hours.toString(),
            price: price.toString(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Add Slot - Room ${room.roomNo}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <Link href={`/room-slot-management/${locationId}/rooms/${room.id}/slots`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Add New Slot - Room {room.roomNo}
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {locationName} • {room.roomType}
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Quick Pricing Selection */}
                            <div className="space-y-3">
                                <Label className="text-gray-700 dark:text-gray-300">
                                    Quick Select Duration & Price
                                </Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {room.hourlyPricing.map((pricing, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleDurationChange(pricing.hours, pricing.price)}
                                            className={`p-4 rounded-lg border-2 transition-all ${
                                                data.duration === pricing.hours.toString()
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        >
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                {pricing.hours} {pricing.hours === 1 ? 'Hour' : 'Hours'}
                                            </p>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                ${pricing.price}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Click to auto-fill duration and price based on room's hourly pricing
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">
                                        Date <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.date && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.date}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">
                                        Status <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        required
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.status}</p>
                                    )}
                                </div>

                                {/* Start Time */}
                                <div className="space-y-2">
                                    <Label htmlFor="startTime" className="text-gray-700 dark:text-gray-300">
                                        Start Time <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="startTime"
                                        type="time"
                                        value={data.startTime}
                                        onChange={(e) => setData('startTime', e.target.value)}
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.startTime && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.startTime}</p>
                                    )}
                                </div>

                                {/* End Time */}
                                <div className="space-y-2">
                                    <Label htmlFor="endTime" className="text-gray-700 dark:text-gray-300">
                                        End Time <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="endTime"
                                        type="time"
                                        value={data.endTime}
                                        onChange={(e) => setData('endTime', e.target.value)}
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.endTime && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.endTime}</p>
                                    )}
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                    <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300">
                                        Duration (hours) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        min="1"
                                        step="0.5"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                        placeholder="e.g., 2, 3, 6"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.duration && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.duration}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">
                                        Price ($) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="e.g., 80, 110, 200"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.price && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.price}</p>
                                    )}
                                </div>

                                {/* Max Bookings */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="maxBookings" className="text-gray-700 dark:text-gray-300">
                                        Maximum Bookings <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="maxBookings"
                                        type="number"
                                        min="1"
                                        value={data.maxBookings}
                                        onChange={(e) => setData('maxBookings', e.target.value)}
                                        placeholder="e.g., 1"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Number of bookings allowed for this time slot (usually 1 for exclusive movie room booking)
                                    </p>
                                    {errors.maxBookings && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.maxBookings}</p>
                                    )}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Slot'}
                                </Button>
                                <Link href={`/room-slot-management/${locationId}/rooms/${room.id}/slots`}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
