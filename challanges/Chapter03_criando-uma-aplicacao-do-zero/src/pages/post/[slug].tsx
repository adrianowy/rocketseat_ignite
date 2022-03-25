import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { RichText } from "prismic-dom";
import Prismic from '@prismicio/client';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({post}: PostProps) {

  const router = useRouter();
  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length);
    words.map(word => (total += word));
    return total;
  }, 0);
  const readTime = Math.ceil(totalWords / 200);

  return (
    <>
      <Head>
        <title>{post.data.title} | Rocketseat</title>
      </Head>

      <main>
        <section className={styles.header}>
          <img src={post.data.banner.url} alt={post.data.banner.url} />
          <header className={commonStyles.container}>
            <h1>{post.data.title}</h1>
            <div className={styles.details}>
              <time>
                <FiCalendar/>
                {
                  format(
                    new Date(post.first_publication_date),
                    "dd MMM yyyy",
                    { locale: ptBR }
                  ) || null
                }
            </time>
              <span><FiUser/>{post.data.author}</span>
              <span><FiClock />{`${readTime} min`}</span>
            </div>
          </header>
        </section>

        <article className={commonStyles.container}>
          {post.data.content.map(({ heading, body }) => (
            <div key={heading} className={styles.post}>
              <h2>{heading}</h2>

              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(body),
                }}
              />
            </div>
          ))}
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: {
        ...response,
        first_publication_date: response.first_publication_date 
      }
    }
  }
};
