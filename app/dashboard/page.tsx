"use client";
import { ChartNoAxesColumn, Percent, Video } from "lucide-react";
import React from "react";

function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className=" min-h-36 bg-[#ebf4ff] rounded-lg text-card-foreground shadow-xl border-0 backdrop-blur-sm p-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Video className=" text-primary-foreground size-8" />
          </div>
          <div>
            <p className=" tracking-tight text-sm font-normal text-text-main">
              Total Users
            </p>
            <p className="text-xl font-bold text-slate-900">100</p>
          </div>
        </div>
        <div className=" min-h-36 bg-[#ebf4ff] rounded-lg text-card-foreground shadow-xl border-0 backdrop-blur-sm p-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <ChartNoAxesColumn className=" text-primary-foreground size-8" />
          </div>
          <div>
            <p className=" tracking-tight text-sm font-normal text-text-main">
              Active Premium Members
            </p>
            <p className="text-xl font-bold text-slate-900">50</p>
          </div>
        </div>
        <div className=" min-h-36 bg-[#ebf4ff] rounded-lg text-card-foreground shadow-xl border-0 backdrop-blur-sm p-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Percent className=" text-primary-foreground size-8" />
          </div>
          <div>
            <p className=" tracking-tight text-sm font-normal text-text-main">
              Active Partners
            </p>
            <p className="text-xl font-bold text-slate-900">63</p>
          </div>
        </div>
        <div className=" min-h-36 bg-[#ebf4ff] rounded-lg text-card-foreground shadow-xl border-0 backdrop-blur-sm p-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Percent className=" text-primary-foreground size-8" />
          </div>
          <div>
            <p className=" tracking-tight text-sm font-normal text-text-main">
              Active Discounts
            </p>
            <p className="text-xl font-bold text-slate-900">22</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
