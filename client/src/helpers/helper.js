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
  return `http://localhost:3300/${imageurl}`;
}

export function dateFormat(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateCountdown(startTime) {
  const now = new Date();
  const startDate = new Date(startTime);
  const timeDifference = startDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    // Poll has started
    return 'Poll has started';
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return `${days}d : ${hours}hr : ${minutes}min : ${seconds}sec`;
}

export function truncateSentenceByWords(sentence, maxWords) {
  const words = sentence.split(' ');

  if (words.length <= maxWords) {
    return sentence;
  } else {
    const truncatedWords = words.slice(0, maxWords);
    const truncatedSentence = truncatedWords.join(' ') + '...';
    return truncatedSentence;
  }
}