import Layout from "@/layouts/main";
import AddNew from "./add-new";

const Inventors = () => {
  return (
    <div>
      <AddNew />
    </div>
  );
};

export default Inventors;

Inventors.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
