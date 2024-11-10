"use client";

import {
  fredoka,
  alef,
  arimo,
  assistant,
  rubik,
  notoSans_Hebrew,
  heebo,
  varelaRound,
  secularOne,
  M_PLUSRounded1c,
  M_PLUS1p,
  frankRuhlLibre,
  amaticSC,
  tinos,
  davidLibre,
  bellefair,
  miriamLibre,
  IBM_PlexSansHebrew,
  karantina,
  solitreo,
  notoSerif_Hebrew,
  notoRashi_Hebrew,
  lunasima,
} from "@/app/fonts/fonts";
import MySelect from "@/app/ui/MySelect";
import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

const hebrewFonts = [
  { label: "אלף", name: "Alef", value: alef.style.fontFamily },
  { label: "ארימו", name: "Arimo", value: arimo.style.fontFamily },
  { label: "אסיסטנט", name: "Assistant", value: assistant.style.fontFamily },
  { label: "רוביק", name: "Rubik", value: rubik.style.fontFamily },
  {
    label: "נוטו סנס",
    name: "Noto Sans Hebrew",
    value: notoSans_Hebrew.style.fontFamily,
  },
  { label: "היבו", name: "Heebo", value: heebo.style.fontFamily },
  {
    label: "ורלה עגול",
    name: "Varela Round",
    value: varelaRound.style.fontFamily,
  },
  {
    label: "סקולר 1",
    name: "Secular One",
    value: secularOne.style.fontFamily,
  },
  {
    label: "אם פלוס עגול 1",
    name: "M PLUS Rounded 1c",
    value: M_PLUSRounded1c.style.fontFamily,
  },
  { label: "אם פלוס 1", name: "M PLUS 1p", value: M_PLUS1p.style.fontFamily },
  {
    label: "פרנק ריהל ליבר",
    name: "Frank Ruhl Libre",
    value: frankRuhlLibre.style.fontFamily,
  },
  { label: "אמטיק", name: "Amatic SC", value: amaticSC.style.fontFamily },
  { label: "טינוס", name: "Tinos", value: tinos.style.fontFamily },
  { label: "פרדוקה", name: "Fredoka", value: fredoka.style.fontFamily },
  {
    label: "דוד ליבר",
    name: "David Libre",
    value: davidLibre.style.fontFamily,
  },
  { label: "בלפייר", name: "Bellefair", value: bellefair.style.fontFamily },
  {
    label: "מרים ליבר",
    name: "Miriam Libre",
    value: miriamLibre.style.fontFamily,
  },
  {
    label: "איי בי אם סנס",
    name: "IBM Plex Sans Hebrew",
    value: IBM_PlexSansHebrew.style.fontFamily,
  },
  { label: "קרטינה", name: "Karantina", value: karantina.style.fontFamily },
  { label: "סוליטראו", name: "Solitreo", value: solitreo.style.fontFamily },
  {
    label: "נוטו סריף",
    name: "Noto Serif Hebrew",
    value: notoSerif_Hebrew.style.fontFamily,
  },
  {
    label: "נוטו רש׳׳י",
    name: "Noto Rashi Hebrew",
    value: notoRashi_Hebrew.style.fontFamily,
  },
  { label: "לונסימה", name: "Lunasima", value: lunasima.style.fontFamily },
];

const FontFamily = () => {
  const canvas = useAtomValue(canvas_Atom);
  const [value, setValue] = useState(hebrewFonts[0].value);
  console.log("value: ", value);

  const switchFont = (fontFamily) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && fontFamily) {
      activeObject.set("fontFamily", fontFamily);
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (!canvas) return;

    const getObjectFontFamily = () => {
      const activeObject = canvas.getActiveObject();
      console.log("activeObject: ", activeObject);
      if (!activeObject) return;

      const fontname = activeObject.fontFamily;
      console.log("fontname: ", fontname);

      const getFontValue = hebrewFonts.find((font) => font.value === fontname)
        ?.value;
      console.log("hebrewFonts[0].value: ", hebrewFonts[0].value);

      setValue(getFontValue);
    };

    canvas.on("selection:created", getObjectFontFamily);
    canvas.on("selection:updated", getObjectFontFamily);

    return () => {
      canvas.off("selection:created", getObjectFontFamily);
      canvas.off("selection:updated", getObjectFontFamily);
    };
  }, [canvas]);

  return (
    <MySelect
      defaultValue={hebrewFonts[0].value}
      field={{
        options: hebrewFonts,
      }}
      value={value}
      setValue={(name, val) => {
        console.log("val: ", val);
        setValue(val);
        switchFont(val);
      }}
      classNames={{
        trigger: "w-full border-slate-700 text-slate-400 rounded-sm",
        content: "bg-slate-800 max-h-52 border-slate-700",
        option: "text-slate-400 hover:!bg-indigo-600 hover:!text-white",
      }}
    />
  );
};

export default FontFamily;
