import { DM } from "../models";
import { useAppSelector } from "../store/hooks";

const useGetNumOfDms = (yourMessages: DM[]) => {
  let totalDms = 0;
  const curUser = useAppSelector((state) => state.auth.curUser);
  yourMessages.forEach((each) => {
    const sortedMessages = [...each.messages];
    sortedMessages.sort((a, b) => a.time.seconds - b.time.seconds);
    if (
      each.receiverHasRead === false &&
      sortedMessages.at(-1)?.author !== curUser?.displayName
    )
      totalDms += 1;
  });

  return totalDms;
};

export default useGetNumOfDms;
