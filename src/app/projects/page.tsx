import { ProjectExplorer } from "@/components/explorers";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "项目", description: "产品、开源、实验与写作项目" };
export default function Projects() {
  return (
    <>
      <header className="page-title reading">
        <h1>项目</h1>
        <p>产品、开源、实验与写作的持续记录。</p>
      </header>
      <ProjectExplorer />
    </>
  );
}
