import PageTitle from "@/components/PageTitle/PageTitle";
import ServicesList from "@/components/Services/ServicesList";
import { getServices } from "../actions/serviceActions";

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <div className="inset-0 absolute">
      <PageTitle text="Pagar servicios" />

      <ServicesList services={services} />
    </div>
  );
};

export default ServicesPage;
