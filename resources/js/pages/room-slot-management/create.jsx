import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs = [
  {
    title: 'Room / Slot Management',
    href: '/room-slot-management',
  },
  {
    title: 'Add Location',
    href: '#',
  },
];

export default function CreateLocation() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    address: '',
    country: '',
    state: '',
    city: '',
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', data);
    // post('/room-slot-management/store');
  };

  const handleImagesChange = (e) => {
    if (e.target.files) {
      setData('images', Array.from(e.target.files));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Location" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Link href="/room-slot-management">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Add New Location
            </h1>
          </div>

          {/* Form */}
          <div className="rounded-lg border border-gray-200 bg-white dark:bg-[#0a0a0a] dark:border-gray-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    Location Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter location name"
                    required
                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    placeholder="Enter address"
                    required
                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.address}</p>
                  )}
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-gray-700 dark:text-gray-300">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="country"
                    type="text"
                    value={data.country}
                    onChange={(e) => setData('country', e.target.value)}
                    placeholder="Enter country"
                    required
                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.country && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.country}</p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-700 dark:text-gray-300">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    value={data.state}
                    onChange={(e) => setData('state', e.target.value)}
                    placeholder="Enter state"
                    required
                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.state && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.state}</p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700 dark:text-gray-300">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                    placeholder="Enter city"
                    required
                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.city}</p>
                  )}
                </div>

                {/* Images Upload */}
                <div className="space-y-2">
                  <Label htmlFor="images" className="text-gray-700 dark:text-gray-300">
                    Location Images <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    required
                    className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Upload multiple images for this location
                  </p>
                  {data.images.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {data.images.length} {data.images.length === 1 ? 'image' : 'images'} selected
                    </p>
                  )}
                  {errors.images && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.images}</p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Link href="/room-slot-management">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {processing ? 'Saving...' : 'Save Location'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
