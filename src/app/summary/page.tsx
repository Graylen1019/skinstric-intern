"use client";

import { Navbar } from "@/modules/navbar";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";

interface DemographicData {
  [key: string]: number;
}
interface AnalysisResults {
  race: DemographicData;
  age: DemographicData;
  gender: DemographicData;
}
interface ApiResponse {
  success: boolean;
  message: string;
  filename?: string;
  data?: AnalysisResults;
}

enum Category {
  Race = "race",
  Age = "age",
  Gender = "gender",
}

function getDominant(data?: DemographicData | null) {
  if (!data || Object.keys(data).length === 0) return null;
  return Object.entries(data).reduce(
    (acc, [name, probability]) =>
      probability > acc.probability ? { name, probability } : acc,
    { name: "", probability: -1 }
  );
}

const CategoryBox = ({
  category,
  selected,
  dominantName,
  onClick,
}: {
  category: Category;
  selected: boolean;
  dominantName?: string;
  onClick: () => void;
}) => (
  <div
    className={`p-2 ${
      selected
        ? "bg-[#1A1B1C] text-white"
        : "bg-[#F3F3F4] text-black hover:bg-[#E1E1E2]"
    } flex-1 flex flex-col justify-between space-y-4 border-t cursor-pointer transition-colors duration-200`}
    onClick={onClick}
  >
    <p className="font-semibold capitalize">{dominantName || "N/A"}</p>
    <h1 className="font-semibold">{category.toUpperCase()}</h1>
  </div>
);

