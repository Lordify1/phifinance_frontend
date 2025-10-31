import React, { useContext, useEffect, useState } from 'react';
import ProjectCard from '@/components/Ui/Advisor/ProjectCard';
import {
  headingClass,
  emptyResult,
  Loading,
  classMap,
} from '@/components/Tools/Misc';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { Head } from '@inertiajs/react';
import { Header } from '@/components/Main/Header';
import Filters from '@/components/Tools/ProjectsFilter';
import LandingLayout from '@/layouts/Advisor/LandingLayout';
import { Empty } from 'antd';
import Offcanvas from '@/components/Ui/Offcanvas';
import {RateForm} from '@/components/Advisor/Forms/RateForm';
import { OffCanvasContext, OffCanvasProvider } from '@/context/OffCanvasContext';
import { useAuth } from '@/context/AuthContext';


export default function Projects({user, projects}) {
  const [showFilters, setShowFilters] = useState(false);
  const authUserId = 1; // Replace with actual auth user ID when available
  const [filteredProjects, setFilteredProjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showRateForm, setShowRateForm] = useState(false);
  const {offData} = useContext(OffCanvasContext)
  const auth =  useAuth();

  useEffect(() => {
    // console.log(projects)
    setIsLoading(false)
  }, [filteredProjects])

  return (
    <>
    {/* <OffCanvasProvider> */}
    <LandingLayout user={user?.user}>
    <Head title='Projects'/>
    <div className="min-h-screen flex flex-col items-center bg-[#0f0f0f] text-white px-4 py-6 text-[0.7rem]">
  {/* Header Section */}
  <div className="flex justify-between items-center mb-6 w-full max-w-7xl">
    <h1 className="text-2xl font-bold text-white">Explore Projects</h1>
    <button
      onClick={() => setShowFilters(!showFilters)}
      className={`${classMap.button('bg-transparent', '', 'text-white', '', '')} lg:hidden flex items-center gap-2 px-3 py-2 rounded-md`}
    >
      {showFilters ? <FaTimes /> : <FaFilter />}
      {showFilters ? 'Close Filters' : 'Filters'}
    </button>
  </div>

  {/* Main Content Grid */}
  <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Filter Sidebar */}
    <div className={`lg:col-span-3 ${showFilters ? 'block' : 'hidden'} lg:block`}>
      <Filters
        showFilters={showFilters}
        data={projects}
        filteredData={(e: any) => setFilteredProjects(e)}
      />
    </div>

    {/* Project Cards */}
    <div className="lg:col-span-9 flex flex-col">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : (filteredProjects || projects).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {(filteredProjects || projects).map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              authUserId={user?.id}
              userId={project?.user_id}
              more={project.id}
            />
          ))}
        </div>
      ) : (
        emptyResult('No Project Found')
      )}
    </div>
  </div>
</div>

    </LandingLayout>
    <Offcanvas
      isOpen={showRateForm}
      onClose={() => setShowRateForm(false)}
      title={`Rate Project`}
    >
      <RateForm
      auth={auth.user}
      />
    </Offcanvas>
    {/* </OffCanvasProvider> */}
    </>
  );
}