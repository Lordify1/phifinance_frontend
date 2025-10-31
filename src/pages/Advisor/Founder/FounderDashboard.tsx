import React, { useState, useCallback, useEffect } from "react";
import { Head } from "@inertiajs/react";
import {
  cardClass,
  headingClass,
  sectionClass,
  linkClass,
  buttonClass,
  classMap,
  GetIndexData,
  getData,
  LoadingDiv,
  emptyData
} from "@/components/Tools/Misc"
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import Offcanvas from "@/components/Ui/Offcanvas";
import {ProjectForm, ProjectFormDeck, ProjectFormManual} from "@/components/Advisor/Founder/ProjectForm";
import { FaChartLine, FaComment, FaEyeDropper, FaFile, FaPen, FaPenAlt, FaRegEye, FaThumbsUp, FaUpload, FaMagic, FaStar } from "react-icons/fa";
import { colorMap, inputClass } from "@/components/Tools/Misc";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import SendRequest from "@/components/Tools/SendRequest";
import ProjectCard from '@/components/Ui/Advisor/ProjectCard';
import { founderSidebar } from "@/data/founderSidebarData";
import { title } from "process";
import { advisorUrl } from "@/app";
// import * as Icon from 'react-icons'

const FounderDashboard = ({user, project, suggestions}) => {
  const [showForm, setShowForm] = useState(false);
  const [hasPitchDeck, setHasPitchDeck] = useState(user.pitch_deck || null);
  const [processingDeck, setIsProcessingDeck] = useState(false)
  const [useFile, setUseFile] = useState((localStorage.getItem('updateMethod') && localStorage.getItem('updateMethod')  === 'true' ? true : false ) || false)
  const [method, setMethod] = useState(localStorage.getItem('method') ? localStorage.getItem('method') : null)
  const [stages, setStages] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  let suggestionList = [];

  console.log(suggestions)

  try{
    suggestionList = suggestions ? JSON.parse(suggestions) : {};
  }catch(e){
    console.log(e)
  }

  console.log(project)

  const founderData = {
    name: "Lordify",
    pitchDeckStatus: "Uploaded",
    feedbackCount: 4,
    suggestions: [
      "Clarify your monetization strategy",
      "Add Go-To-Market slide",
      "Include growth KPIs",
    ],
    deckLink: "/storage/pitch-decks/lordify-deck.pdf"
  };

  const dashboardTopSections = [
    {
      title: "Views",
      id: 'views',
      desc: '',
      icon: <FaRegEye className="text-6xl text-[var(--secondary)]"/>,
      value: project?.views_count
    },
    {
      title: "Comments",
      id: 'comments',
      desc: '',
      icon: <FaComment className="text-6xl text-[var(--secondary)]"/>,
      value: project?.comments_count
    },
    {
      title: "Likes",
      id: 'likes',
      desc: '',
      icon: <FaThumbsUp className="text-6xl text-[var(--secondary)]"/>,
      value: project?.likes_count
    },
    {
      title: "Rating",
      id: 'rating',
      desc: '',
      icon: <FaStar className="text-6xl text-[var(--secondary)]"/>,
      value: project?.rating
    },
  ]

  const methods = [
    {
      title: "Pitch Deck Upload",
      desc: "Upload your pitch deck and allow Phi AI ananlyze, extract and generate suggestions for improvements for you",
      type: 'file',
      icon: <FaUpload/>
    },
    {
      title: "Manual Form Filling",
      desc: "Manually fill in a form with your Project info and have Phi AI analyze and generate suggestions from it",
      type: 'form',
      icon: <FaPen/>
    }
  ]

  useEffect(() => {
    getData(`/project/stages`, '', 'get')
    .then((res) => {console.log(res), setStages(res.data)})
    .catch((err) => console.log(err))

    project.length !== 0 && setIsLoading(false);
  },[project])


  return (
    <>
      <Head title="Founder Dashboard" />
      {isLoading ? (
        <DashboardLayout sidebarDataType="founder" sidebarData={founderSidebar}>
          <LoadingDiv 
          type="founder"
          layout={[[1,1,1,1],[8,2]]}
          height="h-40"
          />
        </DashboardLayout>
      ) : (
      <DashboardLayout sidebarDataType="founder" sidebarData={founderSidebar}>
        
        <div className="grid lg:grid-cols-2 justify-between w-full">
          <h1 className="lg:text-3xl text-2xl font-bold mb-1">Founder {user?.username || user?.name} 👋</h1>
          {project?.length === 0 && (!processingDeck && method !== null) && 
          <button
          onClick={() => {localStorage.removeItem('method'), setMethod(null)}}
          className="text-bold text-red-400 text-end">X</button>}
        </div>
        {(project?.length === 0 && method === null) &&
          <div className="grid grid-cols-2 gap-5"> 
          {methods.map((item, index) => {
            return(
                <div
                onClick={() => {
                  setMethod(item.type),
                  localStorage.setItem('method', item.type)
                }}
                className={`${classMap.hoverAnimate()} ${classMap.card} flex flex-col items-center justify-center text-center`}>
                <p>{item.icon}</p>
                <p>{item.title}</p>
                <span>{item.desc}</span>
                </div>
            )
          })}
          </div>
        }

        {(project?.length === 0 && method !== null) && (
          method === 'file' ? (
            <div className={`grid grid-cols-1 md:grid-cols-1 gap-3`}>
              <ProjectFormDeck/>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-1 gap-3`}>
              <h1>Create Project</h1>
              <ProjectFormManual
              isUpdate={false}
              project={project}
              />
            </div>
          )
        )}
        {project?.length !== 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-4`}>
          {dashboardTopSections.map(({title, id, desc, icon, value}) => {
              return(
                <div className={`${classMap.userCard()}, overflow-hidden, ${classMap.hoverAnimate()}`}>
                  <div className="flex flex-row items-center justify-between w-full">
                    <h2 className={headingClass}>{title}</h2>
                    <p className="text-3xl text-gray-500 mb-2">
                      {value}
                    </p>
                  </div>
                  <div className={`flex items-end w-full justify-end ${classMap.hoverImg()}`}>
                    <span className="text-5xl">{icon}</span>
                  </div>
                </div>
              )
          })}

          <div className={`${classMap.userCard('3')}  ${classMap.hoverAnimate()}`}>
            <div className="">
              {project ? (
                <>
                <div className="flex items-center justify-between">
                <h2 className={headingClass}>Project Info</h2>
                {useFile ? (
                  <FaUpload onClick={(prev) => {
                    setUseFile(!prev);
                    localStorage.setItem('updateMethod', 'false')
                  }}/>
                ) : (
                  <FaPen onClick={() => {
                    setUseFile(true);
                    localStorage.setItem('updateMethod', 'true')
                  }}/>
                )}
              </div>
                <div className="grid md:grid-cols-2 items-center justify-center min:h-[75vh] overflow-y-scroll">
                <div className="flex items-center justify-center">
                  <ProjectCard
                  {...project}
                  isDB={true}
                  className={'w-60'}
                  authUserId={user.id}
                  userId={user.id}
                  more={project.id}
                  />
                </div>
                <div className="p-2">
                  {useFile ? (
                    <ProjectFormDeck isUpdate={true}/>
                  ) : (
                    <ProjectFormManual
                    isUpdate={true}
                    project={project}
                    />
                  )}
                </div>
                </div>
                </>
              ) : (
                  <div className="flex flex-col w-full h-[70vh] items-center justify-center">
                    <FaFile className={`${colorMap.text_primary}, text-6xl mb-2`}/>
                    <p>Pitch Deck Uploaded</p>
                    <div className="flex flex-row">
                      <SendRequest
                      url="/advisor/project/ai/progress_deck"
                      text="Process"
                      method="post"
                      onResponse={(res: any) => {}}
                      direction="left"
                      />
                      <SendRequest
                      url="/advisor/project/ai/delete_deck"
                      text="Upload New"
                      method="delete"
                      onResponse={() => setHasPitchDeck(null)}
                      direction="right"
                      />
                    </div>
                  </div>
              )}
            </div>
          </div>
          <div className={`${classMap.userCard('1')} ${classMap.hoverAnimate()}`}>
            <h2 className={`${headingClass} mb-2`}>AI Suggestions <FaMagic className="inline"/></h2>
            <div className="text-left h-[75vh] overflow-y-scroll">
              <ul className="text-gray-300 text-left">
                {project && (
                  suggestionList.length > 0 ? (suggestionList.map((item, index) => {
                  return(
                    <>
                    <li className={`${classMap.userCard()} ${classMap.hoverAnimate()} text-left`} key={index}>
                      <FaMagic className={`inline ${classMap.animPulse()} ${colorMap.text_primary}`}/>
                      <span> {"  "} {item}</span>
                    </li>
                    </>
                  )
                })) : (
                  emptyData('AI Suggestions will appear here')
                ))}
              </ul>
            </div>
          </div>
          </div>
        ) : (
          <></>
        )}
      </DashboardLayout>
      )}
      {/* <Offcanvas
      isOpen={showForm}
      onClose={() => setShowForm(false)}
      title={`My Project Info`}
      >
        <ProjectForm/>
      </Offcanvas> */}
    </>
  );
};

export default FounderDashboard;