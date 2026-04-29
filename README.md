# GPA / CGPA Calculator

This is University GPA / CGPA Calculator for UIT students. A high-end, minimalist tool built with Next.js to track academic performance across multiple semesters with precision and speed.

## Calculation Formulas

The calculator follows standard academic weighting rules to ensure accuracy.

### 1. Subject Grade Point
Each subject's contribution is calculated by multiplying the grade point of the letter grade by the credits earned for that subject.
> **Subject Grade Point = Grade Point × Credits Earned**

### 2. Semester GPA (Grade Point Average)
The GPA for a single semester is the sum of all Grade Points earned in that semester divided by the total number of credits taken.
> **GPA = Σ(Subject Grade Point) / Σ(Credits)**

### 3. Cumulative GPA (CGPA)
The CGPA represents the overall performance across all semesters. It is calculated by dividing the total Grade Points accumulated across all semesters by the total number of credits earned in those semesters.
> **CGPA = Total Accumulated Grade Points / Total Accumulated Credits**

---

## Grade Point Mapping

The following mapping is used for all calculations:

| Letter Grade | Grade Point |
| :--- | :--- |
| A+ / A | 4.00 |
| A- | 3.67 |
| B+ | 3.33 |
| B | 3.00 |
| B- | 2.67 |
| C+ | 2.33 |
| C | 2.00 |
| D | 1.00 |
| F / NA | 0.00 |

## Features

- **Multi-Semester Support:** Track up to 10 semesters.
- **Dynamic Subject Entry:** Add or remove subjects within each semester dynamically.
- **Real-time Updates:** GPA and CGPA recalculate instantly as you enter grades.
- **WIRED Design System:** A brutalist, minimalist UI inspired by WIRED magazine.

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
