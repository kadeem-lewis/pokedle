"use client";
import React, { useState } from "react";
import {
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import OptionsModal from "../ui/OptionsModal";
import SettingsContent from "../content/SettingsContent";
import AboutContent from "../content/AboutContent";
import StatsContent from "../content/StatsContent";
import HowToPlayContent from "../content/HowToPlayContent";

export default function OptionsBar() {
  const [settingClick, setSettingClick] = useState(false);
  const [aboutClick, setAboutClick] = useState(false);
  const [statsClick, setStatsClick] = useState(false);
  const [howToPlayClick, setHowToPlayClick] = useState(false);
  return (
    <nav className=" border-2 border-current flex justify-between">
      <button
        onClick={() => setAboutClick(true)}
        className="border-r-2 border-current py-1"
      >
        <QuestionMarkCircleIcon className="h-6 w-6 text-current" />
      </button>
      {howToPlayClick && (
        <OptionsModal
          isOpen={howToPlayClick}
          setIsOpen={setHowToPlayClick}
          title="How To Play"
        >
          <HowToPlayContent />
        </OptionsModal>
      )}

      <button
        onClick={() => setSettingClick(true)}
        className="border-r-2 border-current py-1"
      >
        <Cog6ToothIcon className="h-6 w-6 text-current" />
        {settingClick && (
          <OptionsModal
            isOpen={settingClick}
            setIsOpen={setSettingClick}
            title="Settings"
          >
            <SettingsContent />
          </OptionsModal>
        )}
      </button>
      <button
        onClick={() => setStatsClick(true)}
        className="border-r-2 border-current py-1"
      >
        <ChartBarIcon className="h-6 w-6 text-current" />
      </button>
      {statsClick && (
        <OptionsModal
          isOpen={statsClick}
          setIsOpen={setStatsClick}
          title="Stats"
        >
          <StatsContent />
        </OptionsModal>
      )}
      <button
        onClick={() => setAboutClick(true)}
        className="border-r-2 border-current py-1"
      >
        <ExclamationCircleIcon className="h-6 w-6 text-current" />
      </button>
      {aboutClick && (
        <OptionsModal
          isOpen={aboutClick}
          setIsOpen={setAboutClick}
          title="About"
        >
          <AboutContent />
        </OptionsModal>
      )}
    </nav>
  );
}
