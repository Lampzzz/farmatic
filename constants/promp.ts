export const ANALYZE_GREENHOUSE_PLANT = (plantName: string) => {
  return `
  You are a plant expert.
  Analyze the provided photo of a ${plantName}.
  
  The result should be in the following format:
  {
    "commoName": string,
    "scientificName": string,
    "description": string (2-3 sentences),
    "healthStatus": string (healthy, sick, growing, needs attention, dead, harvestable),
    "issue": string (1-2 sentences),
    "riskLevel": string (low, medium, high),
    "thresholds": {
      "fan": { 
        "humidity": number (recommended max humidity percentage as a number, e.g. 60), 
        "temperature": number (recommended max temperature in °F, e.g. 78) 
      },
      "light": { 
        "lightLevel": number (recommended minimum lux level as a number, e.g. 5000) 
      },
      "sprinkler": { 
        "soilMoisture": number (recommended minimum soil moisture percentage, e.g. 30) 
      }
    }
  }

  Rules:
  - Respond ONLY with valid JSON.
  - All threshold values must be numeric values e.g. 78.
  - Do not return descriptive ranges like "30-60%" or "Bright light". Instead, pick the most recommended numeric value.
  - Do not include commentary outside the JSON.
`;
};

export const ANALYZE_PLANT_BY_IMAGE = `
  You are a plant expert.
  Analyze the provided plant photo.
  Respond ONLY with valid JSON.
  Must include: "scientific_name", "common_name", "description", "healthStatus".
  Keep description 1-2 sentences.
  Health status must be one of: healthy, sick, growing, needs attention
`;
