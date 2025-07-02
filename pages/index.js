import Head from "next/head";
import { Icon } from "@iconify/react";
import { User, Calendar, Stickynote, ShieldSlash } from "iconsax-reactjs";

import Layout from "@/layouts/main";

import ContentCard from "@/components/overview/ContentCard";
import PendingApprovalCard from "@/components/overview/PendingApprovalCard";
import DashboardStat from "@/components/overview/DashboardStat";
import StatChart from "@/components/overview/StatChart";

const blogData = [
  {
    type: "blog",
    content: {
      title: "Beginners guide to becoming a professional Front-end Developer",
      author: "Elijah Asaolu",
      role: "Software Engineer",
      readTime: "6 min read",
    },
    image: "/images/featured/frontend.png",
  },
  {
    type: "blog",
    content: {
      title: "Become the Front-end Titan: Hacktoberfest Survival Guide",
      author: "Eren Yeager",
      role: "Attack Titan",
      readTime: "8 min read",
    },
    image: "/images/featured/hacktober.png",
  },
];

const eventData = [
  {
    type: "event",
    content: {
      title:
        "Hacktober Fest: Building Eco-Friendly products. Leveraging 3rd party",
      author: "Jane Doe",
      date: "July 12, 2025",
      platform: "Google Meet",
      eventTime: "7pm",
    },
    image: "/images/featured/hacktoberfest.webp",
  },
];

const pendingApprovals = [
  {
    name: "Joseph Denzel",
    email: "Josephdenzel@gmail.com",
    role: "Lead",
    department: "Product Designer",
  },
  {
    name: "Sarah Connor",
    email: "sarah.connor@gmail.com",
    role: "Member",
    department: "Engineering",
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Overview | Inventors</title>
      </Head>
      <main className="---⌇⊑⟟⋏⋉ō ⍙⍜ ⌇⏃⌇⏃☌⟒⊬⍜----">
        <section className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <section className="p-3 bg-[#CCF0EA] rounded-xl">
              <div className="grid md:grid-cols-4 gap-4">
                <DashboardStat
                  icon={<User size="25" variant="Bold" />}
                  title="Leads"
                  stats="Total: 50 Pending: 5"
                  variant="amber"
                />
                <DashboardStat
                  icon={<Calendar size="25" variant="Bold" />}
                  title="Events"
                  stats="Upcoming: 4 Pending: 4"
                  variant="teal"
                />
                <DashboardStat
                  icon={<Stickynote size="25" variant="Bold" />}
                  title="Blogs"
                  stats="Published: 35 Pending: 3"
                  variant="orange"
                />
                <DashboardStat
                  icon={<ShieldSlash size="25" />}
                  title="Deactivated"
                  stats="Total: 5"
                  variant="gray"
                  badge="Activate"
                />
              </div>
            </section>
            <section className="mt-10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Pending approvals</h2>
                <nav
                  className="flex items-center gap-2"
                  aria-label="Pagination controls"
                >
                  <button className="border-[1.5px] border-gray-400 text-gray-400 p-2 rounded-lg">
                    <Icon icon="lucide:chevron-left" className="text-xl" />
                  </button>
                  <button className="border-[1.5px] border-gray-400 text-gray-400 p-2 rounded-lg">
                    <Icon icon="lucide:chevron-right" className="text-xl" />
                  </button>
                </nav>
              </div>
              <section className="mt-10 bg-white p-4 rounded-xl">
                <div className="_____ grid md:grid-cols-4 gap-5">
                  {blogData.map((item, idx) => (
                    <div className="mb-5" key={"blog-" + idx}>
                      <ContentCard
                        type={item.type}
                        content={item.content}
                        image={item.image}
                        onApprove={() =>
                          alert("Approved blog: " + item.content.title)
                        }
                        onDelete={() =>
                          alert("Deleted blog: " + item.content.title)
                        }
                      />
                    </div>
                  ))}
                  {eventData.map((item, idx) => (
                    <div key={"event-" + idx}>
                      <ContentCard
                        type={item.type}
                        content={item.content}
                        image={item.image}
                        onApprove={() =>
                          alert("Approved event: " + item.content.title)
                        }
                        onDelete={() =>
                          alert("Deleted event: " + item.content.title)
                        }
                      />
                    </div>
                  ))}
                  {pendingApprovals.length > 0 && (
                    <div>
                      <PendingApprovalCard
                        name={pendingApprovals[0].name}
                        email={pendingApprovals[0].email}
                        role={pendingApprovals[0].role}
                        department={pendingApprovals[0].department}
                        onApprove={() =>
                          alert("Approved: " + pendingApprovals[0].name)
                        }
                        onDelete={() =>
                          alert("Deleted: " + pendingApprovals[0].name)
                        }
                      />
                    </div>
                  )}
                </div>
              </section>
            </section>
            <section className="grid md:grid-cols-3 mt-10">
              <div className="col-span-2">
                <StatChart />
              </div>
              <div className="">
                {/* Look for something else to put here? */}
              </div>
            </section>
          </div>
          {/* 
          Incase we agree to add the top-contribution/new request section in the future
          <div className="col-span-3 bg-white rounded-xl p-4">
            <h2 className="text-xl">Top-3 Contributors (Weekly)</h2>
          </div> */}
        </section>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
