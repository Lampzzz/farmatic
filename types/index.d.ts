interface Admin {
  id: string;
  name?: string;
  email: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  createdAt?: any;
}

interface Staff extends Admin {
  adminId: string;
  isActive?: boolean;
}

type User = Admin | Staff;

interface Plant {
  id?: string;
  name: string;
  imageUrl: string;
  datePlanted: string | null;
  zoneNumber: number;
  status?: string;
  createdAt?: any;
  userId?: string;
  cloudinaryPublicId?: string;
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

interface PaginationMeta {
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

interface PerenualResponse {
  data: PlantLibrary[];
  meta: PaginationMeta;
}

interface PlantDetails {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family: string;
  origin: string | null;
  type: string;
  dimensions: {
    type: string | null;
    min_value: number;
    max_value: number;
    unit: string;
  };
  cycle: string;
  watering: string;
  watering_general_benchmark: {
    value: string;
    unit: string;
  };
  plant_anatomy: Array<{
    part: string;
    color: string[];
  }>;
  sunlight: string[];
  pruning_month: string[];
  pruning_count: {
    amount: number;
    interval: string;
  };
  seeds: number;
  attracts: string[];
  propagation: string[];
  hardiness: {
    min: string;
    max: string;
  };
  hardiness_location: {
    full_url: string;
    full_iframe: string;
  };
  flowers: boolean;
  flowering_season: string;
  soil: string[];
  pest_susceptibility: string | null;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  fruiting_season: string | null;
  harvest_season: string | null;
  harvest_method: string;
  leaf: boolean;
  edible_leaf: boolean;
  growth_rate: string;
  maintenance: string;
  medicinal: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  rare: boolean;
  tropical: boolean;
  cuisine: boolean;
  indoor: boolean;
  care_level: string;
  description: string;
  default_image: {
    image_id: number;
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  };
  other_images: Array<{
    image_id: number;
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  }>;
  xWateringQuality: string[];
  xWateringPeriod: string[];
  xWateringAvgVolumeRequirement: string[];
  xWateringDepthRequirement: string[];
  xWateringBasedTemperature: {
    unit: string;
    min: number;
    max: number;
  };
  xWateringPhLevel: {
    min: number;
    max: number;
  };
  xSunlightDuration: {
    min: string;
    max: string;
    unit: string;
  };
}
