# Farmatic - Plant Management App

A React Native app for managing plants and farming operations.

## Features

- **Plant Library**: Browse and search plants from the Perenual API
- **Plant Details**: Comprehensive plant information including care instructions, characteristics, and growing tips
- **User Management**: Staff and admin management system
- **Plant Tracking**: Add and monitor your own plants

## Plant Details Screens

The app has two different plant details screens depending on the context:

### Library Plant Details (`app/(root)/plant/library/[id].tsx`)

Shows comprehensive information about plants from the Perenual API including:

- **Basic Information**: Type, family, origin, cycle, dimensions
- **Care Information**: Watering, sunlight, care level, growth rate, maintenance
- **Characteristics**: Flowers, fruits, leaves, medicinal properties, etc.
- **Safety Information**: Toxicity to humans and pets
- **Growing Information**: Pruning seasons, what it attracts, propagation methods
- **Advanced Watering**: Water quality, timing, temperature requirements, pH levels
- **Plant Anatomy**: Colors of different plant parts

## Setup

### API Key Configuration

To use the plant details functionality, you need to set up your Perenual API key:

1. Get your API key from [Perenual](https://perenual.com/docs/api)
2. Update the API key in `services/perenual.ts`:
   ```typescript
   // Replace YOUR_API_KEY with your actual Perenual API key
   const response = await fetch(
     `https://perenual.com/api/v2/species/details/${id}?key=YOUR_API_KEY`
   );
   ```

### Navigation

The app has two different navigation patterns:

1. **Library Plants**: When a plant card is clicked in the library, it navigates to:

   ```
   /plant/library/[id]
   ```

   Where `[id]` is the plant's ID from the Perenual API.

2. **Greenhouse Plants**: When a plant card is clicked on the home page, it navigates to:
   ```
   /plant/greenhouse/[id]
   ```
   Where `[id]` is the plant's Firebase ID from your personal collection.

## Dependencies

- React Native with Expo
- NativeWind (Tailwind CSS for React Native)
- Expo Router for navigation
- Expo Linear Gradient for visual effects
- Ionicons for icons

## Project Structure

```
app/
  (root)/
    plant/
      library/
        [id].tsx         # Library plant details (Perenual API)
        _layout.tsx      # Library layout
      greenhouse/
        [id].tsx         # Greenhouse plant details (Firebase)
        _layout.tsx      # Greenhouse layout
      add-plant.tsx      # Add new plant
      select-plant.tsx   # Select plant from library
      _layout.tsx        # Plant folder layout
components/
  plant/
    plant-card.tsx       # Plant card component
hooks/
  use-plant-details.tsx # Custom hook for plant details
services/
  perenual.ts           # Perenual API service
types/
  index.d.ts            # TypeScript interfaces
```

## Usage

### Library Plants

1. Navigate to the plant library
2. Click on any plant card
3. View comprehensive plant details from Perenual API
4. Use the back button to return to the library

### Greenhouse Plants

1. Navigate to the home page
2. Click on any of your personal plants
3. View plant information and perform care actions
4. Edit or delete your plants as needed

The screen automatically fetches plant data based on the plant ID from the URL parameters and displays it in an organized, user-friendly layout.
