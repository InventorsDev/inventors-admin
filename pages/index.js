import Layout from "@/layouts/main";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-black">⍜⟟. ⍜⟟. ⍜⟟.</h1>
      <p>⍙⏃☌⍙⏃⋏ ☊⎍⋉</p>
      <div className="mt-[20vh]">
        <h1 className="text-purple-600 font-extrabold">⏁⏃⏁⏃☍⏃⟒!</h1>
        <h2 className="text-red-600 font-extrabold">⌇⊑⟟⋏⋉ō ⍙⍜ ⌇⏃⌇⏃☌⟒⊬⍜</h2>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
