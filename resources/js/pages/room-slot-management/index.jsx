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
import { Eye, Pencil, Trash2, Plus, DoorOpen } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Room / Slot Management',
        href: '/room-slot-management',
    },
];

// Static location data
const locations = [
    {
        id: 1,
        name: 'Downtown Plaza',
        address: '123 Main Street, Suite 100',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        name: 'Riverside Complex',
        address: '456 River Road, Building A',
        country: 'United States',
        state: 'New York',
        city: 'New York City',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop',
    },
    {
        id: 3,
        name: 'Mountain View Center',
        address: '789 Highland Avenue',
        country: 'Canada',
        state: 'British Columbia',
        city: 'Vancouver',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=100&h=100&fit=crop',
    },
    {
        id: 4,
        name: 'Sunset Business Park',
        address: '321 Sunset Boulevard',
        country: 'United States',
        state: 'Florida',
        city: 'Miami',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    },
    {
        id: 5,
        name: 'Harbor Point',
        address: '654 Harbor Drive, Floor 3',
        country: 'United Kingdom',
        state: 'England',
        city: 'London',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    },
    {
        id: 6,
        name: 'Tech Hub Central',
        address: '890 Innovation Way',
        country: 'United States',
        state: 'Texas',
        city: 'Austin',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    },
    {
        id: 7,
        name: 'Lakeside Tower',
        address: '234 Lake Shore Drive',
        country: 'United States',
        state: 'Illinois',
        city: 'Chicago',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    },
    {
        id: 8,
        name: 'Pacific Heights Office',
        address: '567 Pacific Avenue',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop',
    },
    {
        id: 9,
        name: 'Green Valley Plaza',
        address: '432 Valley Road',
        country: 'United States',
        state: 'Washington',
        city: 'Seattle',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=100&h=100&fit=crop',
    },
    {
        id: 10,
        name: 'Metro Business Center',
        address: '876 Metro Boulevard',
        country: 'United States',
        state: 'Georgia',
        city: 'Atlanta',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    },
    {
        id: 11,
        name: 'Capital Square',
        address: '123 Capital Street',
        country: 'United States',
        state: 'District of Columbia',
        city: 'Washington',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    },
    {
        id: 12,
        name: 'Skyline Tower',
        address: '999 Skyline Avenue',
        country: 'United States',
        state: 'Massachusetts',
        city: 'Boston',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop',
    },
];

export default function RoomSlotManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(locations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLocations = locations.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Room / Slot Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            All Locations
                        </h1>
                        <Link href="/room-slot-management/create">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Location
                            </Button>
                        </Link>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 overflow-hidden">
                        <div className="bg-white dark:bg-[#0a0a0a]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <TableHead className="text-gray-600 dark:text-white">Image</TableHead>
                                        <TableHead className="text-gray-600 dark:text-white">Location Name</TableHead>
                                        <TableHead className="text-gray-600 dark:text-white">Address</TableHead>
                                        <TableHead className="text-gray-600 dark:text-white">Country</TableHead>
                                        <TableHead className="text-gray-600 dark:text-white">State</TableHead>
                                        <TableHead className="text-gray-600 dark:text-white">City</TableHead>
                                        <TableHead className="text-right text-gray-600 dark:text-white">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentLocations.map((location) => (
                                        <TableRow
                                            key={location.id}
                                            className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                        >
                                            <TableCell>
                                                <img
                                                    src={location.image}
                                                    alt={location.name}
                                                    className="h-12 w-12 rounded-md object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium text-gray-900 dark:text-white">
                                                {location.name}
                                            </TableCell>
                                            <TableCell className="text-gray-600 dark:text-white">{location.address}</TableCell>
                                            <TableCell className="text-gray-600 dark:text-white">{location.country}</TableCell>
                                            <TableCell className="text-gray-600 dark:text-white">{location.state}</TableCell>
                                            <TableCell className="text-gray-600 dark:text-white">{location.city}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/room-slot-management/${location.id}`}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                            title="View Rooms"
                                                        >
                                                            <DoorOpen className="h-4 w-4 text-gray-600 dark:text-white" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/room-slot-management/${location.id}/view`}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                            title="View Details"
                                                        >
                                                            <Eye className="h-4 w-4 text-gray-600 dark:text-white" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                        title="Edit Location"
                                                    >
                                                        <Pencil className="h-4 w-4 text-gray-600 dark:text-white" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/30"
                                                        title="Delete Location"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground whitespace-nowrap">
                            Showing {startIndex + 1} to {Math.min(endIndex, locations.length)} of {locations.length} locations
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                                        }}
                                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    />
                                </PaginationItem>
                                {getPageNumbers().map((page, index) => (
                                    <PaginationItem key={index}>
                                        {page === '...' ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(page);
                                                }}
                                                isActive={currentPage === page}
                                                className="cursor-pointer"
                                            >
                                                {page}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                        }}
                                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
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
