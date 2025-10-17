import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Clock, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function ManageSlots({
    room = { id: 1, roomNo: '101', roomType: 'Premium' },
    locationName = 'Downtown Plaza',
    locationId = 1,
    slots = [
        { id: 1, date: '2025-10-20', startTime: '10:00 AM', endTime: '12:00 PM', duration: 2, price: 80, status: 'Available' },
        { id: 2, date: '2025-10-20', startTime: '12:00 PM', endTime: '03:00 PM', duration: 3, price: 110, status: 'Booked', customerName: 'John Doe' },
        { id: 3, date: '2025-10-20', startTime: '03:00 PM', endTime: '06:00 PM', duration: 3, price: 110, status: 'Available' },
        { id: 4, date: '2025-10-20', startTime: '06:00 PM', endTime: '12:00 AM', duration: 6, price: 200, status: 'Available' },
        { id: 5, date: '2025-10-21', startTime: '10:00 AM', endTime: '12:00 PM', duration: 2, price: 80, status: 'Blocked' },
        { id: 6, date: '2025-10-21', startTime: '02:00 PM', endTime: '05:00 PM', duration: 3, price: 110, status: 'Available' },
    ],
}) {
    const [selectedDate, setSelectedDate] = useState('2025-10-20');

    const breadcrumbs = [
        { title: 'Room / Slot Management', href: '/room-slot-management' },
        { title: locationName, href: `/room-slot-management/${locationId}` },
        { title: `Room ${room.roomNo} - Slots`, href: '#' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
            case 'Booked': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30';
            case 'Blocked': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Available': return <CheckCircle className="h-4 w-4" />;
            case 'Booked': return <Clock className="h-4 w-4" />;
            case 'Blocked': return <XCircle className="h-4 w-4" />;
            default: return null;
        }
    };

    const slotsByDate = slots.reduce((acc, slot) => {
        if (!acc[slot.date]) acc[slot.date] = [];
        acc[slot.date].push(slot);
        return acc;
    }, {});

    const dates = Object.keys(slotsByDate).sort();
    const currentSlots = slotsByDate[selectedDate] || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage Slots - Room ${room.roomNo}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
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
                                    Slot Management - Room {room.roomNo}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {locationName} • {room.roomType}
                                </p>
                            </div>
                        </div>
                        <Link href={`/room-slot-management/${locationId}/rooms/${room.id}/slots/create`}>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" /> Add Slot
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Available Slots</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {slots.filter(s => s.status === 'Available').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Booked Slots</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {slots.filter(s => s.status === 'Booked').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30">
                                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Blocked Slots</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {slots.filter(s => s.status === 'Blocked').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-4">
                        <div className="flex items-center gap-4 overflow-x-auto">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                Select Date:
                            </span>
                            <div className="flex gap-2">
                                {dates.map((date) => (
                                    <Button
                                        key={date}
                                        variant={selectedDate === date ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setSelectedDate(date)}
                                        className="whitespace-nowrap"
                                    >
                                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Slots Table */}
                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <TableHead className="text-gray-600 dark:text-white">Time Slot</TableHead>
                                    <TableHead className="text-gray-600 dark:text-white">Duration</TableHead>
                                    <TableHead className="text-gray-600 dark:text-white">Price</TableHead>
                                    <TableHead className="text-gray-600 dark:text-white">Status</TableHead>
                                    <TableHead className="text-gray-600 dark:text-white">Customer</TableHead>
                                    <TableHead className="text-right text-gray-600 dark:text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentSlots.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No slots available for this date
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    currentSlots.map((slot) => (
                                        <TableRow key={slot.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <TableCell className="font-medium text-gray-900 dark:text-white">
                                                {slot.startTime} - {slot.endTime}
                                            </TableCell>
                                            <TableCell className="text-gray-600 dark:text-white">
                                                {slot.duration} {slot.duration === 1 ? 'hour' : 'hours'}
                                            </TableCell>
                                            <TableCell className="text-gray-600 dark:text-white">${slot.price}</TableCell>
                                            <TableCell>
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium ${getStatusColor(slot.status)}`}>
                                                    {getStatusIcon(slot.status)} {slot.status}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-600 dark:text-white">
                                                {slot.customerName || '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800" title="Edit Slot">
                                                        <Edit className="h-4 w-4 text-gray-600 dark:text-white" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 text-destructive hover:text-destructive" title="Delete Slot">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
