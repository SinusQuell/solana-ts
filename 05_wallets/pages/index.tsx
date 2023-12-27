import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import { PingButton } from "../components/PingButton";

const Home: NextPage = (props) => {

    return (
        <div className={styles.App}>
            <Head>
                <title>Solana Wallet-Adapter</title>
                <meta name="description" content="Solana Wallet-Adapter" />
            </Head>
            <WalletContextProvider>
                <AppBar />
                <div className={styles.AppBody}>
                    <PingButton />
                </div>
            </WalletContextProvider>
        </div>
    );
}

export default Home;