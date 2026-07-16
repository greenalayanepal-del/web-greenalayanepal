const teamPlaceholderPhoto = "/images/team/team-group.png";

export function teamPhotoUrl(member: { photo_url: string | null }): string {
  return member.photo_url ?? teamPlaceholderPhoto;
}
