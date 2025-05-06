import EventImage from '../models/EventImage.js';

// Upload event image
export const uploadEventImage = async (req, res) => {
  try {
    const { companyId, image, title, description, date, location } = req.body;

    const eventImage = new EventImage({
      companyId, image, title, description, date, location
    });

    await eventImage.save();
    res.status(201).json({ message: 'Event image uploaded successfully!', eventImage });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading event image', error: error.message });
  }
};

// Get event images for a company
export const getEventImagesByCompany = async (req, res) => {
  try {
    const images = await EventImage.find({ companyId: req.params.companyId });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event images', error: error.message });
  }
};

// Update event image
export const updateEventImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, date, location } = req.body;

    const updated = await EventImage.findByIdAndUpdate(
      id,
      { image, title, description, date, location },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Event image not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update image', error: err.message });
  }
};

// Delete event image
export const deleteEventImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await EventImage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Event image not found' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete image', error: err.message });
  }
};
