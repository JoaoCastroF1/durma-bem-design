import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import ChronotypeQuiz from "@/components/ChronotypeQuiz";
import ISIAssessment from "@/components/ISIAssessment";
import ProgramView from "@/components/ProgramView";

type View = "landing" | "quiz" | "isi" | "program";

const Index = () => {
  const [view, setView] = useState<View>("landing");

  switch (view) {
    case "quiz":
      return <ChronotypeQuiz onBack={() => setView("landing")} onComplete={() => setView("program")} />;
    case "isi":
      return <ISIAssessment onBack={() => setView("landing")} onComplete={() => setView("program")} />;
    case "program":
      return <ProgramView onBack={() => setView("landing")} />;
    default:
      return (
        <LandingPage
          onStartQuiz={() => setView("quiz")}
          onStartISI={() => setView("isi")}
          onStartProgram={() => setView("program")}
        />
      );
  }
};

export default Index;
