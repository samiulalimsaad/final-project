import type { NextPage } from "next";
import Explore from "../../components/explore";
import Home from "../../components/home/index";
import Navbar from "../../components/navbar";
import {useRouter} from 'next/router'
import posts from '../../util/posts.json'

const Index: NextPage = () => {
    const id = useRouter().query.id
    console.log(id)

    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <Explore />
                </Home>
            </section>
        </>
    );
};

export default Index;
