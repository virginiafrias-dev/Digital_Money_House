import Activity from "@/components/Activity/Activity";
import PageTitle from "@/components/PageTitle/PageTitle";
import { getActivity } from "../actions/activityActions";

export const dynamic = "force-dynamic";

const ActivityPage = async () => {
  const activity = await getActivity();

  return (
    <div className="absolute inset-0">
      <PageTitle text="Tu actividad" />
      <Activity activity={activity} />
    </div>
  );
};

export default ActivityPage;
