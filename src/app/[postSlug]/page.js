import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

// load this component only when it's needed it the post
const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  { loading: Spinner }
);

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{ CodeSnippet, DivisionGroupsDemo, CircularColorsDemo }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
