import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Index({ allPosts, preview }) {
  const posts = allPosts || [];
  const heroPost = posts.length > 0 ? posts[0] : null; // First post as hero post
  const morePosts = posts.slice(1); // Remaining posts for more stories

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost?.title}
            coverImage={heroPost?.featuredImage}
            date={heroPost?.date}
            author={heroPost?.author}
            slug={heroPost?.slug}
            excerpt={heroPost?.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  try {
    const allPosts = await getAllPostsForHome(preview);
    console.log('API Response:', allPosts); // Log the API response to verify data

    return {
      props: { allPosts, preview },
      revalidate: 10, // Revalidate every 10 seconds for incremental static regeneration
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { allPosts: [], preview }, // Return empty posts array on error
      revalidate: 10,
    };
  }
};
