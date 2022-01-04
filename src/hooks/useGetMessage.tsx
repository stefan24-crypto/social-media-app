const useGetMessage = (name: string | null) => {
  let beginning = `Good Morning`;
  if (!name) return beginning;
  const formattedName = name.split(" ")[0];
  const nowInHours = new Date().getHours();
  if (nowInHours >= 12 && nowInHours <= 17) {
    beginning = `Good Afternoon`;
  } else if (nowInHours >= 17 && nowInHours <= 19) {
    beginning = `Good Evening`;
  } else if (nowInHours >= 19 && nowInHours <= 24) {
    beginning = `Good Night`;
  } else {
    beginning = `Good Morning`;
  }

  return `${beginning}, ${formattedName}`;
};

export default useGetMessage;
