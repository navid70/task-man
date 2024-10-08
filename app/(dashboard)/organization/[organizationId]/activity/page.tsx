import { Info } from "../_components/info";
import { Suspense } from "react";
// import { ActivityList } from "./_components/activity-list";
import { Divider } from "@mantine/core";

const AcitityPage = async () => {

  return (
    <div className="w-full">
      <Info  />
      <Divider my={'sm'} />
      {/*<Suspense fallback={<ActivityList.Skeleton />}>*/}
        {/*<ActivityList />*/}
      {/*</Suspense>*/}
    </div>
  );
};

export default AcitityPage;
