import { appUrl } from "../../main";
import { Empty } from "antd";
import axios from "axios";
import React from "react";
import { FaBatteryEmpty, FaCircle, FaCircleNotch, FaGgCircle, FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRef } from "react";

// tailwind components end

export const formClass = "bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md"
export const buttonClass = "bg-[#00ffb3] hover:bg-[#a76e3d] hover:text-white text-black font-semibold py-2 px-4 rounded-md transitions duration-200";
export const inputClass = (width = 'w-full') => {
    return(`${width} bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:${colorMap.border_primary}`)
};
export const labelClass = "block text-sm font-medium text-gray-300 mb-1";
export const cardClass = (col?: any) => {
    return `bg-[#222] flex border border-gray-700 rounded-lg shadow-md p-4${col ? ` col-span-${col}` : ''} text-center m-1 min-h-50 items-start`;
};
export const linkClass = "text-blue-400 hover:underline hover:text-blue-300 transitions duration-200";
export const errorClass = "text-red-500 text-sm mt-1";
export const successClass = "text-green-500 text-sm mt-1";
export const sectionClass = "mb-6";
export const headingClass = "text-xl font-bold text-white mb-2";
export const textareaClass = "bg-[#232323] border border-gray-600 text-white p-2 rounded-md w-full min-h-[80px] focus:outline-none focus:border-blue-500";
export const selectClass = "bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:border-blue-500";
export const iconButtonClass = "p-2 rounded-full hover:bg-gray-700 transitions duration-200 text-gray-300";
export const dividerClass = "border-t border-gray-700 my-4";
export const smallTextClass = "text-xs text-gray-400";
export const modalClass = "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50";
export const modalContentClass = "bg-[#232323] rounded-lg p-6 shadow-lg border border-gray-700";
export const tableClass = "min-w-full bg-[#232323] border border-gray-700 rounded-md";
export const tableHeaderClass = "bg-[#1b1b1b] text-gray-300 font-semibold";
export const tableCellClass = "px-4 py-2 border-b border-gray-700";
export const badgeClass = (type:string) => {
    return(
        `inline-block px-2 py-1 rounded ${type === 'success' ? 'bg-blue-700' : 'bg-red-700'} text-white text-xs font-semibold`
    )
}
export const disabledClass = "opacity-50 cursor-not-allowed";
export const containerDiv = "container inline-flex border border-gray-500 rounded-lg p-2 bg-[#1b1b1b]"
export const hoverClass = (color:string) => {return(`hover:bg-${color}-500`)}
export const projectCardClass = "bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 text-white hover:shadow-lg transition";
export const projectTitleClass = "text-lg font-semibold mb-1";
export const projectMetaClass = "text-sm text-gray-400";
export const tagClass = "bg-blue-900 text-white text-xs rounded-full px-2 py-1 mr-1";
export const centerFocus = (extra:string = 'null') => {
    return(
        `${extra} min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 py-8`
    )
}
export const projectInfo = () => {
    return(`border border-1 hover:border-[#00ffb3] rounded-md hover:rounded hover:text-white hover:opacity-100 m-1 p-2 transitions duration-200`)
}

// styles.ts


// tailwind components end

export const guestCheck = (auth:any, destination:string = '/advisor/dashboard') => {
    if(auth){
        window.location.href = destination;
        toast.success('You are signed in')
        return null
    }
}

export const authCheck = (auth:any, destination:string = '/advisor/login') => {
    if(!auth){
        window.location.href = destination;
        toast.success('Login to continue')
        return null
    }
}



export const colorMap = {
    bg_primary: "bg-[#00ffb3]",
    bg_secondary: "bg-[#a76e3d]",
    bg_dark: "bg-[#0d0f11]",
    bg_muted: "bg-[oklch(0.556 0 0)]",
    text_primary: "text-[#00ffb3]",
    text_secondary: "text-[#a76e3d]",
    text_dark: "text-[#0d0f11]",
    text_muted: "text-[oklch(0.556 0 0)]",
    text_danger: "text-[var(--danger)]",
    border_primary: "border-[#00ffb3]",
    border_secondary: "border-[#a76e3d]",
    border_dark: "border-[#0d0f11]",
    border_danger: "border-[var(--danger)]",
}
// 

