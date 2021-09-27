import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostContentfulTemplate = ({ data, location }) => {
  const post = data.contentfulPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.subtitle || post.subtitle}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <h2 itemProp="headline">{post.subtitle}</h2>
          
        </header>
        
        <section
          dangerouslySetInnerHTML={{ __html: post.content.raw }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
        <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostContentfulTemplate
//author
export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
    ) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulPost( slug:{ eq: $slug }) {
      title
      author
      subtitle
      content{
        raw
      }
    }

    previous: contentfulPost( slug:{ eq: $previousPostSlug }) {
      title
      author
      subtitle
      content{
        raw
      }
    }
    next: contentfulPost( slug:{ eq: $nextPostSlug }) {
      title
      author
      subtitle
      content{
        raw
      }
    }
  }
`
