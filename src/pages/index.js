import * as React from "react"
// import { useState } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../style.css"
import Img from "gatsby-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} className="titleGatsby">
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  class ShowImage extends React.Component {

    state = {
      show: true
    }

    toggleshow = () => {
      this.setState({ show: !this.state.show }) //Es una forma más rápida
    }

    render() {
      return (
        <><Img fluid={this.props.image.fluid} className="image" /><br></br>
          {/* <button onClick={this.toggleshow}> Ocultar Imágen </button> */}
        </>
      )
      // if (this.state.show) {
      //   return (
      //     <div >Esta pelicula es del author {this.props.author} <br></br><br></br>

      //       <button onClick={
      //         this.toggleshow
      //       }> Ver Imágen </button>
      //     </div >

      //   )
      // } else {
      //   if (this.props.image) {
      //     return (
      //       <><Img fluid={this.props.image.fluid} className="" /><br></br>
      //         <button onClick={this.toggleshow}> Ocultar Imágen </button></>
      //     )
      //   } else {
      //     return (
      //       <><h4>No se ha subido ninguna Imágen</h4><br></br>
      //         <button onClick={this.toggleshow}> Ocultar Imágen </button></>
      //     )
      //   }
      // }
    }
  }


  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(({ node }) => {
          { console.log(node) }
          const title = node.title || node.slug

          return (
            <li key={node.slug}>
              <article
                className="node-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={node.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{node.date}</small>
                  <h4>
                    <ShowImage
                      image={node.image}
                      author={node.author}
                    />
                  </h4>
                </header>
                <section>
                  <p

                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
 query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          slug
          author
          content{
            raw
					}
          image{
              fluid(maxWidth: 1280 , quality: 100, maxHeight: 720){
                ...GatsbyContentfulFluid_withWebp
              }
          }
        }
      }
    }    
  }
`
