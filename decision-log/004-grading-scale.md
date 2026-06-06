# Decision: Grade Point Mapping (UIT Standard)

**Date:** 2024-06-05
**Status:** ✅ Implemented
**Context:** Need to define the grade point scale used for GPA/CGPA calculations

## Decision

Use the UIT (University of Information Technology) standard grading scale:

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

## Calculation Formulas

1. **Subject Grade Point** = Grade Point × Credits Earned
2. **Semester GPA** = Σ(Subject Grade Points) / Σ(Credits) per semester
3. **CGPA** = Total accumulated grade points / Total accumulated credits across all semesters
4. **Default credits per subject**: 3 (user-changeable)

## Rationale

- **Industry standard**: Maps to most US universities and many international institutions
- **4.0 scale**: Well-understood, easy to explain
- **Mid-point precision**: A-, B+, B- provide granularity for fine academic distinction
- **Fail = 0**: Clear consequence for failing grades

## Alternatives Considered

- **5.0 Scale**: Used by some institutions (weighted honors)
  - Rejected: UIT uses 4.0 scale
- **Pass/Fail only**: Too simplistic for nuanced grading
  - Rejected: Doesn't reflect actual UIT grading
- **Percentage-based**: Raw percentages without conversion
  - Rejected: Less standardized, harder to compare across systems

## Implementation

Grade mapping is used in:
- `src/app/page.tsx` - `gradePointMap` object
- `GEMINI.md` - Reference document for mapping

## Consequences

### Positive
- Accurate UIT representation
- Clear, linear scale
- Easy to convert CGPA to percentage if needed
- Standardized (no confusion about grades)

### Negative
- Students from other institutions may expect different scales
- No +/++ for A grades (A+ and A both = 4.0)