export interface CandidateProfile {
  id: string;
  name: string;
  phoneNumber: string;
  preferredLanguage: string;
  coordinates: [number, number]; // [lng, lat]
  tradeCategory: string;
  skills: string[];
  experienceMonths: number;
  currentSalary: number;
  expectedSalary: number;
  shiftPreference: string;
  availableFromDays: number;
  verified: boolean;
}

export interface SpatialMatchResult {
  candidate: CandidateProfile;
  distanceKm: number;
  isWithinRadius: boolean;
}

export class SpatialMatcherService {
  /**
   * Computes Haversine great-circle distance between two [lng, lat] coordinates in kilometers.
   */
  public calculateDistanceKm(
    pointA: [number, number],
    pointB: [number, number]
  ): number {
    const [lon1, lat1] = pointA;
    const [lon2, lat2] = pointB;
    const R = 6371; // Earth radius in km

    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Discovers matching candidates within specified geographic radius.
   * Mirrors PostGIS: ST_DWithin(worker_profiles.location, ST_MakePoint(lng, lat)::geography, radius_meters)
   */
  public discoverWithinRadius(
    candidates: CandidateProfile[],
    centerCoordinates: [number, number],
    radiusKm: number,
    batchSize: number = 25
  ): SpatialMatchResult[] {
    const results: SpatialMatchResult[] = [];

    for (const candidate of candidates) {
      const distance = this.calculateDistanceKm(candidate.coordinates, centerCoordinates);
      const isWithinRadius = distance <= radiusKm;

      if (isWithinRadius) {
        results.push({
          candidate,
          distanceKm: distance,
          isWithinRadius: true,
        });
      }
    }

    // Sort by proximity ascending
    results.sort((a, b) => a.distanceKm - b.distanceKm);

    // Return the specified batch
    return results.slice(0, batchSize);
  }
}
