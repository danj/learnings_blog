import Layout, {GradientBackground} from "../../components/Layout";
import {getPosts} from "../../utils/mdx-utils";
import {getGlobalData} from "../../utils/global-data";
import SEO from "../../components/SEO";
import Header from "../../components/Header";
import Link from "next/link";
import ArrowIcon from "../../components/ArrowIcon";
import Footer from "../../components/Footer";
import Tags from "../../components/Tags";

export default function TagPosts({ posts, globalData }) {
    if (globalData) {
        return (
            <Layout>
                <SEO title={globalData.name} description={globalData.blogTitle}/>
                <Header name={globalData.name}/>
                <main className="w-full">
                    <h1 className="text-3xl lg:text-5xl text-center mb-12">
                        {globalData.blogTitle}
                    </h1>
                    <ul className="w-full">
                        {posts.map((post) => (
                            <li
                                key={post.filePath}
                                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
                            >
                                <Link
                                    as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                                    href={`/posts/[slug]`}
                                >
                                    <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                                        {post.data.date && (
                                            <p className="uppercase mb-3 font-bold opacity-60">
                                                {post.data.date}
                                            </p>
                                        )}
                                        <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                                        <Tags tags={post.data.tags} />
                                        {post.data.description && (
                                            <p className="mt-3 text-lg opacity-60">
                                                {post.data.description}
                                            </p>
                                        )}
                                        <ArrowIcon className="mt-4"/>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
                <Footer copyrightText={globalData.footerText}/>
                <GradientBackground
                    variant="large"
                    className="fixed top-20 opacity-40 dark:opacity-60"
                />
                <GradientBackground
                    variant="small"
                    className="absolute bottom-0 opacity-20 dark:opacity-10"
                />
            </Layout>
        )
    } else {
        return <Layout />
    }
}

export async function getStaticPaths() {
    //get the tags from each post
    //split the list of tags and flatten into one long list
    //duplicates are not removed, but they will be ignored later
    let paths = getPosts()
        .filter((post) => post.data.tags)
        .flatMap((post) => post.data.tags.split(','))
        .map((z) => ({ params: {tag: z.trim() } }));

    return {
        paths: paths,
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const posts = getPosts(context.params.tag);
    const globalData = getGlobalData();

    return { props: { posts, globalData } };
}
