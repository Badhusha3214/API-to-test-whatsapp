// Mock data for places and workers

const places = [
  {
    id: 1,
    name: "Downtown Office",
    address: "123 Main St, Downtown",
    location: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 2,
    name: "North Shopping Mall",
    address: "456 North Ave, Uptown",
    location: { lat: 40.7580, lng: -73.9855 }
  },
  {
    id: 3,
    name: "West Industrial Park",
    address: "789 West Blvd, Westside",
    location: { lat: 40.7488, lng: -74.0353 }
  }
];

const workers = [
  {
    id: 1,
    name: "John Doe",
    phone: "+11234567890",
    placeId: 1,
    available: true,
    location: "Downtown Office"
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+10987654321",
    placeId: 1,
    available: true,
    location: "Downtown Office"
  },
  {
    id: 3,
    name: "Robert Johnson",
    phone: "+11122334455",
    placeId: 2,
    available: true,
    location: "North Shopping Mall"
  },
  {
    id: 4,
    name: "Sarah Williams",
    phone: "+15556667777",
    placeId: 2,
    available: false,
    location: "North Shopping Mall"
  },
  {
    id: 5,
    name: "Michael Brown",
    phone: "+19998887777",
    placeId: 3,
    available: true,
    location: "West Industrial Park"
  }
];

module.exports = {
  places,
  workers
};
