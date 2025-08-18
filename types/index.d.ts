interface Plant {
  id: number;
  name: string;
  image_url: string;
  datePlanted: string | null;
  status: string;
}

interface PlantLibrary {
  id: number;
  common_name: string;
  scientific_name: string;
  default_image?: {
    thumbnail: string;
  };
  description?: string;
}