const DemographicsPage = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.Race
  );
  const [selectedListItemName, setSelectedListItemName] = useState<
    string | null
  >(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("apiResponseData");
      if (storedData) setApiResponse(JSON.parse(storedData));
    } catch {
      localStorage.removeItem("apiResponseData");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const dominant = getDominant(apiResponse?.data?.[selectedCategory]);
    setSelectedListItemName(dominant?.name || null);
  }, [apiResponse, selectedCategory]);

  const dominant = {
    [Category.Race]: useMemo(
      () => getDominant(apiResponse?.data?.race),
      [apiResponse]
    ),
    [Category.Age]: useMemo(
      () => getDominant(apiResponse?.data?.age),
      [apiResponse]
    ),
    [Category.Gender]: useMemo(
      () => getDominant(apiResponse?.data?.gender),
      [apiResponse]
    ),
  };

  const currentDisplayData = useMemo(() => {
    const data = apiResponse?.data?.[selectedCategory] || {};
    const sortedEntries = Object.entries(data)
      .filter(([, v]) => typeof v === "number")
      .map(([name, probability]) => ({
        name,
        probability: probability as number,
      }))
      .sort((a, b) => b.probability - a.probability);
    return {
      sortedEntries,
      title: selectedCategory.toUpperCase(),
      rawData: data,
    };
  }, [selectedCategory, apiResponse]);

  const currentConfidenceForCircle = useMemo(() => {
    if (
      selectedListItemName &&
      currentDisplayData.rawData[selectedListItemName] !== undefined
    )
      return currentDisplayData.rawData[selectedListItemName] as number;
    return getDominant(currentDisplayData.rawData)?.probability || 0;
  }, [selectedListItemName, currentDisplayData]);

  const displayPercentage = (currentConfidenceForCircle * 100).toFixed(0);
  const displayNameForCircle =
    selectedListItemName ||
    getDominant(currentDisplayData.rawData)?.name ||
    "N/A";
  const CIRCUMFERENCE = 2 * Math.PI * 49.15;
  const strokeDashoffset = CIRCUMFERENCE * (1 - currentConfidenceForCircle);

  const handleCategoryClick = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      const dominant = getDominant(apiResponse?.data?.[category]);
      setSelectedListItemName(dominant?.name || null);
    },
    [apiResponse]
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p>Loading analysis data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
        <div className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
          <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
            <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
              <h1 className="text-base font-semibold mb-1 leading-[24px]">
                A.I. ANALYSIS
              </h1>
              <h1 className="text-4xl md:text-7xl font-normal leading-[64px] tracking-tighter">
                DEMOGRAPHICS
              </h1>
              <h1 className="text-sm mt-2 leading-[24px]">
                PREDICTED RACE & AGE
              </h1>
            </div>
            <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="space-y-2 md:flex md:flex-col h-[62%]">
                {Object.values(Category).map((cat) => (
                  <CategoryBox
                    key={cat}
                    category={cat}
                    selected={selectedCategory === cat}
                    dominantName={dominant[cat]?.name}
                    onClick={() => handleCategoryClick(cat)}
                  />
                ))}
              </div>
              <div className="relative bg-[#F3F3F4] p-3 flex flex-col items-center justify-center md:h-[57vh] border-t">
                <p className="hidden md:block md:absolute text-5xl mb-2 left-5 top-2 capitalize">
                  {displayNameForCircle}
                </p>
                <div className="relative md:absolute w-full max-w-[384px] mb-4 md:right-5 md:bottom-2">
                  <div className="w-full h-full max-h-[384px] relative transform scale-[1] origin-center">
                    <svg
                      className="CircularProgressbar text-[#1A1B1C]"
                      viewBox="0 0 100 100"
                    >
                      <path
                        className="CircularProgressbar-trail"
                        d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
                        strokeWidth={1.7}
                        fillOpacity={0}
                        stroke="#C1C2C3"
                        style={{
                          strokeLinecap: "butt",
                          strokeDasharray: `${CIRCUMFERENCE}px, ${CIRCUMFERENCE}px`,
                          strokeDashoffset: "0px",
                        }}
                      />
                      <path
                        className="CircularProgressbar-path"
                        d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
                        stroke="#1A1B1C"
                        strokeWidth={1.7}
                        fillOpacity={0}
                        style={{
                          stroke: "rgb(26, 27, 28)",
                          strokeLinecap: "butt",
                          transitionDuration: "0.8s",
                          strokeDasharray: `${CIRCUMFERENCE}px, ${CIRCUMFERENCE}px`,
                          strokeDashoffset: `${strokeDashoffset}px`,
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-3xl md:text-4xl font-normal">
                        {displayPercentage}
                        <span className="absolute text-xl md:text-3xl">%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                  If A.I. estimate is wrong, select the correct one.
                </p>
              </div>
              <div className="bg-[#F3F3F4] pt-4 pb-4 border-t">
                <div className="space-y-0">
                  <div className="flex justify-between px-4">
                    <h1 className="text-base leading-[24px] tracking-tight font-medium mb-2 capitalize">
                      {currentDisplayData.title}
                    </h1>
                    <h1 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                      A.I. CONFIDENCE
                    </h1>
                  </div>
                  {currentDisplayData.sortedEntries.map((entry) => (
                    <div
                      key={entry.name}
                      className={`flex items-center justify-between h-[48px] px-4 cursor-pointer transition-colors duration-200
                          ${
                            selectedListItemName === entry.name
                              ? "bg-black text-white"
                              : "hover:bg-[#E1E1E2] text-black"
                          }`}
                      onClick={() => setSelectedListItemName(entry.name)}
                    >
                      <div className="flex items-center gap-1">
                        <Image
                          src={
                            selectedListItemName === entry.name
                              ? "/radio-button(1).png" // White-filled version
                              : "/radio-button.png"
                          }
                          width={12}
                          height={12}
                          alt="Radio button"
                          className="w-[12px] h-[12px] mr-2"
                        />
                        <span className="font-normal text-base leading-6 tracking-tight capitalize">
                          {entry.name}
                        </span>
                      </div>
                      <span className="font-normal text-base leading-6 tracking-tight">
                        {(entry.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white pt-4 md:pt-[37px] pb-6 sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
              <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
                <Link href={"/result"}>
                  <div>
                    <div className="relative w-12 h-12 flex items-center justify-center border border-solid rotate-45 scale-[1] sm:hidden">
                      <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                        BACK
                      </span>
                    </div>
                    <div className="group hidden sm:flex flex-row relative justify-center items-center">
                      <div className="w-12 h-12 hidden sm:flex justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[0.95] ease duration-300" />
                      <span className="absolute left-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.95] ease duration-300">
                        ◀
                      </span>
                      <span className="text-sm font-semibold hidden sm:block ml-6">
                        BACK
                      </span>
                    </div>
                  </div>
                </Link>
                <Link href={"/"}>
                  <div className="group hidden sm:flex flex-row relative justify-center items-center">
                    <span className="text-sm font-semibold hidden sm:block mr-5">
                      HOME
                    </span>
                    <div className="w-12 h-12 hidden sm:flex relative items-center justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[0.95] ease duration-300" />
                    <span className="rotate-180 absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.95] ease duration-300">
                      ◀
                    </span>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center border border-solid rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                      HOME
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemographicsPage;
