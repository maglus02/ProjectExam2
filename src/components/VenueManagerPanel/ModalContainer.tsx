import React from 'react';
import CreateVenueModal from './CreateVenueModal';
import DeleteVenueModal from './DeleteVenueModal';
import ViewBookingsModal from './ViewBookingsModal';

interface ModalContainerProps {
  selectedVenue: {
    id: string;
    name: string;
    bookings?: any[];
  } | null;
  handleCreateSuccess: (newVenue: any) => void;
  handleDeleteSuccess: () => void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  selectedVenue,
  handleCreateSuccess,
  handleDeleteSuccess,
}) => {
  return (
    <>
      <CreateVenueModal onCreateSuccess={handleCreateSuccess} />
      <DeleteVenueModal
        venueId={selectedVenue?.id || ''}
        venueName={selectedVenue?.name || ''}
        onDeleteSuccess={handleDeleteSuccess}
      />
      <ViewBookingsModal
        venueId={selectedVenue?.id || ''}
        venueName={selectedVenue?.name || ''}
        bookings={selectedVenue?.bookings || []}
      />
    </>
  );
};

export default ModalContainer;
