import { StartupCardType } from "@/types/startup";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id)
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

  return (
    <>
    <div>
      <section className="pink-container pattern">
        <h1 className="heading">Pitch your Startup<br/>Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit ideas, Vote on Pitches, and get Noticed in Virtual Compititors.</p>
        <SearchForm query={query} />
      </section>
      <section className="section-container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card-grid">
          {posts?.length > 0 ? 
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            )
          ): (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
    </div>
    <SanityLive />
    </>
  );
}
