// src/pages/admin/components/iconLibrary.js (UPDATED)

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as DiIcons from 'react-icons/di';
import * as TbIcons from 'react-icons/tb';
import * as GrIcons from 'react-icons/gr';

// --- CURATED ICON LIST ---
const curatedIcons = {
    // ... (aapka existing curatedIcons object jaisa hai waisa hi rahega)
    // Frontend
    FaReact: FaIcons.FaReact,
    FaAngular: FaIcons.FaAngular,
    SiVuedotjs: SiIcons.SiVuedotjs,
    SiJavascript: SiIcons.SiJavascript,
    SiTypescript: SiIcons.SiTypescript,
    SiTailwindcss: SiIcons.SiTailwindcss,
    FaBootstrap: FaIcons.FaBootstrap,
    FaHtml5: FaIcons.FaHtml5,
    FaCss3Alt: FaIcons.FaCss3Alt,
    SiRedux: SiIcons.SiRedux,
    SiSass: SiIcons.SiSass,
    SiNextdotjs: SiIcons.SiNextdotjs,
    SiDart: SiIcons.SiDart,
    // Backend
    FaNodeJs: FaIcons.FaNodeJs,
    FaPython: FaIcons.FaPython,
    FaJava: FaIcons.FaJava,
    SiGo: SiIcons.SiGo,
    DiRuby: DiIcons.DiRuby,
    SiExpress: SiIcons.SiExpress,
    SiLaravel: SiIcons.SiLaravel,
    SiDocker: SiIcons.SiDocker,

    // Mobile
    FaAndroid: FaIcons.FaAndroid,
    FaApple: FaIcons.FaApple,
    FaSwift: FaIcons.FaSwift,
    SiKotlin: SiIcons.SiKotlin,
    SiFlutter: SiIcons.SiFlutter,

    // Database
    SiMongodb: SiIcons.SiMongodb,
    SiPostgresql: SiIcons.SiPostgresql,
    GrMysql: GrIcons.GrMysql,
    SiFirebase: SiIcons.SiFirebase,

    // Other
    FaCube: FaIcons.FaCube,
    FaServer: FaIcons.FaServer,
    FaLaptopCode: FaIcons.FaLaptopCode,
    FaShieldAlt: FaIcons.FaShieldAlt,

    // CRM Tools
SiSalesforce: SiIcons.SiSalesforce,
SiHubspot: SiIcons.SiHubspot,
SiZoho: SiIcons.SiZoho,
SiPipedrive: SiIcons.SiPiped,

FaSlack: FaIcons.FaSlack,   
SiZapier: SiIcons.SiZapier,
SiMailchimp: SiIcons.SiMailchimp,
SiGoogle: SiIcons.SiGoogle,

};

// --- Dynamic Icon Component (No change) ---
export const DynamicIcon = ({ iconName, className }) => {
    const IconComponent = curatedIcons[iconName];
    if (!IconComponent) {
        return <FaIcons.FaQuestionCircle className={className} />;
    }
    return <IconComponent className={className} />;
};

// --- Available icons list for dropdown (No change) ---
export const availableIconsList = Object.keys(curatedIcons)
    .sort()
    .map(name => ({
        value: name,
        label: name,
        Icon: curatedIcons[name]
    }));

// --- Pre-defined Tailwind colors (No change) ---
export const availableColors = [
    // ... (aapka existing availableColors array jaisa hai waisa hi rahega)
    { name: 'Gray', class: 'text-gray-500' },
    { name: 'Slate', class: 'text-slate-500' },
    { name: 'Red', class: 'text-red-500' },
    { name: 'Orange', class: 'text-orange-500' },
    { name: 'Amber', class: 'text-amber-500' },
    { name: 'Yellow', class: 'text-yellow-500' },
    { name: 'Lime', class: 'text-lime-500' },
    { name: 'Green', class: 'text-green-500' },
    { name: 'Emerald', class: 'text-emerald-500' },
    { name: 'Teal', class: 'text-teal-500' },
    { name: 'Cyan', class: 'text-cyan-500' },
    { name: 'Sky', class: 'text-sky-500' },
    { name: 'Blue', class: 'text-blue-500' },
    { name: 'Indigo', class: 'text-indigo-500' },
    { name: 'Violet', class: 'text-violet-500' },
    { name: 'Purple', class: 'text-purple-500' },
    { name: 'Fuchsia', class: 'text-fuchsia-500' },
    { name: 'Pink', class: 'text-pink-500' },
    { name: 'Rose', class: 'text-rose-500' },
];


// ⭐ --- NEW: TECHNOLOGY NAME SUGGESTIONS FOR MODAL --- ⭐
// Helper function to format icon name to a user-friendly name
const formatTechName = (iconKey) => {
    return iconKey
        .replace(/^(Fa|Si|Di|Tb|Gr)/, '') // Remove prefixes like Fa, Si
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace('dotjs', '.js')    // Special case for 'dotjs'
        .replace('Js', 'JS')        // 'Js' to 'JS'
        .trim();
};

// Create a list of suggestions for the "Add Technology" modal
export const availableTechSuggestions = Object.keys(curatedIcons)
    .sort()
    .map(iconKey => ({
        value: formatTechName(iconKey), // The value for the select
        label: formatTechName(iconKey), // The visible label
        iconString: iconKey,            // The icon key to auto-select
    }));