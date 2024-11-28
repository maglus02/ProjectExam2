import React, { useState } from 'react';

interface VenueFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}

/**
 * A reusable form component for creating or editing venue details.
 * Includes fields for venue information, media, amenities, and location.
 * 
 * @param {VenueFormProps} props - Props for the `VenueForm` component.
 * @param {any} [props.initialData] - Initial data to pre-fill the form fields.
 * @param {(data: any) => Promise<void>} props.onSubmit - Function to handle form submission.
 * @param {boolean} props.loading - Whether the form is currently loading or submitting.
 * @returns {JSX.Element} The rendered venue form component.
 * 
 * @example
 * <VenueForm
 *   initialData={{ name: 'My Venue', price: 100 }}
 *   onSubmit={handleSubmit}
 *   loading={isSubmitting}
 * />
 */
const VenueForm: React.FC<VenueFormProps> = ({ initialData = {}, onSubmit, loading }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [price, setPrice] = useState<number>(initialData.price || 0);
  const [maxGuests, setMaxGuests] = useState<number>(initialData.maxGuests || 0);
  const [rating, setRating] = useState<number>(initialData.rating || 0);
  const [mediaUrl, setMediaUrl] = useState(initialData.media?.[0]?.url || '');
  const [mediaAlt, setMediaAlt] = useState(initialData.media?.[0]?.alt || '');
  const [meta, setMeta] = useState({
    wifi: initialData.meta?.wifi || false,
    parking: initialData.meta?.parking || false,
    breakfast: initialData.meta?.breakfast || false,
    pets: initialData.meta?.pets || false,
  });
  const [location, setLocation] = useState({
    address: initialData.location?.address || '',
    city: initialData.location?.city || '',
    zip: initialData.location?.zip || '',
    country: initialData.location?.country || '',
    continent: initialData.location?.continent || '',
  });

  /**
   * Handles form submission, constructing the data object and calling the onSubmit callback.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      description,
      price,
      maxGuests,
      rating,
      media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : [],
      meta,
      location,
    };
    onSubmit(data);
  };

  return (
    <form id="venue-form" onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="mediaUrl">Media URL</label>
        <input
          type="url"
          id="mediaUrl"
          className="form-control"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="mediaAlt">Media Alt Text</label>
        <input
          type="text"
          id="mediaAlt"
          className="form-control"
          value={mediaAlt}
          onChange={(e) => setMediaAlt(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          min="1"
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="maxGuests">Max Guests</label>
        <input
          type="number"
          id="maxGuests"
          className="form-control"
          value={maxGuests}
          onChange={(e) => setMaxGuests(Number(e.target.value))}
          required
          min="1"
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          className="form-control"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="0"
          max="5"
        />
      </div>

      {['wifi', 'parking', 'breakfast', 'pets'].map((key) => (
        <div className="form-check mb-3" key={key}>
          <input
            type="checkbox"
            id={key}
            className="form-check-input"
            checked={meta[key as keyof typeof meta]}
            onChange={(e) =>
              setMeta((prev) => ({ ...prev, [key]: e.target.checked }))
            }
          />
          <label className="form-check-label" htmlFor={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        </div>
      ))}

      {['address', 'city', 'zip', 'country', 'continent'].map((field) => (
        <div className="form-group mb-3" key={field}>
          <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            id={field}
            className="form-control"
            value={location[field as keyof typeof location]}
            onChange={(e) =>
              setLocation((prev) => ({
                ...prev,
                [field]: e.target.value,
              }))
            }
          />
        </div>
      ))}
    </form>
  );
};

export default VenueForm;
