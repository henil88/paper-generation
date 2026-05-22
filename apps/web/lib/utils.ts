import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Book,
  Calculator,
  Dumbbell,
  Globe,
  Languages,
  Monitor,
  Palette,
  FlaskConical,
  Sigma,
  Leaf,
  TrendingUp,
  BookOpen,
} from "lucide-react";

//subject types
type Subject = {
  name: string;
  logo: LucideIcon;
};

//chapter type

type Chapter = {
  name: string;
  logo: LucideIcon;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stdWiseSub: Record<number, Subject[]> = {
  5: [
    { name: "Gujarati", logo: Languages },
    { name: "English", logo: Book },
    { name: "Hindi", logo: Languages },
    { name: "Mathematics", logo: Calculator },
    { name: "Science", logo: Atom },
    { name: "Social Science", logo: Globe },
    { name: "Computer", logo: Monitor },
    { name: "Drawing", logo: Palette },
  ],

  6: [
    { name: "Gujarati", logo: Languages },
    { name: "English", logo: Book },
    { name: "Hindi", logo: Languages },
    { name: "Mathematics", logo: Calculator },
    { name: "Science", logo: Atom },
    { name: "Social Science", logo: Globe },
    { name: "Computer", logo: Monitor },
    { name: "Sanskrit", logo: Book },
  ],

  7: [
    { name: "Gujarati", logo: Languages },
    { name: "English", logo: Book },
    { name: "Hindi", logo: Languages },
    { name: "Mathematics", logo: Calculator },
    { name: "Science", logo: Atom },
    { name: "Social Science", logo: Globe },
    { name: "Computer", logo: Monitor },
    { name: "Sanskrit", logo: Book },
  ],

  8: [
    { name: "Gujarati", logo: Languages },
    { name: "English", logo: Book },
    { name: "Hindi", logo: Languages },
    { name: "Mathematics", logo: Calculator },
    { name: "Science", logo: Atom },
    { name: "Social Science", logo: Globe },
    { name: "Computer", logo: Monitor },
    { name: "Sanskrit", logo: Book },
  ],

  9: [
    { name: "Gujarati", logo: Languages },
    { name: "English", logo: Book },
    { name: "Mathematics", logo: Calculator },
    { name: "Science", logo: Atom },
    { name: "Social Science", logo: Globe },
    { name: "Computer", logo: Monitor },
    { name: "Sanskrit", logo: Book },
    { name: "Physical Education", logo: Dumbbell },
  ],

  10: [
    { name: "Gujarati", logo: Languages },
    { name: "English", logo: Book },
    { name: "Mathematics", logo: Calculator },
    { name: "Science", logo: Atom },
    { name: "Social Science", logo: Globe },
    { name: "Computer", logo: Monitor },
    { name: "Sanskrit", logo: Book },
    { name: "Physical Education", logo: Dumbbell },
  ],

  11: [
    { name: "Physics", logo: Atom },
    { name: "Chemistry", logo: FlaskConical },
    { name: "Mathematics", logo: Sigma },
    { name: "Biology", logo: Leaf },
    { name: "Computer Science", logo: Monitor },
    { name: "English", logo: Book },
    { name: "Statistics", logo: Calculator },
    { name: "Economics", logo: TrendingUp },
  ],

  12: [
    { name: "Physics", logo: Atom },
    { name: "Chemistry", logo: FlaskConical },
    { name: "Mathematics", logo: Sigma },
    { name: "Biology", logo: Leaf },
    { name: "Computer Science", logo: Monitor },
    { name: "English", logo: Book },
    { name: "Statistics", logo: Calculator },
    { name: "Economics", logo: TrendingUp },
  ],
};

//subjects

export const subjectChapters: Record<number, Record<string, Chapter[]>> = {
  5: {
    Mathematics: [
      { name: "Numbers", logo: BookOpen },
      { name: "Addition & Subtraction", logo: BookOpen },
      { name: "Multiplication", logo: BookOpen },
      { name: "Division", logo: BookOpen },
      { name: "Fractions", logo: BookOpen },
      { name: "Geometry", logo: BookOpen },
      { name: "Measurement", logo: BookOpen },
      { name: "Data Handling", logo: BookOpen },
    ],

    Science: [
      { name: "Plants", logo: BookOpen },
      { name: "Animals", logo: BookOpen },
      { name: "Food", logo: BookOpen },
      { name: "Water", logo: BookOpen },
      { name: "Air", logo: BookOpen },
      { name: "Energy", logo: BookOpen },
      { name: "Environment", logo: BookOpen },
      { name: "Human Body", logo: BookOpen },
    ],
  },

  6: {
    Mathematics: [
      { name: "Whole Numbers", logo: BookOpen },
      { name: "Fractions", logo: BookOpen },
      { name: "Decimals", logo: BookOpen },
      { name: "Algebra", logo: BookOpen },
      { name: "Geometry", logo: BookOpen },
      { name: "Mensuration", logo: BookOpen },
      { name: "Ratio", logo: BookOpen },
      { name: "Data Handling", logo: BookOpen },
    ],

    Science: [
      { name: "Food Sources", logo: BookOpen },
      { name: "Components of Food", logo: BookOpen },
      { name: "Living Organisms", logo: BookOpen },
      { name: "Motion", logo: BookOpen },
      { name: "Electricity", logo: BookOpen },
      { name: "Water", logo: BookOpen },
      { name: "Air Around Us", logo: BookOpen },
      { name: "Environment", logo: BookOpen },
    ],
  },

  7: {
    Mathematics: [
      { name: "Integers", logo: BookOpen },
      { name: "Fractions & Decimals", logo: BookOpen },
      { name: "Data Handling", logo: BookOpen },
      { name: "Simple Equations", logo: BookOpen },
      { name: "Lines & Angles", logo: BookOpen },
      { name: "Triangles", logo: BookOpen },
      { name: "Perimeter & Area", logo: BookOpen },
      { name: "Algebra", logo: BookOpen },
    ],

    Science: [
      { name: "Nutrition in Plants", logo: BookOpen },
      { name: "Nutrition in Animals", logo: BookOpen },
      { name: "Heat", logo: BookOpen },
      { name: "Acids & Bases", logo: BookOpen },
      { name: "Physical & Chemical Changes", logo: BookOpen },
      { name: "Respiration", logo: BookOpen },
      { name: "Transportation", logo: BookOpen },
      { name: "Forests", logo: BookOpen },
    ],
  },

  8: {
    Mathematics: [
      { name: "Rational Numbers", logo: BookOpen },
      { name: "Linear Equations", logo: BookOpen },
      { name: "Understanding Quadrilaterals", logo: BookOpen },
      { name: "Practical Geometry", logo: BookOpen },
      { name: "Data Handling", logo: BookOpen },
      { name: "Squares & Square Roots", logo: BookOpen },
      { name: "Cubes", logo: BookOpen },
      { name: "Mensuration", logo: BookOpen },
    ],

    Science: [
      { name: "Crop Production", logo: BookOpen },
      { name: "Microorganisms", logo: BookOpen },
      { name: "Materials", logo: BookOpen },
      { name: "Metals & Non-metals", logo: BookOpen },
      { name: "Coal & Petroleum", logo: BookOpen },
      { name: "Combustion", logo: BookOpen },
      { name: "Cell Structure", logo: BookOpen },
      { name: "Reproduction", logo: BookOpen },
    ],
  },

  9: {
    Mathematics: [
      { name: "Number Systems", logo: BookOpen },
      { name: "Polynomials", logo: BookOpen },
      { name: "Coordinate Geometry", logo: BookOpen },
      { name: "Linear Equations", logo: BookOpen },
      { name: "Triangles", logo: BookOpen },
      { name: "Quadrilaterals", logo: BookOpen },
      { name: "Circles", logo: BookOpen },
      { name: "Statistics", logo: BookOpen },
    ],

    Science: [
      { name: "Matter Around Us", logo: BookOpen },
      { name: "Atoms & Molecules", logo: BookOpen },
      { name: "Cell", logo: BookOpen },
      { name: "Tissues", logo: BookOpen },
      { name: "Motion", logo: BookOpen },
      { name: "Force & Laws", logo: BookOpen },
      { name: "Gravitation", logo: BookOpen },
      { name: "Work & Energy", logo: BookOpen },
    ],
  },

  10: {
    Mathematics: [
      { name: "Real Numbers", logo: BookOpen },
      { name: "Polynomials", logo: BookOpen },
      { name: "Pair of Linear Equations", logo: BookOpen },
      { name: "Quadratic Equations", logo: BookOpen },
      { name: "Arithmetic Progressions", logo: BookOpen },
      { name: "Triangles", logo: BookOpen },
      { name: "Circles", logo: BookOpen },
      { name: "Probability", logo: BookOpen },
    ],

    Science: [
      { name: "Chemical Reactions", logo: BookOpen },
      { name: "Acids Bases Salts", logo: BookOpen },
      { name: "Metals & Non-metals", logo: BookOpen },
      { name: "Life Processes", logo: BookOpen },
      { name: "Control & Coordination", logo: BookOpen },
      { name: "Light", logo: BookOpen },
      { name: "Electricity", logo: BookOpen },
      { name: "Environment", logo: BookOpen },
    ],
  },

  11: {
    Physics: [
      { name: "Units & Measurements", logo: BookOpen },
      { name: "Motion in Straight Line", logo: BookOpen },
      { name: "Laws of Motion", logo: BookOpen },
      { name: "Work Energy Power", logo: BookOpen },
      { name: "Gravitation", logo: BookOpen },
      { name: "Oscillations", logo: BookOpen },
      { name: "Waves", logo: BookOpen },
      { name: "Thermodynamics", logo: BookOpen },
    ],

    Chemistry: [
      { name: "Atomic Structure", logo: BookOpen },
      { name: "Chemical Bonding", logo: BookOpen },
      { name: "States of Matter", logo: BookOpen },
      { name: "Thermodynamics", logo: BookOpen },
      { name: "Equilibrium", logo: BookOpen },
      { name: "Redox Reactions", logo: BookOpen },
      { name: "Hydrogen", logo: BookOpen },
      { name: "Organic Chemistry", logo: BookOpen },
    ],
  },

  12: {
    Physics: [
      { name: "Electric Charges", logo: BookOpen },
      { name: "Current Electricity", logo: BookOpen },
      { name: "Magnetism", logo: BookOpen },
      { name: "Electromagnetic Waves", logo: BookOpen },
      { name: "Optics", logo: BookOpen },
      { name: "Atoms", logo: BookOpen },
      { name: "Nuclei", logo: BookOpen },
      { name: "Semiconductors", logo: BookOpen },
    ],

    Chemistry: [
      { name: "Solid State", logo: BookOpen },
      { name: "Solutions", logo: BookOpen },
      { name: "Electrochemistry", logo: BookOpen },
      { name: "Chemical Kinetics", logo: BookOpen },
      { name: "Surface Chemistry", logo: BookOpen },
      { name: "Haloalkanes", logo: BookOpen },
      { name: "Alcohols", logo: BookOpen },
      { name: "Biomolecules", logo: BookOpen },
    ],
  },
};
