interface Plant {
  id?: string;
  name: string;
  imageUrl: string;
  datePlanted: string | null;
  status?: string;
  createdAt?: any;
  userId?: string;
  cloudinaryPublicId?: string; // Store Cloudinary public ID for image management
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

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  adminId?: string;
  isActive?: boolean;
  role: "admin" | "staff";
  createdAt: any;
}
