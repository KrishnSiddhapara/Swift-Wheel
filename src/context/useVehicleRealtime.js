import { useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

export const useVehicleRealtime = (initialVehicleData) => {
    const { socket } = useSocket() || {};
    const [availabilityStatus, setAvailabilityStatus] = useState(initialVehicleData?.availabilityStatus || 'available');
    const [expectedAvailableAt, setExpectedAvailableAt] = useState(initialVehicleData?.expectedAvailableAt || null);

    useEffect(() => {
        if (!initialVehicleData) return;

        // Sync local state if prop changes
        setAvailabilityStatus(initialVehicleData.availabilityStatus || 'available');
        setExpectedAvailableAt(initialVehicleData.expectedAvailableAt || null);
    }, [initialVehicleData]);

    useEffect(() => {
        if (!socket || !initialVehicleData) return;

        const vId = initialVehicleData._id || initialVehicleData.id;

        const handleUpdate = (data) => {
            if (data.vehicleId === vId) {
                setAvailabilityStatus(data.availabilityStatus);
                setExpectedAvailableAt(data.expectedAvailableAt);
            }
        };

        socket.on('vehicle_availability_updated', handleUpdate);

        return () => {
            socket.off('vehicle_availability_updated', handleUpdate);
        };
    }, [socket, initialVehicleData?._id, initialVehicleData?.id]);

    return { availabilityStatus, expectedAvailableAt };
};
