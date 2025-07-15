import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@/components/Button';
import Layout from '@/layouts/main';

export default function AddNewEvent() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    type: '',
    firstName: '',
    location: '',
    date: '',
    time: '',
    description: '',
    flyer: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'flyer') {
      const file = files[0];
      if (file) {
        setForm({ ...form, flyer: file });
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, flyer: null }));
    setPreviewUrl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    console.log('📝 FormData submission:');
    for (let [key, val] of formData.entries()) {
      console.log(`${key}:`, val);
    }

    alert('Form submitted! Check the console for output.');

    setForm({
      title: '',
      type: '',
      firstName: '',
      location: '',
      date: '',
      time: '',
      description: '',
      flyer: null,
    });
    setPreviewUrl(null);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-8">
        <form
          onSubmit={handleSubmit}
          className="border-2 border-green-200 bg-white p-8 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Types</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Enter event types"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter event location"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us about the event"
              className="w-full border border-gray-300 rounded-lg p-2 h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Flyer</label>
            <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center p-4">
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-gray-500">
                {/* <FiUploadCloud className="text-xl mb-1" /> */}
                <p className="text-sm font-medium">Upload your event flyer</p>
                <p className="text-xs text-gray-400">PNG, JPG, SVG, PDF up to 5MB</p>
                <input
                  type="file"
                  name="flyer"
                  accept=".png,.jpg,.svg,.pdf"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            {previewUrl && (
              <div className="mt-4 text-center">
                {form.flyer?.type.startsWith('image/') ? (
                  <img
                    src={previewUrl}
                    alt="Flyer Preview"
                    className="max-h-48 rounded-md object-contain mx-auto mb-2"
                  />
                ) : (
                  <p className="text-sm text-gray-700 mb-2">📎 {form.flyer.name}</p>
                )}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-600 text-sm hover:underline"
                >
                  🗑 Remove file
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <Button primaryButton buttonProps={{ type: "submit" }}>Submit</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

AddNewEvent.getLayout = function getLayout(page) {
  return <Layout showBackButton title="Add New Event">{page}</Layout>;
};