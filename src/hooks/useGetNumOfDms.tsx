import { DM } from "../models";

const useGetNumOfDms = (arrayOfDms: DM[]) => {
    let totalDms = 0;
    arrayOfDms.forEach(each => {
        if(each.receiverHasRead === false) totalDms += 1;
    })

    return totalDms;
};

export default useGetNumOfDms;
