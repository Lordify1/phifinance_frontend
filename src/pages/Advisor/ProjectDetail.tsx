// ProjectDetail.tsx

import { advisorUrl, appUrl } from '@/app';
import {RateForm, RatesDiv} from '@/components/Advisor/Forms/RateForm';
import { classMap, colorMap, emptyResult, getData, random } from '@/components/Tools/Misc';
import ProjectCard from '@/components/Ui/Advisor/ProjectCard';
import { ProjectCommentDiv, ProjectCommentForm } from '@/components/Ui/Advisor/ProjectComment';
import ProjectLike from '@/components/Ui/Advisor/ProjectLike';
import TeamMemberCard from '@/components/Ui/Advisor/TeamMemberCard';
import { useAuth } from '@/context/AuthContext';
import LandingLayout from '@/layouts/Advisor/LandingLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaEye, FaHeart, FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ProjectDetail = ({ project, title }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(project);
  const [hidden, setHidden] = useState({
    description: false,
    problem: false,
    solution: false,
    team: false,
    summary: false,
    founder: false
  });

  console.log(project)

  const user = useAuth();
  const user_id = user?.user ? user?.user?.id : random(20);
  const guest = user?.user ? false : true;

  const isOwner = project?.user_id === user?.user?.id;
  const isDraft = project?.status === 'draft' ? true : false;

  if(!isOwner && isDraft) window.location.href = appUrl + '/404'

  const fetchProject = async () => {
    const data = await getData('/project/get', id, 'post');
    setDetails(data);
  };


  const toggleView = (section: keyof typeof hidden) => {
    setHidden((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };



  const hideOrNot = (section: keyof typeof hidden) => {
    return hidden[section] ? 'hidden' : '';
  };

  const toggleIcon = (section: keyof typeof hidden) => {
    return hidden[section] ? <FaPlus /> : <FaMinus />;
  };

  return (
    <LandingLayout>
      <Head title={title} />
      {isDraft && (<div className={`w-full min:h-10 p-2 text-center ${colorMap.bg_secondary} flex items-center text-black justify-center mb-2`}>
          <h6 className='text-sm'>Viewing as <b>Draft</b>. Your project is not visible to others. Toggle the button on your project card on your dashboard to publish it</h6>
        </div>)}
      <div className={`w-full fade-in transition-opacity duration-500 min-h-screen bg-[#0c0c0c] text-white px-4 py-2`}>
        {/* Back Button */}
        {!isDraft && <div className="mb-4">
          <Link 
          className={`text-sm ${classMap.button('','','','','left')}`}
          href={`${advisorUrl}/projects`}>
            ←
          </Link>
        </div>}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 👉 Left Column (Comments & Engagement) */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-4">
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow">
              <div className="flex items-center justify-center text-sm text-gray-400">
                {user?.user?.role === 'investor' ? (
                  <ProjectLike
                    likes={project?.likes_count}
                    project_id={project?.id}
                    user_id={user_id}
                    guest={guest}
                    auth={user.user}
                    slug={project?.slug}
                  />
                ) : (
                  <span>
                    <FaHeart 
                    className={`inline mb-1 ${colorMap.text_primary}`}/>
                    {' '}
                    {project?.likes_count}
                    {' '}
                    Likes
                  </span>
                )}
                {/* <span>
                  <FaEye className={`inline ${colorMap.text_primary}`} /> {project.views_count} Views
                </span> */}
              </div>
            </div>

            {/* Rate Form */}
            {(user?.user?.role === 'investor' && !isOwner) && 
            <RateForm
              projectID={project.id}
              showBtn={true}
              auth={user.user}
            />
            }

            {/* Ratings  */}
            <RatesDiv id={project?.id} />
          </div>

          {/* 🎯 Center Column (Project Details) */}
          <div className="lg:col-span-6 order-1 space-y-6">
            {/* 🧭 HEADER */}
            <div className={`${classMap.pageSection()} border border-gray-700 hover:border-[#00ffb3]/50 transition-all duration-300`}>
              <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
                <img
                  src={project.logo || "https://placehold.co/80x80"}
                  alt="Project Logo"
                  className="rounded-full w-20 h-20 object-cover border-2 border-[#00ffb3]/30 shadow-md hover:border-[#00ffb3] transitions duration-300"
                />
                <div className="flex-1">
                  <h2 className={`${classMap.cardTitle()} text-2xl font-bold`}>
                    {project.name}
                  </h2>
                  <h5 className="text-sm text-gray-400 mt-1">{project.short_pitch || ''}</h5>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.industry} · {project.stage} · {project.rating}
                    <FaStar className={classMap.inlineIcon()} />
                  </p>
                </div>
              </div>
            </div>

            {/* 📝 DESCRIPTION */}
            <div className={`${classMap.pageSection()} transition-all duration-300 hover:border-[#00ffb3]/40`}>
              <div className={classMap.sectionHeaderDiv()}>
                <h1 className={classMap.sectionHeader()}>Description</h1>
                <button
                  onClick={() => toggleView('description')}
                  className={classMap.tooltipBtn()}
                  title="Toggle description"
                >
                  {toggleIcon('description')}
                </button>
              </div>
              <div className={`${classMap.sectionInfo()} ${hideOrNot('description')}`}>
                <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* 🧍 FOUNDER */}
            <div className={`${classMap.pageSection()} hover:border-[#00ffb3]/40 transition`}>
              <div className={classMap.sectionHeaderDiv()}>
                <h1 className={classMap.sectionHeader()}>Founder</h1>
                <button
                  onClick={() => toggleView('founder')}
                  className={classMap.tooltipBtn()}
                  title="Toggle founder"
                >
                  {toggleIcon('founder')}
                </button>
              </div>
              {project?.founder ? (
                <div className={`flex items-center space-x-3 mt-3 ${hideOrNot('founder')}`}>
                  <img
                    src={project.founder.picture ? project.founder.picture : "https://placehold.co/50x50"}
                    alt={project.founder.name}
                    className="rounded-full w-12 h-12 border border-gray-600 hover:border-[#00ffb3] transition"
                  />
                  <div>
                    <p className="font-semibold">{project.founder.name}</p>
                    <p className="text-sm text-gray-400">{project.founder.description}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic mt-2">Founder info not available.</p>
              )}
            </div>

            {/* 🧾 PROBLEMS */}
            {/* 🛑 PROBLEMS */}
            <div className={`${classMap.pageSection()} hover:border-[#ff4d4f]/40`}>
              <div className={classMap.sectionHeaderDiv()}>
              <h1 className={`${classMap.sectionHeader()} text-red-500`}>
                Problem{project?.problems?.length > 1 ? 's' : ''}
              </h1>
              <button
                onClick={() => toggleView('problem')}
                className={classMap.tooltipBtn()}
                title="Toggle problem"
              >
                {toggleIcon('problem')}
              </button>
              </div>
              <div className={`${classMap.sectionInfo()} ${hideOrNot('problem')}`}>
              {project?.problems?.length > 0 ? (
                <ul className="space-y-4">
                {project.problems.map((item, i) => (
                  <li
                  key={item.id || i}
                  className={`${classMap.userCard()} flex items-start text-start gap-3 bg-red-900/2 rounded-md p-3 shadow`}
                  >
                  <span className="text-2xl text-red-400 mt-1">!</span>
                  <div>
                    <span className="block text-sm text-gray-200">{item.problem}</span>
                  </div>
                  </li>
                ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No problems listed.</p>
              )}
              </div>
            </div>

            {/* 💡 SOLUTIONS */}
            <div className={`${classMap.pageSection()} hover:border-[#00ffb3]/40`}>
              <div className={classMap.sectionHeaderDiv()}>
              <h1 className={classMap.sectionHeader()}>
                Solution{project?.solutions?.length > 1 ? 's' : ''}
              </h1>
              <button
                onClick={() => toggleView('solution')}
                className={classMap.tooltipBtn()}
                title="Toggle solution"
              >
                {toggleIcon('solution')}
              </button>
              </div>
              <div className={`${classMap.sectionInfo()} ${hideOrNot('solution')}`}>
              {project?.solutions?.length > 0 ? (
                <ul className="space-y-4">
                {project.solutions.map((item, i) => (
                  <li
                  key={item.id || i}
                  className={`${classMap.userCard()} flex items-start gap-3 bg-[#1a2a1a] p-3 shadow`}
                  >
                  <span className="text-2xl mt-1 text-green-400">✔</span>
                  <div>
                    <span className="block text-sm text-gray-200">{item.solution}</span>
                  </div>
                  </li>
                ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No solutions provided yet.</p>
              )}
              </div>
            </div>

            {/* 👥 TEAM */}
            <div className={`${classMap.pageSection()} hover:border-[#00ffb3]/40`}>
              <div className={classMap.sectionHeaderDiv()}>
                <h1 className={classMap.sectionHeader()}>Team</h1>
                <button
                  onClick={() => toggleView('team')}
                  className={classMap.tooltipBtn()}
                  title="Toggle team"
                >
                  {toggleIcon('team')}
                </button>
              </div>
              <div className={`${classMap.sectionInfo()} ${hideOrNot('team')}`}>
                <p className={`${classMap.info()}`}>
                  {project.team_overview || 'Team overview not added.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {project?.team?.length > 0 ? (
                    project.team.map((member, key) => (
                      <div
                        key={key}
                        className="flex items-center space-x-3 bg-[#222] border border-gray-700 rounded-md p-2 hover:border-[#00ffb3]/50 transition"
                      >
                        <img
                          src={member.picture ? member.picture : "https://placehold.co/40x40"}
                          alt={member.name}
                          className="rounded-full w-10 h-10"
                        />
                        <div>
                          <p className="font-semibold">
                            {member.name}{" "}
                            <span className="text-sm text-gray-500">| {member.role}</span>
                          </p>
                          <p className="text-sm text-gray-400">{member.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No team members listed yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* 📝 SUMMARY */}
            <div className={`${classMap.pageSection()} hover:border-[#00ffb3]/40`}>
              <div className={classMap.sectionHeaderDiv()}>
                <h1 className={classMap.sectionHeader()}>Summary</h1>
                <button
                  onClick={() => toggleView('summary')}
                  className={classMap.tooltipBtn()}
                  title="Toggle summary"
                >
                  {toggleIcon('summary')}
                </button>
              </div>
              <div className={`${classMap.sectionInfo()} ${hideOrNot('summary')}`}>
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
                  <div className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}>
                    <h1 className={`${classMap.cardTitle}`}>Target Market:</h1>
                    <span>{project.target_market || 'N/A'}</span>
                  </div>
                  <div className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}>
                    <h1 className={`${classMap.cardTitle}`}>Business Model:</h1>
                    <span>{project.business_model || 'N/A'}</span>
                  </div>
                  <div className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}>
                    <h1 className={`${classMap.cardTitle}`}>Financial Summary:</h1>
                    <span>{project.financials_summary || 'N/A'}</span>
                  </div>
                  <div className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}>
                    <h1 className={`${classMap.cardTitle}`}>Tech Stack:</h1>
                    <span>{project.tech_stack || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
        </div>


          {/* 🤝 Right Column (Similar Projects) */}
          <div className="lg:col-span-3 order-3 lg:order-3 space-y-4">
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow">
              <h1 className={`${classMap.sectionHeader()}`}>Similar Projects</h1>
              {project.similar.length > 0 ? (
                project.similar.map((item, index) => {
                  return(
                    <ProjectCard
                    key={item.id}
                    {...item}
                    userId={user?.id}
                    authUserId={item?.user_id}
                    more={item?.id}
                    />
                  )
                })
              ) : (
                emptyResult('No Similar Project Found')
              )}
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default ProjectDetail;