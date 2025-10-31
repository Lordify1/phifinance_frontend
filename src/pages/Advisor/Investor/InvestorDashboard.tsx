import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
  cardClass,
  classMap,
  emptyData,
  headingClass,
  linkClass,
  LoadingDiv,
  starShow,
} from "@/components/Tools/Misc";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { investorSidebar } from "@/data/investorSidebarData";
import { advisorUrl } from "@/app";



const InvestorDashboard = ({user, dbData}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dbData.length !== 0 && setIsLoading(false)
  }, [dbData])

  return (
    <>
      <Head title="Investor Dashboard" />
      {isLoading ? (
      <DashboardLayout sidebarDataType="investor" sidebarData={investorSidebar}>
      <LoadingDiv
      layout={[2,1]}
      height="h-30"
      />
      </DashboardLayout>
      ) : (
      <DashboardLayout sidebarDataType="investor" sidebarData={investorSidebar}>
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">Investor {user?.username || user?.name} 💸</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className={`${classMap.userCard()}`}>
            <div className="text-left">
              <h2 className={headingClass}>Stars Given</h2>
              <p className="text-[#00FFD1] font-medium text-lg">{dbData['ratings_sum'] || 0}
              </p>
              <p className="text-sm text-gray-400">Keep rewarding the promising ones!</p>
            </div>
          </div>

          <div className={`${classMap.userCard()}`}>
            <div className="text-left">
              <h2 className={headingClass}>Startups Reviewed</h2>
              <p className="text-white text-lg">
                {dbData['ratings_count'] || 0}
              </p>
              <p className="text-sm text-gray-400">Total of Startups Reviewed!</p>
            </div>
          </div>
        </div>
        <div className={`${classMap.userCard()} min-h-[50vh] w-full`}>
            <div className="text-left">
              <h2 className={headingClass}>Reviews</h2>
              <ul className="text-gray-300 space-y-2">
              {dbData['ratings'] && dbData['ratings'].length > 0 ? (
                dbData['ratings'].map((item, index) => (
                <li key={index} className={`${classMap.userCard(1,30, 'text-start p-5')} ${classMap.hover()}`}>
                  <div className="font-semibold text-white mb-1">
                    <Link
                    href={`${advisorUrl}/startup/${item.id}/${item.slug}`}
                    >
                    {item.name}
                    </Link>
                    <span>{starShow(item.rate)}</span>
                  </div>
                  <div className="italic">{item.comment || <span className="text-gray-500">No comment</span>}</div>
                </li>
                ))
              ) : (
                emptyData('No Ratings Yet')
              )}
              </ul>
            </div>
          </div>
      </DashboardLayout>
      )}
    </>
  );
};

export default InvestorDashboard;
