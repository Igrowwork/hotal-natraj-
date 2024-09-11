import {
  Roboto,
  Source_Sans_3,
  Roboto_Flex,
  Radley,
  Rosario,
} from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const robotoFlex = Roboto_Flex({
  weight: ["400", "100", "200", "300", "500", "700", "900", "800", "600"],
  subsets: ["latin"],
});

export const sourcesans = Source_Sans_3({
  subsets: ["latin"],
});

export const rosario = Rosario({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const radley = Radley({
  subsets: ["latin"],
  weight: ["400"],
});
