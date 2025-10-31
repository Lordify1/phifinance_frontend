"use client";
import { classMap, colorMap, ImageUploadDiv, Loading, toJson } from "@/components/Tools/Misc";
import { useCallback, useEffect, useState } from "react";
import { FaFile, FaUpload, FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import SendRequest from "@/components/Tools/SendRequest";
import axios from "axios";
import { advisorUrl, appUrl } from "@/app";


// export function ProjectFormDeck({ isUpdate = false }) {
//   const [formData, setFormData] = useState<{ pitch_deck: File[] }>({ pitch_deck: [] });
//   const [jobId, setJobId] = useState<string | null>(null);
//   const [progress, setProgress] = useState<number>(0);
//   const [status, setStatus] = useState<string>("idle");
//   const [message, setMessage] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [retryCount, setRetryCount] = useState(0);

//   // File Drop Handler
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       setFormData((prev) => ({ ...prev, pitch_deck: acceptedFiles }));
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   // SSE Connection for Live Updates
//   useEffect(() => {
//     if (!jobId) return;

//     let eventSource: EventSource;
//     const connectSSE = () => {
//       eventSource = new EventSource(`${advisorUrl}/project/ai/stream/${jobId}`);

//       eventSource.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           setStatus(data.status);
//           setProgress(data.progress);
//           setMessage(data.message || "");
//           setSuggestions(data.suggestions || []);

//           if (data.status === "done") {
//             setTimeout(() => {
//               window.location.reload(); // ✅ Auto refresh when done
//             }, 3000);
//           }

//           if (data.status === "error") {
//             if (retryCount < 1) {
//               setRetryCount((prev) => prev + 1);
//               eventSource.close();
//               setTimeout(connectSSE, 2000); // retry after 2s
//             } else {
//               console.error("SSE failed after retry");
//             }
//           }
//         } catch (err) {
//           console.error("Error parsing SSE message:", err);
//         }
//       };

//       eventSource.onerror = (err) => {
//         console.error("SSE connection error:", err);
//         eventSource.close();
//         if (retryCount < 1) {
//           setRetryCount((prev) => prev + 1);
//           setTimeout(connectSSE, 2000);
//         }
//       };
//     };

//     connectSSE();
//     return () => {
//       if (eventSource) eventSource.close();
//     };
//   }, [jobId, retryCount]);

//   const statusIcon = () => {
//     if (status === "done")
//       return <FaCheckCircle className="text-green-400 text-3xl animate-bounce" />;
//     if (status === "error")
//       return <FaExclamationCircle className="text-red-400 text-3xl animate-pulse" />;
//     if (status === "queued" || status === "processing")
//       return <FaSpinner className="text-blue-400 text-3xl animate-spin" />;
//     return <FaUpload className="text-3xl text-gray-400" />;
//   };

//   return (
//     <div
//       {...(!jobId ? getRootProps() : {})}
//       className={`text-white border-2 border-dashed 
//         ${isDragActive ? "border-blue-400" : "border-gray-500"} 
//         p-8 rounded-2xl text-center cursor-pointer min:h-[20vh] mt-5 w-full shadow-lg transition`}
//     >
//       {formData.pitch_deck.length === 0 && !jobId && (
//         <input {...getInputProps()} accept=".pdf, .ppt, .pptx" />
//       )}
//       <div className="flex flex-col items-center justify-center w-full h-full">
//         {!jobId ? (
//           formData.pitch_deck.length > 0 ? (
//             <>
//               <FaFile className="text-blue-400 text-6xl mb-2" />
//               <h3 className="mt-1 font-semibold text-lg">{formData.pitch_deck[0].name}</h3>
//               <div className="flex flex-row mt-4 gap-3">
//                 <button
//                   onClick={async () => {
//                     const form = new FormData();
//                     form.append("pitch_deck", formData.pitch_deck[0]);
//                     const res = await axios.post(`${advisorUrl}/project/ai/upload_deck`, form);
//                     console.log(res)
//                     if (res?.data?.job_id) {
//                       console.log(res)
//                       setJobId(res.data.job_id);
//                       setStatus("queued");
//                     }
//                   }}
//                   className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold transition"
//                 >
//                   Process
//                 </button>
//                 <button
//                   onClick={() => setFormData({ pitch_deck: [] })}
//                   className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <FaUpload className="text-6xl text-gray-400 animate-bounce" />
//               {isDragActive ? (
//                 <h6 className="text-blue-400 font-bold mt-2 text-lg">Drop it here 🚀</h6>
//               ) : isUpdate ? (
//                 <p className="mt-2 text-gray-300">Upload your Pitch Deck to Update</p>
//               ) : (
//                 <p className="mt-2 text-gray-300">Upload your Pitch Deck to Get Started</p>
//               )}
//             </>
//           )
//         ) : (
//           <div className="w-full flex flex-col items-center">
//             {statusIcon()}
//             <h6 className="mt-2 font-semibold">{message}</h6>

//             <div className="w-2/3 bg-gray-700 rounded-full h-3 mt-3 overflow-hidden">
//               <div
//                 className="bg-blue-500 h-3 transition-all ease-out"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//             <p className="text-sm text-gray-300 mt-1">{progress}% complete</p>

//             {status === "done" && (
//               <div className="mt-6 text-left w-full max-w-xl bg-gray-800 p-4 rounded-xl shadow-md">
//                 <h4 className="font-bold text-green-400 mb-3">AI Suggestions:</h4>
//                 <ul className="list-disc pl-6 space-y-2 text-gray-200">
//                   {suggestions.map((s, i) => (
//                     <li key={i} className="hover:text-white transition">
//                       {s}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export function ProjectFormDeck({ isUpdate = false }) {
  const [formData, setFormData] = useState<{ pitch_deck: File[] }>({ pitch_deck: [] });
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("idle");
  const [message, setMessage] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData({ pitch_deck: acceptedFiles });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // 🔁 Poll backend for job status
  useEffect(() => {
    if (!jobId) return;
    let interval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await axios.get(`${advisorUrl}/project/ai/status/${jobId}`);
        const data = res.data;

        setStatus(data.status);
        setProgress(data.progress);
        setMessage(data.message || "");

        if (data.suggestions) setSuggestions(data.suggestions);

        if (data.status === "done") {
          clearInterval(interval);
          setTimeout(() => window.location.reload(), 3000);
        }

        if (data.status === "error") {
          clearInterval(interval);
          console.error("Job failed ❌");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    interval = setInterval(checkStatus, 4000);
    checkStatus();

    return () => clearInterval(interval);
  }, [jobId]);

  const statusIcon = () => {
    if (status === "done")
      return <FaCheckCircle className="text-green-400 text-3xl animate-bounce" />;
    if (status === "error")
      return <FaExclamationCircle className="text-red-400 text-3xl animate-pulse" />;
    if (status === "queued" || status === "processing")
      return <FaSpinner className="text-blue-400 text-3xl animate-spin" />;
    return <FaUpload className="text-3xl text-gray-400" />;
  };

  return (
    <div
      {...(!jobId ? getRootProps() : {})}
      className={`text-white border-2 border-dashed 
        ${isDragActive ? "border-blue-400" : "border-gray-500"} 
        p-8 rounded-2xl text-center cursor-pointer min-h-[20vh] mt-5 w-full shadow-lg transition`}
    >
      {formData.pitch_deck.length === 0 && !jobId && (
        <input {...getInputProps()} accept=".pdf, .ppt, .pptx" />
      )}

      <div className="flex flex-col items-center justify-center w-full h-full">
        {!jobId ? (
          formData.pitch_deck.length > 0 ? (
            <>
              <FaFile className="text-blue-400 text-6xl mb-2" />
              <h3 className="mt-1 font-semibold text-lg">{formData.pitch_deck[0].name}</h3>
              <div className="flex flex-row mt-4 gap-3">
                <button
                  onClick={async () => {
                    const form = new FormData();
                    form.append("pitch_deck", formData.pitch_deck[0]);

                    try {
                      const res = await axios.post(`${advisorUrl}/project/ai/upload_deck`, form);
                      if (res?.data?.data?.job_id) {
                        setJobId(res.data.data.job_id);
                        setStatus("queued");
                        setMessage("Upload successful ✅ — Hang tight while we process your deck!");
                      } else {
                        setMessage("Upload failed 😔");
                      }
                    } catch (err) {
                      console.error(err);
                      setMessage("Upload error 😭");
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold transition"
                >
                  Process
                </button>
                <button
                  onClick={() => setFormData({ pitch_deck: [] })}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <FaUpload className="text-6xl text-gray-400 animate-bounce" />
              {isDragActive ? (
                <h6 className="text-blue-400 font-bold mt-2 text-lg">Drop it here 🚀</h6>
              ) : isUpdate ? (
                <p className="mt-2 text-gray-300">Upload your Pitch Deck to Update</p>
              ) : (
                <p className="mt-2 text-gray-300">Upload your Pitch Deck to Get Started</p>
              )}
            </>
          )
        ) : (
          <div className="w-full flex flex-col items-center">
            {statusIcon()}
            <h6 className="mt-2 font-semibold">{message}</h6>

            <div className="w-2/3 bg-gray-700 rounded-full h-3 mt-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 transition-all ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-300 mt-1">{progress}% complete</p>

            {status === "done" && suggestions.length > 0 && (
              <div className="mt-6 text-left w-full max-w-xl bg-gray-800 p-4 rounded-xl shadow-md">
                <h4 className="font-bold text-green-400 mb-3">AI Suggestions:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-200">
                  {suggestions.map((s, i) => (
                    <li key={i} className="hover:text-white transition">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectForm({project}){


    const formFields = [
        {
            key: "name",
            label: "Project Name",
            type: "text",
            isInput: true,
        },
        {
            key: "founder",
            label: "Founder",
            type: "array", // multi-input field
            isInput: false,
            inputs: [
              {
                key: "name",
                label: "Name",
                type: "text",
                isInput: true,
              },
              {
                key: "position",
                label: "Position",
                type: "text",
                isInput: true,
              },
              {
                key: "description",
                label: "Description",
                type: "textarea",
                isInput: true,
              },
            ]
        },
        {
            key: "problem",
            label: "Problem",
            type: "array", // could have multiple problem points
            isInput: true,
            list: true
        },
        {
            key: "solution",
            label: "Solution",
            type: "array", // multiple solutions possible
            isInput: true,
            list: true
        },
        {
            key: "team_members",
            label: "Team Members",
            type: "arrayOfArray",
            isInput: true,
            arrayOfArray: true,
            inputs: [
              {
                key: "name",
                label: "Name",
                type: "text",
                isInput: true,
              },
              {
                key: "position",
                label: "Position",
                type: "text",
                isInput: true,
              },
              {
                key: "description",
                label: "Description",
                type: "textarea",
                isInput: true,
              },
            ]
        },
        {
            key: "short_pitch",
            label: "Short Pitch",
            type: "textarea", // longer text field
            isInput: true,
        },
        {
            key: "business_model",
            label: "Business Model",
            type: "textarea",
            isInput: true,
        },
        {
            key: "financials_summary",
            label: "Financials Summary",
            type: "textarea",
            isInput: true,
        },
        {
            key: "industry",
            label: "Industry",
            type: "text",
            isInput: true,
        },
        {
            key: "stage",
            label: "Stage",
            type: "select", // dropdown
            options: ["Idea", "MVP", "Early Traction", "Scaling", "Established"],
            isInput: true,
        },
        {
            key: "launch_date",
            label: "Launch Date",
            type: "date",
            isInput: true,
        },
        {
            key: "target_market",
            label: "Target Market",
            type: "textarea",
            isInput: true,
        },
        {
            key: "team_overview",
            label: "Team Overview",
            type: "textarea",
            isInput: true,
        },
        {
            key: "tech_stack",
            label: "Tech Stack",
            type: "text",
            isInput: true,
        },
        {
            key: "traction",
            label: "Traction",
            type: "textarea",
            isInput: true,
        },
        {
            key: "logo",
            label: "Logo",
            type: "file",
            accept: "image/*",
            isInput: true,
        },
    ];

    const team = toJson(project?.team_members)
    const founder = toJson(project?.founder);
    const problem = toJson(project?.problem);
    const solution = toJson(project?.solution);

    const returnData = (field, key) => {
      switch(field){
        case 'founder':
          return founder?.[key];
          break;
        case 'problem':
          return problem;
          break;
        case 'solution':
          return solution;
          break;
        case 'team_members':
          return team;
          break;
          default:
            break
      }
    }
    
    return(
        <div className="p-4 h-[70vh] overflow-x-scroll">
            <form action="">
                {formFields.map((field) => (
                    <div key={field.key} className="mb-4">
                        <label className="block text-sm text-gray-300 mb-1">
                        {field.label}
                        </label>

                        {field.type === "text" && (
                        <input
                            type="text"
                            name={field.key}
                            className={`${classMap.input()}`}
                            value={project?.[field.key]}
                        />
                        )}

                        {field.type === "array" && (
                        <div className="bg-gray-800 p-2">
                            <>
                            {/* Example handling: multiple inputs */}
                            {field?.inputs?.map((item, key) => {
                                const DKey = field.key
                                return(
                                  <>
                                  <label className={`${classMap.label}`}>{item.label}</label>
                                  {item.type === 'text' ? (
                                    <input
                                    type="text"
                                    name={item.key}
                                    className={`${classMap.input()}`}
                                    value={returnData(DKey, item.key)}
                                    />
                                  ) : (
                                    <textarea
                                        name={item.key}
                                        rows={3}
                                        className={`${classMap.input()}`}
                                        value={returnData(DKey, item.key)}
                                    />            
                                  )}
                                  </>
                                )
                            })}
                            {/* Later: add “+ Add More” button for dynamic items */}
                            {field.list && (
                              field.key === 'solution' && (
                                Object.entries(solution).map(([item, key], index) => {
                                  return(
                                    <input
                                    type="text"
                                    name={'index'}
                                    className={`${classMap.input()}`}
                                    value={key}
                                    />
                                  )
                                })
                              )
                            )}

                            {field.list && (
                              field.key === 'problem' && (
                                Object.entries(problem).map(([item, key], index) => {
                                  return(
                                    <input
                                    type="text"
                                    name={'index'}
                                    className={`${classMap.input()}`}
                                    value={key}
                                    />
                                  )
                                })
                              )
                            )}
                            </>
                        </div>
                        )}

                        {field?.arrayOfArray === true && (
                          <div className="bg-gray-900 p-2 rounded-sm">
                            {Object.entries(team).map(([mainInfo, mainkey], mainIndex) => {
                              return(
                                field?.inputs?.map((item, key) => {
                                    const DKey = field.key
                                    return(
                                      <>
                                      <label className={`${classMap.label}`}>{item.label}</label>
                                      {item.type === 'text' ? (
                                        <input
                                        type="text"
                                        name={item.key}
                                        className={`${classMap.input()}`}
                                        value={mainkey?.[item.key]}
                                        />
                                      ) : (
                                        <textarea
                                            name={item.key}
                                            rows={3}
                                            className={`${classMap.input()}`}
                                            value={mainkey?.[item.key]}
                                        />            
                                      )}
                                      </>
                                    )
                                }) 
                              )
                            })}
                          </div>
                        )}

                        {field.type === "textarea" && (
                        <textarea
                            name={field.key}
                            rows={5}
                            className={`${classMap.input()}`}
                            value={project?.[field.key]}
                        />
                        )}

                        {field.type === "date" && (
                        <input
                            type="date"
                            name={field.key}
                            className={`${classMap.input()}`}
                            value={project?.launch_date}
                        />
                        )}

                        {field.type === "select" && (
                        <select
                            name={field.key}
                            className={`${classMap.input()}`}
                        >
                            {field.options?.map((option) => (
                            <option key={option} value={option} selected={project?.stage === option && true}>
                                {option}
                            </option>
                            ))}
                        </select>
                        )}

                        {field.type === "file" && (
                        <input
                            type="file"
                            name={field.key}
                            accept={field.accept}
                            className={`${classMap.input()}`}
                        />
                        )}
                    </div>
                ))}
            </form>
        </div>
    )
}



export const ProjectFormManual = ({ isUpdate = false, project}: { isUpdate?: boolean, project: any }) => {
  // Initialize formData with project data

  // console.log(stages

  const stages = [
    {label: "Idea", key: "Idea"},
    {label: "Pre-seed", key: "Pre-seed"},
    {label: "Seed", key: "Seed"},
    {label: "Early Stage", key: "Early"},
    {label: "Growth", key: "Growth"},
    {label: "Expansion", key: "Expansion"},
    {label: "Mature", key: "Mature"},
    {label: "Exit", key: "Exit"},
  ]

  const [formData, setFormData] = useState<any>({
    name: "",
    founder: { name: "", description: "", picture: null },
    industry: "",
    short_pitch: "",
    description: "",
    logo: null,
    problem: [""],
    solution: [""],
    target_market: "",
    business_model: "",
    traction: "",
    team_overview: "",
    team_members: [{}],
    financials_summary: "",
    tech_stack: "",
    stage: "",
    launch_date: "",
  });

  // Populate formData when project is passed
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        founder: project.founder || { name: "", description: "", picture: null },
        industry: project.industry || "",
        short_pitch: project.short_pitch || "",
        description: project.description || "",
        logo: project.logo || null,
        problem: project.problems?.length ? project.problems.map((p: any) => p.problem) : [""],
        solution: project.solutions?.length ? project.solutions.map((s: any) => s.solution) : [""],
        target_market: project.target_market || "",
        business_model: project.business_model || "",
        traction: project.traction || "",
        team_overview: project.team_overview || "",
        team_members: project.team?.length ? project.team.map((m: any) => ({
          name: m.name || "",
          role: m.role || "",
          description: m.description || "",
          picture: m.picture || null
        })) : [{}],
        financials_summary: project.financials_summary || "",
        tech_stack: project.tech_stack || "",
        stage: project.stage || "",
        launch_date: project.launch_date || "",
      });
    }
  }, [project]);

  // Max limits
  const LIMITS: Record<string, number> = {
    problem: 5,
    solution: 5,
    team_members: 10,
  };

  // ✅ Add new entry with limit check
  const addFieldEntry = (key: string, template: any = "") => {
    setFormData((prev: any) => {
      const current = prev[key] || [];
      if (LIMITS[key] && current.length >= LIMITS[key]) {
        alert(`You can only add up to ${LIMITS[key]} ${key} entries.`);
        return prev;
      }
      return {
        ...prev,
        [key]: [...current, template],
      };
    });
  };

  // 🗑 Remove entry by index
  const removeFieldEntry = (key: string, index: number) => {
    setFormData((prev: any) => {
      const updated = [...(prev[key] || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        [key]: updated.length ? updated : [""], // keep at least one
      };
    });
  };

  // ✍️ Handle changes
  const handleChange = (key: string, value: any, index?: number, subKey?: string) => {
    setFormData((prev: any) => {
      let updated = { ...prev };

      if (index !== undefined && subKey) {
        // For nested array fields like team_members
        if (!updated[key]) updated[key] = [];
        if (!updated[key][index]) updated[key][index] = {};
        updated[key][index][subKey] = value;
      } else if (index !== undefined) {
        const arr = updated[key] ? [...updated[key]] : [];
        arr[index] = value;
        updated[key] = arr;
      } else {
        updated[key] = value;
      }

      return updated;
    });
  };

  // 📁 Handle file uploads
  const handleFileChange = (key: string, file: File, index?: number, subKey?: string) => {
    handleChange(key, file, index, subKey);
  };

  const fields = [
    { key: "name", label: "Name", type: "text", order: 1 },
    {
      key: "founder",
      label: "Founder",
      type: "array",
      array: [
        { key: "name", label: "Name", type: "text" },
        { key: "description", label: "Description", type: "long_text" },
        { key: "picture", label: "Picture", type: "file" },
      ],
      order: 2,
    },
    { key: "industry", label: "Industry", type: "text", order: 3 },
    { key: "short_pitch", label: "Short Pitch", type: "text", order: 4 },
    { key: "description", label: "Description", type: "long_text", order: 5 },
    { key: "logo", label: "Logo", type: "file", order: 6 },
    { key: "problem", label: "Problem", type: "text", multiple: true, order: 7 },
    { key: "solution", label: "Solution", type: "text", multiple: true, order: 8 },
    { key: "target_market", label: "Target Market", type: "long_text", order: 9 },
    { key: "business_model", label: "Business Model", type: "long_text", order: 10 },
    { key: "traction", label: "Traction", type: "long_text", order: 11 },
    { key: "team_overview", label: "Team Overview", type: "long_text", order: 12 },
    {
      key: "team_members",
      label: "Team Members",
      type: "arrayOfArray",
      array: [
        { key: "name", label: "Name", type: "text" },
        { key: "role", label: "Role", type: "text" },
        { key: "description", label: "Description", type: "long_text" },
        // { key: "picture", label: "Picture", type: "file" },
      ],
      multiple: true,
      order: 13,
    },
    { key: "financials_summary", label: "Financial Summary", type: "long_text", order: 14 },
    { key: "tech_stack", label: "Tech Stack", type: "long_text", order: 15 },
    { key: "stage", label: "Stage", type: "checkbox", order: 16 },
    { key: "launch_date", label: "Launch Date", type: "date", order: 17 },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
  }, [project])

  console.log(formData)

  return (
    <>
    {(isLoading && isUpdate) ? (
      <Loading/>
    ):(
      <>
      <div className={`${isUpdate ? "p-2 mt-5 h-[60vh] overflow-x-scroll" : ""}`}>
        <form className="grid gap-4 text-start">
          {fields.map((field) => (
            <div key={field.key}>
              {/* TEXT (with multiple support) */}
              {field.type === "text" && (
                <div>
                  <div className="flex justify-between items-center ">
                    <label className={classMap.label()}>{field.label}</label>
                    {field.multiple && (
                      <button
                        type="button"
                        className={classMap.button()}
                        onClick={() => addFieldEntry(field.key, "")}
                      >
                        Add
                      </button>
                    )}
                  </div>

                  {field.multiple
                    ? (formData[field.key] || []).map((val: any, index: number) => (
                        <div key={`${field.key}-${index}`} className="flex items-center gap-2 mb-2 ">
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => handleChange(field.key, e.target.value, index)}
                            className={classMap.input()}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              className="text-red-500 text-sm"
                              onClick={() => removeFieldEntry(field.key, index)}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))
                    : (
                        <input
                          type="text"
                          value={formData[field.key] || ""}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className={classMap.input()}
                        />
                      )}
                </div>
              )}

              {/* FOUNDER (Single array object) */}
              {field.type === "array" && !field.multiple && (
                <div>
                  <label className={classMap.label()}>{field.label}</label>
                  <div className="p-2 bg-gray-100/2 rounded my-2">
                    {field.array?.map((item, subIndex) => (
                      <div key={subIndex}>
                        <label className={classMap.label()}>{item.label}</label>
                        {item.type === "text" && (
                          <input
                            type="text"
                            value={formData.founder?.[item.key] || ""}
                            onChange={(e) =>
                              handleChange("founder", { ...formData.founder, [item.key]: e.target.value })
                            }
                            className={classMap.input()}
                          />
                        )}
                        {item.type === "long_text" && (
                          <textarea
                            value={formData.founder?.[item.key] || ""}
                            onChange={(e) =>
                              handleChange("founder", { ...formData.founder, [item.key]: e.target.value })
                            }
                            className={classMap.input()}
                          />
                        )}
                        {item.type === "file" && (
                          <ImageUploadDiv
                          value={formData.founder[item.key] || ""}
                          onChange={(e) => handleChange('founder', {...formData.founder, [item.key]: e})}
                          uploadUrl={`${appUrl}/upload-file`}
                          deleteUrl={`${appUrl}/delete-file`}
                          path="/files/projects/founder/"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TEAM MEMBERS */}
              {field.type === "arrayOfArray" && (
                <div>
                  <div className="flex justify-between items-center">
                    <label className={classMap.label()}>{field.label}</label>
                    <button
                      type="button"
                      className={classMap.button()}
                      onClick={() => addFieldEntry(field.key, {})}
                    >
                      Add
                    </button>
                  </div>

                  {(formData[field.key] || []).map((member: any, index: number) => (
                    <div key={`${field.key}-${index}`} className="p-2 bg-gray-100/2 rounded my-2">
                      {field.array?.map((item, subIndex) => (
                        <div key={subIndex}>
                          <label className={classMap.label()}>{item.label}</label>
                          {item.type === "text" && (
                            <input
                              type="text"
                              value={member[item.key] || ""}
                              onChange={(e) => handleChange(field.key, e.target.value, index, item.key)}
                              className={classMap.input()}
                            />
                          )}
                          {item.type === "long_text" && (
                            <textarea
                              value={member[item.key] || ""}
                              onChange={(e) => handleChange(field.key, e.target.value, index, item.key)}
                              className={classMap.input()}
                            />
                          )}
                          {/* {item.type === "file" && (
                            <ImageUploadDiv
                              value={member[item.key] || null}
                              onChange={(e) => handleChange(item.key, e)}
                              label={item.label}
                              uploadUrl={`${appUrl}/upload-file`}
                              deleteUrl={`${appUrl}/delete-file`}
                              path={`/files/projects/team/${item.key}/`}
                            />
                          )} */}
                        </div>
                      ))}

                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeFieldEntry(field.key, index)}
                          className="text-red-500 text-sm mt-2"
                        >
                          ✕ Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* LONG TEXT */}
              {field.type === "long_text" && (
                <div>
                  <label className={classMap.label()}>{field.label}</label>
                  <textarea
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className={classMap.input()}
                  />
                </div>
              )}

              {/* DROPDOWN */}
              {field.type === 'checkbox' && (
                <div>
                <label className={classMap.label()}>{field.label}</label>
                <div className="grid grid-cols-2 items-center justify-center">
                  {stages && stages.map((item,index) => {
                      return(
                        <div className="p-2">
                        <label
                        className={`${formData[field.key] === item.key ? (`${colorMap.bg_primary} text-black`) : ('bg-gray-600 text-gray-900')} p-2 border-l-2 rounded-xl`}
                        htmlFor={item.key}>{item.label}</label>
                        <input type="radio"
                        className="hidden"
                        name={item.label}
                        id={item.key}
                        value={item.key}
                        onClick={(e) => handleChange(field.key, item.key)}
                        />
                        </div>
                      )
                  })}
                </div>
                </div>
              )}

              {/* DATE */}
              {field.type === "date" && (
                <div>
                  <label className={classMap.label()}>{field.label}</label>
                  <input
                    type="date"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className={classMap.input()}
                  />
                </div>
              )}

              {/* FILE  */}
              {field.type === "file" && (
                <div>
                  <label className={classMap.label()}>{field.label}</label>
                  <ImageUploadDiv
                  value={formData[field.key] || null}
                  onChange={(e) => handleChange(field.key, e)}
                  uploadUrl={`${appUrl}/upload-file`}
                  deleteUrl={`${appUrl}/delete-file`}
                  path="/files/projects/logo/"
                  />
                </div>
              )}
            </div>
          ))}
        </form>

        {/* Collected data preview */}
        {/* <div className="mt-6 bg-gray-50 p-3 rounded">
          <h3 className="font-semibold mb-2">📦 Collected Data Preview:</h3>
          <pre className="text-xs bg-gray-800 text-white p-2 rounded max-h-60 overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div> */}
      </div>

      <div className="flex items-center justify-end mt-4">
        <SendRequest
          url="/advisor/project/create/form"
          method="post"
          data={formData}
          onResponse={() => {}}
          text={isUpdate ? "Update Project" : "Create Project"}
        />
      </div>
      </>
      )}
    </>
  );
};
