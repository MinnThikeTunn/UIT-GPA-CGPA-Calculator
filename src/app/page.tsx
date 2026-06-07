"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type GradeKey =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "D"
  | "F"
  | "NA";

type Subject = {
  id: string;
  name: string;
  grade: GradeKey;
  creditEarned: number;
};

type Semester = {
  id: number;
  subjects: Subject[];
  nextSubjectNo: number;
};

const gradePoints: Record<GradeKey, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.67,
  "B+": 3.33,
  B: 3.0,
  "B-": 2.67,
  "C+": 2.33,
  C: 2.0,
  D: 1.0,
  F: 0.0,
  NA: 0.0
};

const gradeOptions = Object.keys(gradePoints) as GradeKey[];
const DEFAULT_CREDIT = 3;
const INITIAL_SEMESTERS = 2;

const makeSubject = (semesterId: number, subjectNo: number): Subject => ({
  id: `sem-${semesterId}-sub-${subjectNo}`,
  name: "",
  grade: "A",
  creditEarned: DEFAULT_CREDIT
});

const initialSemesters: Semester[] = Array.from({ length: INITIAL_SEMESTERS }, (_, idx) => {
  const semesterId = idx + 1;
  return {
    id: semesterId,
    subjects: [makeSubject(semesterId, 1)],
    nextSubjectNo: 2
  };
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateSubject = (
    semesterId: number,
    subjectId: string,
    key: keyof Omit<Subject, "id">,
    value: string | number
  ) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          subjects: sem.subjects.map((sub) =>
            sub.id === subjectId ? { ...sub, [key]: value } : sub
          )
        };
      })
    );
  };

  const addSubject = (semesterId: number) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              subjects: [
                ...sem.subjects,
                makeSubject(
                  sem.id,
                  Number.isFinite(sem.nextSubjectNo) && sem.nextSubjectNo > 0
                    ? sem.nextSubjectNo
                    : sem.subjects.length + 1
                )
              ],
              nextSubjectNo:
                (Number.isFinite(sem.nextSubjectNo) && sem.nextSubjectNo > 0
                  ? sem.nextSubjectNo
                  : sem.subjects.length + 1) + 1
            }
          : sem
      )
    );
  };

  const removeSubject = (semesterId: number, subjectId: string) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        if (sem.subjects.length === 1) return sem;
        return { ...sem, subjects: sem.subjects.filter((sub) => sub.id !== subjectId) };
      })
    );
  };

  const addSemester = () => {
    setSemesters((prev) => {
      const nextSemesterId = prev.length > 0 ? Math.max(...prev.map((sem) => sem.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextSemesterId,
          subjects: [makeSubject(nextSemesterId, 1)],
          nextSubjectNo: 2
        }
      ];
    });
  };

  const results = useMemo(() => {
    const semesterResults = semesters.map((sem) => {
      const filled = sem.subjects.filter((s) => s.name.trim() !== "");
      const totalCredits = filled.reduce((sum, s) => sum + (s.creditEarned ?? DEFAULT_CREDIT), 0);
      const totalGradePoints = filled.reduce(
        (sum, s) => sum + gradePoints[s.grade] * (s.creditEarned ?? DEFAULT_CREDIT),
        0
      );
      const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
      return {
        semesterId: sem.id,
        subjectCount: filled.length,
        totalCredits,
        totalGradePoints,
        gpa
      };
    });

    const cgpaCredits = semesterResults.reduce((sum, sem) => sum + sem.totalCredits, 0);
    const cgpaGradePoints = semesterResults.reduce((sum, sem) => sum + sem.totalGradePoints, 0);
    const cgpa = cgpaCredits > 0 ? cgpaGradePoints / cgpaCredits : 0;

    return { semesterResults, cgpa };
  }, [semesters]);

  if (!isMounted) {
    return <main suppressHydrationWarning />;
  }

  return (
    <main>
      <header className="page-header">
        <p className="kicker">Academic Tool</p>
        <h1>University GPA / CGPA Calculator</h1>
        <p className="muted">
          Add semesters as needed (2 semesters per year). Default credit per subject is{" "}
          {DEFAULT_CREDIT}.
        </p>
        <p className="muted">Grade Points Earned = Grade Point x Credit Earned.</p>
      </header>

      <div className="section-spacing">
        <div className="card">
          <p className="kicker">Reference</p>
          <h2>Grade Point Mapping</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Letter Grade</th>
                  <th>Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {gradeOptions.map((grade) => (
                  <tr key={grade}>
                    <td>{grade}</td>
                    <td>{gradePoints[grade].toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="semester-grid">
        {semesters.map((sem) => {
          const semResult = results.semesterResults.find((x) => x.semesterId === sem.id);
          return (
            <section key={sem.id} className="semester-module card">
              <p className="kicker">Semester Module</p>
              <h3>Semester {sem.id}</h3>
              <p className="muted">Enter subject name and letter grade.</p>
              
              <div className="subjects-header">
                <span className="col-label">Subject</span>
                <span className="col-label">Grade</span>
                <span className="col-label">Credit</span>
                <span className="col-label"></span>
              </div>

              <div className="subjects-container">
                {sem.subjects.map((sub) => (
                  <div key={sub.id} className="subject-row">
                    <div className="field-group">
                      <label className="mobile-label">Subject</label>
                      <input
                        placeholder="Subject name"
                        value={sub.name}
                        onChange={(e) => updateSubject(sem.id, sub.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="field-group">
                      <label className="mobile-label">Grade</label>
                      <select
                        value={sub.grade}
                        onChange={(e) => updateSubject(sem.id, sub.id, "grade", e.target.value)}
                      >
                        {gradeOptions.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field-group">
                      <label className="mobile-label">Credit</label>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={sub.creditEarned ?? DEFAULT_CREDIT}
                        onChange={(e) =>
                          updateSubject(sem.id, sub.id, "creditEarned", Number(e.target.value) || 0)
                        }
                        title="Credit Earned"
                      />
                    </div>
                    <button
                      className="tertiary-btn"
                      type="button"
                      onClick={() => removeSubject(sem.id, sub.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="semester-actions">
                <button className="secondary-cta" type="button" onClick={() => addSubject(sem.id)}>
                  Add Subject
                </button>
              </div>

              <div className="semester-footer">
                <p className="semester-gpa">
                  <strong>Semester GPA:</strong> {semResult?.gpa.toFixed(2)}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <div className="add-semester-zone">
        <button className="primary-cta full-width" type="button" onClick={addSemester}>
          Add Semester
        </button>
      </div>

      <section className="summary-section section-spacing">
        <div className="summary-ribbon">
          <p className="kicker">Overall Summary</p>
        </div>
        <div className="summary-content">
          <h2>Cumulative GPA</h2>
          <div className="cgpa-display">
            <span className="cgpa-label">Final Result</span>
            <p className="cgpa-value">{results.cgpa.toFixed(2)}</p>
          </div>
        </div>
      </section>
    <div className="fab-wrapper">
        <Link href="/chatbot" className="fab" title="AI Chat Assistant">
          <span className="fab-icon">✦</span>
          <span className="fab-label">AI</span>
        </Link>
      </div>
    </main>
  );
}
