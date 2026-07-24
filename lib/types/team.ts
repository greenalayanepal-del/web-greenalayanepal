export type TeamMember = {
  id: string;
  name: string;
  slug: string;
  position: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url?: string | null;
};
