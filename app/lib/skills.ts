import type { IconType } from "react-icons";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiGoogleappsscript,
  SiGoogle,
  SiMongodb,
  SiNextdotjs,
  SiGit,
} from "react-icons/si";

export type Skill = { name: string; Icon: IconType; color: string };

export const skills: Skill[] = [
  { name: "React Native", Icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML / CSS", Icon: SiHtml5, color: "#E34F26" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Apps Script", Icon: SiGoogleappsscript, color: "#4285F4" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Google Workspace", Icon: SiGoogle, color: "#4285F4" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
];