export const emptyResult = (text:string) => {
    return(
        <div className="flex col-span-3 flex-col items-center justify-center w-full">
            <Empty 
            description={<span className="text-gray-400">{text}</span>} 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            />
        </div>
    )
}


export const emptyData = (text:string) => {
    return(
        <div className="flex col-span-3 flex-col items-center justify-center w-full">
            <Empty 
            description={<span className="text-gray-400">{text}</span>} 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            />
        </div>
    )
}




const roundedCondition = (direction:string) => {
    switch(direction){
        case 'left':
            return 'rounded-l-2xl rounded-e-none'
            break
        case 'right':
            return 'rounded-l-none rounded-e-2xl'
            break
        case 'down':
            return 'rounded-l-none rounded-e-none rounded-b-2xl'
            break
        case '':
            return 'rounded-l-none rounded-e-2xl'
        break
        default:
            return 'rounded-l-none rounded-b-2xl'
            break
    }
}


export const classMap = {
  form: "bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md",

  button: (bg?:string, hover?:string, text?:string, textsize?:string, direction:string = 'left') => `${bg ? bg : 'bg-transparent'} hover:bg-[#00ffb3] hover:${text ? text : 'text-black'} text-white border-2 border-[#00ffb3]/30 ${textsize} font-semibold py-2 px-4 m-1 
  ${direction && roundedCondition(direction)} hover:rounded-none transitions duration-500`,

  input: (width = 'w-full') =>
    `${width} px-4 py-2 p-2 mb-2 mt-2 rounded-md bg-[#1e1f22] text-white placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-[#00d2ff] transition-all duration-200`,

  label: () => "block text-sm font-medium text-gray-300 mb-2",

  card: (col?: number | string) =>
    `bg-[#222] flex border border-gray-700 rounded-lg shadow-md p-4${col ? ` col-span-${col}` : ''} text-center m-1 min-h-50 items-center`,

  link: "text-blue-400 hover:underline hover:text-blue-300 transitions duration-200",

  error: "text-red-500 text-sm mt-1",

  success: "text-green-500 text-sm mt-1",

  section: "mb-6",

  heading: "text-xl font-bold text-white mb-2",

  textarea: "bg-[#232323] border border-gray-600 text-white p-2 rounded-md w-full min-h-[80px] focus:outline-none focus:border-blue-500",

  list: () => ``,

  select: "bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:border-blue-500",

  iconButton: "p-2 rounded-full hover:bg-gray-700 transitions duration-200 text-gray-300",

  divider: "border-t border-gray-700 my-4",

  smallText: "text-xs text-gray-400",

  modal: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50",

  modalContent: "bg-[#232323] rounded-lg p-6 shadow-lg border border-gray-700",

  table: "min-w-full bg-[#232323] border border-gray-700 rounded-md",

  tableHeader: "bg-[#1b1b1b] text-gray-300 font-semibold",

  tableCell: "px-4 py-2 border-b border-gray-700",

  badge: (type: "success" | "error" = "success") =>
    `inline-block px-2 py-1 rounded ${type === 'success' ? 'bg-blue-700' : 'bg-red-700'} text-white text-xs font-semibold`,

  disabled: "opacity-50 cursor-not-allowed",

  container: "container inline-flex border border-gray-500 rounded-lg p-2 bg-[#1b1b1b]",

  hover: (color: string = 'blue') => `hover:bg-${color}-500`,

  inlineIcon: (color:string = colorMap.text_primary) => `inline mb-1 ${color}`,

  projectCard: "bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 text-white hover:shadow-lg transition",

  projectTitle: "text-lg font-semibold mb-1",

  projectMeta: "text-sm text-gray-400",

  tag: "bg-blue-900 text-white text-xs rounded-full px-2 py-1 mr-1",

  centerFocus: (extra: string = '') =>
    `${extra} min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 py-8`,

  projectInfo:
    "border border-1 hover:border-[#00ffb3] rounded-md hover:rounded hover:text-white hover:opacity-100 m-1 p-1 transitions duration-200",

    pageSection: () => "bg-[#1a1a1a] p-4 rounded-md shadow",

    sectionHeader: () => `text-lg font-semibold ${colorMap.text_primary}`,

    sectionHeaderDiv: (color:string = 'bg-gray-100') => `flex items-center justify-between ${color}/2 p-2 rounded-sm mb-3 border border-white/2 hover:${colorMap.border_primary} ${colorMap.text_primary}`,

    sectionInfo: () => `p-2 mt-3 mb-3`,

    commentBox: (sender:boolean = true, responder:boolean = false) => {
        
    },

    hoverBg: () => `hover:${colorMap.bg_primary}`,

    hoverAnimate: () => `hover:rounded hover:${colorMap.border_primary} hover:text-white hover:w-[99%] hover:opacity-100 m-1 p-1 transitions duration-500`,

    hoverImg: () => `hover:w-[99%] transitions duration-500`,

    tooltip: () => `absolute left-0 bottom-full -translate-x-1/8 ml-2 w-47 p-2 text-[0.3em] border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:bg-[var(--color-muted)] group-hover:text-[var(--primary)] group-focus-within:opacity-100 group-focus-within:bg-[var(--color-muted)] group-focus-within:text-[var(--primary)] transition-opacity duration-200 z-100 pointer-events-none group-hober:pointer-events-none`,

    cardTitle: () => `text-xl font-semibold text-[#00ffb3] cursor-pointer inline`,

    tooltipBtn: () => `${classMap.iconButton}, inline text-gray-500 italic bg-transparent hover:bg-transparent cursor-pointer`,

    userCard: (col:any = 1, height:number = 30, className:string = '') => `bg-[#222] border border-gray-700 rounded-lg shadow-md p-4 md:col-span-${col} lg:col-span-${col} text-center m-1 min-h-${height} items-start ${className}`,

    info: () => `pt-2 pb-2 opacity-50`,

    animPulse: () => `animate-pulse transitions-all duration-1000`
};


