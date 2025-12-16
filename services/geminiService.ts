import { Monster } from "../types";

// This service is now deprecated as we use pre-generated content.
// Keeping empty functions to prevent import errors if referenced elsewhere.

export const generateMonsterLegend = async (monster: Monster): Promise<string> => {
  return monster.legend || "Легенда утеряна...";
};

export const generateMonsterImage = async (monster: Monster): Promise<string | null> => {
  return monster.imageUrl || null;
};
