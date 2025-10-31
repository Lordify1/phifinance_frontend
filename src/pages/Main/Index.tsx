import { useEffect, useState } from 'react';
import { Footer } from '../../components/Main/Footer';
import { Header } from '../../components/Main/Header';
import { Hero } from '../../components/Main/Hero';
import { About } from '../../components/Main/About';
import { Services } from '../../components/Main/Services';
import { Why } from '../../components/Main/Why';
import { Partners } from '../../components/Main/Partners';
import { Newsletter } from '../../components/Main/NewsLetter';
import { Team } from '../../components/Main/Team';
import { Contact } from '../../components/Main/Contact';
import ProblemAndSolution from '../../components/Main/PandS';
import Impact from '../../components/Main/Impact';
import IncubationProgramStructure from '../../components/Main/IPS';
import axiosClient from '../../axiosClient';
import { Helmet } from 'react-helmet-async';
import { appUrl } from '../../main';


const Layout = () => {
  const [partners, setPartners] = useState([]);
  const [team, setTeam] = useState([]);

  // useEffect(() => {
  //   axiosClient.get('/partners/get')
  //   .then((res:any) => {
  //     setPartners(res.data)
  //     // console.log(res)
  //   })
  //   .catch((res:any) => console.log(res))

  //   axiosClient.get('/team/get')
  //   .then((res:any) => {
  //     setTeam(res.data)
  //     // console.log(res)
  //   })
  //   .catch((res:any) => console.log(res))
  // }, [])

  return (
    <div className="flex flex-col bg-[#0e0e0e] text-white" scroll-region={true}>
      <Header />
      <Helmet>
        <title>Empowering Web3 Innovation</title>
        <meta name='description' content='We are your trusted Partners for Web3 Innovation'/>
        {/* for whatsapp, facebook etc  */}
        {/* <meta property='og:title' content='PhiFinance'/> */}
        {/* <meta property='og:description' content='Empowering Web3 Innovation'/> */}
        {/* <meta property='og:image' content={`/assets/images/phi/logo.png`}/> */}
        {/* <meta property='og:url' content={`${appUrl}`}/> */}
        {/* <meta property='og:type' content='website'/> */}

        {/* Twitter  */}
        {/* <meta name='twitter:card' content='summary_large_image'/> */}
        {/* <meta name='twitter:title' content='Phifinance'/> */}
        {/* <meta name='twitter:description' content='Empowering Web3 Innovation'/> */}
        {/* <meta name='twitter:image' content={`/assets/images/phi/logo.png`}/> */}
      </Helmet>
      <main className="grow">
        <Hero/>
        <ProblemAndSolution/>
        <Services/>
        <IncubationProgramStructure/>
        <Why/>
        <Impact/>
        <Partners partners={partners}/>
        <About/>
        <Team teamData={team}/>
        <Newsletter/>
        <Contact/>
        {/* <CTA/> */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;