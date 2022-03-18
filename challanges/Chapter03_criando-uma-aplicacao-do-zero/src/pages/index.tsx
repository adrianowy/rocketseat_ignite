import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next';
import { FiUser, FiCalendar } from "react-icons/fi";

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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
  return (
    <>
      <Head>
        <title>Posts | Rocketseat</title>
      </Head>
      
      <main className={commonStyles.container}>
        <div className={styles.posts}>
          {
            postsPagination.results.map(post => (
              <Link href={`/post/${post.uid}`}>
                  <a key={post.uid}>
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
    pageSize: 100,
  });

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.last_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      },
    }
  });

  // console.log(posts);

  return {
    props: { 
      postsPagination: {
        next_page: '',
        results
      }
    }
  }

  // TODO
};
