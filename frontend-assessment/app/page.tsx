import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <h1>Welcome to the Form Builder Application</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/formbuilder">Form Builder</Link>
                            </li>
                            <li>
                                <Link href="/fetchforms">Fetch Forms</Link>
                            </li>
                        </ul>
                    </nav>
                </main>
            </div>
    );
}