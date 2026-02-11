
const formatDate = (dateString: string): string => {
  // [CR] šlo by tohle použít i v jiném pásmu než Praha?
  const date = new Date(dateString);

  // [CR] dá se použít nějaká knihovna?
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  return `${day}.${month}.${year}`;
};

export { formatDate };
