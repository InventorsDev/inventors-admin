import Layout from '@/layouts/main';

const Home = () => {
	return <div>Hello</div>;
};

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Home;
