import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Eye, Pencil, Trash2, Plus, Calendar } from 'lucide-react';
import { useState } from 'react';

// Static room data
const rooms = [
    {
        id: 1,
        roomNo: '101',
        roomType: 'Standard',
        capacity: 4,
        screenSize: '65-inch 4K',
        soundSystem: '5.1 Surround Sound',
        seatingType: 'Comfortable Sofa',
        hourlyPricing: [
            { hours: 2, price: 50 },
            { hours: 3, price: 70 },
            { hours: 6, price: 120 },
        ],
        status: 'Available',
        floor: 1,
        streamingServices: ['Netflix', 'Amazon Prime'],
        gamingConsoles: ['PlayStation 5'],
        specialOccasions: ['Date Night', 'Friends Hangout'],
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        roomNo: '102',
        roomType: 'Premium',
        capacity: 6,
        screenSize: '85-inch 4K',
        soundSystem: 'Dolby Atmos 7.1',
        seatingType: 'Luxury Recliners',
        hourlyPricing: [
            { hours: 2, price: 80 },
            { hours: 3, price: 110 },
            { hours: 6, price: 200 },
        ],
        status: 'Occupied',
        floor: 1,
        streamingServices: ['Netflix', 'Disney+', 'HBO Max'],
        gamingConsoles: ['PlayStation 5', 'Xbox Series X'],
        specialOccasions: ['Romantic', 'Anniversary', 'Birthday'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=100&h=100&fit=crop',
    },
    {
        id: 3,
        roomNo: '103',
        roomType: 'VIP Suite',
        capacity: 8,
        screenSize: '100-inch 8K',
        soundSystem: 'Dolby Atmos 9.1',
        seatingType: 'Premium Recliners + Sofa',
        hourlyPricing: [
            { hours: 2, price: 120 },
            { hours: 3, price: 160 },
            { hours: 6, price: 300 },
            { hours: 12, price: 500 },
        ],
        status: 'Available',
        floor: 1,
        streamingServices: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 'Apple TV+'],
        gamingConsoles: ['PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
        specialOccasions: ['Romantic', 'Anniversary', 'Family Gathering', 'Corporate Event'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=100&fit=crop',
    },
];

export default function ViewLocation({ locationName = 'Downtown Plaza', locationId = 1 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const breadcrumbs = [
        { title: 'Room / Slot Management', href: '/room-slot-management' },
        { title: locationName, href: '#' },
    ];

    const totalPages = Math.ceil(rooms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRooms = rooms.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) pages.push(1, 2, 3, 4, '...', totalPages);
            else if (currentPage >= totalPages - 2)
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
        return pages;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available':
                return 'text-green-600 dark:text-green-400';
            case 'Occupied':
                return 'text-red-600 dark:text-red-400';
            case 'Maintenance':
                return 'text-yellow-600 dark:text-yellow-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${locationName} - Rooms`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {locationName} - Rooms
                        </h1>
                        <Link href={`/room-slot-management/${locationId}/rooms/create`}>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Room
                            </Button>
                        </Link>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <TableHead>Image</TableHead>
                                    <TableHead>Room No.</TableHead>
                                    <TableHead>Room Type</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Pricing</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Floor</TableHead>
                                    <TableHead>Streaming</TableHead>
                                    <TableHead>Special Occasions</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRooms.map((room) => (
                                    <TableRow key={room.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <TableCell>
                                            <img
                                                src={room.image}
                                                alt={room.roomNo}
                                                className="h-12 w-12 rounded-md object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {room.roomNo}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-white">{room.roomType}</TableCell>
                                        <TableCell className="text-gray-600 dark:text-white">
                                            {room.capacity} {room.capacity === 1 ? 'Person' : 'Persons'}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-white">
                                            <div className="flex flex-col gap-1">
                                                {room.hourlyPricing.slice(0, 2).map((p, idx) => (
                                                    <span key={idx} className="text-xs">{p.hours}h: ${p.price}</span>
                                                ))}
                                                {room.hourlyPricing.length > 2 && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        +{room.hourlyPricing.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className={`font-medium ${getStatusColor(room.status)}`}>
                                            {room.status}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-white">Floor {room.floor}</TableCell>
                                        <TableCell className="text-gray-600 dark:text-white">
                                            <div className="flex flex-wrap gap-1">
                                                {room.streamingServices.slice(0, 2).map((s, idx) => (
                                                    <span key={idx} className="inline-flex items-center rounded-full bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">{s}</span>
                                                ))}
                                                {room.streamingServices.length > 2 && <span className="text-xs text-gray-500 dark:text-gray-400">+{room.streamingServices.length - 2}</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-white">
                                            <div className="flex flex-wrap gap-1">
                                                {room.specialOccasions.slice(0, 2).map((o, idx) => (
                                                    <span key={idx} className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">{o}</span>
                                                ))}
                                                {room.specialOccasions.length > 2 && <span className="text-xs text-gray-500 dark:text-gray-400">+{room.specialOccasions.length - 2}</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/room-slot-management/${locationId}/rooms/${room.id}/slots`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800" title="Manage Slots">
                                                        <Calendar className="h-4 w-4 text-gray-600 dark:text-white" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/room-slot-management/${locationId}/rooms/${room.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800" title="View Details">
                                                        <Eye className="h-4 w-4 text-gray-600 dark:text-white" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800" title="Edit Room">
                                                    <Pencil className="h-4 w-4 text-gray-600 dark:text-white" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 text-destructive hover:text-destructive" title="Delete Room">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground whitespace-nowrap">
                            Showing {startIndex + 1} to {Math.min(endIndex, rooms.length)} of {rooms.length} rooms
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); if(currentPage>1)setCurrentPage(currentPage-1); }}
                                        className={currentPage===1?'pointer-events-none opacity-50':'cursor-pointer'}
                                    />
                                </PaginationItem>
                                {getPageNumbers().map((page, idx) => (
                                    <PaginationItem key={idx}>
                                        {page==='...' ? <PaginationEllipsis /> :
                                            <PaginationLink
                                                href="#"
                                                onClick={(e)=>{e.preventDefault(); setCurrentPage(page);}}
                                                isActive={currentPage===page}
                                                className="cursor-pointer"
                                            >{page}</PaginationLink>}
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e)=>{e.preventDefault(); if(currentPage<totalPages)setCurrentPage(currentPage+1);}}
                                        className={currentPage===totalPages?'pointer-events-none opacity-50':'cursor-pointer'}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
