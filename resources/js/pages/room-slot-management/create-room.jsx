import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, X } from 'lucide-react';

export default function CreateRoom({ locationName = 'Downtown Plaza', locationId = 1 }) {
    const breadcrumbs = [
        { title: 'Room / Slot Management', href: '/room-slot-management' },
        { title: locationName, href: `/room-slot-management/${locationId}` },
        { title: 'Add Room', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        roomNo: '',
        roomType: '',
        capacity: '',
        hourlyPricing: [{ hours: '', price: '' }],
        status: 'Available',
        floor: '',
        screenSize: '',
        soundSystem: '',
        seatingType: '',
        streamingServices: [],
        gamingConsoles: [],
        foodBeverage: false,
        decorationService: false,
        karaoke: false,
        amenities: '',
        specialOccasions: [],
        featuredImage: null,
        galleryImages: [],
    });

    const occasionOptions = [
        'Romantic', 'Anniversary', 'Birthday', 'Family Gathering', 'Friends Hangout',
        'Corporate Event', 'Kids Party', 'Date Night', 'Celebration'
    ];

    const streamingOptions = [
        'Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 'Apple TV+', 'YouTube Premium', 'Hulu'
    ];

    const gamingConsoleOptions = [
        'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', data);
        // post(`/room-slot-management/${locationId}/rooms/store`);
    };

    const handleOccasionToggle = (occasion) => {
        const current = data.specialOccasions;
        if (current.includes(occasion)) {
            setData('specialOccasions', current.filter(o => o !== occasion));
        } else {
            setData('specialOccasions', [...current, occasion]);
        }
    };

    const handleStreamingToggle = (service) => {
        const current = data.streamingServices;
        if (current.includes(service)) {
            setData('streamingServices', current.filter(s => s !== service));
        } else {
            setData('streamingServices', [...current, service]);
        }
    };

    const handleGamingToggle = (console) => {
        const current = data.gamingConsoles;
        if (current.includes(console)) {
            setData('gamingConsoles', current.filter(c => c !== console));
        } else {
            setData('gamingConsoles', [...current, console]);
        }
    };

    const handleFeaturedImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setData('featuredImage', e.target.files[0]);
        }
    };

    const handleGalleryImagesChange = (e) => {
        if (e.target.files) {
            setData('galleryImages', Array.from(e.target.files));
        }
    };

    const handlePriceChange = (index, field, value) => {
        const updated = [...data.hourlyPricing];
        updated[index][field] = value;
        setData('hourlyPricing', updated);
    };

    const addPricingTier = () => {
        setData('hourlyPricing', [...data.hourlyPricing, { hours: '', price: '' }]);
    };

    const removePricingTier = (index) => {
        if (data.hourlyPricing.length > 1) {
            setData('hourlyPricing', data.hourlyPricing.filter((_, i) => i !== index));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Add Room - ${locationName}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Link href={`/room-slot-management/${locationId}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Add New Room - {locationName}
                        </h1>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Featured Image */}
                            <div className="space-y-2">
                                <Label htmlFor="featuredImage" className="text-gray-700 dark:text-gray-300">
                                    Featured Room Image <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="featuredImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFeaturedImageChange}
                                    required
                                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400">Upload the main image for this room</p>
                                {errors.featuredImage && <p className="text-sm text-red-600 dark:text-red-400">{errors.featuredImage}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Room Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="roomNo" className="text-gray-700 dark:text-gray-300">Room No. <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="roomNo"
                                        type="text"
                                        value={data.roomNo}
                                        onChange={(e) => setData('roomNo', e.target.value)}
                                        placeholder="e.g., 101"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.roomNo && <p className="text-sm text-red-600 dark:text-red-400">{errors.roomNo}</p>}
                                </div>

                                {/* Room Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="roomType" className="text-gray-700 dark:text-gray-300">Room Type <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="roomType"
                                        type="text"
                                        value={data.roomType}
                                        onChange={(e) => setData('roomType', e.target.value)}
                                        placeholder="e.g., Single, Double, Suite"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.roomType && <p className="text-sm text-red-600 dark:text-red-400">{errors.roomType}</p>}
                                </div>

                                {/* Capacity */}
                                <div className="space-y-2">
                                    <Label htmlFor="capacity" className="text-gray-700 dark:text-gray-300">Capacity (Persons) <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        min="1"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                        placeholder="e.g., 2"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.capacity && <p className="text-sm text-red-600 dark:text-red-400">{errors.capacity}</p>}
                                </div>

                                {/* Hourly Pricing */}
                                <div className="space-y-3 md:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-gray-700 dark:text-gray-300">Hourly Pricing ($) <span className="text-red-500">*</span></Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addPricingTier} className="gap-2">
                                            <Plus className="h-4 w-4" /> Add Pricing Tier
                                        </Button>
                                    </div>
                                    {data.hourlyPricing.map((pricing, index) => (
                                        <div key={index} className="flex gap-3 items-end">
                                            <div className="flex-1 space-y-2">
                                                <Label htmlFor={`hours-${index}`} className="text-sm text-gray-600 dark:text-gray-400">Hours</Label>
                                                <Input
                                                    id={`hours-${index}`}
                                                    type="number"
                                                    min="1"
                                                    value={pricing.hours}
                                                    onChange={(e) => handlePriceChange(index, 'hours', e.target.value)}
                                                    placeholder="e.g., 1, 2, 3"
                                                    required
                                                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <Label htmlFor={`price-${index}`} className="text-sm text-gray-600 dark:text-gray-400">Price ($)</Label>
                                                <Input
                                                    id={`price-${index}`}
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={pricing.price}
                                                    onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                                                    placeholder="0.00"
                                                    required
                                                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            {data.hourlyPricing.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removePricingTier(index)}
                                                    className="h-9 w-9 text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/30">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Add pricing tiers for different hour durations (e.g., 1 hour, 3 hours, 24 hours)
                                    </p>
                                    {errors.hourlyPricing && <p className="text-sm text-red-600 dark:text-red-400">{errors.hourlyPricing}</p>}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">Status <span className="text-red-500">*</span></Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        required
                                        className="flex h-9 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] px-3 py-1 text-sm text-gray-900 dark:text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Occupied">Occupied</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                    {errors.status && <p className="text-sm text-red-600 dark:text-red-400">{errors.status}</p>}
                                </div>

                                {/* Floor */}
                                <div className="space-y-2">
                                    <Label htmlFor="floor" className="text-gray-700 dark:text-gray-300">Floor <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="floor"
                                        type="number"
                                        min="0"
                                        value={data.floor}
                                        onChange={(e) => setData('floor', e.target.value)}
                                        placeholder="e.g., 1"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.floor && <p className="text-sm text-red-600 dark:text-red-400">{errors.floor}</p>}
                                </div>

                                {/* Screen Size */}
                                <div className="space-y-2">
                                    <Label htmlFor="screenSize" className="text-gray-700 dark:text-gray-300">Screen Size <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="screenSize"
                                        type="text"
                                        value={data.screenSize}
                                        onChange={(e) => setData('screenSize', e.target.value)}
                                        placeholder="e.g., 85-inch 4K, 100-inch HD"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.screenSize && <p className="text-sm text-red-600 dark:text-red-400">{errors.screenSize}</p>}
                                </div>

                                {/* Sound System */}
                                <div className="space-y-2">
                                    <Label htmlFor="soundSystem" className="text-gray-700 dark:text-gray-300">Sound System <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="soundSystem"
                                        type="text"
                                        value={data.soundSystem}
                                        onChange={(e) => setData('soundSystem', e.target.value)}
                                        placeholder="e.g., Dolby Atmos 7.1, 5.1 Surround"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.soundSystem && <p className="text-sm text-red-600 dark:text-red-400">{errors.soundSystem}</p>}
                                </div>

                                {/* Seating Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="seatingType" className="text-gray-700 dark:text-gray-300">Seating Type <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="seatingType"
                                        type="text"
                                        value={data.seatingType}
                                        onChange={(e) => setData('seatingType', e.target.value)}
                                        placeholder="e.g., Recliner Seats, Sofa, Bean Bags"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.seatingType && <p className="text-sm text-red-600 dark:text-red-400">{errors.seatingType}</p>}
                                </div>

                                {/* Streaming Services */}
                                <div className="space-y-3 md:col-span-2">
                                    <Label className="text-gray-700 dark:text-gray-300">Streaming Services Available</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {streamingOptions.map((service) => (
                                            <div key={service} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`streaming-${service}`}
                                                    checked={data.streamingServices.includes(service)}
                                                    onCheckedChange={() => handleStreamingToggle(service)}
                                                    className="border-gray-300 dark:border-gray-700"
                                                />
                                                <label htmlFor={`streaming-${service}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                    {service}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gaming Consoles */}
                                <div className="space-y-3 md:col-span-2">
                                    <Label className="text-gray-700 dark:text-gray-300">Gaming Consoles Available</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {gamingConsoleOptions.map((console) => (
                                            <div key={console} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`gaming-${console}`}
                                                    checked={data.gamingConsoles.includes(console)}
                                                    onCheckedChange={() => handleGamingToggle(console)}
                                                    className="border-gray-300 dark:border-gray-700"
                                                />
                                                <label htmlFor={`gaming-${console}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                    {console}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Services */}
                                <div className="space-y-3 md:col-span-2">
                                    <Label className="text-gray-700 dark:text-gray-300">Additional Services</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="foodBeverage"
                                                checked={data.foodBeverage}
                                                onCheckedChange={(checked) => setData('foodBeverage', checked)}
                                                className="border-gray-300 dark:border-gray-700"
                                            />
                                            <label htmlFor="foodBeverage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                Food & Beverage Service
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="decorationService"
                                                checked={data.decorationService}
                                                onCheckedChange={(checked) => setData('decorationService', checked)}
                                                className="border-gray-300 dark:border-gray-700"
                                            />
                                            <label htmlFor="decorationService" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                Decoration Service
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="karaoke"
                                                checked={data.karaoke}
                                                onCheckedChange={(checked) => setData('karaoke', checked)}
                                                className="border-gray-300 dark:border-gray-700"
                                            />
                                            <label htmlFor="karaoke" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                Karaoke
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="amenities" className="text-gray-700 dark:text-gray-300">Amenities <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="amenities"
                                        type="text"
                                        value={data.amenities}
                                        onChange={(e) => setData('amenities', e.target.value)}
                                        placeholder="e.g., WiFi, Projector, Mini-bar"
                                        required
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.amenities && <p className="text-sm text-red-600 dark:text-red-400">{errors.amenities}</p>}
                                </div>

                                {/* Special Occasions */}
                                <div className="space-y-3 md:col-span-2">
                                    <Label className="text-gray-700 dark:text-gray-300">Special Occasions</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {occasionOptions.map((occasion) => (
                                            <div key={occasion} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`occasion-${occasion}`}
                                                    checked={data.specialOccasions.includes(occasion)}
                                                    onCheckedChange={() => handleOccasionToggle(occasion)}
                                                    className="border-gray-300 dark:border-gray-700"
                                                />
                                                <label htmlFor={`occasion-${occasion}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                    {occasion}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gallery Images */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="galleryImages" className="text-gray-700 dark:text-gray-300">
                                        Gallery Images
                                    </Label>
                                    <Input
                                        id="galleryImages"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryImagesChange}
                                        className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
                                    />
                                </div>

                                {/* Form Actions */}
                                <div className="md:col-span-2 flex justify-end gap-4">
                                    <Link href={`/room-slot-management/${locationId}`}>
                                        <Button type="button" variant="outline">Cancel</Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>Save Room</Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
