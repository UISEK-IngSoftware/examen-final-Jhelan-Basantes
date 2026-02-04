export interface Character {
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'UNKNOWN';
  status: 'ALIVE' | 'DEAD' | 'UNKNOWN';
  species: string;
  createdAt: string;
  image: string | null;
}
