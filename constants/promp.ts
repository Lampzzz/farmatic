export const ANALYZE_GREENHOUSE_PLANT = (plantName: string) => {
  return `
  You are a plant expert.
  Analyze the provided photo of a ${plantName}.
  
  The result should be in the following format:
  {
    "common_name": string,
    "scientific_name": string,
    "description": string (2-3 sentences),
    "healthStatus": string (healthy, sick, growing, needs attention, dead, harvestable),
    "thresholds": {
      "fan": { "humidity": string, "temperature": string },
      "light": { "intensity": string },
      "sprinkler": { "soil_moisture": string }
    },
    "estimatedOutcome": {
      "status": "edible" | "marketable" | "needs care" | "remove",
      "timeframe": string,
      "notes": string
    }
  }

  Rules:
  - Respond ONLY with valid JSON.
  - Do not include extra commentary or text outside of the JSON.
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