export const random = (max:any) => {
    const rand = Math.random().toString(36).substring(2, max)
    return rand;
}



export const toJson = (data:any) => {
    let jsonConvert = [];
    try{
        jsonConvert = data ? JSON.parse(data) : {}
    }catch(e){
        console.log(e)
    }

    return jsonConvert
}


export const GetIndexData = async (url:any) => {
    try{
        const response = await axios.post(url);
        return response.data;
    }catch(error){
        console.error("Error getting data", error);
        throw error;
    }
}

export const stringToJson = (data:string) => {
    if(!data) return []

    const tagsArray = data.split(",").map(tag => tag.trim());
    const tagsJSON = JSON.stringify(tagsArray); 
    const parsedTags = JSON.parse(tagsJSON);
    return parsedTags
}

export const sendPostRequest = async (url:string ,data:[]) => {
    try{
        const resp = await axios.post(appUrl + url, data);
        return resp.data.message;
    }catch(err){
        return err
    }
}


export const stages = [
    {label: "Idea", key: "idea"},
    {label: "Pre-seed", key: "pre-seed"},
    {label: "Seed", key: "seed"},
    {label: "Early Stage", key: "early"},
    {label: "Growth", key: "growth"},
    {label: "Expansion", key: "expansion"},
    {label: "Mature", key: "mature"},
    {label: "Exit", key: "exit"},
  ]


export const Loading = () => (
    <div className="flex items-center justify-center w-full h-full min-h-[120px]">
        <FaCircleNotch className="animate-spin text-5xl text-[#00ffb3] drop-shadow-lg transitions duration-500" aria-label="Loading..." />
        <span className="sr-only">Loading...</span>
    </div>
);


