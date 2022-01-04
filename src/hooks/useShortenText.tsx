const useShortenText = (text: string, amountToCut: number) => {
  if (text.length <= amountToCut) return text;
  const newString = `${text.slice(0, amountToCut)}...`;
  return newString;
};

export default useShortenText;
