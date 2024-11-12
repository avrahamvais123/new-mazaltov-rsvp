"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";

const LetterSpacing = () => {
    const [value, setValue] = useState(0); // התחל עם 0 כמרווח ברירת מחדל בין אותיות
    const canvas = useAtomValue(canvas_Atom);

    useEffect(() => {
        if (!canvas) return;

        const handleSelection = () => {
            const activeObject = canvas.getActiveObject();
            const textType = ["text", "i-text", "textbox"];
            if (activeObject && textType.includes(activeObject.type)) {
                const currentCharSpacing = activeObject.charSpacing || 0;
                setValue(currentCharSpacing); // עדכון ערך הסליידר למרווח הקיים
            }
        };

        // הוספת מאזין לאירוע בחירת אובייקט
        canvas.on("selection:created", handleSelection);
        canvas.on("selection:updated", handleSelection);

        return () => {
            canvas.off("selection:created", handleSelection);
            canvas.off("selection:updated", handleSelection);
        };
    }, [canvas]);

    const updateLetterSpacing = (newLetterSpacing) => {
        setValue(newLetterSpacing);
        if (!canvas) return;
        const activeObject = canvas.getActiveObject();
        const textType = ["text", "i-text", "textbox"];
        if (activeObject && textType.includes(activeObject.type)) {
            activeObject.set("charSpacing", newLetterSpacing);
            canvas.renderAll();
        }
    };

    return (
        <fieldset className="w-full p-2 px-4 pt-1 border border-slate-700 rounded-sm flex-center gap-4">
            <legend className="px-2 text-xs text-slate-400">רווח בין האותיות</legend>
            <p className="text-lg w-3/12 text-slate-400">{value}</p>
            <Slider
                value={[value]}
                onValueChange={(value) => updateLetterSpacing(value[0])}
                max={5000} // הגדל טווח כדי לאפשר מרווחים גדולים יותר
                min={-1000} // אפשר גם מרווח שלילי
                step={1} // עדכון לפי 10 יחידות כדי לשמור על דיוק
                classNames={{
                    track: "bg-slate-600",
                    range: "bg-indigo-600",
                    thumb: "cursor-pointer",
                }}
            />
        </fieldset>
    );
};

export default LetterSpacing;
