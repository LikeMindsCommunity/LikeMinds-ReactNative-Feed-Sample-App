// this function gives the initial characters of a text
export const nameInitials = (name: string) => {
  const names = name?.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