export const starShow = (stars:any) => {
    return(
        <div className="flex">
            {[1,2,3,4,5].map((star) => (
                star <= stars ? (
                    <FaStar key={star} className={`${colorMap.text_primary} text-lg`} />
                ) : (
                    <FaRegStar key={star}
                    className="text-lg text-gray-400"
                    />
                )
            ))}
        </div>
    )
}


// ✅ Flexible LoadingDiv Component
export const LoadingDiv = ({
  layout = [1], // e.g. [2, 1] = 2 divs on top row, 1 below
  height = "h-14",
  rounded = "rounded-md",
}: {
  layout?: (number | number[])[];
  height?: string;
  rounded?: string;
}) => {
  // 🌀 Shimmer styles
  const shimmer = `relative overflow-hidden bg-[#1e1f22] ${rounded} border border-gray-700`;
  const shimmerInner =
    "absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[#00ffb3]/40 to-transparent";
  const shimmerAnim = `
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 1.5s infinite linear;
      transform: translateX(-100%);
    }
  `;

  // 🧠 Helper to render one row of shimmer blocks
  const renderRow = (columns: number | number[], rowIndex: number) => {
    if (Array.isArray(columns)) {
      // e.g. [7,3] => 70% / 30% split
      const total = columns.reduce((a, b) => a + b, 0);
      return (
        <div key={rowIndex} className="flex flex-col sm:flex-row gap-3 w-full">
          {columns.map((width, i) => (
            <div
              key={i}
              className={`${shimmer} ${height}`}
              style={{ flex: width / total }}
            >
              <div className={shimmerInner} />
            </div>
          ))}
        </div>
      );
    } else {
      // e.g. 3 => 3 equal shimmer blocks
      return (
        <div
          key={rowIndex}
          className={`grid grid-cols-1 sm:grid-cols-${columns} gap-3 w-full`}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className={`${shimmer} ${height}`}>
              <div className={shimmerInner} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <style>{shimmerAnim}</style>
      {layout.map((row, index) => renderRow(row, index))}
    </div>
  );
};




export const ImageUploadDiv = ({
  onChange,
  value,
  label = "Upload Image",
  className = "",
  accept = "image/*",
  height = "h-32",
  width = "w-full",
  rounded = "rounded-lg",
  preview = true,
  uploadUrl,            // 👈 New prop for upload endpoint
  deleteUrl,
  path           // 👈 New prop for delete endpoint (optional)
}: {
  onChange: (url: string | null) => void;
  value?: string | null;
  label?: string;
  className?: string;
  accept?: string;
  height?: string;
  width?: string;
  rounded?: string;
  preview?: boolean;
  uploadUrl: string;
  deleteUrl?: string;
  path?: string
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);

      // 🧼 If there's an old image and deleteUrl is provided, delete it first
      if (value && deleteUrl) {
        try {
          await axios.post(deleteUrl, { filePath: value });
        } catch (err) {
          console.warn("⚠️ Failed to delete old image:", err);
        }
      }

      // 🚀 Upload new file
      const formData = new FormData();
      formData.append("file", file);
      formData.append('path', path)

      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.url) {
        onChange(res.data.url); // 👈 Send URL back to parent form
      } else {
        console.error("No URL returned from backend");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-500 bg-[#181818] cursor-pointer ${height} ${width} ${rounded} ${className} hover:border-[#00ffb3] transition`}
      onClick={() => !isUploading && inputRef.current?.click()}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />

      {isUploading ? (
        <span className="text-[#00ffb3] text-sm animate-pulse">Uploading...</span>
      ) : preview && value ? (
        <img
          src={value}
          alt="Preview"
          className={`object-contain max-h-28 mb-2 ${rounded}`}
          style={{ maxWidth: "90%" }}
        />
      ) : (
        <span className="text-gray-400 text-sm flex flex-col items-center">
          <svg width="32" height="32" fill="none" className="mb-1 text-[#00ffb3]" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 16v-8m0 0l-4 4m4-4l4 4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {label}
        </span>
      )}
    </div>
  );
};
