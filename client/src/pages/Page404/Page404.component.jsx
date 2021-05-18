import React from "react";

import CustomLink from "components/ui/CustomLink";
import styles from "./Page404.module.scss";

function Page404 () {
    return (
        <section className={styles.container}>
            <header className={styles.header}>
                Oh my, 404!
            </header>

            <div>
                Не нашли такую страничку.&nbsp;

                <CustomLink to="/">
                    Вернуться на главную?
                </CustomLink>
            </div>


        </section>
    );
}

export default Page404;
