import Layout from "@/layouts/main";

const Inventors = () => {
  return (
    <div>
      <p>This is the Inventors page!</p>
    </div>
  );
};

export default Inventors;

Inventors.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
