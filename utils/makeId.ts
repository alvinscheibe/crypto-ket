export const makeId = (length: number): string => {
  let result: string = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let loop = 0; loop < length; loop++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};