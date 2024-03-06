export function shuffle<T>(array: T[]) {
  let i = array.length;

  while (i--) {
    const randomIndex = Math.floor(Math.random() * i + 1);
    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

export function getEmojiCode(emoji: string) {
  return [...emoji].map((char) => char.codePointAt(0)?.toString(16)).join("-");
}

export function getTwemojiUrl(emoji: string) {
  const code = getEmojiCode(emoji);
  return `/assets/twemoji/${code}.svg`;
}
