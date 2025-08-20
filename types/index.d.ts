interface Plant {
  id?: string;
  name: string;
  imageUrl: string;
  datePlanted: string | null;
  status?: string;
  createdAt?: any;
  userId?: string;
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
