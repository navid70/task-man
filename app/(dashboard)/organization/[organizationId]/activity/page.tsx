import { Info } from "../_components/info";
import { Suspense } from "react";
import { Divider } from "@mantine/core";
import { ActivityList } from "./_components/activity-list";

const AcitityPage = async () => {

  return (
    <div className="w-full">
      <Info  />
      <Divider my={'sm'} />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default AcitityPage;
