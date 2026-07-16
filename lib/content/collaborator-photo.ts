const collaboratorPlaceholderPhoto = "/images/collaborators/placeholder.jpg";

export function collaboratorPhotoUrl(member: { photo_url: string | null }): string {
  return member.photo_url ?? collaboratorPlaceholderPhoto;
}
