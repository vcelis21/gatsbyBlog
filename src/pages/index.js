import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../style.css"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
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

  

/*    function HelloWorld (props){
     return(
       <div id="Saludo">Hola {props.text} Cómo te va el día de hoy</div>
     )
   } */
  

  class HelloWorld extends React.Component {
    
    state = {
      show: true
    }

    toggleshow = () => {

      this.setState({show: !this.state.show }) //Es una forma más rápida

      /* if(this.state.show){
        this.setState({ show: false })
      }else{
        this.setState({ show: true })
      } */
      
    }

    /*Otra forma más complicada es ocupar toogleshow.bind(this)
    solamente tenemos que modificar 
    
    toggleshow () {
      if(this.state.show){
        this.setState({ show: false })
      }else{
        this.setState({ show: true })
      }
      
    }

    */

    render() {
      if(this.state.show){
        return(
          <div id="Saludo">Hola {this.props.text} Cómo te va el día de hoy<br></br><br></br>
          
          <button onClick={ 
            //alert('Gracias por modificar')& 
            this.toggleshow
            
            }> Ocultar </button>
          
          </div>
          
        )
      }else{
       return <><h4>No tiene ningun Dato</h4>
       <button onClick={ 
        //alert('Gracias por modificar') &
        this.toggleshow }> Mostrar </button></>
       
      }
      
    }
      
  }
   

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map( ({node}) => {
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
                    <HelloWorld text="Juan"/>
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
        }
      }
    }

    
  }
`
