import { FormEvent, useContext, useState } from 'react'
import styles from '../styles/Home.module.css'
import { AuthContext } from '../contexts/AuthContext'
import { GetServerSideProps } from 'next';

export default function Home(){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent){
    
    event.preventDefault();
    const data = {
      email,
      password
    }

    await signIn(data);
    
  }
  
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input 
        type="email" 
        name={email} 
        onChange={e => setEmail(e.target.value)}
        placeholder='E-mail'
      />

      <input 
        type="password" 
        name={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
      />

      <button
        type="submit"
      >
        Entrar
      </button>

    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  console.log(ctx.req.cookies);

  return {
    props: {
      
    }
  }
}