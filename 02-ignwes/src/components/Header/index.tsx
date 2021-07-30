import {SignInButton} from './SignInButton';

import styles from './styles.module.scss';

export function Header (){
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="igNews" />
                <nav>
                    <a href="#" className={styles.active}>Menu 1</a>
                    <a href="#">Menu 2</a>
                </nav>
                <SignInButton/>
            </div>
        </header>
    );
}