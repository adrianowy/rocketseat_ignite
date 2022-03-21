import Head from 'next/head'
import Link from 'next/link'

import { GetStaticProps } from 'next';
import { FiUser, FiCalendar } from "react-icons/fi";

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Prismic from '@prismicio/client'
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useEffect, useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({postsPagination}: HomeProps) {

  const [postsPrismic, setPostsPrismic] = useState<PostPagination>(postsPagination);

  async function handleNextPage(){
    console.log(postsPrismic.next_page);

    try {
      const postsResults = await fetch(`${postsPrismic.next_page}`).then(response =>
        response.json()
      );

      // postsResponse.results.map(post => {
      //   return {
      //     uid: post.uid,
      //     first_publication_date: format(
      //       new Date(post.last_publication_date),
      //       "dd MMM yyyy",
      //       {
      //         locale: ptBR,
      //       }
      //     ),
      //     data: {
      //       title: post.data.title,
      //       subtitle: post.data.subtitle,
      //       author: post.data.author
      //     },
      //   }
      // });
  
      console.log(postsResults);
      
    } catch (error) {
      console.log('Error: ',error);
        
    }
    
  }

  useEffect(()=>{
    console.log('effect postPagination');
    console.log(postsPrismic.next_page);
    
  }, [postsPrismic]);

  return (
    <>
      <Head>
        <title>Posts | Rocketseat</title>
      </Head>
      
      <main className={commonStyles.container}>
        <div className={styles.posts}>
          {
            postsPrismic.results.map(post => (
              <Link href={`/post/${post.uid}`} key={post.uid}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.details}>
                    <time><FiCalendar/>{post.first_publication_date}</time>
                    <span><FiUser/>{post.data.author}</span>
                  </div>
                </a>
              </Link>
            ))
          }
        </div>
        {
          postsPrismic.next_page && 
          <button 
            type="button" 
            className={styles.btnCarregarPosts} 
            onClick={handleNextPage}
          >
            Carregar mais posts
          </button>
        }
        
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['publication.title'],
    pageSize: 2
  });

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.last_publication_date),
        "dd MMM yyyy",
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      },
    }
  });

  return {
    props: { 
      postsPagination: {
        next_page: postsResponse.next_page,
        results
      }
    }
  }
};
