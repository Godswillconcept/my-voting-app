export function calculateAge(isoDateString) {
  const birthDate = new Date(isoDateString);
  const currentDate = new Date();

  return (
    currentDate.getFullYear() -
    birthDate.getFullYear() -
    (currentDate <
      new Date(
        currentDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      ))
  );
}

export function full_name(fn, ln) {
    return `${fn} ${ln}`;
}

export function image(imageurl) {
    return (`http://localhost:3300/${imageurl}`)
}
