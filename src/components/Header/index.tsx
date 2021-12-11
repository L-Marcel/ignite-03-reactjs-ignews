import { SignInWithGithub } from "../SignInWithGithub";
import styles from "./styles.module.scss";
import { ActiveLink } from "../AtivedLink";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news"/>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/" >
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInWithGithub/>
      </div>
    </header>
  );
};